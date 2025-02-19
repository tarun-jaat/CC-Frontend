import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

const Comparison = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const AUTO_SCROLL_INTERVAL = 15000; // Increased to 15 seconds

  const comparisonPairs = [
    {
      title: "Pricing",
      advantage: {
        heading: "Affordable",
        description: "Same Price. Everytime.\n\nOur Services start from very low prices.",
        highlight: "Starts at just ₹6/km",
        logo: "/src/assets/logo/c.svg"
      },
      disadvantage: {
        heading: "Expensive",
        description: "Higher fares at peak times, straining your budget.\n\nDuring surge time, prices rise significantly.",
        highlight: "Up to 3x surge pricing",
        logo: "/src/assets/hero/ola.png"
      }
    },
    {
      title: "Booking Experience",
      advantage: {
        heading: "One-Time Registration",
        description: "Book one time and get cabs at your doorstep on time.",
        highlight: "Guaranteed on-time pickup",
        logo: "/src/assets/logo/c.svg"
      },
      disadvantage: {
        heading: "Daily Booking Hassle",
        description: "Booking cabs daily is time consuming and have no punctuality",
        highlight: "Average 15min waiting time",
        logo: "/src/assets/hero/uber.png"
      }
    },
    {
      title: "Safety",
      advantage: {
        heading: "Safety Assurance",
        description: "Our drivers are verified and professionals. \n\n Enhanced security measures for women.",
        highlight: "100% verified drivers",
        logo: "/src/assets/logo/c.svg"
      },
      disadvantage: {
        heading: "Unsafe",
        description: "No Security priviliges Drivers and passengers are not safe in a cab.",
        highlight: "Limited safety features",
        logo: "/src/assets/hero/id.png"
      }
    },
    {
      title: "Convenience",
      advantage: {
        heading: "Door To Door",
        description: "We provide comfortable & luxurious rides directly at your doorstep",
        highlight: "Zero walking distance",
        logo: "/src/assets/logo/c.svg"
      },
      disadvantage: {
        heading: "Long Walk",
        description: "Walk to meetup point for shuttles is tiring. \n\n Very tedious walk during monsoon times.",
        highlight: "15-20 min walk required",
        logo: "/src/assets/hero/uber.png"
      }
    }
  ];

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % comparisonPairs.length);
    }, AUTO_SCROLL_INTERVAL);

    return () => clearInterval(interval);
  }, [comparisonPairs.length]);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-blue-100 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-indigo-100 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Why Choose <span style={{color: '#1791c8'}}>Corporate</span> Cruise?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Compare our smart solutions with traditional services
          </p>
        </motion.div>

        <div className="relative px-4 sm:px-8">
          {/* Enhanced Navigation Buttons */}
          <div className="absolute inset-0 flex items-center justify-between pointer-events-none z-30">
            <button
              onClick={() => setActiveIndex((prev) => (prev - 1 + comparisonPairs.length) % comparisonPairs.length)}
              className="pointer-events-auto relative -translate-x-4 md:-translate-x-8 bg-[#1791c8] hover:bg-blue-700 p-3 md:p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all hover:scale-110 group"
            >
              <FiArrowLeft className="text-white text-xl md:text-2xl transition-transform group-hover:-translate-x-1" />
              <span className="absolute inset-0 rounded-full border-2 border-white/20 group-hover:border-white/40 transition-colors" />
            </button>
            <button
              onClick={() => setActiveIndex((prev) => (prev + 1) % comparisonPairs.length)}
              className="pointer-events-auto relative translate-x-4 md:translate-x-8 bg-[#1791c8] hover:bg-blue-700 p-3 md:p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all hover:scale-110 group"
            >
              <FiArrowRight className="text-white text-xl md:text-2xl transition-transform group-hover:translate-x-1" />
              <span className="absolute inset-0 rounded-full border-2 border-white/20 group-hover:border-white/40 transition-colors" />
            </button>
          </div>

          {/* Updated Cards Container */}
          <div className="overflow-hidden py-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-full"
              >
                <div className="grid md:grid-cols-2 gap-6 md:gap-10 max-w-5xl mx-auto">
                  {/* Enhanced Disadvantage Card */}
                  <motion.div
                    className="group bg-white hover:bg-gray-50 rounded-3xl p-6 md:p-10 shadow-2xl hover:shadow-3xl transition-all duration-300 relative border-2 border-gray-100 flex flex-col min-h-[400px] md:min-h-[480px] transform-gpu"
                    whileHover={{ 
                      scale: 1.02,
                      rotateZ: -0.5,
                      transition: { duration: 0.3 }
                    }}
                    style={{
                      transformStyle: 'preserve-3d',
                      perspective: 1000
                    }}
                  >
                    <div className="absolute inset-0 rounded-3xl shadow-inner" />
                    <motion.div 
                      className="absolute top-6 md:top-8 right-6 md:right-8 w-16 h-16 md:w-24 md:h-24 rounded-xl md:rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-gray-100 transition-all"
                      whileHover={{ rotate: 5 }}
                    >
                      <img 
                        src={comparisonPairs[activeIndex].disadvantage.logo}
                        alt="Competition"
                        className="w-12 h-12 md:w-20 md:h-20 object-contain opacity-70 group-hover:opacity-100 transition-all"
                      />
                    </motion.div>
                    <div className="flex flex-col h-full">
                      <div className="mb-10">
                        <h3 className="text-3xl font-bold text-gray-900 group-hover:text-gray-800 pr-28 leading-tight pt-4 mb-6">
                          {comparisonPairs[activeIndex].disadvantage.heading}
                        </h3>
                      </div>
                      <div className="space-y-6 flex-1 text-lg flex-col">
                        {comparisonPairs[activeIndex].disadvantage.description.split('\n\n').map((paragraph, idx) => (
                          <p key={idx} className="text-gray-600 leading-relaxed">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                      <div className="mt-10 bg-red-50 text-red-700 px-8 py-4 rounded-xl font-semibold text-base inline-block">
                        {comparisonPairs[activeIndex].disadvantage.highlight}
                      </div>
                    </div>
                  </motion.div>

                  {/* Enhanced Advantage Card */}
                  <motion.div
                    className="group bg-white hover:bg-blue-50 rounded-3xl p-6 md:p-10 shadow-2xl hover:shadow-3xl transition-all duration-300 relative border-2 border-blue-100 flex flex-col min-h-[400px] md:min-h-[480px] transform-gpu"
                    whileHover={{ 
                      scale: 1.02,
                      rotateZ: 0.5,
                      transition: { duration: 0.3 }
                    }}
                    style={{
                      transformStyle: 'preserve-3d',
                      perspective: 1000
                    }}
                  >
                    <div className="absolute inset-0 rounded-3xl shadow-inner" />
                    <div className="absolute top-6 md:top-8 right-6 md:right-8 w-16 h-16 md:w-24 md:h-24 rounded-xl md:rounded-2xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-100/70 transition-all">
                      <img 
                        src={comparisonPairs[activeIndex].advantage.logo}
                        alt="Corporate Cruise"
                        className="w-12 h-12 md:w-20 md:h-20 object-contain group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <div className="flex flex-col h-full">
                      <div className="mb-10">
                        <h3 className="text-3xl font-bold text-[#1791c8] group-hover:text-blue-800 pr-28 leading-tight pt-4">
                          {comparisonPairs[activeIndex].advantage.heading}
                        </h3>
                      </div>
                      <div className="space-y-6 flex-1 text-lg flex-col ">
                        {comparisonPairs[activeIndex].advantage.description.split('\n\n').map((paragraph, idx) => (
                          <p key={idx} className="text-gray-600 leading-relaxed">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                      <div className="mt-10 bg-blue-50 text-blue-700 px-8 py-4 rounded-xl font-semibold text-base inline-block">
                        {comparisonPairs[activeIndex].advantage.highlight}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Updated Carousel Indicators */}
          <div className="flex justify-center mt-8 md:mt-12 space-x-2 md:space-x-3">
            {comparisonPairs.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2 md:h-3 rounded-full transition-all duration-300 ${
                  activeIndex === index 
                    ? 'w-6 md:w-8 bg-blue-600' 
                    : 'w-2 md:w-3 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comparison; 