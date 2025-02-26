import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUser, FiPhone, FiMapPin, FiCheckCircle } from 'react-icons/fi';
import Lottie from 'lottie-react';
import animationData from '../assets/data.json';
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
      className="min-h-screen h-auto gradient py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center"
    >
      <div className="w-full h-auto md:max-w-[80%] mx-auto overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-50  rounded-2xl mt-10 flex items-center justify-center md:flex-row flex-col-reverse">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="p-4 md:space-y-8 bg-gradient-to-br from-blue-100 to-indigo-50 md:w-[60%] text-center lg:text-left"
        >
          <div className="relative h-96  w-full flex items-center justify-center">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full max-w-lg"
            >
              <video className="h-80 border-none w-full aspect-square object-cover" autoPlay loop muted>
                <source src={animation} type="video/mp4" />
              </video>
            </motion.div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Why Join Corporate Cruise?
            </h2>
            <ul className="space-y-3 text-gray-600 text-lg">
              <li className="flex items-center gap-2">
                <FiCheckCircle className="text-green-500" />
                <span>Guaranteed on-time pickups</span>
              </li>
              <li className="flex items-center gap-2">
                <FiCheckCircle className="text-green-500" />
                <span>Fixed monthly pricing</span>
              </li>
              <li className="flex items-center gap-2">
                <FiCheckCircle className="text-green-500" />
                <span>24/7 customer support</span>
              </li>
              <li className="flex items-center gap-2">
                <FiCheckCircle className="text-green-500" />
                <span>Earn free rides with referrals</span>
              </li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white md:w-[40%]  h-full p-4 md:p-8 space-y-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Create Your Passenger Account
          </h2>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Full Name"
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:border-primary focus:ring-primary"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="relative">
                <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  required
                  pattern="[0-9]{10}"
                  placeholder="Phone Number"
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:border-primary focus:ring-primary"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>

              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email Address"
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:border-primary focus:ring-primary"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div className="relative">
                <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                {isLoaded && (
                  <StandaloneSearchBox
                    onLoad={onLoadPickup}
                    onPlacesChanged={() => handlePlaceChanged(pickupSearchBox, 'pickupLocation')}
                  >
                    <input
                      type="text"
                      name="pickupLocation"
                      required
                      placeholder="Primary Pickup Location"
                      className="w-full pl-10 pr-4 py-3 border rounded-lg focus:border-primary focus:ring-primary"
                      value={formData.pickupLocation}
                      onChange={(e) => setFormData({...formData, pickupLocation: e.target.value})}
                    />
                  </StandaloneSearchBox>
                )}
              </div>

              <div className="relative">
                <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                {isLoaded && (
                  <StandaloneSearchBox
                    onLoad={onLoadDrop}
                    onPlacesChanged={() => handlePlaceChanged(dropSearchBox, 'dropLocation')}
                  >
                    <input
                      type="text"
                      name="dropLocation"
                      required
                      placeholder="Primary Drop Location"
                      className="w-full pl-10 pr-4 py-3 border rounded-lg focus:border-primary focus:ring-primary"
                      value={formData.dropLocation}
                      onChange={(e) => setFormData({...formData, dropLocation: e.target.value})}
                    />
                  </StandaloneSearchBox>
                )}
              </div>

              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="referralId"
                  placeholder="Referral ID (optional)"
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:border-primary focus:ring-primary"
                  value={formData.referralId}
                  onChange={(e) => setFormData({...formData, referralId: e.target.value})}
                />
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-primary text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Create Account
            </motion.button>
            <p className="text-yellow-500 p-2 rounded-md bg-yellow-100 text-sm">
            ⚠️Currently we are providing services in Delhi NCR only.
              We are expanding our services to other cities soon.
            </p>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Signup;