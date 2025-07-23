import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-gray-200 bg-neutral-50">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="col-span-1 md:col-span-2">
            <div className="font-display text-xl font-bold text-neutral-900 mb-4">
              Lions of Zion
            </div>
            <p className="text-sm text-neutral-600 mb-6 max-w-md">
              Defend Truth. Expose Lies. Monitor the global pulse of information with cutting-edge technology and unwavering commitment to transparency.
            </p>
      {/* Social icons row - smaller, spaced, accessible */}
      <div className="w-full flex justify-center items-center py-4 border-t border-gray-200 mt-8 gap-4">
        <a 
          href="https://twitter.com/lionsofzion" 
          className="mx-2 text-neutral-400 hover:text-neutral-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-full"
          aria-label="Twitter"
          tabIndex={0}
        >
          <svg className="h-8 w-8 max-w-[32px]" fill="currentColor" viewBox="0 0 24 24" role="img" aria-label="Twitter" focusable="false">
            <title>Twitter</title>
            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
          </svg>
        </a>
        <a 
          href="https://linkedin.com/company/lionsofzion" 
          className="mx-2 text-neutral-400 hover:text-neutral-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-full"
          aria-label="LinkedIn"
          tabIndex={0}
        >
          <svg className="h-8 w-8 max-w-[32px]" fill="currentColor" viewBox="0 0 24 24" role="img" aria-label="LinkedIn" focusable="false">
            <title>LinkedIn</title>
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>
        <a 
          href="https://github.com/lionsofzion" 
          className="mx-2 text-neutral-400 hover:text-neutral-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-full"
          aria-label="GitHub"
          tabIndex={0}
        >
          <svg className="h-8 w-8 max-w-[32px]" fill="currentColor" viewBox="0 0 24 24" role="img" aria-label="GitHub" focusable="false">
            <title>GitHub</title>
            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 10.956.682-.043 1.265-.24 1.265-.586 0-.275-.01-1.252-.016-2.207-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112.017 6c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12.007-12.008-12.007z" />
          </svg>
        </a>
      </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 mb-4">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">About</a></li>
              <li><a href="#" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">Careers</a></li>
              <li><a href="#" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">Press</a></li>
              <li><a href="#" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">News</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">Documentation</a></li>
              <li><a href="#" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">Help Center</a></li>
              <li><a href="#" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">Contact</a></li>
              <li><a href="#" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">Status</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-neutral-500">
              © 2024 Lions of Zion. All rights reserved.
            </p>
            <div className="mt-4 flex space-x-6 md:mt-0">
              <a href="#" className="text-sm text-neutral-500 hover:text-neutral-700 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-neutral-500 hover:text-neutral-700 transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
