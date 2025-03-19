'use client';

import { useState } from 'react';
import { ArrowUpTrayIcon, XMarkIcon } from '@heroicons/react/24/solid';

export default function FileUpload({ onClose }: { onClose: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || isLoading) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', file.name);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);
      
      setMessage('Document uploaded successfully!');
      setTimeout(() => {
        onClose();
        setMessage('');
        setFile(null);
      }, 2000);
    } catch (error) {
      console.error('Upload failed:', error);
      setMessage('Failed to upload document. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
      >
        <XMarkIcon className="w-6 h-6" />
      </button>

      <h2 className="text-xl font-semibold mb-4">Upload Document</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
            accept=".txt,.pdf,.doc,.docx,.md"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer text-blue-600 hover:text-blue-700"
          >
            <ArrowUpTrayIcon className="w-8 h-8 mx-auto mb-2" />
            <p className="text-sm text-gray-600">
              {file ? file.name : 'Click to choose a file or drag it here'}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Supported formats: .txt, .pdf, .doc, .docx, .md
            </p>
          </label>
        </div>

        {message && (
          <div className={`p-3 rounded-lg text-center ${
            message.includes('successfully') 
              ? 'bg-green-100 text-green-700' 
              : 'bg-red-100 text-red-700'
          }`}>
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={!file || isLoading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 
                    disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
        >
          <ArrowUpTrayIcon className="w-5 h-5" />
          {isLoading ? 'Uploading...' : 'Upload Document'}
        </button>
      </form>
    </div>
  );
}