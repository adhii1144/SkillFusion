import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowRight, Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import AuthLayout from '../components/AuthLayout';
import Input from '../components/Input';
import Button from '../components/Button';
import axios from 'axios';

type Step = 'email' | 'otp' | 'newPassword';

const ForgotPassword = () => {
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`http://localhost:8080/skill-fusion/forgotPassword/verifyEmail/${email}`);
      toast.success('OTP sent to your email. Please check your inbox.');
      setStep('otp');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to send OTP. Please try again.');
      console.error('Error sending OTP:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`http://localhost:8080/skill-fusion/forgotPassword/verify/${otp}/${email}`);
      toast.success('OTP verified successfully.');
      setStep('newPassword');
    } catch (error: any) {
      const errorMessage = error.response?.data || 'Invalid OTP. Please try again.';
      if (errorMessage === 'OTP expired.') {
        toast.error('Your OTP has expired. Please request a new one.');
      } else {
        toast.error(errorMessage);
      }
      console.error('Error verifying OTP:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== repeatPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(`http://localhost:8080/skill-fusion/forgotPassword/changePassword/${email}`, {
        Password: newPassword,
        repeatPassword,
      });
      toast.success('Password successfully updated. Redirecting to login...');
      setTimeout(() => {
        window.location.href = '/login';
      }, 1500); // Redirect after 1.5 seconds
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update password. Please try again.');
      console.error('Error updating password:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 'email':
        return (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onSubmit={handleEmailSubmit}
            className="space-y-6"
          >
            <Input
              label="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              icon={<Mail className="w-5 h-5 text-gray-400" />}
            />
            <Button type="submit" isLoading={isLoading}>
              Send Reset Instructions
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.form>
        );

      case 'otp':
        return (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onSubmit={handleOTPVerification}
            className="space-y-6"
          >
            <Input
              label="OTP"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              icon={<Mail className="w-5 h-5 text-gray-400" />}
            />
            <Button type="submit" isLoading={isLoading}>
              Verify OTP
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.form>
        );

      case 'newPassword':
        return (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onSubmit={handlePasswordUpdate}
            className="space-y-6"
          >
            <Input
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              icon={<Lock className="w-5 h-5 text-gray-400" />}
            />
            <Input
              label="Confirm New Password"
              type="password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              required
              icon={<Lock className="w-5 h-5 text-gray-400" />}
            />
            <Button type="submit" isLoading={isLoading}>
              Update Password
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.form>
        );
    }
  };

  return (
    <AuthLayout
      title={step === 'email' ? 'Reset Password' : step === 'otp' ? 'Verify OTP' : 'Create New Password'}
      subtitle={
        step === 'email'
          ? 'Enter your email to receive password reset instructions.'
          : step === 'otp'
          ? 'Enter the verification code sent to your email.'
          : 'Enter your new password.'
      }
    >
      <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
    </AuthLayout>
  );
};

export default ForgotPassword;
