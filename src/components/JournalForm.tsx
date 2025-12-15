import React, { useState } from 'react';
import { BookOpen, Send, User, Mail, Calendar, CheckCircle, AlertCircle, Upload, X } from 'lucide-react';

interface JournalEntry {
  name: string;
  email: string;
  date: string;
  title: string;
  content: string;
  attachment?: File | null;
}

interface JournalFormProps {
  onSubmit: (entry: JournalEntry) => Promise<void>;
  isSubmitting: boolean;
}

export default function JournalForm({ onSubmit, isSubmitting }: JournalFormProps) {
  const [entry, setEntry] = useState<JournalEntry>({
    name: '',
    email: '',
    date: new Date().toISOString().split('T')[0],
    title: '',
    content: '',
    attachment: null
  });

  const [errors, setErrors] = useState<Partial<JournalEntry>>({});
  const [dragActive, setDragActive] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<JournalEntry> = {};

    if (!entry.name.trim()) newErrors.name = 'Name is required';
    if (!entry.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(entry.email)) newErrors.email = 'Email is invalid';
    if (!entry.title.trim()) newErrors.title = 'Title is required';
    if (!entry.content.trim()) newErrors.content = 'Journal content is required';
    if (entry.content.length < 10) newErrors.content = 'Please write at least 10 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      await onSubmit(entry);
      // Reset form on successful submission
      setEntry({
        name: '',
        email: '',
        date: new Date().toISOString().split('T')[0],
        title: '',
        content: '',
        attachment: null
      });
      setErrors({});
    } catch (error) {
      console.error('Submission failed:', error);
    }
  };

  const handleInputChange = (field: keyof JournalEntry, value: string) => {
    setEntry(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleFileChange = (file: File | null) => {
    setEntry(prev => ({ ...prev, attachment: file }));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const removeAttachment = () => {
    handleFileChange(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img 
            src="https://center-humanities-communication.org/wp-content/uploads/Center-for-Humanities-Wordmark-1-White-1024x285.png" 
            alt="Center for Humanities Communication" 
            className="h-16 w-auto opacity-95"
          />
        </div>
        
        {/* Header Image */}
        <div className="mb-6 rounded-xl overflow-hidden shadow-lg">
          <img 
            src="https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=800&h=300&fit=crop" 
            alt="Peaceful lake with soft morning light"
            className="w-full h-48 object-cover"
          />
        </div>
        
        <div className="flex items-center justify-center mb-4">
          <BookOpen className="h-8 w-8 text-emerald-600 mr-2" />
          <h1 className="text-3xl font-bold text-gray-800 whitespace-nowrap">Humanities Communication Journaling Project</h1>
        </div>
        <p className="text-gray-600">Capture your thoughts, reflections, and experiences</p>
      </div>

      {/* Personal Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <User className="h-4 w-4 mr-2 text-emerald-600" />
            Name
          </label>
          <input
            type="text"
            value={entry.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 ${
              errors.name ? 'border-red-400 bg-red-50' : 'border-gray-300 hover:border-emerald-400'
            }`}
            placeholder="Your full name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Mail className="h-4 w-4 mr-2 text-emerald-600" />
            Email
          </label>
          <input
            type="email"
            value={entry.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 ${
              errors.email ? 'border-red-400 bg-red-50' : 'border-gray-300 hover:border-emerald-400'
            }`}
            placeholder="your.email@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.email}
            </p>
          )}
        </div>
      </div>

      {/* Date */}
      <div>
        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
          <Calendar className="h-4 w-4 mr-2 text-emerald-600" />
          Date
        </label>
        <input
          type="date"
          value={entry.date}
          onChange={(e) => handleInputChange('date', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent hover:border-emerald-400 transition-all duration-200"
        />
      </div>

      {/* Journal Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Entry Title
        </label>
        <input
          type="text"
          value={entry.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 ${
            errors.title ? 'border-red-400 bg-red-50' : 'border-gray-300 hover:border-emerald-400'
          }`}
          placeholder="What's on your mind today?"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <AlertCircle className="h-4 w-4 mr-1" />
            {errors.title}
          </p>
        )}
      </div>

      {/* Journal Content */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Journal Entry
        </label>
        <textarea
          value={entry.content}
          onChange={(e) => handleInputChange('content', e.target.value)}
          rows={8}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 resize-y ${
            errors.content ? 'border-red-400 bg-red-50' : 'border-gray-300 hover:border-emerald-400'
          }`}
          placeholder="Share your thoughts, experiences, and reflections here..."
        />
        {errors.content && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <AlertCircle className="h-4 w-4 mr-1" />
            {errors.content}
          </p>
        )}
        <p className="mt-2 text-sm text-gray-500">
          {entry.content.length} characters
        </p>
      </div>

      {/* Attachment Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Attachment (Optional)
        </label>
        <div
          className={`relative border-2 border-dashed rounded-lg p-6 transition-all duration-200 ${
            dragActive
              ? 'border-emerald-400 bg-emerald-50'
              : 'border-gray-300 hover:border-emerald-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {entry.attachment ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Upload className="h-5 w-5 text-emerald-600 mr-2" />
                <span className="text-sm text-gray-700">{entry.attachment.name}</span>
                <span className="text-xs text-gray-500 ml-2">
                  ({(entry.attachment.size / 1024 / 1024).toFixed(2)} MB)
                </span>
              </div>
              <button
                type="button"
                onClick={removeAttachment}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <div className="text-center">
              <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
              <div className="text-sm text-gray-600">
                <label htmlFor="file-upload" className="cursor-pointer">
                  <span className="text-emerald-600 hover:text-emerald-700 font-medium">
                    Click to upload
                  </span>
                  <span> or drag and drop</span>
                </label>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                  accept="image/*,.pdf,.doc,.docx,.txt"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                PNG, JPG, PDF, DOC up to 10MB
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 px-6 rounded-lg font-medium hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
      >
        {isSubmitting ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Submitting...
          </>
        ) : (
          <>
            <Send className="h-5 w-5 mr-2" />
            Submit Journal Entry
          </>
        )}
      </button>
    </form>
  );
}