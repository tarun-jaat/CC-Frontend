import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { FiUser, FiPhone, FiMapPin, FiInfo, FiClock, FiDollarSign, FiSmile, FiMail, FiShield, FiAward } from 'react-icons/fi';
// import animation from '../assets/referalAnimation2.mp4';
import { useJsApiLoader, StandaloneSearchBox } from '@react-google-maps/api'
import {toast} from 'react-hot-toast';
import animation from '../assets/final.mp4';
// import Lottie from 'lottie-react';

const libraries = ['places'];

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    referralId: '',
    pickupLocation: '',
    dropLocation: ''
  });
  const [pickupSearchBox, setPickupSearchBox] = useState(null);
  const [dropSearchBox, setDropSearchBox] = useState(null);
  const [error, setError] = useState({});
  const [counter, setCounter] = useState(0);
  const fullCountRef = useRef(null);
  const isInView = useInView(fullCountRef, { once: false, amount: 0.5 });
  
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  
  // Counter animation effect
  useEffect(() => {
    let intervalId;
    if (isInView && counter < 2100) {
      intervalId = setInterval(() => {
        setCounter(prev => {
          const increment = Math.floor((2100 - prev) / 10) + 1;
          const newValue = prev + increment;
          return newValue >= 2100 ? 2100 : newValue;
        });
      }, 30);
    }
    
    return () => clearInterval(intervalId);
  }, [counter, isInView]);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY ,
    libraries // use the static libraries array
  })

  const handlePlaceChanged = (searchBox, field) => {
    const places = searchBox.getPlaces();
    if (places.length === 0) return;

    const place = places[0];
    // const location = place.geometry.location;
    // const bounds = new window.google.maps.LatLngBounds(
    //   new window.google.maps.LatLng(28.412593, 76.838064), 
    //   new window.google.maps.LatLng(28.881338, 77.321785) 
    // );

    // if (!bounds.contains(location)) {
    //   setError('Selected location must be within the Delhi NCR area.');
    //   return;
    // }

    setFormData(prev => ({ ...prev, [field]: place.formatted_address }));
  };

  const onLoadPickup = ref => setPickupSearchBox(ref);
  const onLoadDrop = ref => setDropSearchBox(ref);

  useEffect(() => {
    const ref = searchParams.get('ref');
    if (ref) setFormData(prev => ({ ...prev, referralId: ref }));
  }, [searchParams]);

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!formData.name.trim() || formData.name.trim().split(' ').length < 2) {
      errors.name = 'Please enter your full name (first and last name)';
    }
    if (!phoneRegex.test(formData.phone)) {
      errors.phone = 'Please enter a valid 10-digit phone number';
    }
    if (!emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formData.pickupLocation.trim()) {
      errors.pickupLocation = 'Please select a pickup location';
    }
    if (!formData.dropLocation.trim()) {
      errors.dropLocation = 'Please select a drop location';
    }

    setError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      const response = await fetch('https://api.corporatecruise.in/api/users/signup', {
      
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          pickupLocation: formData.pickupLocation,
          dropLocation: formData.dropLocation,
          referralId: formData.referralId
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || `Registration failed: ${data.message}` || 'Unknown error');
      }
      toast.success('Registration successful! Please login to continue.');
      navigate('/login',{
        state: {
          prefilledEmail: formData.email
        }
      });
    } catch (err) {
      setError(prev => ({ ...prev, form: err.message.replace('Error: ', '') }));
      toast.error(err.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 py-12 px-4 mt-10 sm:px-6 lg:px-8 flex items-center justify-center"
    >
      <div className="w-full max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Section */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="md:w-3/5 bg-[#1791c8] p-12 text-white"
          ref={fullCountRef}
        >
          <div className="mb-8">
            <h2 className="text-4xl font-bold mb-4 md:text-5xl">
              <span className="inline-block">Join </span>
              <motion.span 
                className="inline-block font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-black to-blue-600 px-3 py-1 text-[2.5rem] md:text-[3rem]"
                initial={{ scale: 1 }}
                animate={{ scale: isInView ? [1, 1.1, 1] : 1 }}
                transition={{ duration: 0.5, repeat: isInView ? Infinity : 0, repeatDelay: 3 }}
              >
                {counter.toLocaleString()}+
              </motion.span>
              <span className="inline-block"> Commuters</span>
            </h2>
            <h3 className="text-3xl font-bold mb-4 min-h-[40px] relative overflow-hidden">
              <p className="text-xl opacity-90 md:text-2xl ">"Say Goodbye to Chaotic & Expensive Commutes"</p>
            </h3>
          </div>
          

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <motion.div 
              whileHover={{ scale: 1.03 }}
              className="flex items-start gap-4 bg-white/10 p-5 rounded-xl transition-all duration-300 h-full border border-white/20"
            >
              <div className="p-3 bg-white/20 rounded-lg shrink-0">
                <FiClock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1 text-white">On-Time, Every Time</h3>
                <p className="text-blue-100 font-medium text-sm">Never worry about being late to work again</p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03 }}
              className="flex items-start gap-4 bg-white/10 p-5 rounded-xl transition-all duration-300 h-full border border-white/20"
            >
              <div className="p-3 bg-white/20 rounded-lg shrink-0">
                <FiDollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1 text-white">Zero Surge Pricing</h3>
                <p className="text-blue-100 font-medium text-sm">One predictable monthly fee, save up to 40%</p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03 }}
              className="flex items-start gap-4 bg-white/10 p-5 rounded-xl transition-all duration-300 h-full border border-white/20"
            >
              <div className="p-3 bg-white/20 rounded-lg shrink-0">
                <FiSmile className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1 text-white">Business-Class Comfort</h3>
                <p className="text-blue-100 font-medium text-sm">Guaranteed seating in premium vehicles</p>
              </div>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="flex items-start gap-4 bg-white/10 p-5 rounded-xl transition-all duration-300 h-full border border-white/20"
            >
              <div className="p-3 bg-white/20 rounded-lg shrink-0">
                <FiShield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1 text-white">Safety First & Always</h3>
                <p className="text-blue-100 font-medium text-sm">Vetted drivers with live journey tracking</p>
              </div>
            </motion.div>
          </div>

          <div className="relative md:h-96 h-48 rounded-2xl overflow-hidden shadow-xl bg-white pb-1 md:m-0 mx-0">
            {/* <video
              className="w-full h-full object-cover object-center"
              autoPlay
              loop
              muted
              controls={false}
              loading="lazy"
              poster="https://corporatecruise.in/placeholder-video.jpg"
            >
              <source src={animation} type="video/mp4" />
              Your browser does not support the video tag.
            </video> */}
            {/* <Lottie animationData={animation} loop={true} className="w-full h-full scale-105"/> */}
            <video className="h-full scale-105 w-full" autoPlay loop muted playsInline controls={false}>
              <source src={animation} type="video/mp4" />
            </video>
          </div>
        </motion.div>

        {/* Right Section - Form */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="md:w-2/5 p-12"
        >
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Start Your Premium Commute</h1>
            <p className="text-gray-500">Create account in 30 seconds</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute top-0 left-0 pl-3 h-full flex items-start pt-4 pointer-events-none">
                  <FiUser className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Full Name"
                  className={`w-full pl-10 pr-4 py-3 border ${
                    error.name ? 'border-red-500' : 'border-gray-200'
                  } rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all`}
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({...formData, name: e.target.value});
                    setError(prev => ({ ...prev, name: '' }));
                  }}
                />
                {error.name && (
                  <p className="text-red-500 text-sm mt-1 ml-2">{error.name}</p>
                )}
              </div>

              <div className="relative">
                <div className="absolute top-0 left-0 pl-3 h-full flex items-start pt-4 pointer-events-none">
                  <FiPhone className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="Mobile Number"
                  className={`w-full pl-10 pr-4 py-3 border ${
                    error.phone ? 'border-red-500' : 'border-gray-200'
                  } rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all`}
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData({...formData, phone: e.target.value});
                    setError(prev => ({ ...prev, phone: '' }));
                  }}
                />
                {error.phone && (
                  <p className="text-red-500 text-sm mt-1 ml-2">{error.phone}</p>
                )}
              </div>

              <div className="relative">
                <div className="absolute top-0 left-0 pl-3 h-full flex items-start pt-4 pointer-events-none">
                  <FiMail className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email Address"
                  className={`w-full pl-10 pr-4 py-3 border ${
                    error.email ? 'border-red-500' : 'border-gray-200'
                  } rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all`}
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({...formData, email: e.target.value});
                    setError(prev => ({ ...prev, email: '' }));
                  }}
                />
                {error.email && (
                  <p className="text-red-500 text-sm mt-1 ml-2">{error.email}</p>
                )}
              </div>

              <div className="relative">
                <div className="absolute top-0 left-0 pl-3 h-full flex items-start pt-4 pointer-events-none">
                  <FiMapPin className="w-5 h-5 text-gray-400" />
                </div>
                {isLoaded && (
                  <StandaloneSearchBox
                    onLoad={onLoadPickup}
                    onPlacesChanged={() => handlePlaceChanged(pickupSearchBox, 'pickupLocation')}
                  >
                    <input
                      type="text"
                      name="pickupLocation"
                      required
                      placeholder="Enter Pickup Location"
                      className={`w-full pl-10 pr-4 py-3 border ${
                        error.pickupLocation ? 'border-red-500' : 'border-gray-200'
                      } rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all`}
                      value={formData.pickupLocation}
                      onChange={(e) => {
                        setFormData({...formData, pickupLocation: e.target.value});
                        setError(prev => ({ ...prev, pickupLocation: '' }));
                      }}
                    />
                  </StandaloneSearchBox>
                )}
                {error.pickupLocation && (
                  <p className="text-red-500 text-sm mt-1 ml-2">{error.pickupLocation}</p>
                )}
              </div>

              <div className="relative">
                <div className="absolute top-0 left-0 pl-3 h-full flex items-start pt-3 pointer-events-none">
                  <FiMapPin className="w-5 h-5 text-gray-400" />
                </div>
                {isLoaded && (
                  <StandaloneSearchBox
                    onLoad={onLoadDrop}
                    onPlacesChanged={() => handlePlaceChanged(dropSearchBox, 'dropLocation')}
                  >
                    <input
                      type="text"
                      name="dropLocation"
                      required
                      placeholder="Enter Drop Location"
                      className={`w-full pl-10 pr-4 py-3 border ${
                        error.dropLocation ? 'border-red-500' : 'border-gray-200'
                      } rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all`}
                      value={formData.dropLocation}
                      onChange={(e) => {
                        setFormData({...formData, dropLocation: e.target.value});
                        setError(prev => ({ ...prev, dropLocation: '' }));
                      }}
                    />
                  </StandaloneSearchBox>
                )}
                {error.dropLocation && (
                  <p className="text-red-500 text-sm mt-1 ml-2">{error.dropLocation}</p>
                )}
              </div>

              <div className="relative">
                <div className="absolute top-0 left-0 pl-3 h-full flex items-start pt-3 pointer-events-none">
                  <FiUser className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="referralId"
                  placeholder="Referral Id (if any)"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  value={formData.referralId}
                  onChange={(e) => setFormData({...formData, referralId: e.target.value})}
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-[#1791c8] text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Get Started →
            </motion.button>

            <div className="mt-6 p-3 bg-yellow-100 rounded-lg flex items-center gap-3">
              <FiInfo className="w-5 h-5 text-yellow-500" />
              <p className="text-sm text-yellow-500">
                Currently serving Delhi NCR region. Expanding to new cities soon!
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Signup;