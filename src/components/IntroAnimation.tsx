import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroAnimationProps {
  onComplete: () => void;
}

const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const [showText, setShowText] = useState(false);
  const [showShimmer, setShowShimmer] = useState(false);

  useEffect(() => {
    // Show text
    const textTimer = setTimeout(() => {
      setShowText(true);
    }, 300);

    // Start shimmer
    const shimmerTimer = setTimeout(() => {
      setShowShimmer(true);
    }, 1200);

    // Complete animation
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 5000);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(shimmerTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 1, ease: "easeInOut" }
    }
  };

  const textVariants = {
    initial: { opacity: 0, y: 30, scale: 0.95 },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut"
      }
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="intro-animation"
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #000000 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }}
      >
        {/* Main Text Container */}
        {showText && (
          <motion.div
            variants={textVariants}
            initial="initial"
            animate="animate"
            style={{
              position: 'relative',
              zIndex: 2
            }}
          >
            <div
              style={{
                color: '#ffffff',
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '6rem',
                fontWeight: 300,
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                textAlign: 'center',
                textShadow: '0 0 40px rgba(255, 255, 255, 0.6), 0 0 80px rgba(255, 255, 255, 0.3)',
                lineHeight: 1.1,
                position: 'relative'
              }}
            >
              <span style={{ 
                color: '#ffffff',
                fontWeight: 200,
                opacity: 0.95
              }}>
                BHARAT{' '}
              </span>
              <span style={{ 
                color: '#ff0000',
                fontWeight: 400,
                textShadow: '0 0 40px rgba(255, 0, 0, 0.6), 0 0 80px rgba(255, 0, 0, 0.3)'
              }}>
                GYM
              </span>

              {/* Elegant Shimmer Layer */}
              {showShimmer && (
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{
                    duration: 2.5,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.9), transparent)',
                    zIndex: 3,
                    pointerEvents: 'none',
                    mixBlendMode: 'overlay'
                  }}
                />
              )}

              {/* Subtle Glow Effect */}
              {showShimmer && (
                <motion.div
                  animate={{
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{
                    position: 'absolute',
                    top: '-20px',
                    left: '-20px',
                    right: '-20px',
                    bottom: '-20px',
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
                    zIndex: 1,
                    pointerEvents: 'none'
                  }}
                />
              )}
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default IntroAnimation; 