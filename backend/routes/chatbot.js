const express = require('express');
const OpenAI = require('openai');
const Groq = require('groq-sdk');
const router = express.Router();

// Initialize LLM clients
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Jharkhand Tourism Knowledge Base
const jharkhandKnowledge = {
  destinations: {
    'netarhat': {
      name: 'Netarhat',
      description: 'Queen of Chotanagpur Plateau',
      bestTime: 'October to March',
      attractions: ['Sunrise Point', 'Netarhat Dam', 'Magnolia Point', 'Pine Forests'],
      activities: ['Sunrise viewing', 'Nature walks', 'Photography', 'Tribal village visits'],
      transport: '4-5 hours from Ranchi by road',
      accommodation: 'Forest Rest House, Local Hotels',
      localFood: 'Tribal cuisine, Pine honey, Local vegetables'
    },
    'hundru falls': {
      name: 'Hundru Falls',
      description: '98-meter spectacular waterfall',
      bestTime: 'July to January (monsoon season)',
      attractions: ['Waterfall viewing', 'Photography spots', 'Nature trails'],
      activities: ['Waterfall photography', 'Picnic', 'Nature walks'],
      transport: '1-1.5 hours from Ranchi',
      accommodation: 'Nearby hotels in Ranchi',
      localFood: 'Local fish curry, Rice dishes'
    },
    'betla national park': {
      name: 'Betla National Park',
      description: 'Tiger reserve and wildlife sanctuary',
      bestTime: 'October to June',
      attractions: ['Tiger spotting', 'Elephant rides', 'Bird watching', 'Ancient forts'],
      activities: ['Safari rides', 'Wildlife photography', 'Nature trails'],
      transport: '3-4 hours from Ranchi',
      accommodation: 'Forest lodges, Resorts',
      localFood: 'Jungle cuisine, Local tribal food'
    },
    'ranchi': {
      name: 'Ranchi',
      description: 'Capital city of Jharkhand',
      bestTime: 'October to March',
      attractions: ['Ranchi Zoo', 'Rock Garden', 'Tagore Hill', 'Birsa Munda Park'],
      activities: ['City tour', 'Shopping', 'Cultural experiences'],
      transport: 'Well connected by air, rail, road',
      accommodation: 'Hotels, Guest houses, Resorts',
      localFood: 'Local Jharkhand cuisine, Street food'
    }
  },
  transport: {
    'cabs': {
      'local': 'Local taxi services available at major cities',
      'online': 'Ola, Uber available in Ranchi and Jamshedpur',
      'rates': 'Approx ₹10-15 per km for local cabs',
      'booking': 'Contact local taxi stands or use online apps'
    },
    'buses': {
      'state': 'Jharkhand State Road Transport Corporation (JSRTC)',
      'private': 'Private bus operators available',
      'routes': 'Connects all major cities and tourist destinations'
    },
    'trains': {
      'major_stations': 'Ranchi, Jamshedpur, Dhanbad, Bokaro',
      'connectivity': 'Well connected to major Indian cities'
    }
  },
  emergency: {
    'police': '100',
    'ambulance': '108',
    'women_helpline': '1091',
    'tourist_helpline': '1363',
    'forest_emergency': '1800-180-5502'
  },
  languages: {
    'hindi': 'हिंदी',
    'english': 'English',
    'bengali': 'বাংলা',
    'santhali': 'ᱥᱟᱱᱛᱟᱲᱤ',
    'oraon': 'Kurukh',
    'mundari': 'Mundari'
  }
};

// Language detection function
function detectLanguage(text) {
  const hindiRegex = /[\u0900-\u097F]/;
  const bengaliRegex = /[\u0980-\u09FF]/;
  const santhaliRegex = /[\u1C50-\u1C7F]/;
  
  if (hindiRegex.test(text)) return 'hindi';
  if (bengaliRegex.test(text)) return 'bengali';
  if (santhaliRegex.test(text)) return 'santhali';
  return 'english';
}

// Generate context-aware prompt for Jharkhand tourism
function createChatbotPrompt(userMessage, language = 'english', conversationHistory = []) {
  const languageInstructions = {
    'hindi': 'Respond in Hindi (हिंदी) and be helpful to tourists visiting Jharkhand.',
    'bengali': 'Respond in Bengali (বাংলা) and be helpful to tourists visiting Jharkhand.',
    'santhali': 'Respond in Santhali and be helpful to tourists visiting Jharkhand.',
    'english': 'Respond in English and be helpful to tourists visiting Jharkhand.'
  };

  const systemPrompt = `You are "Jharkhand Tourism Assistant" - a helpful, knowledgeable, and friendly chatbot specializing in Jharkhand tourism. 

${languageInstructions[language] || languageInstructions['english']}

You have extensive knowledge about:
- Tourist destinations in Jharkhand (Netarhat, Hundru Falls, Betla National Park, Ranchi, etc.)
- Local transportation (cabs, buses, trains)
- Accommodation options
- Local cuisine and food
- Cultural experiences and tribal tourism
- Emergency contacts and safety information
- Best times to visit different places
- Practical travel tips

Always provide:
- Accurate, up-to-date information
- Practical advice for tourists
- Safety tips and emergency contacts when relevant
- Local recommendations for food, accommodation, and activities
- Information about cultural sensitivity and local customs

Be conversational, helpful, and enthusiastic about Jharkhand tourism!`;

  return {
    role: "system",
    content: systemPrompt
  };
}

// POST /api/chatbot/chat
router.post('/chat', async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message || message.trim().length === 0) {
      return res.status(400).json({
        error: 'Message is required',
        message: 'Please provide a message to chat with the assistant'
      });
    }

    // Detect language
    const detectedLanguage = detectLanguage(message);
    console.log(`🌐 Detected language: ${detectedLanguage}`);

    // Create conversation context
    const messages = [
      createChatbotPrompt(message, detectedLanguage, conversationHistory),
      ...conversationHistory.slice(-6), // Keep last 6 messages for context
      {
        role: "user",
        content: message
      }
    ];

    let aiResponse;
    let llmProvider = 'unknown';

    // Try Groq first (free), then fallback to OpenAI
    if (process.env.GROQ_API_KEY) {
      try {
        // Try 70B model first, then fallback to 8B model
        let groqModel = "llama-3.1-70b-instant";
        let completion;
        
        try {
          console.log('🤖 Using Groq for chatbot...');
          completion = await groq.chat.completions.create({
            model: groqModel,
            messages: messages,
            max_tokens: 1000,
            temperature: 0.7,
          });
        } catch (modelError) {
          // Fallback to 8B model if 70B fails
          console.log('⚠️ 70B model failed, trying 8B model...', modelError.message);
          groqModel = "llama-3.1-8b-instant";
          console.log('🤖 Using Groq 8B for chatbot...');
          completion = await groq.chat.completions.create({
            model: groqModel,
            messages: messages,
            max_tokens: 1000,
            temperature: 0.7,
          });
        }
        
        aiResponse = completion.choices[0].message.content;
        llmProvider = `groq-${groqModel}`;
        console.log(`✅ Groq chatbot response received using ${groqModel}`);
      } catch (groqError) {
        console.log('⚠️ Groq failed, trying OpenAI...', groqError.message);
        throw groqError;
      }
    } else if (process.env.OPENAI_API_KEY) {
      try {
        console.log('🤖 Using OpenAI for chatbot...');
        const completion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: messages,
          max_tokens: 1000,
          temperature: 0.7,
        });
        aiResponse = completion.choices[0].message.content;
        llmProvider = 'openai';
        console.log('✅ OpenAI chatbot response received');
      } catch (openaiError) {
        console.log('❌ OpenAI failed:', openaiError.message);
        throw openaiError;
      }
    } else {
      throw new Error('No LLM API key configured');
    }

    // Add helpful quick actions based on the query
    const quickActions = generateQuickActions(message, detectedLanguage);

    console.log('✅ Chatbot response generated successfully');

    res.json({
      success: true,
      response: aiResponse,
      language: detectedLanguage,
      llmProvider,
      quickActions,
      metadata: {
        timestamp: new Date().toISOString(),
        messageLength: message.length,
        conversationLength: conversationHistory.length + 1
      }
    });

  } catch (error) {
    console.error('❌ Error in chatbot:', error);
    
    // Handle API errors
    if (error.code === 'insufficient_quota' || error.message?.includes('quota')) {
      return res.status(402).json({
        error: 'API quota exceeded',
        message: 'Please check your API billing or try using Groq (free)'
      });
    }
    
    if (error.code === 'invalid_api_key' || error.message?.includes('API key')) {
      return res.status(401).json({
        error: 'Invalid API key',
        message: 'Please check your API key configuration'
      });
    }

    if (error.message?.includes('No LLM API key')) {
      return res.status(400).json({
        error: 'No LLM configured',
        message: 'Please set GROQ_API_KEY or OPENAI_API_KEY in your environment variables'
      });
    }

    res.status(500).json({
      error: 'Failed to generate response',
      message: error.message || 'An unexpected error occurred'
    });
  }
});

// Generate quick actions based on user query
function generateQuickActions(message, language) {
  const lowerMessage = message.toLowerCase();
  const actions = [];

  // Transportation queries
  if (lowerMessage.includes('cab') || lowerMessage.includes('taxi') || lowerMessage.includes('transport')) {
    actions.push({
      type: 'transport',
      title: language === 'hindi' ? 'कैब बुकिंग' : 'Cab Booking',
      description: language === 'hindi' ? 'स्थानीय कैब सेवाएं' : 'Local cab services'
    });
  }

  // Emergency queries
  if (lowerMessage.includes('emergency') || lowerMessage.includes('help') || lowerMessage.includes('police')) {
    actions.push({
      type: 'emergency',
      title: language === 'hindi' ? 'आपातकालीन संपर्क' : 'Emergency Contacts',
      description: language === 'hindi' ? 'तुरंत मदद के लिए' : 'Get immediate help'
    });
  }

  // Destination queries
  if (lowerMessage.includes('netarhat') || lowerMessage.includes('hundru') || lowerMessage.includes('betla')) {
    actions.push({
      type: 'destination',
      title: language === 'hindi' ? 'गंतव्य जानकारी' : 'Destination Info',
      description: language === 'hindi' ? 'विस्तृत जानकारी प्राप्त करें' : 'Get detailed information'
    });
  }

  // Food queries
  if (lowerMessage.includes('food') || lowerMessage.includes('eat') || lowerMessage.includes('restaurant')) {
    actions.push({
      type: 'food',
      title: language === 'hindi' ? 'स्थानीय भोजन' : 'Local Food',
      description: language === 'hindi' ? 'झारखंडी व्यंजन' : 'Jharkhand cuisine'
    });
  }

  return actions;
}

// GET /api/chatbot/knowledge - Get specific information
router.get('/knowledge/:topic', (req, res) => {
  const { topic } = req.params;
  const { lang = 'english' } = req.query;

  if (jharkhandKnowledge[topic]) {
    res.json({
      success: true,
      topic,
      language: lang,
      data: jharkhandKnowledge[topic]
    });
  } else {
    res.status(404).json({
      error: 'Topic not found',
      message: 'The requested topic is not available in our knowledge base'
    });
  }
});

module.exports = router;



