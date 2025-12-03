import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
        >
          <div className="text-center">
            {/* Animated Printer Icon */}
            <div className="relative w-32 h-32 mx-auto mb-8">
              {/* Printer Base */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-8 bg-primary/20 rounded-lg"
              />
              
              {/* Printer Arm */}
              <motion.div
                initial={{ x: -30 }}
                animate={{ x: [- 30, 30, -30] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="absolute top-8 left-1/2 -translate-x-1/2 w-4 h-16 bg-primary rounded-full shadow-[0_0_20px_hsl(174_100%_50%/0.6)]"
              />

              {/* Ink Drops */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ y: 60, opacity: 0 }}
                  animate={{
                    y: [60, 100],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1,
                    delay: i * 0.3,
                    repeat: Infinity,
                  }}
                  style={{ left: `${20 + i * 15}%` }}
                  className="absolute w-2 h-2 bg-primary rounded-full"
                />
              ))}
            </div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="font-display text-2xl font-bold gradient-text mb-2">
                Wall Art
              </h2>
              <p className="text-muted-foreground text-sm">Loading your experience...</p>
            </motion.div>

            {/* Progress Bar */}
            <motion.div className="w-48 h-1 bg-border rounded-full mx-auto mt-6 overflow-hidden">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                className="h-full w-1/2 bg-gradient-to-r from-transparent via-primary to-transparent"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
