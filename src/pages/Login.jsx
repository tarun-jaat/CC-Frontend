import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiPhone, FiMail, FiCheckCircle, FiLock } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/userSlice'; // Import the action from your slice

const Login = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showOTPSentModal, setShowOTPSentModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [deviceInfo, setDeviceInfo] = useState({});

  useEffect(() => {
    const getDeviceInfo = () => {
      const userAgent = navigator.userAgent;
      const browserName = navigator.appName;
      const platform = navigator.platform;
      setDeviceInfo({ userAgent, browserName, platform });
    };

    getDeviceInfo();
  }, []);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSendOTP = async () => {
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('https://api.corporatecruise.in/api/users/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to send OTP');
      
      setStep(2);
      setShowOTPSentModal(true);
      setError('');

      // Websocket connection for delivery confirmation
      const ws = new WebSocket(import.meta.env.VITE_WS_URL || 'ws://localhost:5001');
      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.type === 'email-delivered') {
          setError('OTP delivered! Check your inbox 📬');
        }
      };

    } catch (err) {
      setError(err.message);
      setStep(1);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      setError('Please enter a 6-digit OTP');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('https://api.corporatecruise.in/api/users/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Invalid OTP');
      dispatch(setUser({ user: data.userData, token: data.token }));
      navigate(`/dashboard/${data.userData.name}?${JSON.stringify(deviceInfo)}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   if (step === 2) {
  //     const ws = new WebSocket(import.meta.env.VITE_WS_URL || 'ws://localhost:5001');
  //     return () => ws.close();
  //   }
  // }, [step]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4"
    >
      <div className="bg-white/90 backdrop-blur-lg p-8 rounded-3xl shadow-2xl w-full max-w-md relative overflow-hidden border border-blue-100">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-white/50" />
        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center flex items-center justify-center gap-2">
            {/* <FiPhone className="text-blue-600" /> */}
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Corporate Cruise
            </span>
          </h2>

          {error && (
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg border border-red-100 flex items-center gap-2"
            >
              <FiLock className="flex-shrink-0" />
              {error}
            </motion.div>
          )}

          {step === 1 ? (
            <div className="space-y-6">
              <div className="relative group">
                <p>                Enter your email address to login. We will send a one-time code to your email.
                </p>
                <div className="absolute inset-0.5 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl blur opacity-30 group-hover:opacity-50 transition"></div>
                <div className="relative mt-2">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 z-10" />
                  <input
                    type="email"
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all bg-white/50 backdrop-blur-sm"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <button
                onClick={handleSendOTP}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-80 disabled:hover:shadow-lg relative overflow-hidden"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white rounded-full animate-spin border-t-transparent" />
                    Sending Secure Code...
                  </div>
                ) : (
                  <>
                    <span className="relative z-10">Get Access Code →</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
                  </>
                )}
              </button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="relative group">
                <div className="absolute inset-0.5 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl blur opacity-30 group-hover:opacity-50 transition"></div>
                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 z-10" />
                  <input
                    type="number"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all bg-white/50 backdrop-blur-sm"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.slice(0, 6))}
                  />
                </div>
              </div>

              <button
                onClick={handleVerifyOTP}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-80 relative overflow-hidden"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white rounded-full animate-spin border-t-transparent" />
                    Verifying...
                  </div>
                ) : (
                  <>
                    <span className="relative z-10">Unlock Dashboard →</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
                  </>
                )}
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {showOTPSentModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-8 max-w-md text-center border border-blue-100"
          >
            <FiCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4 animate-tick" />
            <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              OTP On Its Way!
            </h3>
            <p className="text-gray-600 mb-4">
              We've sent your secure access code to<br />
              <span className="font-semibold text-blue-600">{email}</span>
            </p>
            <button
              onClick={() => setShowOTPSentModal(false)}
              className="bg-blue-100 hover:bg-blue-200 text-blue-600 px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Got It!
            </button>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default Login;