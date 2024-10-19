import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { FileText, Lock, Unlock } from 'lucide-react';

const PatientDashboard: React.FC = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [records, setRecords] = useState<any[]>([]);

  useEffect(() => {
    const connectWallet = async () => {
      if (typeof window.ethereum !== 'undefined') {
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          setAccount(await signer.getAddress());
          // Here you would typically fetch the patient's records from the blockchain
          // For now, we'll use dummy data
          setRecords([
            { id: 1, title: 'Annual Checkup', date: '2024-03-15', isShared: false },
            { id: 2, title: 'Vaccination Record', date: '2024-02-01', isShared: true },
          ]);
        } catch (error) {
          console.error('Failed to connect wallet:', error);
        }
      } else {
        console.log('Please install MetaMask!');
      }
    };

    connectWallet();
  }, []);

  const toggleRecordSharing = (recordId: number) => {
    setRecords(records.map(record =>
      record.id === recordId ? { ...record, isShared: !record.isShared } : record
    ));
    // In a real application, you would update the sharing status on the blockchain here
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Patient Dashboard</h1>
      {account ? (
        <div>
          <p className="mb-4">Connected Account: {account}</p>
          <h2 className="text-2xl font-semibold mb-4">Your Medical Records</h2>
          <div className="space-y-4">
            {records.map(record => (
              <div key={record.id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <FileText className="text-blue-500" />
                  <div>
                    <h3 className="font-semibold">{record.title}</h3>
                    <p className="text-sm text-gray-500">{record.date}</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleRecordSharing(record.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded ${
                    record.isShared ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}
                >
                  {record.isShared ? <Unlock size={18} /> : <Lock size={18} />}
                  <span>{record.isShared ? 'Shared' : 'Private'}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Please connect your wallet to view your medical records.</p>
      )}
    </div>
  );
};

export default PatientDashboard;