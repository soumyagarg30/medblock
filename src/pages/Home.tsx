import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Users, FileText } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to MedChain</h1>
      <p className="text-xl mb-8">Secure, decentralized medical records on the blockchain</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <FeatureCard
          icon={<Shield className="w-12 h-12 text-blue-500" />}
          title="Secure Data Storage"
          description="Your medical records are stored securely on the blockchain."
        />
        <FeatureCard
          icon={<Users className="w-12 h-12 text-green-500" />}
          title="Interoperability"
          description="Seamless sharing between healthcare providers."
        />
        <FeatureCard
          icon={<FileText className="w-12 h-12 text-purple-500" />}
          title="Patient Control"
          description="You decide who can access your medical data."
        />
      </div>
      
      <div className="space-x-4">
        <Link to="/patient" className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
          Patient Dashboard
        </Link>
        <Link to="/doctor" className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors">
          Doctor Dashboard
        </Link>
      </div>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default Home;