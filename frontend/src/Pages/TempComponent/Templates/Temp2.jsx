// src/components/templates/Temp2.jsx
import React from 'react';
import "./Temp2.css";

const Temp2 = ({ name, nickname, description1, description2, photos}) => (
  <div className="birthday-template temp2">
    <h1>{name}'s Birthday Bash!</h1>
    <p>{nickname} years of awesomeness!</p>
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

export default Temp2;
