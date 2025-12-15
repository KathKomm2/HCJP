import React, { useState, useEffect } from 'react';
import JournalForm from './components/JournalForm';
import SuccessMessage from './components/SuccessMessage';
import ErrorMessage from './components/ErrorMessage';
import { submitToNetlify, isNetlifyEnvironment } from './services/netlify';

interface JournalEntry {
  name: string;
  email: string;
  date: string;
  title: string;
  content: string;
  attachment?: File | null;
}

type AppState = 'form' | 'success' | 'error';

function App() {
  const [appState, setAppState] = useState<AppState>('form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (entry: JournalEntry) => {
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      await submitToNetlify(entry);
      setAppState('success');
    } catch (error) {
      console.error('Submission error:', error);
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred');
      setAppState('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWriteAnother = () => {
    setAppState('form');
    setErrorMessage('');
  };

  const handleRetry = () => {
    setAppState('form');
    setErrorMessage('');
  };
 return (
    <div className="min-h-screen bg-gradient-to-br from-yale-blue to-blue-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-blue-200 rounded-2xl shadow-lg p-8">
            {/* Main Content */}
            {appState === 'form' && (
              <JournalForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
            )}

            {appState === 'success' && (
              <SuccessMessage onWriteAnother={handleWriteAnother} />
            )}

            {appState === 'error' && (
              <ErrorMessage message={errorMessage} onRetry={handleRetry} />
            )}
          </div>

          {/* Footer */}
        <div className="text-center mt-8 text-white text-sm space-y-2">
          <div className="flex items-center justify-center space-x-2 text-xs opacity-80">
            <span>Version 1</span>
            <span>•</span>
            <span>{new Date().toLocaleDateString()}</span>
            <span>•</span>
            <span>CC BY License</span>
          </div>
          <p>
            A Project of the{' '}
            <a
                href="https://center-humanities-communication.org/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-200 hover:text-white underline transition-colors duration-200"
              >
                Center for Humanities Communication
              </a>
          </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;