"use client";

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const NewPasswordPage = () => {
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleVerifyCode = async () => {
    try {
      const response = await axios.post('/api/verify-code', { code });
      setSuccess('Code verified. Please enter a new password.');
    } catch (err) {
      setError('Invalid or expired code.');
    }
  };

  const handleResetPassword = async () => {
    try {
      const response = await axios.post('/api/reset-password', { code, password });
      setSuccess('Password updated successfully.');
      router.push('/authentication/login'); // Redirect to login page after success
    } catch (err) {
      setError('Failed to reset password. Please try again.');
    }
  };

  return (
    <div>
      <h1>Reset Password</h1>
      <div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}

        <div>
          <label>Reset Code</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter the reset code"
          />
          <button onClick={handleVerifyCode}>Verify Code</button>
        </div>

        <div>
          <label>New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
          />
          <button onClick={handleResetPassword}>Reset Password</button>
        </div>
      </div>
    </div>
  );
};

export default NewPasswordPage;
