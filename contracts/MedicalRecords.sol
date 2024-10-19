// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MedicalRecords {
    struct Record {
        string ipfsHash;
        address doctor;
        uint256 timestamp;
        bool isShared;
    }

    mapping(address => Record[]) private patientRecords;

    event RecordAdded(address indexed patient, address indexed doctor, string ipfsHash);
    event RecordShared(address indexed patient, uint256 recordIndex, bool isShared);

    function addRecord(address patient, string memory ipfsHash) public {
        patientRecords[patient].push(Record(ipfsHash, msg.sender, block.timestamp, false));
        emit RecordAdded(patient, msg.sender, ipfsHash);
    }

    function getRecordCount(address patient) public view returns (uint256) {
        return patientRecords[patient].length;
    }

    function getRecord(address patient, uint256 index) public view returns (string memory, address, uint256, bool) {
        require(index < patientRecords[patient].length, "Record does not exist");
        Record memory record = patientRecords[patient][index];
        return (record.ipfsHash, record.doctor, record.timestamp, record.isShared);
    }

    function toggleRecordSharing(address patient, uint256 index) public {
        require(msg.sender == patient, "Only the patient can toggle sharing");
        require(index < patientRecords[patient].length, "Record does not exist");
        patientRecords[patient][index].isShared = !patientRecords[patient][index].isShared;
        emit RecordShared(patient, index, patientRecords[patient][index].isShared);
    }
}