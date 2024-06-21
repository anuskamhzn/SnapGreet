// src/components/TemplateSelector.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Style.css';

const templateContext = require.context('./Templates', false, /\.jsx$/);
const templateTypes = templateContext.keys().map(key => key.match(/\.\/(.*)\.jsx$/)[1]);

const TemplateSelector = () => {
  const navigate = useNavigate();

  const handleSelectTemplate = (type) => {
    navigate(`/templatedetail/${type}`);
  };

  const getImageSrc = (type) => {
    // First try JPG, then fall back to PNG
    const jpgSrc = `/template-previews/${type}.jpg`;
    const pngSrc = `/template-previews/${type}.png`;

    const img = new Image();
    img.src = jpgSrc;
    img.onerror = () => {
      img.src = pngSrc;
    };

    return img.src;
  };

  return (
    <div className="template-selector">
      <div className="template-options">
        {templateTypes.map(type => (
          <div key={type} className="template-option" onClick={() => handleSelectTemplate(type)}>
            <img src={getImageSrc(type)} alt={`${type} preview`} className="template-image" />
            {/* <button>{type.toUpperCase()} Template</button> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
