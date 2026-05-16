import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo */}
          <div className="flex items-center space-x-3">
            {/* Red square with white "A" */}
            <div className="w-8 h-8 bg-red-600 flex items-center justify-center rounded">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            {/* Text */}
            <span className="text-gray-800 font-serif text-lg">
              Capacítate para el empleo
            </span>
          </div>

          {/* Right side - Links, icons, and avatar */}
          <div className="flex items-center space-x-6">
            {/* Text links */}
            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-500 font-medium text-sm hover:text-gray-700 transition-colors">
                Mis avances
              </a>
              <a href="#" className="text-gray-500 font-medium text-sm hover:text-gray-700 transition-colors">
                Ayuda
              </a>
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-3">
              {/* Bell icon */}
              <button className="text-gray-500 hover:text-gray-700 transition-colors" aria-label="Notificaciones">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>

              {/* Search icon */}
              <button className="text-gray-500 hover:text-gray-700 transition-colors" aria-label="Buscar">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>

            {/* Avatar with chevron */}
            <div className="flex items-center space-x-2 cursor-pointer">
              <div className="w-9 h-9 rounded-full bg-[#8cb33e] flex items-center justify-center">
                <span className="text-white font-medium text-sm">U</span>
              </div>
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
