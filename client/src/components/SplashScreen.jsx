import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckSquare } from 'lucide-react';

const SplashScreen = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Show splash screen on every page load (for demo purposes)
    // For production, uncomment the sessionStorage check below

    // const hasShown = sessionStorage.getItem('splashShown');
    // if (hasShown) {
    //   setIsVisible(false);
    //   onComplete();
    //   return;
    // }

    // Show splash screen for 2.5 seconds total
    const timer = setTimeout(() => {
      setIsVisible(false);
      // sessionStorage.setItem('splashShown', 'true'); // Commented for demo
      // Wait for exit animation to complete
      setTimeout(() => {
        onComplete();
      }, 500);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  // Check for prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!isVisible && prefersReducedMotion) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-linear-to-br from-blue-500 via-purple-500 to-pink-500"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: prefersReducedMotion ? 0 : 0.2,
              duration: prefersReducedMotion ? 0 : 0.6,
              ease: 'easeOut'
            }}
            className="text-center"
          >
            <motion.div
              animate={{
                scale: prefersReducedMotion ? 1 : [1, 1.1, 1],
                rotate: prefersReducedMotion ? 0 : [0, 5, -5, 0]
              }}
              transition={{
                duration: prefersReducedMotion ? 0 : 2,
                repeat: prefersReducedMotion ? 0 : Infinity,
                repeatDelay: 0.5
              }}
              className="mb-6"
            >
              <CheckSquare className="w-24 h-24 mx-auto text-white drop-shadow-lg" strokeWidth={1.5} />
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: prefersReducedMotion ? 0 : 0.4,
                duration: prefersReducedMotion ? 0 : 0.6
              }}
              className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg"
            >
              Task Priority Manager
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: prefersReducedMotion ? 0 : 0.6,
                duration: prefersReducedMotion ? 0 : 0.6
              }}
              className="text-white/90 text-lg drop-shadow"
            >
              Organize your tasks efficiently
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
