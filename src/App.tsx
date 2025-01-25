import React, { useState, useRef } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Phone, Menu, X, Settings, HelpCircle, LogOut, MessageSquare, Plus, Trash2, Wifi, WifiOff, Activity } from 'lucide-react';
import Messages from './pages/Messages';
import Config from './pages/Config';

interface Rule {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  createdAt: string;
}

interface WebSocketMessage {
  id: string;
  type: 'new_rule' | 'message';
  data?: any;
  sender?: string;
  subject?: string;
  message?: string;
  date?: string;
  isStarred?: boolean;
  isRead?: boolean;
}

function App() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('rules');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [rules, setRules] = useState<Rule[]>([]);
  const [wsUrl, setWsUrl] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState('');
  const [wsMessages, setWsMessages] = useState<WebSocketMessage[]>([]);
  const wsRef = useRef<WebSocket | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRule: Rule = {
      id: crypto.randomUUID(),
      ...formData,
      createdAt: new Date().toISOString()
    };
    setRules(prev => [...prev, newRule]);

    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      const message = {
        type: 'new_rule',
        data: newRule
      };
      wsRef.current.send(JSON.stringify(message));
    }

    setIsFormVisible(false);
    setFormData({
      name: '',
      email: '',
      password: '',
      phone: ''
    });
  };

  const deleteRule = (id: string) => {
    setRules(prev => prev.filter(rule => rule.id !== id));
  };

  const connectWebSocket = () => {
    if (!wsUrl) {
      setConnectionError('Please enter a WebSocket URL');
      return;
    }

    try {
      if (wsRef.current) {
        wsRef.current.close();
      }

      setConnectionError('');
      const ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        setIsConnected(true);
        setConnectionError('');
      };

      ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          if (message.type === 'new_rule') {
            setWsMessages(prev => [...prev, {
              id: message.data.id || crypto.randomUUID(),
              type: 'new_rule',
              data: message.data,
              date: message.data.createdAt
            }]);
          }
        } catch (error) {
          console.error('Failed to parse WebSocket message:', error);
        }
      };

      ws.onclose = () => {
        setIsConnected(false);
      };

      ws.onerror = () => {
        setIsConnected(false);
        setConnectionError('Failed to connect to WebSocket server');
      };

      wsRef.current = ws;
    } catch (error) {
      setConnectionError('Invalid WebSocket URL');
    }
  };

  const disconnectWebSocket = () => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
      setIsConnected(false);
    }
  };

  const handleTracerClick = () => {
    setActiveTab('rules');
    setIsMenuOpen(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'rules':
        return (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Rules</h2>
              <button
                onClick={() => setIsFormVisible(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-5 w-5" />
                Add New Rule
              </button>
            </div>

            {rules.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Phone
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created At
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {rules.map((rule) => (
                      <tr key={rule.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{rule.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{rule.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{rule.phone}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {new Date(rule.createdAt).toLocaleString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => deleteRule(rule.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No rules added yet. Click the button above to add a new rule.</p>
              </div>
            )}
          </div>
        );
      case 'messages':
        return <Messages wsMessages={wsMessages} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/config" element={<Config />} />
        <Route path="/" element={
          <>
            {/* Menu Overlay */}
            {isMenuOpen && (
              <div 
                className="fixed inset-0 bg-black bg-opacity-50 z-20"
                onClick={toggleMenu}
              />
            )}

            {/* Modal Overlay */}
            {isFormVisible && (
              <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Add New Rule</h2>
                    <button
                      onClick={() => setIsFormVisible(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <div className="mt-1 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="John Doe"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email Address
                      </label>
                      <div className="mt-1 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <div className="mt-1 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="••••••••"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone Number
                      </label>
                      <div className="mt-1 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="+1 (555) 000-0000"
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                    >
                      Add Rule
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* Hamburger Menu Button */}
            <button
              onClick={toggleMenu}
              className="fixed top-4 left-4 z-30 p-2 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-600" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600" />
              )}
            </button>

            {/* Sidebar Menu */}
            <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-30 ${
              isMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}>
              <div className="p-5 space-y-6">
                <div className="pt-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Menu</h3>
                  <nav className="space-y-2">
                    <button
                      onClick={handleTracerClick}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-100 ${
                        activeTab === 'rules' ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                      }`}
                    >
                      <Activity className="h-5 w-5" />
                      <span>Tracer</span>
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('messages');
                        setIsMenuOpen(false);
                      }}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-100 ${
                        activeTab === 'messages' ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                      }`}
                    >
                      <MessageSquare className="h-5 w-5" />
                      <span>Messages</span>
                    </button>
                    <button
                      onClick={() => {
                        navigate('/config');
                        setIsMenuOpen(false);
                      }}
                      className="w-full flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-100 text-gray-700"
                    >
                      <Settings className="h-5 w-5" />
                      <span>Configuration</span>
                    </button>
                    <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-100 text-gray-700">
                      <HelpCircle className="h-5 w-5" />
                      <span>Help</span>
                    </a>
                    <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-100 text-red-600">
                      <LogOut className="h-5 w-5" />
                      <span>Logout</span>
                    </a>
                  </nav>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="pt-16 p-4 max-w-6xl mx-auto">
              {/* WebSocket Connection Section */}
              <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">WebSocket Connection</h3>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={wsUrl}
                      onChange={(e) => setWsUrl(e.target.value)}
                      placeholder="Enter WebSocket URL (ws:// or wss://)"
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  {!isConnected ? (
                    <button
                      onClick={connectWebSocket}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    >
                      <Wifi className="h-5 w-5" />
                      Connect
                    </button>
                  ) : (
                    <button
                      onClick={disconnectWebSocket}
                      className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                    >
                      <WifiOff className="h-5 w-5" />
                      Disconnect
                    </button>
                  )}
                </div>
                {connectionError && (
                  <p className="mt-2 text-sm text-red-600">{connectionError}</p>
                )}
                {isConnected && (
                  <p className="mt-2 text-sm text-green-600 flex items-center gap-2">
                    <Wifi className="h-4 w-4" />
                    Connected to WebSocket server
                  </p>
                )}
              </div>

              {/* Tabs */}
              <div className="flex space-x-1 mb-6 bg-white rounded-lg shadow-md p-1">
                <button
                  onClick={() => setActiveTab('rules')}
                  className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTab === 'rules'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Rules
                </button>
                <button
                  onClick={() => setActiveTab('messages')}
                  className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTab === 'messages'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Messages
                </button>
              </div>

              {renderContent()}
            </div>
          </>
        } />
      </Routes>
    </div>
  );
}

export default App;