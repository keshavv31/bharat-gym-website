import React from 'react';
import { FaDumbbell } from 'react-icons/fa';

const BrandIntro: React.FC<{ onFinish?: () => void }> = () => {
  const brand = 'BHARAT GYM';

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      {/* Swoosh/Energy Burst (static background) */}
      <div
        style={{
          position: 'absolute',
          width: 420,
          height: 420,
          borderRadius: '50%',
          background: 'conic-gradient(from 0deg, #ff6b35 0deg, #ff8c42 120deg, #fff 200deg, #ff6b35 360deg)',
          filter: 'blur(40px)',
          opacity: 0.5,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1,
        }}
      />
      {/* Dumbbell Icon */}
      <div
        style={{
          zIndex: 2,
          marginBottom: 24,
        }}
      >
        <FaDumbbell style={{ fontSize: '5rem', color: '#fff', filter: 'drop-shadow(0 0 20px #ff6b35)' }} />
      </div>
      {/* Brand Text */}
      <div
        style={{
          display: 'flex',
          gap: '0.15em',
          color: '#fff',
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 900,
          fontSize: '3.5rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          zIndex: 2,
          textAlign: 'center',
          textShadow: '0 4px 32px #ff6b35, 0 1px 0 #000',
        }}
      >
        {brand.split('').map((char, i) => (
          <span
            key={i}
            style={{
              color: char === 'G' || char === 'Y' || char === 'M' ? '#ff6b35' : '#fff',
              display: 'inline-block',
              minWidth: char === ' ' ? '0.5em' : undefined,
            }}
          >
            {char}
          </span>
        ))}
      </div>
      {/* Tagline */}
      <div
        style={{
          color: '#ff8c42',
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 500,
          fontSize: '1.2rem',
          marginTop: 16,
          zIndex: 2,
          textAlign: 'center',
        }}
      >
        Unleash Your Power
      </div>
    </div>
  );
};

export default BrandIntro; 