import React, { useState, useEffect, useRef, lazy } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUser, FiPhone, FiMapPin, FiInfo, FiClock, FiDollarSign, FiSmile } from 'react-icons/fi';
import animation from '../assets/referalAnimation2.mp4';
import { GoogleMap, useJsApiLoader, StandaloneSearchBox } from '@react-google-maps/api'
import {toast} from 'react-hot-toast';

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
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      toast.success('Registration successful! You can now login.');
      navigate('/dashboard', { state: { 
        referralId: data.referralId, 
        userName: formData.name,
        referralCount: data.referralCount 
      }});
    } catch (err) {
      setError(err.message.replace('Error: ', ''));
      toast.error(err.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 py-12 px-4 mt-10 sm:px-6 lg:px-8 flex items-center justify-center"
    >
      <div className="w-full max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col-reverse md:flex-row">
        {/* Left Section */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="md:w-3/5 bg-gradient-to-br from-indigo-600 to-blue-500 p-12 text-white"
        >
          <div className="mb-8">
            <h2 className="text-4xl font-bold mb-4">Join 10,000+ Commuters Enjoying Stress-Free Rides</h2>
            <p className="text-lg opacity-90">Your daily commute, reimagined with comfort and reliability</p>
          </div>

          <div className="space-y-8 mb-12">
            <motion.div 
              whileHover={{ x: 10 }}
              className="flex items-center gap-6"
            >
              <div className="p-4 bg-white/10 rounded-xl">
                <FiClock className="w-8 h-8 text-blue-200" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Guaranteed On-Time Pickups</h3>
                <p className="opacity-90">Never worry about late arrivals with our 99.9% punctuality rate</p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ x: 10 }}
              className="flex items-center gap-6"
            >
              <div className="p-4 bg-white/10 rounded-xl">
                <FiDollarSign className="w-8 h-8 text-blue-200" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Fixed Monthly Pricing</h3>
                <p className="opacity-90">No surge pricing - know exactly what you'll pay each month</p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ x: 10 }}
              className="flex items-center gap-6"
            >
              <div className="p-4 bg-white/10 rounded-xl">
                <FiSmile className="w-8 h-8 text-blue-200" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Premium Comfort</h3>
                <p className="opacity-90">AC vehicles with dedicated seating and professional drivers</p>
              </div>
            </motion.div>
          </div>

          <div className="relative md:h-96 h-auto rounded-2xl overflow-hidden shadow-xl bg-white pb-1 md:m-0 -m-10">
            <video
              className="w-full md:h-full object-cover object-center "
              autoPlay
              loop
              muted
              controls={false}
              loading="lazy"
              playsInline
              poster="https://corporatecruise.in/placeholder-video.jpg"
            >
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

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Full Name"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiPhone className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  required
                  pattern="[0-9]{10}"
                  placeholder="Mobile Number"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email Address"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              {/* Keep the Google Maps components the same, just update styling */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
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
                      placeholder="Home/Office Pickup"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                      value={formData.pickupLocation}
                      onChange={(e) => setFormData({...formData, pickupLocation: e.target.value})}
                    />
                  </StandaloneSearchBox>
                )}
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
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
                      placeholder="Workplace Drop-off"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                      value={formData.dropLocation}
                      onChange={(e) => setFormData({...formData, dropLocation: e.target.value})}
                    />
                  </StandaloneSearchBox>
                )}
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="referralId"
                  placeholder="Friend's Referral Code (Optional)"
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
              className="w-full bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
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