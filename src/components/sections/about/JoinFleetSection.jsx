import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const JoinFleetSection = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const headlineVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={headlineVariants}
        className="text-center mb-16 space-y-4"
      >


        <motion.h2 
         className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
         variants={headlineVariants}
       >
                You can always{' '}
            <span className="animate-gradient-text text-transparent bg-clip-text">count on</span><br />
            <span className="animate-gradient-text text-transparent bg-clip-text">us</span> for your daily office journey.
        </motion.h2>
      </motion.div>

      <motion.div
        variants={headlineVariants}
        className="text-center mb-16"
      >
        <h3 className="text-3xl md:text-4xl font-semibold">Ready to Join our fleet?</h3>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 px-4">
        <motion.div
          variants={cardVariants}
          className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl p-8 md:p-12 text-white 
                   hover:shadow-2xl transition-all duration-300 group relative overflow-hidden
                   hover:-translate-y-2 hover:rotate-[1deg] cursor-pointer"
          whileHover={{ scale: 1.02 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 
                         group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute inset-0 bg-noise opacity-10" />
          <h3 className="text-3xl font-bold mb-6 text-white drop-shadow-md">Drive for us</h3>
          <p className="text-white/90 mb-8 text-lg">
            At Corporate-Cruise, we value our drivers as the backbone of our service. 
            We are dedicated to offering a rewarding career path with excellent benefits, 
            comprehensive training, and a supportive work environment.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = 'https://docs.google.com/forms/d/e/1FAIpQLSeFmOPFOnyd9jyZWFe05Bowjw43SHmdLWKEhYHgyOlTOPXwLA/viewform?usp=sf_link'}
            className="relative overflow-hidden bg-white/90 backdrop-blur-sm text-indigo-600 px-8 py-3 rounded-full font-semibold 
                      transition-all duration-300 hover:bg-white hover:text-purple-600
                      shadow-lg hover:shadow-xl"
            >
            <span className="relative z-10 flex items-center ">
                Drive for us
                <svg 
                className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-2" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
            </span>
           </motion.button>
        </motion.div>

        <motion.div
          variants={cardVariants}
          className="bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-500 rounded-3xl p-8 md:p-12 text-white 
                   hover:shadow-2xl transition-all duration-300 group relative overflow-hidden
                   hover:-translate-y-2 hover:-rotate-[1deg] cursor-pointer"
          whileHover={{ scale: 1.02 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 
                         group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute inset-0 bg-noise opacity-10" />
          <h3 className="text-3xl font-bold mb-6 text-white drop-shadow-md">Ride with us</h3>
          <p className="text-white/90 mb-8 text-lg">
            At Corporate-Cruise, we are committed to transforming your daily commute 
            into a seamless and enjoyable experience. Discover the benefits of riding 
            with us and why we are the preferred choice for corporate transportation.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/signup'}
            className="relative overflow-hidden bg-white/90 backdrop-blur-sm text-cyan-600 px-8 py-3 rounded-full font-semibold 
                      transition-all duration-300 hover:bg-white hover:text-blue-600
                      shadow-lg hover:shadow-xl"
            >
            <span className="relative z-10 flex items-center">
                Pre-book Now
                <svg 
                className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-2" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
            </span>
           </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default JoinFleetSection;