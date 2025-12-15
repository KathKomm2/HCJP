import React from 'react';
import { CheckCircle, BookOpen } from 'lucide-react';

interface SuccessMessageProps {
  onWriteAnother: () => void;
}

export default function SuccessMessage({ onWriteAnother }: SuccessMessageProps) {
  return (
    <div className="text-center py-12">
      <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-emerald-100 mb-6">
        <CheckCircle className="h-8 w-8 text-emerald-600" />
      </div>
      
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Entry Submitted Successfully!
      </h2>
      
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Thank you for sharing your thoughts. Your journal entry has been saved and will be reviewed shortly.
      </p>

      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-8 max-w-md mx-auto">
        <h3 className="font-medium text-emerald-800 mb-2">What happens next?</h3>
        <ul className="text-sm text-emerald-700 space-y-1 text-left">
          <li>• Your entry is securely stored</li>
          <li>• You'll receive a confirmation email</li>
          <li>• Continue your journaling journey</li>
        </ul>
      </div>

      <button
        onClick={onWriteAnother}
        className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 px-8 rounded-lg font-medium hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center mx-auto"
      >
        <BookOpen className="h-5 w-5 mr-2" />
        Write Another Entry
      </button>
    </div>
  );
}