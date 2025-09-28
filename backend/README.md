# Jharkhand Tourism Backend

This is the backend API server for the Jharkhand Tourism application with OpenAI integration for AI-powered itinerary generation.

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Configuration
Create a `.env` file in the backend directory with the following content:

```env
# LLM API Configuration (Choose one or both)
# Groq (FREE - Recommended): https://console.groq.com/keys
GROQ_API_KEY=your_groq_api_key_here

# OpenAI (Paid): https://platform.openai.com/api-keys
OPENAI_API_KEY=your_openai_api_key_here

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Configuration
FRONTEND_URL=http://localhost:3000
```

**Recommended:** Use Groq (FREE) - Get your API key from https://console.groq.com/keys

### 3. Start the Server
```bash
# Development mode (with auto-restart)
npm run dev

# Or production mode
npm start
```

The server will start on port 5000 by default.

### 4. Test the API
You can test the health endpoint:
```bash
curl http://localhost:5000/health
```

## API Endpoints

### POST /api/chatbot/chat
Multilingual chatbot for Jharkhand tourism assistance.

**Request Body:**
```json
{
  "message": "How to reach Netarhat?",
  "conversationHistory": [
    {"role": "user", "content": "Hello"},
    {"role": "assistant", "content": "Hi! How can I help you?"}
  ]
}
```

**Response:**
```json
{
  "success": true,
  "response": "Netarhat is 4-5 hours from Ranchi by road...",
  "language": "english",
  "llmProvider": "groq-llama-3.1-70b-instant",
  "quickActions": [
    {
      "type": "transport",
      "title": "Cab Booking",
      "description": "Local cab services"
    }
  ]
}
```

### POST /api/itinerary/generate
Generates an AI-powered itinerary for Jharkhand tourism.

**Request Body:**
```json
{
  "startCity": "Ranchi",
  "dates": "2024-02-15",
  "duration": "3",
  "interests": ["Nature", "Culture"],
  "groupType": "family",
  "desiredPlaces": ["Netarhat", "Hundru Falls"]
}
```

**Response:**
```json
{
  "success": true,
  "itinerary": {
    "days": 3,
    "summary": "AI-generated 3-day itinerary for Jharkhand",
    "rawContent": "Detailed itinerary text...",
    "structuredDays": [...]
  },
  "metadata": {...}
}
```

## Features

- ✅ **Multilingual Chatbot** - Hindi, English, Bengali, Santhali support
- ✅ **Jharkhand Tourism Expert** - Specialized knowledge base
- ✅ **AI Itinerary Generator** - Personalized travel plans
- ✅ **Groq Integration** (FREE) - Llama 3.1 70B/8B models
- ✅ **OpenAI Integration** (Paid) - GPT-3.5-turbo fallback
- ✅ **Smart Fallback** - Automatically switches between providers
- ✅ **Quick Actions** - Cab booking, emergency contacts, local tips
- ✅ Rate limiting for API protection
- ✅ CORS configuration for frontend
- ✅ Error handling and validation
- ✅ Security middleware (Helmet)
- ✅ Request logging (Morgan)

## Troubleshooting

### Common Issues

1. **"No LLM configured"**
   - Get a FREE Groq API key from https://console.groq.com/keys
   - Add `GROQ_API_KEY=your_key_here` to your `.env` file

2. **"API quota exceeded"**
   - Groq: 14,400 requests/day (FREE)
   - OpenAI: Check your billing at https://platform.openai.com/usage

3. **"CORS error"**
   - Ensure the frontend is running on http://localhost:3000
   - Check the FRONTEND_URL in your .env file

4. **"Rate limit exceeded"**
   - The API has rate limiting (100 requests per 15 minutes per IP)
   - Wait before making more requests

### Logs
The server logs all requests and errors. Check the console output for debugging information.
