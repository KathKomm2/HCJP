import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="text-center py-8">
      <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
        <AlertCircle className="h-8 w-8 text-red-600" />
      </div>
      
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Submission Failed
      </h2>
      
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        {message}
      </p>

      <button
        onClick={onRetry}
        className="bg-red-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center mx-auto"
      >
        <RefreshCw className="h-5 w-5 mr-2" />
        Try Again
      </button>
    </div>
  );
}