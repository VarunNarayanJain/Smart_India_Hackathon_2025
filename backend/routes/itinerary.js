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

// Validate API keys
if (!process.env.OPENAI_API_KEY && !process.env.GROQ_API_KEY) {
  console.error('❌ No LLM API key configured. Please set OPENAI_API_KEY or GROQ_API_KEY');
}

// POST /api/itinerary/generate
router.post('/generate', async (req, res) => {
  try {
    const {
      startCity,
      dates,
      duration,
      interests,
      groupType,
      desiredPlaces
    } = req.body;

    // Validate required fields
    if (!startCity || !duration) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'startCity and duration are required'
      });
    }

    // Create the prompt for OpenAI
    const prompt = createItineraryPrompt({
      startCity,
      dates,
      duration,
      interests,
      groupType,
      desiredPlaces
    });

    console.log('🤖 Generating itinerary with LLM...');
    console.log('📍 Start City:', startCity);
    console.log('📅 Duration:', duration);
    console.log('🎯 Interests:', interests);
    console.log('👥 Group Type:', groupType);
    console.log('🏞️ Desired Places:', desiredPlaces);

    let aiResponse;
    let llmProvider = 'unknown';

    // Try Groq first (free), then fallback to OpenAI
    if (process.env.GROQ_API_KEY) {
      try {
        // Try 70B model first, then fallback to 8B model
        let groqModel = "llama-3.1-70b-instant";
        let completion;
        
        try {
          console.log('🚀 Using Groq (Llama 3.1 70B)...');
          completion = await groq.chat.completions.create({
            model: groqModel,
            messages: [
              {
                role: "system",
                content: "You are a professional travel planner specializing in Jharkhand, India. Create detailed, practical itineraries that include specific times, activities, and recommendations. Always focus on Jharkhand destinations and provide realistic travel times and costs."
              },
              {
                role: "user",
                content: prompt
              }
            ],
            max_tokens: 2000,
            temperature: 0.7,
          });
        } catch (modelError) {
          // Fallback to 8B model if 70B fails
          console.log('⚠️ 70B model failed, trying 8B model...', modelError.message);
          groqModel = "llama-3.1-8b-instant";
          console.log('🚀 Using Groq (Llama 3.1 8B)...');
          completion = await groq.chat.completions.create({
            model: groqModel,
            messages: [
              {
                role: "system",
                content: "You are a professional travel planner specializing in Jharkhand, India. Create detailed, practical itineraries that include specific times, activities, and recommendations. Always focus on Jharkhand destinations and provide realistic travel times and costs."
              },
              {
                role: "user",
                content: prompt
              }
            ],
            max_tokens: 2000,
            temperature: 0.7,
          });
        }
        
        aiResponse = completion.choices[0].message.content;
        llmProvider = `groq-${groqModel}`;
        console.log(`✅ Groq response received using ${groqModel}`);
      } catch (groqError) {
        console.log('⚠️ Groq failed, trying OpenAI...', groqError.message);
        throw groqError; // Will be caught by outer try-catch
      }
    } else if (process.env.OPENAI_API_KEY) {
      try {
        console.log('🚀 Using OpenAI (GPT-3.5-turbo)...');
        const completion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are a professional travel planner specializing in Jharkhand, India. Create detailed, practical itineraries that include specific times, activities, and recommendations. Always focus on Jharkhand destinations and provide realistic travel times and costs."
            },
            {
              role: "user",
              content: prompt
            }
          ],
          max_tokens: 2000,
          temperature: 0.7,
        });
        aiResponse = completion.choices[0].message.content;
        llmProvider = 'openai';
        console.log('✅ OpenAI response received');
      } catch (openaiError) {
        console.log('❌ OpenAI failed:', openaiError.message);
        throw openaiError;
      }
    } else {
      throw new Error('No LLM API key configured');
    }
    
    // Parse the AI response into structured itinerary
    const itinerary = parseItineraryResponse(aiResponse, duration);

    console.log('✅ Itinerary generated successfully');

    res.json({
      success: true,
      itinerary,
      rawResponse: aiResponse,
      llmProvider,
      metadata: {
        startCity,
        duration,
        interests,
        groupType,
        desiredPlaces,
        generatedAt: new Date().toISOString(),
        llmProvider
      }
    });

  } catch (error) {
    console.error('❌ Error generating itinerary:', error);
    
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
      error: 'Failed to generate itinerary',
      message: error.message || 'An unexpected error occurred'
    });
  }
});

// Helper function to create the prompt
function createItineraryPrompt(data) {
  const {
    startCity,
    dates,
    duration,
    interests,
    groupType,
    desiredPlaces
  } = data;

  let prompt = `Create a detailed ${duration}-day itinerary for Jharkhand, India starting from ${startCity}.`;

  if (dates) {
    prompt += ` Travel dates: ${dates}.`;
  }

  if (interests && interests.length > 0) {
    prompt += ` Interests: ${interests.join(', ')}.`;
  }

  if (groupType) {
    prompt += ` Group type: ${groupType}.`;
  }

  if (desiredPlaces && desiredPlaces.length > 0) {
    prompt += ` Must include these places: ${desiredPlaces.join(', ')}.`;
  }

  prompt += `

Please provide a structured itinerary with:
1. Day-by-day breakdown
2. Specific times for activities
3. Travel routes and transportation
4. Estimated costs
5. Local recommendations
6. Safety tips

Focus on popular Jharkhand destinations like:
- Netarhat (Queen of Chotanagpur Plateau)
- Hundru Falls
- Betla National Park
- Ranchi (capital city)
- Dassam Falls
- Patratu Valley
- Hazaribagh
- Deoghar (Baidyanath Temple)

Format the response as a detailed day-by-day itinerary with specific activities, timings, and practical information.`;

  return prompt;
}

// Helper function to parse AI response into structured format
function parseItineraryResponse(response, duration) {
  try {
    // For now, return a structured format that matches the frontend expectations
    // In a production app, you might want more sophisticated parsing
    const days = parseInt(duration) || 3;
    
    return {
      days: days,
      summary: `AI-generated ${days}-day itinerary for Jharkhand`,
      rawContent: response,
      structuredDays: generateStructuredDays(response, days)
    };
  } catch (error) {
    console.error('Error parsing itinerary response:', error);
    return {
      days: 3,
      summary: 'AI-generated itinerary for Jharkhand',
      rawContent: response,
      structuredDays: []
    };
  }
}

// Helper function to generate structured days from AI response
function generateStructuredDays(response, days) {
  const structuredDays = [];
  
  for (let i = 1; i <= days; i++) {
    structuredDays.push({
      day: i,
      location: `Day ${i} - Jharkhand Exploration`,
      image: 'https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=1',
      activities: [
        { time: '9:00 AM', activity: 'Morning activities', icon: 'MapPin' },
        { time: '12:00 PM', activity: 'Lunch break', icon: 'Users' },
        { time: '3:00 PM', activity: 'Afternoon exploration', icon: 'MapPin' },
        { time: '6:00 PM', activity: 'Evening activities', icon: 'Clock' }
      ],
      recommendation: 'AI-generated recommendations will be provided in the detailed response.'
    });
  }
  
  return structuredDays;
}

module.exports = router;
