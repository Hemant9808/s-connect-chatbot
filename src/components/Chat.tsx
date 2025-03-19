// 'use client';

// import { useState, useRef, useEffect } from 'react';
// import { PaperAirplaneIcon, PlusIcon } from '@heroicons/react/24/solid';
// import FileUpload from './FileUpload';

// interface Message {
//   role: 'user' | 'assistant';
//   content: string;
// }

// export default function Chat() {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [showUpload, setShowUpload] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!input.trim() || isLoading) return;

//     const userMessage = input.trim();
//     setInput('');
//     setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
//     setIsLoading(true);

//     try {
//       const response = await fetch('/api/chat', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ message: userMessage }),
//       });

//       const data = await response.json();
      
//       if (data.error) {
//         throw new Error(data.error);
//       }

//       setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
//     } catch (error) {
//       console.error('Error:', error);
//       setMessages(prev => [...prev, { 
//         role: 'assistant', 
//         content: 'Sorry, I encountered an error. Please try again.' 
//       }]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex h-screen bg-[#343541]">
//       {/* Sidebar */}
//       <div className="hidden md:flex w-[260px] bg-[#202123] flex-col">
//         <div className="flex-1 overflow-y-auto">
//           <div className="p-2">
//             <button 
//               onClick={() => setShowUpload(!showUpload)}
//               className="flex w-full items-center gap-3 rounded-md border border-white/20 p-3 text-white transition-colors duration-200 hover:bg-gray-500/10"
//             >
//               <PlusIcon className="h-4 w-4" />
//               {showUpload ? 'New chat' : 'Upload document'}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col relative">
//         {showUpload ? (
//           <FileUpload />
//         ) : (
//           <div className="flex-1 overflow-y-auto">
//             {messages.length === 0 ? (
//               <div className="flex flex-col items-center justify-center h-full">
//                 <h1 className="text-4xl font-semibold text-white mb-8">Sharda Connect</h1>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-4xl px-4">
//                   <div className="p-4 rounded-lg border border-gray-600/50 hover:bg-[#2A2B32] cursor-pointer">
//                     <p className="text-white">Ask about admission process</p>
//                   </div>
//                   <div className="p-4 rounded-lg border border-gray-600/50 hover:bg-[#2A2B32] cursor-pointer">
//                     <p className="text-white">Get course information</p>
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               messages.map((message, index) => (
//                 <div
//                   key={index}
//                   className={message.role === 'assistant' ? 'bg-[#444654]' : ''}
//                 >
//                   <div className="max-w-3xl mx-auto px-4 py-6">
//                     <div className="flex gap-4 text-white">
//                       <div className={`w-7 h-7 rounded-sm flex items-center justify-center ${
//                         message.role === 'user' ? 'bg-[#5437DB]' : 'bg-[#19C37D]'
//                       }`}>
//                         {message.role === 'user' ? 'U' : 'A'}
//                       </div>
//                       <div className="mt-[-2px] prose prose-invert flex-1">
//                         {message.content}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}
//             {isLoading && (
//               <div className="bg-[#444654]">
//                 <div className="max-w-3xl mx-auto px-4 py-6">
//                   <div className="flex gap-4">
//                     <div className="w-7 h-7 rounded-sm bg-[#19C37D] flex items-center justify-center text-white">
//                       A
//                     </div>
//                     <div className="flex gap-2">
//                       <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
//                       <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
//                       <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//             <div ref={messagesEndRef} />
//           </div>
//         )}
        
//         {!showUpload && (
//           <div className="absolute bottom-0 left-0 w-full">
//             <div className="mx-2 mb-2 flex flex-col items-center">
//               <div className="relative w-full max-w-4xl">
//                 <form onSubmit={handleSubmit} className="stretch mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
//                   <div className="relative flex h-full flex-1 items-stretch md:flex-col">
//                     <div className="relative flex flex-1">
//                       <input
//                         type="text"
//                         value={input}
//                         onChange={(e) => setInput(e.target.value)}
//                         placeholder="Message Sharda Connect..."
//                         className="w-full resize-none rounded-xl border border-gray-600/50 bg-[#40414f] py-3 pl-4 pr-12 text-white focus:outline-none focus:border-gray-500"
//                         disabled={isLoading}
//                       />
//                       <button
//                         type="submit"
//                         disabled={isLoading || !input.trim()}
//                         className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 disabled:hover:text-gray-400 disabled:opacity-40"
//                       >
//                         <PaperAirplaneIcon className="h-4 w-4" />
//                       </button>
//                     </div>
//                   </div>
//                 </form>
//                 <div className="text-xs text-center text-gray-400 mt-2 px-4">
//                   Sharda Connect can make mistakes. Consider checking important information.
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// } 