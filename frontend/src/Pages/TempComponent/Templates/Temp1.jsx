import React from 'react';
import "./Temp1.css";

const Temp1 = ({ name, nickname, description1, description2, photos }) => {
  return (
    <div className="birthday-template">
      <h1>🎉 Happy Birthday {name}! 🎉</h1>
      <h2>🥳 JOYFULL BDAY {nickname} 🥳</h2>
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
  );
};

export default Temp1;
