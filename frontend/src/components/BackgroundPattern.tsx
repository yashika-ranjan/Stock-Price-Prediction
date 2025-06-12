

import React from 'react';

interface BackgroundPatternProps {
  isDarkMode: boolean;
}

const BackgroundPattern: React.FC<BackgroundPatternProps> = ({ isDarkMode }) => {
  return (
    <div className="absolute inset-0">
      {/* Geometric Pattern Layer */}
      <div className={`absolute inset-0 ${isDarkMode ? 'opacity-20' : 'opacity-10'}`}>
        <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="geo1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={isDarkMode ? "0.6" : "0.3"} />
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity={isDarkMode ? "0.4" : "0.2"} />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity={isDarkMode ? "0.3" : "0.15"} />
            </linearGradient>
            <linearGradient id="geo2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity={isDarkMode ? "0.5" : "0.25"} />
              <stop offset="50%" stopColor="#f59e0b" stopOpacity={isDarkMode ? "0.3" : "0.15"} />
              <stop offset="100%" stopColor="#ef4444" stopOpacity={isDarkMode ? "0.2" : "0.1"} />
            </linearGradient>
          </defs>
          
          {/* Animated geometric shapes */}
          <polygon points="0,0 400,200 200,400 0,300" fill="url(#geo1)" className="animate-pulse" style={{ animationDuration: '4s' }}>
            <animateTransform attributeName="transform" type="rotate" dur="20s" repeatCount="indefinite" values="0 200 200; 360 200 200" />
          </polygon>
          
          <polygon points="800,100 1200,0 1200,300 1000,400" fill="url(#geo2)" className="animate-pulse" style={{ animationDuration: '6s' }}>
            <animateTransform attributeName="transform" type="rotate" dur="25s" repeatCount="indefinite" values="0 1000 200; -360 1000 200" />
          </polygon>
          
          <circle cx="600" cy="400" r="150" fill="url(#geo1)" opacity={isDarkMode ? "0.3" : "0.15"}>
            <animate attributeName="r" dur="8s" repeatCount="indefinite" values="150;200;150" />
            <animate attributeName="opacity" dur="6s" repeatCount="indefinite" values={isDarkMode ? "0.3;0.1;0.3" : "0.15;0.05;0.15"} />
          </circle>
        </svg>
      </div>
      
      {/* Floating Abstract Shapes */}
      <div className="absolute inset-0">
        {/* Large floating rectangles */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`rect-${i}`}
            className={`absolute rounded-2xl animate-pulse ${isDarkMode ? 'opacity-10' : 'opacity-5'}`}
            style={{
              width: `${100 + Math.random() * 200}px`,
              height: `${60 + Math.random() * 120}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `linear-gradient(45deg, 
                ${['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'][Math.floor(Math.random() * 5)]}, 
                transparent)`,
              transform: `rotate(${Math.random() * 45}deg)`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
        
        {/* Medium circles */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={`circle-${i}`}
            className={`absolute rounded-full animate-bounce ${isDarkMode ? 'opacity-15' : 'opacity-8'}`}
            style={{
              width: `${40 + Math.random() * 80}px`,
              height: `${40 + Math.random() * 80}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, 
                ${['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981'][Math.floor(Math.random() * 4)]} 20%, 
                transparent 70%)`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
        
        {/* Small diamond shapes */}
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={`diamond-${i}`}
            className={`absolute w-4 h-4 animate-ping ${isDarkMode ? 'opacity-20' : 'opacity-10'}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'][Math.floor(Math.random() * 5)],
              transform: 'rotate(45deg)',
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${1 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
      
      {/* Modern Grid Pattern */}
      <div className={`absolute inset-0 ${isDarkMode ? 'opacity-5' : 'opacity-3'}`}>
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(59, 130, 246, ${isDarkMode ? '0.3' : '0.15'}) 1px, transparent 1px),
            linear-gradient(rgba(59, 130, 246, ${isDarkMode ? '0.3' : '0.15'}) 1px, transparent 1px),
            linear-gradient(45deg, rgba(139, 92, 246, ${isDarkMode ? '0.2' : '0.1'}) 1px, transparent 1px),
            linear-gradient(-45deg, rgba(6, 182, 212, ${isDarkMode ? '0.2' : '0.1'}) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px, 80px 80px, 40px 40px, 40px 40px'
        }}></div>
      </div>
      
      {/* Gradient Orbs */}
      <div className="absolute inset-0">
        <div className={`absolute top-20 left-20 w-96 h-96 bg-gradient-radial from-blue-600/${isDarkMode ? '20' : '10'} via-purple-600/${isDarkMode ? '10' : '5'} to-transparent rounded-full blur-3xl animate-pulse`} style={{ animationDuration: '8s' }}></div>
        <div className={`absolute bottom-32 right-32 w-80 h-80 bg-gradient-radial from-emerald-500/${isDarkMode ? '15' : '8'} via-cyan-500/${isDarkMode ? '8' : '4'} to-transparent rounded-full blur-3xl animate-pulse`} style={{ animationDuration: '6s', animationDelay: '3s' }}></div>
        <div className={`absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-radial from-violet-600/${isDarkMode ? '20' : '10'} via-pink-600/${isDarkMode ? '10' : '5'} to-transparent rounded-full blur-3xl animate-pulse`} style={{ animationDuration: '10s', animationDelay: '1s' }}></div>
      </div>
    </div>
  );
};

export default BackgroundPattern;


