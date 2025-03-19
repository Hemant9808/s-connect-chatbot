//  'use client';

// import { useState } from 'react';
// import { ArrowUpTrayIcon, DocumentIcon } from '@heroicons/react/24/solid';

// export default function FileUpload() {
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [message, setMessage] = useState('');

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!title.trim() || !content.trim() || isLoading) return;

//     setIsLoading(true);
//     setMessage('');

//     try {
//       const response = await fetch('/api/upload', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           title: title.trim(),
//           content: content.trim(),
//         }),
//       });

//       const data = await response.json();

//       if (data.error) {
//         throw new Error(data.error);
//       }

//       setMessage('File uploaded successfully!');
//       setTitle('');
//       setContent('');
//     } catch (error) {
//       console.error('Error:', error);
//       setMessage('Failed to upload file. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex h-screen bg-[#343541]">
//       {/* Sidebar */}
//       <div className="w-64 bg-[#202123] p-4 flex flex-col">
//         <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-700 text-white">
//           <DocumentIcon className="h-5 w-5" />
//           <span>Document Upload</span>
//         </div>
//         <div className="mt-4 flex-1 overflow-y-auto">
//           {/* Upload history would go here */}
//         </div>
//         <div className="border-t border-gray-700 pt-4">
//           <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer">
//             <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
//               <span className="text-white text-sm">U</span>
//             </div>
//             <span className="text-white text-sm">User</span>
//           </div>
//         </div>
//       </div>

//       {/* Main Upload Area */}
//       <div className="flex-1 flex flex-col">
//         <div className="flex-1 overflow-y-auto p-8">
//           <div className="max-w-2xl mx-auto">
//             <h1 className="text-4xl font-bold text-white mb-8">Upload Document</h1>
//             <div className="bg-[#444654] rounded-xl p-6 space-y-6">
//               <div>
//                 <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
//                   Title
//                 </label>
//                 <input
//                   type="text"
//                   id="title"
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   className="w-full p-3 bg-[#40414f] text-white border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                   placeholder="Enter document title"
//                   required
//                   disabled={isLoading}
//                 />
//               </div>
//               <div>
//                 <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-1">
//                   Content
//                 </label>
//                 <textarea
//                   id="content"
//                   value={content}
//                   onChange={(e) => setContent(e.target.value)}
//                   rows={10}
//                   className="w-full p-3 bg-[#40414f] text-white border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
//                   placeholder="Enter document content"
//                   required
//                   disabled={isLoading}
//                 />
//               </div>
//               {message && (
//                 <div className={`p-4 rounded-xl ${
//                   message.includes('successfully') 
//                     ? 'bg-green-900/50 text-green-300 border border-green-800' 
//                     : 'bg-red-900/50 text-red-300 border border-red-800'
//                 }`}>
//                   {message}
//                 </div>
//               )}
//               <button
//                 type="submit"
//                 onClick={handleSubmit}
//                 disabled={isLoading || !title.trim() || !content.trim()}
//                 className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
//               >
//                 <ArrowUpTrayIcon className="h-5 w-5" />
//                 {isLoading ? 'Uploading...' : 'Upload Document'}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// } 