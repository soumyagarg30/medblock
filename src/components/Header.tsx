import React from 'react';
import { Link } from 'react-router-dom';
import { Activity } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Activity size={24} />
          <span className="text-xl font-bold">MedChain</span>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/patient" className="hover:text-blue-200">Patient</Link></li>
            <li><Link to="/doctor" className="hover:text-blue-200">Doctor</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;