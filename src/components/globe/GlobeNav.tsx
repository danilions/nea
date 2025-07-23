import React from 'react';

const navItems = [
  { label: 'דף הבית', href: '/' },
  { label: 'אודות', href: '/about' },
  { label: 'שפה: עברית', href: '/he' },
  { label: 'שפה: English', href: '/en' },
  { label: 'צור קשר', href: '/contact' },
];

const GlobeNav: React.FC = () => (
  <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-black bg-opacity-60 rounded-full px-6 py-2 flex gap-4 shadow-lg backdrop-blur-md border border-gray-700">
    {navItems.map((item) => (
      <a
        key={item.href}
        href={item.href}
        className="text-white hover:text-yellow-400 font-semibold transition-colors duration-200 text-base"
      >
        {item.label}
      </a>
    ))}
  </nav>
);

export default GlobeNav;
