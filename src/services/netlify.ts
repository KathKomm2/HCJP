// Netlify Forms submission service

interface JournalEntry {
  name: string;
  email: string;
  date: string;
  title: string;
  content: string;
  attachment?: File | null;
}

export const submitToNetlify = async (entry: JournalEntry): Promise<void> => {
  const formData = new FormData();
  
  // Add all form fields
  formData.append('form-name', 'journal-entries');
  formData.append('name', entry.name);
  formData.append('email', entry.email);
  formData.append('date', entry.date);
  formData.append('title', entry.title);
  formData.append('content', entry.content);
  formData.append('submitted-at', new Date().toISOString());

  // Add attachment if present
  if (entry.attachment) {
    formData.append('attachment', entry.attachment);
  }

  const response = await fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(formData as any).toString()
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => 'Unknown error');
    throw new Error(`Failed to submit form: ${response.status} ${response.statusText}. ${errorText}`);
  }
};

// Function to test if we're running on Netlify
export const isNetlifyEnvironment = (): boolean => {
  return typeof window !== 'undefined' && 
         (window.location.hostname.includes('netlify.app') || 
          window.location.hostname.includes('netlify.com') ||
          // For local development, we'll assume it's configured
          window.location.hostname === 'localhost');
};