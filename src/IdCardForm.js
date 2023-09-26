import React, { useState } from 'react';
import './IdCardForm.css'; // Create this CSS file for styling
import { saveAs } from 'file-saver';

const IdCardForm = () => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');
  const [bank, setBank] = useState('');
  const [branch, setBranch] = useState('');
  const [mobile, setMobile] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [image, setImage] = useState(null);
  const [idCardImage, setIdCardImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  
const generateIdCard = () => {
    // Create a canvas to generate the ID card
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
  
    // Set canvas dimensions for a standard ID card size
    canvas.width = 425;
    canvas.height = 625;
  
    // Draw the template image as a background
    const templateImg = new Image();
    templateImg.src = '/idcardtemplate.jpeg';
    templateImg.onload = () => {
      ctx.drawImage(templateImg, 0, 0, canvas.width, canvas.height);
  
      // Draw the name on the template image (independent of profile)
      ctx.font = 'bold 23px monospace';
      ctx.fillStyle = 'black';
      const text = `${name}`;
      const textWidth = ctx.measureText(text).width; // Get the width of the text
      
      // Calculate the X and Y coordinates to center the text
      const centerX = (canvas.width - textWidth) / 2;
  
      ctx.fillText(text, centerX, canvas.height / 1.55); // Adjust the position for the name
        // Draw other details like Date of Birth, Bank, Branch, Mobile, and Blood Group
       // Set a monospaced font
ctx.font = 'bold 19px monospace'; // Replace 'monospace' with the actual monospaced font you prefer
ctx.fillStyle = 'black';

// Define the text labels and values
const labels = ['Bank        :', 'Branch      : ', 'Mobile      :', 'Blood Group :'];
const values = [ bank, branch, mobile, bloodGroup];

// Calculate the Y position for text
const startY = 440; // Adjust the starting Y position as needed

// Loop through the labels and values
for (let i = 0; i < labels.length; i++) {
  const label = labels[i];
  const value = values[i];

  // Calculate the X position for text
  const labelX = 50;
  const valueX = 200; // Adjust this value to create space between the label and value

  // Calculate the Y position for this label
  const textY = startY + i * 30; // Adjust the vertical spacing as needed

  // Draw the label and value
  ctx.fillText(`${label}`, labelX, textY);
  ctx.fillText(` ${value}`, valueX, textY);
}



   
     // Create a circular clip path with a 2 cm radius
      const circleRadius = 4 * 28.35; // 2 cm to pixels (assuming 1cm = 28.35 pixels)
      const circleX = 213; // X-coordinate of the circle center
      const circleY = canvas.height / 2 - canvas.height * 0.1; // Y-coordinate of the circle center
  
      ctx.beginPath();
      ctx.arc(circleX, circleY, circleRadius, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.clip();
  
      // Draw the profile picture inside the circular clip path
      const img = new Image();
      img.src = URL.createObjectURL(image);
      img.onload = () => {
        const profileX = circleX - circleRadius; // Center horizontally
        const profileY = circleY - circleRadius; // Center vertically
        const profileSize = circleRadius * 2; // Diameter of the circle
  
        ctx.drawImage(img, profileX, profileY, profileSize, profileSize);
  
  
        // Convert the canvas to a data URL
        const idCardDataURL = canvas.toDataURL('image/png');
  
        // Set the generated ID card image in state
        setIdCardImage(idCardDataURL);
      };
    };
  };
  
  

  const saveIdCardImage = () => {
    // if (!idCardImage || !name || !dob || !bank || !branch || !mobile || !bloodGroup) {
    //   alert('Please generate the ID card image first.');
    //   return;
    // }

    // Generate a file name based on name and date of birth
    const fileName = `${name.replace(/\s/g, '_')}_${mobile}.jpeg`;

    // Fetch the generated ID card image and save it with the calculated file name
    fetch(idCardImage)
      .then((response) => response.blob())
      .then((blob) => {
        saveAs(blob, fileName);
      })
    //   .then(() => saveToDB());
  };

  const saveToDB = () => {
    // You can add code here to send the data to your backend API
    // Example: send a POST request to your backend to store the data
    console.log('Saving data to the backend...');
  };

  return (
    <div className="id-card-form">
      <h1>ID Card Generator</h1>
      <div className="input-section">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="dob">Date of Birth:</label>
          <input type="text" id="dob" value={dob} onChange={(e) => setDob(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="bank">Bank:</label>
          <input type="text" id="bank" value={bank} onChange={(e) => setBank(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="branch">Branch:</label>
          <input type="text" id="branch" value={branch} onChange={(e) => setBranch(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="mobile">Mobile:</label>
          <input type="text" id="mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="bloodGroup">Blood Group:</label>
          <input type="text" id="bloodGroup" value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="image">Upload Image:</label>
          <input type="file" accept="image/*" id="image" onChange={handleImageUpload} />
        </div>
        <button onClick={generateIdCard}>Preview</button>
      </div>
      <div className="preview-section">
        {idCardImage && (
          <div className="id-card-container">
            <img src={idCardImage} alt="ID Card" />
            <button onClick={saveIdCardImage}>Save ID Card Image</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default IdCardForm;
