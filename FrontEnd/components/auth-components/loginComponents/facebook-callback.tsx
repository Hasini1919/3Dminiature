'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { setAuthToken } from '@/utils/auth-utils/api';

export default function FacebookCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuth = async () => {
      try {
        const token = new URLSearchParams(window.location.search).get('token');
        
        if (token) {
          setAuthToken(token);
          router.push('/dashboard');
        } else {
          throw new Error('Authentication failed');
        }
      } catch (error) {
        console.error('Facebook auth error:', error);
        router.push('/login?error=facebook_failed');
      }
    };

    handleAuth();
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Processing Facebook login...</p>
    </div>
  );
}