
import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <svg
      className={className}
      width="64"
      height="64"
      viewBox="0 -8 64 72" // Adjusted viewBox to provide more space at the top
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="capGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B4513" />
          <stop offset="100%" stopColor="#A0522D" />
        </linearGradient>
        <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D2B48C" />
          <stop offset="100%" stopColor="#DEB887" />
        </linearGradient>
      </defs>
      <g fill="none" fillRule="evenodd">
        {/* Acorn cap */}
        <path
          d="M32 0C24 0 16 8 16 16H48C48 8 40 0 32 0Z"
          fill="url(#capGradient)"
        />
        {/* Acorn body */}
        <path
          d="M16 16C16 28 24 48 32 48C40 48 48 28 48 16H16Z"
          fill="url(#bodyGradient)"
        />
        {/* Acorn stem */}
        <rect
          x="33"
          y="-7"
          width="4"
          height="8"
          fill="#8B4513"
          transform="rotate(45 32 -4)"
        />
      </g>
    </svg>  
  );
};

export default Logo;

