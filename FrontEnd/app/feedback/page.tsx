// app/feedback/page.tsx
'use client';
import React, { useEffect, useState } from 'react';
import axiosInstance from '@/services/api';
import { ToastContainer, toast } from "react-toastify";
export default function Page() {
  const questions = [
    "How satisfied are you with the overall quality of our 3D frames?",
    "Was the customization process easy to follow?",
    "How was your experience with the delivery timeline?",
    "Did the final product meet your expectations?",
    "Do you have any suggestions to improve our service?"
  ];

  const [responses, setResponses] = useState<Record<string, string>>({});
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<number | null>(null);
  const [currentAnswer, setCurrentAnswer] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleSelect = (index: number) => {
    setSelectedQuestionIndex(index);
    const selectedQuestion = questions[index];
    setCurrentAnswer(responses[selectedQuestion] || '');
  };

  const handleSaveAnswer = () => {
    if (selectedQuestionIndex === null) return;
    const question = questions[selectedQuestionIndex];
    if (!currentAnswer.trim()) return;
    setResponses((prev) => ({ ...prev, [question]: currentAnswer.trim() }));
    setSelectedQuestionIndex(null);
    setCurrentAnswer('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (Object.keys(responses).length === 0) {
      alert('Please answer at least one question before submitting.');
      return;
    }

    try {
      const res=await axiosInstance.post('/api/feedback', { responses });
      setSuccess(true);
      toast.success(res.data.message || "Thank you! Feedback submitted.");
      setResponses({});

      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Error:', err);
      alert('Submission failed. Try again.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white/90 p-8 rounded-xl shadow-2xl max-w-md w-full text-center">
          <p className="text-xl text-red-600 font-semibold">Please sign in to provide feedback.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-2">
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="bg-white/90 backdrop-blur-sm  sm:p-10 max-w-4xl w-full rounded-2xl shadow-2xl border border-white/20">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
            We'd love your feedback!
          </h1>
          <p className="text-gray-600 max-w-lg mx-auto">
            Help us improve by sharing your thoughts about your Tiny Treasure experience
          </p>
        </div>

        {/* Question Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12">
          {questions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              className={`px-4 py-3 rounded-lg transition-all duration-200 ${
                responses[q]
                  ? 'bg-green-100/80 border-2 border-green-300 text-green-800'
                  : 'bg-white border-2 border-gray-200 hover:border-red-300 text-gray-700 hover:bg-red-50'
              } shadow-sm text-left`}
            >
              <span className="font-medium text-red-600">Q{idx + 1}:</span> {q.split('?')[0]}?
            </button>
          ))}
        </div>

        {/* Text Area for Selected Question */}
        {selectedQuestionIndex !== null && (
          <div className="bg-white border-2 border-gray-200 p-6 rounded-xl mb-8 shadow-inner">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              {questions[selectedQuestionIndex]}
            </h2>
            <textarea
              className="w-full p-4 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-red-500 focus:border-transparent"
              rows={4}
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              placeholder="Type your answer here..."
              required
            />
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setSelectedQuestionIndex(null)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveAnswer}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition shadow-md"
              >
                Save Answer
              </button>
            </div>
          </div>
        )}

        {/* Submit Button */}
        {Object.keys(responses).length > 0 && (
          <div className="flex flex-col items-center">
            <form onSubmit={handleSubmit} className="w-full sm:w-auto">
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 rounded-lg bg-gradient-to-r from-red-600 to-pink-600 text-white hover:from-red-700 hover:to-pink-700 transition shadow-lg font-medium"
              >
                Submit Feedback ({Object.keys(responses).length}/{questions.length})
              </button>
            </form>
            {success && (
              <div className="mt-4 px-4 py-2 bg-green-100 text-green-800 rounded-lg animate-fade-in">
                Thank you! Your feedback has been submitted successfully.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}


