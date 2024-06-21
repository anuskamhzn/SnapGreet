import React from 'react';
import './Temp3.css';

const Temp3 = ({ name, nickname, description1, description2, photos }) => (
  <div className="birthday-template temp3">
    <h1>🎈 Happy Birthday, {name}! 🎈</h1>
    <h2>🎂 {nickname} 🎂</h2>
    <p>🎁 {description1} 🎁</p>
    <p>🎁 {description2} 🎁</p>
    {photos && photos.length > 0 && (
        <div className="photos">
          {photos.map((photo, index) => (
            <img
              key={index}
              src={photo}  // Assuming `photo` is a valid URL
              alt={`Uploaded ${index + 1}`}
              className="photo"
            />
          ))}
        </div>
      )}
  </div>
);

export default Temp3;
