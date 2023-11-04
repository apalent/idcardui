import React, { useState } from 'react';
import { downloadAllImagesFromS3, downloadFileFromS3, fetchDataAndSaveToCSV } from './utils';

const AdminPage = () =>  {
  const [phoneNumber, setPhoneNumber] = useState(''); // Store the phone number for ID card retrieval

  // Function to handle phone number input
  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  // Function to retrieve ID card image based on phone number
  const retrieveIdCardImage = () => {
    if(phoneNumber) {
        downloadFileFromS3(phoneNumber)
    } else {
        downloadAllImagesFromS3()
    }

  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Admin Page</h1>
      <button onClick={fetchDataAndSaveToCSV} style={buttonStyle}>
        Export to Excel
      </button>

      <div style={{ margin: '20px' }}>
        <input
          type="text"
          placeholder="Enter Phone Number"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          style={inputStyle}
        />
        <button onClick={retrieveIdCardImage} style={buttonStyle}>
          Retrieve ID Card Image
        </button>
      </div>
    </div>
  );
}

const buttonStyle = {
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  cursor: 'pointer',
  margin: '10px',
};

const inputStyle = {
  padding: '10px',
  fontSize: '16px',
};

const cardStyle = {
  border: '1px solid #ccc',
  padding: '20px',
  margin: '10px',
  borderRadius: '5px',
};

export default AdminPage;
