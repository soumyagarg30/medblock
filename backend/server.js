const express = require('express');
const { ethers } = require('ethers');
const IPFS = require('ipfs-http-client');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const CONTRACT_ADDRESS = 'YOUR_DEPLOYED_CONTRACT_ADDRESS';
const CONTRACT_ABI = []; // Add your contract ABI here

const provider = new ethers.JsonRpcProvider(process.env.MUMBAI_RPC_URL);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

const ipfs = IPFS.create({ url: 'https://ipfs.infura.io:5001/api/v0' });

app.post('/api/addRecord', async (req, res) => {
  try {
    const { patientAddress, recordData } = req.body;
    const { cid } = await ipfs.add(JSON.stringify(recordData));
    const tx = await contract.addRecord(patientAddress, cid.toString());
    await tx.wait();
    res.json({ success: true, ipfsHash: cid.toString() });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/getRecords/:patientAddress', async (req, res) => {
  try {
    const { patientAddress } = req.params;
    const recordCount = await contract.getRecordCount(patientAddress);
    const records = [];
    for (let i = 0; i < recordCount; i++) {
      const record = await contract.getRecord(patientAddress, i);
      records.push({
        ipfsHash: record[0],
        doctor: record[1],
        timestamp: record[2].toString(),
        isShared: record[3]
      });
    }
    res.json({ success: true, records });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));