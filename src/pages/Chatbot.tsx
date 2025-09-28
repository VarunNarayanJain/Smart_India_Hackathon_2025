import { useState } from 'react';
import { Send, Mic, HelpCircle, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Chatbot() {
  const { t } = useLanguage();
  
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: t('chatbot.welcome'),
      sender: 'bot',
      timestamp: '10:30 AM'
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const faqItems = [
    t('chatbot.howToReach'),
    t('chatbot.localFood'),
    t('chatbot.emergency'),
    t('chatbot.bestTime'),
    t('chatbot.tribalCulture'),
    t('chatbot.safari')
  ];

  const handleSendMessage = async () => {
    if (newMessage.trim() && !isLoading) {
      const userMessage = {
        id: Date.now(),
        text: newMessage,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      };
      
      setMessages(prev => [...prev, userMessage]);
      const currentMessage = newMessage;
      setNewMessage('');
      setIsLoading(true);
      
      try {
        // Call the backend chatbot API
        const response = await fetch('http://localhost:5000/api/chatbot/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: currentMessage,
            conversationHistory: messages.slice(-10).map(msg => ({
              role: msg.sender === 'user' ? 'user' : 'assistant',
              content: msg.text
            }))
          })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.success) {
          const botResponse = {
            id: Date.now() + 1,
            text: data.response,
            sender: 'bot',
            timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
            language: data.language,
            quickActions: data.quickActions || []
          };
          setMessages(prev => [...prev, botResponse]);
        } else {
          throw new Error(data.message || 'Failed to get response');
        }
      } catch (error) {
        console.error('❌ Error calling chatbot API:', error);
        const errorResponse = {
          id: Date.now() + 1,
          text: `Sorry, I'm having trouble connecting right now. Please try again later. (Error: ${error instanceof Error ? error.message : 'Unknown error'})`,
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        };
        setMessages(prev => [...prev, errorResponse]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleFAQClick = (question: string) => {
    setNewMessage(question);
    handleSendMessage();
  };

  return (
    <div className="pt-20 min-h-screen bg-stone-50 dark:bg-black transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center justify-center space-x-3">
            <MessageCircle className="w-10 h-10 text-green-600" />
            <span>{t('chatbot.title')}</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('chatbot.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Chat Interface */}
          <div className="lg:col-span-3 bg-white dark:bg-gray-900 rounded-3xl shadow-lg dark:shadow-black/50 border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-xl transition-all duration-500">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">{t('chatbot.guideName')}</h3>
                  <p className="text-green-100 text-sm">{t('chatbot.status')}</p>
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
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl transition-all duration-300 hover:scale-105 ${
                      message.sender === 'user'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.sender === 'user' ? 'text-green-200' : 'text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="border-t border-gray-100 dark:border-gray-700 p-4">
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={t('chatbot.placeholder')}
                  className="flex-1 p-3 border text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                />
                <button className="p-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl transition-colors duration-200">
                  <Mic className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
                <button 
                  onClick={handleSendMessage}
                  disabled={isLoading}
                  className="p-3 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-xl transition-all duration-200 hover:scale-105"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* FAQ Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg dark:shadow-black/50 border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all duration-500 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                <HelpCircle className="w-5 h-5 text-green-600" />
                <span>{t('chatbot.quickQuestions')}</span>
              </h3>
              <div className="space-y-3">
                {faqItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleFAQClick(item)}
                    className="w-full text-left p-3 bg-gray-50 dark:bg-gray-800 hover:bg-green-50 dark:hover:bg-green-900 hover:text-green-700 dark:hover:text-green-400 text-gray-900 dark:text-white rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105"
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