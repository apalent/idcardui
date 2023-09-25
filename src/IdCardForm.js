import React, { useState } from 'react';
import './IdCardForm.css'; // Create this CSS file for styling
import { saveAs } from 'file-saver';
import templateImage from './template.jpeg'; // Import the template image

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
    if (!name || !dob || !address || !bank || !branch || !mobile || !bloodGroup || !image) {
      alert('Please fill in all fields and upload an image.');
      return;
    }
  
    // Create a data URL for the uploaded image
    const reader = new FileReader();
    reader.onload = () => {
      const imgDataUrl = reader.result;
  
      // Create a canvas to generate the ID card
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = 400; // Adjust the canvas size as needed
      canvas.height = 250;
  
      // Draw the template image as a background
      const templateImg = new Image();
      templateImg.src = templateImage;
      templateImg.onload = () => {
        ctx.drawImage(templateImg, 0, 0, canvas.width, canvas.height);
  
        // Add name and date of birth to the ID card
        ctx.font = 'bold 20px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText(`Name: ${name}`, 20, 60); // Adjust the position for the name
        ctx.fillText(`Date of Birth: ${dob}`, 20, 90); // Adjust the position for the date of birth
  
        // Draw the uploaded image on the canvas (left side)
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 14, 14 , 140, 140); // Adjust position and size as needed (left side)
          
          // Add Bank, Branch, Mobile, and Blood Group below the photo
          ctx.font = '16px Arial';
          ctx.fillText(`Bank: ${bank}`, 20, 270); // Adjust position for Bank
          ctx.fillText(`Branch: ${branch}`, 20, 290); // Adjust position for Branch
          ctx.fillText(`Mobile: ${mobile}`, 20, 310); // Adjust position for Mobile
          ctx.fillText(`Blood Group: ${bloodGroup}`, 20, 330); // Adjust position for Blood Group
  
          // Convert the canvas to a data URL
          const idCardDataURL = canvas.toDataURL('image/png');
  
          // Set the generated ID card image in state
          setIdCardImage(idCardDataURL);
        };
        img.src = imgDataUrl;
      };
    };
    reader.readAsDataURL(image);
  };
  

  const saveIdCardImage = () => {
    if (!idCardImage || !name || !dob || !bank || !branch || !mobile || !bloodGroup) {
      alert('Please generate the ID card image first.');
      return;
    }

    // Generate a file name based on name and date of birth
    const fileName = `${name.replace(/\s/g, '_')}_${dob}.png`;

    // Fetch the generated ID card image and save it with the calculated file name
    fetch(idCardImage)
      .then((response) => response.blob())
      .then((blob) => {
        saveAs(blob, fileName);
      })
      .then(() => saveToDB());
  };

  const saveToDB = () => {
    // You can add code here to send the data to your backend API
    // Example: send a POST request to your backend to store the data
    console.log('Saving data to the backend...');
  };

  return (
    <div className="id-card-form">
      <h1>ID Card Generator</h1>
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

      {idCardImage && (
        <div className="id-card-container">
          <img src={idCardImage} alt="ID Card" />
        </div>
      )}
      {idCardImage && (
        <button onClick={saveIdCardImage}>Save ID Card Image</button>
      )}
    </div>
  );
};

export default IdCardForm;
