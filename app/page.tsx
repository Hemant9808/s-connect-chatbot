import Chat from '@/components/Chat';
import FileUpload from '@/components/FileUpload';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Document Chat Assistant</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Upload Documents</h2>
            <FileUpload />
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Chat</h2>
            <Chat />
          </div>
        </div>
      </div>
    </main>
  );
} 