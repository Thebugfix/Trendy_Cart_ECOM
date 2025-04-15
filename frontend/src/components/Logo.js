import React from 'react'

const Logo = ({w,h}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 200" width={w} height={h}>
    <g transform="translate(80, 100)">
      <path d="M0,0 C0,-20 10,-30 25,-30 L35,-30" stroke="#3A0CA3" strokeWidth="4" fill="none" strokeLinecap="round"/>
      
      <path d="M0,0 L50,0 L45,40 L5,40 Z" fill="#4361EE" stroke="#3A0CA3" strokeWidth="2"/>
      
      <circle cx="15" cy="50" r="6" fill="#3A0CA3"/>
      <circle cx="35" cy="50" r="6" fill="#3A0CA3"/>
      
      <rect x="15" y="-15" width="8" height="12" rx="2" fill="#F72585"/>
      <rect x="27" y="-20" width="8" height="17" rx="2" fill="#7209B7"/>
    </g>
    
    <g transform="translate(150, 100)">
      <text fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="40" fill="#4361EE">TRENDY</text>
    </g>
    
    <g transform="translate(320, 100)">
      <text fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="40" fill="#F72585">CART</text>
    </g>
    
    <path d="M70,80 L60,80" stroke="#F72585" strokeWidth="3" strokeLinecap="round"/>
    <path d="M65,100 L55,100" stroke="#F72585" strokeWidth="3" strokeLinecap="round"/>
    <path d="M70,120 L60,120" stroke="#F72585" strokeWidth="3" strokeLinecap="round"/>
    
    <circle cx="440" cy="70" r="8" fill="#4CC9F0"/>
    <circle cx="140" cy="70" r="5" fill="#4CC9F0"/>
    <circle cx="440" cy="130" r="5" fill="#4CC9F0"/>
    <circle cx="140" cy="130" r="8" fill="#4CC9F0"/>
    
    <path d="M150,110 C200,140 300,140 350,110" stroke="#7209B7" strokeWidth="3" fill="none" strokeLinecap="round"/>
  </svg>
  )
}

export default Logo