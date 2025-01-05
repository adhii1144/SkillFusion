import React from 'react';
import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

const LoadingSpinner = ({ size = 'medium', color = '#6366f1' }: LoadingSpinnerProps) => {
  const sizes = {
    small: 24,
    medium: 40,
    large: 64,
  };

  const spinnerSize = sizes[size];

  return (
    <div className="flex items-center justify-center">
      <motion.div
        className="relative"
        style={{ width: spinnerSize, height: spinnerSize }}
      >
        {[0, 1, 2, 3].map((index) => (
          <motion.span
            key={index}
            className="absolute w-3 h-3 rounded-full"
            style={{
              background: color,
              top: '50%',
              left: '50%',
              margin: -(spinnerSize * 0.15),
              transformOrigin: `${spinnerSize * 0.35}px ${spinnerSize * 0.15}px`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 0.8, 1],
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: index * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default LoadingSpinner;