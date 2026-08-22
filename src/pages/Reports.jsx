import { useState } from 'react';
import Header from '../components/Header';
import { notificationsData, powerUsageData, chatLogs } from '../data/mockData';
import { MessageCircle, Send, User } from 'lucide-react';
import { useApp } from '../context/AppContext';

const tabs = [
  { id: 'notifications', label: 'Notifications' },
  { id: 'orders', label: 'Orders' },
  { id: 'power', label: 'Power Usage' },
  { id: 'cancel', label: 'Cancel/Refund' },
  { id: 'payment', label: 'Payment' },
  { id: 'chat', label: 'Chat Logs' },
  { id: 'delayed', label: 'Delayed Orders' },
];

const statusBadge = (status) => {
  const colors = {
    'Critical': 'bg-red-600',
    'Low stock': 'bg-orange-500',
    'Maintenance': 'bg-blue-500',
    'New Product': 'bg-green-600',
    'Purchase': 'bg-purple-500',
    'Pending': 'bg-yellow-500 text-black',
    'Completed': 'bg-green-600',
    'High': 'bg-orange-500',
    'Normal': 'bg-green-600',
  };
  return <span className={`px-2 py-1 rounded text-xs font-bold text-white ${colors[status] || 'bg-gray-500'}`}>{status}</span>;
};

const orderStatusBadge = (status) => {
  const colors = {
    'PENDING': 'bg-yellow-500 text-black',
    'COMPLETED': 'bg-green-600',
    'CANCELLED': 'bg-red-600',
  };
  return <span className={`px-2 py-1 rounded text-xs font-bold text-white ${colors[String(status || '').toUpperCase()] || 'bg-gray-500'}`}>{status}</span>;
};

export default function Reports() {
  const [tab, setTab] = useState('notifications');
  const [selectedChat, setSelectedChat] = useState(null);
  const [reply, setReply] = useState('');
  const [readChats, setReadChats] = useState([]);
  const [replyAs, setReplyAs] = useState('Admin');
  const { state, dispatch } = useApp();
  const ordersData = state.orders.length > 0 ? state.orders : [];

  const sendReply = (event) => {
    event.preventDefault();
    const message = reply.trim();
    if (!message || !selectedChat) return;

    dispatch({
      type: 'ADD_CHAT_REPLY',
      payload: { chatId: selectedChat.id, sender: replyAs, message },
    });
    setReply('');
  };

  const openChat = (chat) => {
    setSelectedChat(chat);
    setReplyAs('Admin');
    setReadChats((currentReadChats) => [...new Set([...currentReadChats, chat.id])]);
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <Header title="Walang Brownout Appliances Reports and Alerts" />
      
      <div className="flex flex-wrap gap-2">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-full font-bold text-sm transition-all ${
              tab === t.id ? 'bg-wb-yellow text-white shadow-lg scale-105' : 'bg-gray-500 text-white hover:bg-gray-600'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="wb-card overflow-x-auto">
        {tab === 'notifications' && (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b-2 border-black">
                <th className="p-3 font-black">Product</th>
                <th className="p-3 font-black">Current Stock</th>
                <th className="p-3 font-black">Category</th>
                <th className="p-3 font-black">Quantity</th>
                <th className="p-3 font-black">Date</th>
                <th className="p-3 font-black">Status</th>
              </tr>
            </thead>
            <tbody>
              {notificationsData.map(row => (
                <tr key={row.id} className="border-b border-gray-400">
                  <td className="p-3">{row.product}</td>
                  <td className="p-3">{row.currentStock}</td>
                  <td className="p-3">{row.category}</td>
                  <td className="p-3">{row.quantity}</td>
                  <td className="p-3">{row.date}</td>
                  <td className="p-3">{statusBadge(row.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {tab === 'orders' && (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b-2 border-black">
                <th className="p-3 font-black">Order ID</th>
                <th className="p-3 font-black">Customer Name</th>
                <th className="p-3 font-black">Product</th>
                <th className="p-3 font-black">Quantity</th>
                <th className="p-3 font-black">Status</th>
                <th className="p-3 font-black">Total</th>
              </tr>
            </thead>
            <tbody>
              {ordersData.length > 0 ? (
                ordersData.map((row, i) => (
                  <tr key={row.orderId || i} className="border-b border-gray-400">
                    <td className="p-3">{row.orderId}</td>
                    <td className="p-3">{row.customer}</td>
                    <td className="p-3">{row.product}</td>
                    <td className="p-3">{row.quantity}</td>
                    <td className="p-3">{orderStatusBadge(row.status)}</td>
                    <td className="p-3 font-bold text-wb-blue">{row.total || '—'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-6 text-center text-gray-500 font-semibold">
                    No orders yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        {tab === 'power' && (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b-2 border-black">
                <th className="p-3 font-black">Date</th>
                <th className="p-3 font-black">Area/Equipment</th>
                <th className="p-3 font-black">Power Used (kWh)</th>
                <th className="p-3 font-black">Cost (₱)</th>
                <th className="p-3 font-black">Status</th>
              </tr>
            </thead>
            <tbody>
              {powerUsageData.map(row => (
                <tr key={row.id} className="border-b border-gray-400">
                  <td className="p-3">{row.date}</td>
                  <td className="p-3">{row.area}</td>
                  <td className="p-3">{row.kwh}</td>
                  <td className="p-3">{row.cost}</td>
                  <td className="p-3">{statusBadge(row.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {tab === 'cancel' && (
          <div className="p-4">
            <div className="grid grid-cols-2 font-black border-b-2 border-black pb-2 mb-2">
              <span>Date</span><span>Status</span>
            </div>
            <p className="text-gray-600 py-4">No cancel/refund records found.</p>
          </div>
        )}

        {tab === 'payment' && (
          <div className="p-4">
            <div className="grid grid-cols-2 font-black border-b-2 border-black pb-2 mb-2">
              <span>Date</span><span>Status</span>
            </div>
            <p className="text-gray-600 py-4">No payment records found.</p>
          </div>
        )}

        {tab === 'chat' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
            <div className="space-y-2">
              {chatLogs.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => openChat(chat)}
                  className={`relative w-full flex items-center gap-3 p-4 rounded-xl text-left transition-colors ${selectedChat?.id === chat.id ? 'bg-wb-yellow text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                >
                  {!readChats.includes(chat.id) && <span className="absolute top-3 right-3 w-3 h-3 rounded-full bg-red-600 border-2 border-white" aria-label="Unread chat" />}
                  <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white font-black text-lg">
                    <User size={18} />
                  </div>
                  <div className="min-w-0">
                    <span className="block font-bold truncate">{chat.name}</span>
                    <span className={`text-xs ${selectedChat?.id === chat.id ? 'text-white' : 'text-gray-500'}`}>{chat.topic}</span>
                  </div>
                </button>
              ))}
            </div>

            {selectedChat ? (
              <div className="lg:col-span-2 border border-gray-200 rounded-xl p-5 flex flex-col min-h-80">
                <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-400 flex items-center justify-center text-white">
                    <User size={22} />
                  </div>
                  <div>
                    <h3 className="font-black text-lg">{selectedChat.name}</h3>
                    <p className="text-sm text-gray-500">{selectedChat.contact} · {selectedChat.topic}</p>
                  </div>
                </div>

                <div className="flex-1 space-y-3 py-5">
                  <div className="max-w-xl bg-gray-100 rounded-xl p-3 text-sm text-gray-800">
                    <span className="block text-xs font-bold text-gray-500 mb-1">{selectedChat.name}</span>
                    {selectedChat.message}
                  </div>
                  {(state.chatReplies[selectedChat.id] || []).map((chatReply, index) => (
                    <div key={`${selectedChat.id}-${index}`} className={`max-w-xl rounded-xl p-3 text-sm ${chatReply.sender === 'Admin' ? 'ml-auto bg-wb-yellow text-white' : 'bg-gray-100 text-gray-800'}`}>
                      <span className="block text-xs font-bold mb-1">{chatReply.sender}</span>
                      {chatReply.message}
                    </div>
                  ))}
                </div>

                <form onSubmit={sendReply} className="border-t border-gray-200 pt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-bold text-gray-500">Reply as:</span>
                    {['Admin', selectedChat.name].map((sender) => (
                      <button
                        key={sender}
                        type="button"
                        onClick={() => setReplyAs(sender)}
                        className={`px-3 py-1 rounded-full text-xs font-bold ${replyAs === sender ? 'bg-wb-yellow text-white' : 'bg-gray-200 text-gray-700'}`}
                      >
                        {sender}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-2">
                  <input
                    value={reply}
                    onChange={(event) => setReply(event.target.value)}
                    placeholder={`Write a message as ${replyAs}`}
                    aria-label={`Write a message as ${replyAs}`}
                    className="wb-input flex-1"
                  />
                  <button type="submit" className="wb-btn-yellow px-4" aria-label="Send reply">
                    <Send size={18} />
                  </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="lg:col-span-2 min-h-80 flex flex-col items-center justify-center text-center text-gray-500 border-2 border-dashed border-gray-200 rounded-xl p-6">
                <MessageCircle size={34} className="mb-3 text-gray-400" />
                <p className="font-bold">Select a name to open the chat</p>
                <p className="text-sm">Unread chats are marked with a red dot.</p>
              </div>
            )}
          </div>
        )}

        {tab === 'delayed' && (
          <div className="p-8 text-center text-gray-600">
            <p className="text-lg">No delayed orders at this time.</p>
          </div>
        )}
      </div>
    </div>
  );
}