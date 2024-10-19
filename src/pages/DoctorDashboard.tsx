import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { FileText, Search } from 'lucide-react';

const DoctorDashboard: React.FC = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [patientAddress, setPatientAddress] = useState('');
  const [patientRecords, setPatientRecords] = useState<any[]>([]);

  useEffect(() => {
    const connectWallet = async () => {
      if (typeof window.ethereum !== 'undefined') {
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          setAccount(await signer.getAddress());
        } catch (error) {
          console.error('Failed to connect wallet:', error);
        }
      } else {
        console.log('Please install MetaMask!');
      }
    };

    connectWallet();
  }, []);

  const searchPatientRecords = async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would fetch the patient's shared records from the blockchain here
    // For now, we'll use dummy data
    setPatientRecords([
      { id: 1, title: 'Annual Checkup', date: '2024-03-15', doctor: 'Dr. Smith' },
      { id: 2, title: 'Vaccination Record', date: '2024-02-01', doctor: 'Dr. Johnson' },
    ]);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Doctor Dashboard</h1>
      {account ? (
        <div>
          <p className="mb-4">Connected Account: {account}</p>
          <form onSubmit={searchPatientRecords} className="mb-8">
            <div className="flex space-x-2">
              <input
                type="text"
                value={patientAddress}
                onChange={(e) => setPatientAddress(e.target.value)}
                placeholder="Enter patient's Ethereum address"
                className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
              >
                <Search size={18} />
                <span>Search</span>
              </button>
            </div>
          </form>

          {patientRecords.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Patient Records</h2>
              <div className="space-y-4">
                {patientRecords.map(record => (
                  <div key={record.id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <FileText className="text-blue-500" />
                      <div>
                        <h3 className="font-semibold">{record.title}</h3>
                        <p className="text-sm text-gray-500">{record.date} - {record.doctor}</p>
                      </div>
                    </div>
                    <button className="bg-green-100 text-green-700 px-4 py-2 rounded-lg hover:bg-green-200 transition-colors">
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <p>Please connect your wallet to access the doctor dashboard.</p>
      )}
    </div>
  );
};

export default DoctorDashboard;