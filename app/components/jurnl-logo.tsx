import React from 'react';

// Jurnl Icon - Flowing streams forming organic J shape
export function JurnlIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 40 40" 
      className={className}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Primary flowing stream */}
      <path 
        d="M8 12C12 8, 18 6, 24 8C30 10, 34 14, 32 20C30 26, 24 28, 20 26C16 24, 14 20, 16 16"
        stroke="#FF6600" 
        strokeWidth="2.5" 
        fill="none"
        strokeLinecap="round"
      />
      
      {/* Secondary flowing stream */}
      <path 
        d="M6 16C10 12, 16 10, 22 12C28 14, 32 18, 30 24C28 30, 22 32, 18 30"
        stroke="#FF6600" 
        strokeWidth="2" 
        fill="none"
        opacity="0.7"
        strokeLinecap="round"
      />
      
      {/* Tertiary flowing stream */}
      <path 
        d="M10 20C14 16, 20 14, 26 16C30 18, 32 22, 30 26"
        stroke="#FF6600" 
        strokeWidth="1.5" 
        fill="none"
        opacity="0.5"
        strokeLinecap="round"
      />
      
      {/* Data point dots */}
      <circle cx="12" cy="14" r="1.5" fill="#FF6600" opacity="0.8"/>
      <circle cx="26" cy="18" r="1" fill="#FF6600" opacity="0.6"/>
      <circle cx="20" cy="26" r="1.2" fill="#FF6600" opacity="0.7"/>
    </svg>
  );
}

// Horizontal Logo - Flowing streams with Jurnl text
export function JurnlLogo({ className = "h-10" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg 
        viewBox="0 0 40 40" 
        className="w-10 h-10"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Primary flowing stream */}
        <path 
          d="M8 12C12 8, 18 6, 24 8C30 10, 34 14, 32 20C30 26, 24 28, 20 26C16 24, 14 20, 16 16"
          stroke="#FF6600" 
          strokeWidth="2.5" 
          fill="none"
          strokeLinecap="round"
        />
        
        {/* Secondary flowing stream */}
        <path 
          d="M6 16C10 12, 16 10, 22 12C28 14, 32 18, 30 24C28 30, 22 32, 18 30"
          stroke="#FF6600" 
          strokeWidth="2" 
          fill="none"
          opacity="0.7"
          strokeLinecap="round"
        />
        
        {/* Tertiary flowing stream */}
        <path 
          d="M10 20C14 16, 20 14, 26 16C30 18, 32 22, 30 26"
          stroke="#FF6600" 
          strokeWidth="1.5" 
          fill="none"
          opacity="0.5"
          strokeLinecap="round"
        />
        
        {/* Data point dots */}
        <circle cx="12" cy="14" r="1.5" fill="#FF6600" opacity="0.8"/>
        <circle cx="26" cy="18" r="1" fill="#FF6600" opacity="0.6"/>
        <circle cx="20" cy="26" r="1.2" fill="#FF6600" opacity="0.7"/>
      </svg>
      
      <span className="text-2xl font-bold text-foreground tracking-tight">
        Jurnl
      </span>
    </div>
  );
}

// Welcome Logo - Larger flowing streams design
export function JurnlWelcome({ className = "w-32 h-20" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 160 80" 
      className={className}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main flowing stream */}
      <path 
        d="M20 24C28 16, 40 12, 56 16C72 20, 84 28, 80 40C76 52, 60 56, 48 52C36 48, 32 40, 36 32C40 24, 48 20, 56 24"
        stroke="#FF6600" 
        strokeWidth="4" 
        fill="none"
        strokeLinecap="round"
      />
      
      {/* Secondary flowing stream */}
      <path 
        d="M16 32C24 24, 36 20, 52 24C68 28, 80 36, 76 48C72 60, 56 64, 44 60C32 56, 28 48, 32 40"
        stroke="#FF6600" 
        strokeWidth="3" 
        fill="none"
        opacity="0.7"
        strokeLinecap="round"
      />
      
      {/* Tertiary flowing stream */}
      <path 
        d="M24 40C32 32, 44 28, 60 32C76 36, 88 44, 84 56C80 68, 64 72, 52 68"
        stroke="#FF6600" 
        strokeWidth="2.5" 
        fill="none"
        opacity="0.5"
        strokeLinecap="round"
      />
      
      {/* Additional flowing stream */}
      <path 
        d="M28 48C36 40, 48 36, 64 40C80 44, 92 52, 88 64"
        stroke="#FF6600" 
        strokeWidth="2" 
        fill="none"
        opacity="0.3"
        strokeLinecap="round"
      />
      
      {/* Data point dots */}
      <circle cx="28" cy="28" r="2.5" fill="#FF6600" opacity="0.8"/>
      <circle cx="64" cy="36" r="2" fill="#FF6600" opacity="0.6"/>
      <circle cx="48" cy="52" r="2.2" fill="#FF6600" opacity="0.7"/>
      <circle cx="72" cy="48" r="1.8" fill="#FF6600" opacity="0.5"/>
      <circle cx="40" cy="44" r="1.5" fill="#FF6600" opacity="0.6"/>
      
      {/* Text */}
      <text 
        x="100" 
        y="45" 
        className="fill-foreground font-bold text-xl" 
        style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
      >
        Jurnl
      </text>
    </svg>
  );
}

// Favicon - Simplified flowing streams
export function JurnlFavicon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 32 32" 
      className={className}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Simplified flowing streams for small size */}
      <path 
        d="M6 10C10 6, 16 4, 22 6C26 8, 28 12, 26 16C24 20, 18 22, 14 20C10 18, 8 14, 10 10"
        stroke="#FF6600" 
        strokeWidth="2.5" 
        fill="none"
        strokeLinecap="round"
      />
      
      <path 
        d="M4 14C8 10, 14 8, 20 10C24 12, 26 16, 24 20C22 24, 16 26, 12 24"
        stroke="#FF6600" 
        strokeWidth="2" 
        fill="none"
        opacity="0.7"
        strokeLinecap="round"
      />
      
      {/* Data points */}
      <circle cx="10" cy="12" r="1.2" fill="#FF6600" opacity="0.8"/>
      <circle cx="20" cy="16" r="1" fill="#FF6600" opacity="0.6"/>
    </svg>
  );
} 