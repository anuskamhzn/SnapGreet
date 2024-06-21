import React from 'react';
import './Temp4.css';

const Temp4 = ({ name, nickname, description1, description2, photos }) => {
  return (
    <div className="temp4-template">
      <div className="temp4-header">
        <h1>🎉 Special Birthday Wishes! 🎉</h1>
      </div>
      <div className="temp4-body">
        <p>Dear {name},</p>
        <p>{nickname}</p>
        <p>{description1}</p>
        <p>{description2}</p>
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
      <div className="temp4-footer">
        <p>With love,</p>
        <p>Your Friends</p>
      </div>
    </div>
  );
};

export default Temp4;
