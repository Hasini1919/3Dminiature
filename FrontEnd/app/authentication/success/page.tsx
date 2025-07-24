'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function AuthSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const callbackUrl = searchParams.get("callbackUrl"); // ✅ get callbackUrl from URL

  useEffect(() => {
    const token = searchParams.get('token');

    if (token) {
      // Save token to localStorage (for user session)
      localStorage.setItem('token', token);

      // Redirect to shop page after login success
      router.push(callbackUrl || "/home");
    } else {
      // If token is missing, redirect to home
      router.push('/home');
    }
  }, [searchParams, router]);

  return <p>Login successful... Redirecting...</p>;
}
