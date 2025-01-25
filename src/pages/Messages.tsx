import React from 'react';
import { Mail, Star, Trash2, Archive, Flag } from 'lucide-react';

interface WebSocketMessage {
  id: string;
  sender: string;
  subject: string;
  message: string;
  date: string;
  isStarred: boolean;
  isRead: boolean;
  type: 'new_rule' | 'message';
  data?: any;
}

function Messages({ wsMessages = [] }: { wsMessages: WebSocketMessage[] }) {
  const [messages, setMessages] = React.useState<WebSocketMessage[]>([
    {
      id: '1',
      sender: "John Smith",
      subject: "Project Update",
      message: "Here's the latest update on the project timeline...",
      date: "2024-03-10",
      isStarred: true,
      isRead: true,
      type: 'message'
    },
    {
      id: '2',
      sender: "Sarah Johnson",
      subject: "Meeting Tomorrow",
      message: "Don't forget about our team meeting tomorrow at 10 AM...",
      date: "2024-03-09",
      isStarred: false,
      isRead: false,
      type: 'message'
    },
    {
      id: '3',
      sender: "Tech Support",
      subject: "Ticket #4578 Response",
      message: "We've reviewed your support ticket and have a solution...",
      date: "2024-03-08",
      isStarred: false,
      isRead: true,
      type: 'message'
    },
    ...wsMessages.map(msg => ({
      ...msg,
      isStarred: false,
      isRead: false
    }))
  ]);

  const toggleStar = (id: string) => {
    setMessages(messages.map(msg => 
      msg.id === id ? { ...msg, isStarred: !msg.isStarred } : msg
    ));
  };

  const deleteMessage = (id: string) => {
    setMessages(messages.filter(msg => msg.id !== id));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Messages</h1>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Compose
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="w-10 px-4 py-3"></th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sender/Name
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject/Email
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Message/Details
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="w-20 px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {messages.map((message) => (
                <tr key={message.id} className={`${!message.isRead ? 'bg-blue-50' : ''} hover:bg-gray-50`}>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <button 
                      onClick={() => toggleStar(message.id)}
                      className={`${message.isStarred ? 'text-yellow-400' : 'text-gray-400'} hover:text-yellow-400`}
                    >
                      <Star className="h-5 w-5" />
                    </button>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      message.type === 'new_rule' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {message.type === 'new_rule' ? 'Rule' : 'Message'}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className={`text-sm ${message.isRead ? 'text-gray-900' : 'font-semibold text-black'}`}>
                      {message.type === 'new_rule' ? message.data?.name : message.sender}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className={`text-sm ${message.isRead ? 'text-gray-900' : 'font-semibold text-black'}`}>
                      {message.type === 'new_rule' ? message.data?.email : message.subject}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-900 truncate max-w-md">
                      {message.type === 'new_rule' 
                        ? `Phone: ${message.data?.phone}`
                        : message.message}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {new Date(message.type === 'new_rule' ? message.data?.createdAt : message.date).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex gap-2">
                      <button className="text-gray-400 hover:text-gray-600">
                        <Archive className="h-5 w-5" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <Flag className="h-5 w-5" />
                      </button>
                      <button 
                        onClick={() => deleteMessage(message.id)}
                        className="text-gray-400 hover:text-red-600"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Messages;