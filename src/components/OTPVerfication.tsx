import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import Button from './Button';

interface OTPVerificationProps {
  email: string;
  onVerificationComplete: () => void;
  onResendOTP: () => void;
}

const OTPVerification = ({ email, onVerificationComplete, onResendOTP }: OTPVerificationProps) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Move to next input
    if (element.value && index < 5) {
      const nextInput = element.nextElementSibling as HTMLInputElement;
      if (nextInput) nextInput.focus();
    }

    // Check if OTP is complete
    if (newOtp.every(digit => digit !== '')) {
      verifyOTP(newOtp.join(''));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);

      // Move to previous input
      if (index > 0) {
        const prevInput = e.currentTarget.previousElementSibling as HTMLInputElement;
        if (prevInput) prevInput.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split('').forEach((digit, index) => {
      if (index < 6) newOtp[index] = digit;
    });
    setOtp(newOtp);
  };

  const verifyOTP = async (otpString: string) => {
    try {
      // Here you would typically make an API call to verify the OTP
      // For demo purposes, we'll simulate a successful verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Email verified successfully!');
      onVerificationComplete();
    } catch (error) {
      toast.error('Invalid OTP. Please try again.');
      setOtp(['', '', '', '', '', '']);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    try {
      await onResendOTP();
      setTimeLeft(30);
      toast.success('New OTP sent successfully!');
    } catch (error) {
      toast.error('Failed to resend OTP');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Verify your email</h2>
        <p className="mt-2 text-gray-600">
          We've sent a verification code to {email}
        </p>
      </div>

      <div className="flex justify-center gap-2">
        {otp.map((digit, index) => (
          <motion.input
            key={index}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e.target, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            className="w-12 h-12 text-center text-2xl font-bold border-2 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
            whileFocus={{ scale: 1.1 }}
          />
        ))}
      </div>

      <div className="text-center space-y-4">
        {timeLeft > 0 ? (
          <p className="text-sm text-gray-600">
            Resend code in {timeLeft} seconds
          </p>
        ) : (
          <Button
            onClick={handleResend}
            variant="secondary"
            isLoading={isResending}
          >
            Resend verification code
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default OTPVerification;