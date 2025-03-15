
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass dark:glass-dark border-b border-gray-200/20 backdrop-blur-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="text-2xl font-semibold tracking-tight transition-all duration-200 hover:opacity-80"
          >
            CulinaryAI
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link to="/" className="fancy-underline text-sm font-medium transition-colors">
              Home
            </Link>
            <Link to="/discover" className="fancy-underline text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Discover
            </Link>
            <Link to="/favorites" className="fancy-underline text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Favorites
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
