import React, { useState } from 'react';
import { Send, Mic, HelpCircle, MessageCircle } from 'lucide-react';

export default function Chatbot() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your Jharkhand tour companion. How can I help you plan your trip? 🌲",
      sender: 'bot',
      timestamp: '10:30 AM'
    }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const faqItems = [
    "How to reach Netarhat?",
    "Local food options?",
    "Emergency contacts",
    "Best time to visit?",
    "Tribal culture tours",
    "Wildlife safari bookings"
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const userMessage = {
        id: Date.now(),
        text: newMessage,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      };
      
      setMessages([...messages, userMessage]);
      setNewMessage('');
      
      // Simulate bot response
      setTimeout(() => {
        const botResponse = {
          id: Date.now() + 1,
          text: "Thank you for your question! Based on your query about Jharkhand tourism, I recommend visiting during the winter months (October-March) for the best weather. Would you like specific information about any destination?",
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1500);
    }
  };

  const handleFAQClick = (question: string) => {
    setNewMessage(question);
    handleSendMessage();
  };

  return (
    <div className="pt-20 min-h-screen bg-stone-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center space-x-3">
            <MessageCircle className="w-10 h-10 text-green-600" />
            <span>Tour Companion Chatbot</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get instant answers about Jharkhand tourism, local culture, and travel tips
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Chat Interface */}
          <div className="lg:col-span-3 bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Jharkhand Tour Guide</h3>
                  <p className="text-green-100 text-sm">Online • Always ready to help</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-96 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.sender === 'user' ? 'text-green-200' : 'text-gray-500'
                      }`}
                    >
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="border-t border-gray-100 p-4">
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask about Jharkhand tourism..."
                  className="flex-1 p-3 border text-gray-900 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                />
                <button className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors duration-200">
                  <Mic className="w-5 h-5 text-gray-600" />
                </button>
                <button 
                  onClick={handleSendMessage}
                  className="p-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors duration-200"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* FAQ Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <HelpCircle className="w-5 h-5 text-green-600" />
                <span>Quick Questions</span>
              </h3>
              <div className="space-y-3">
                {faqItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleFAQClick(item)}
                    className="w-full text-left p-3 bg-gray-50 hover:bg-green-50 hover:text-green-700 text-gray-900 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-6 text-white">
              <h4 className="font-bold mb-2">Pro Tip</h4>
              <p className="text-sm text-green-100">
                Ask me in Hindi or your local language! I can help in multiple languages.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}