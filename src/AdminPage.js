import React, { Component } from 'react';
import Papa from 'papaparse';

class AdminPage extends Component {
  state = {
    idCardData: [], // Store the ID card data here
    phoneNumber: '', // Store the phone number for ID card retrieval
  };

  // Function to fetch ID card data and save to CSV (similar to previous example)
  fetchDataAndSaveToCSV = () => {
    fetch('https://c2nksk2xa3.us-east-1.awsapprunner.com/id_card/')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Save the ID card data to state
        this.setState({ idCardData: data });

        // Create a CSV string using PapaParse
        const csv = Papa.unparse(data);

        // Create a Blob from the CSV string
        const blob = new Blob([csv], { type: 'text/csv' });

        // Create a download link and trigger a click event
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'id_card_data.csv';
        a.click();

        URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  // Function to handle phone number input
  handlePhoneNumberChange = (event) => {
    this.setState({ phoneNumber: event.target.value });
  };

  // Function to retrieve ID card image based on phone number
  retrieveIdCardImage = () => {
    // Add your logic to retrieve the ID card image based on the phone number
    // Update the state accordingly
  };

  render() {
    const { idCardData, phoneNumber } = this.state;

    return (
      <div style={{ textAlign: 'center' }}>
        <h1>Admin Page</h1>
        <button onClick={this.fetchDataAndSaveToCSV} style={buttonStyle}>
          Export to Excel
        </button>

        <div style={{ margin: '20px' }}>
          <input
            type="text"
            placeholder="Enter Phone Number"
            value={phoneNumber}
            onChange={this.handlePhoneNumberChange}
            style={inputStyle}
          />
          <button onClick={this.retrieveIdCardImage} style={buttonStyle}>
            Retrieve ID Card Image
          </button>
        </div>

        {/* Render the ID card data or image here */}
        {idCardData.map((card, index) => (
          <div key={index} style={cardStyle}>
            {/* Display ID card data or image here */}
          </div>
        ))}
      </div>
    );
  }
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
