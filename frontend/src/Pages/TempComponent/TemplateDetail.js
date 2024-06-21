import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './Style.css';

const TemplateDetail = () => {
  const { templateType } = useParams();
  const navigate = useNavigate();

  // Dynamically import template description based on the template type
  const templateDescription = require(`./TemplateDetails/${templateType}.jsx`).default;

  const handleUseTemplate = () => {
    navigate(`/templateform/${templateType}`);
  };

  return (
    <>
      <Header />
      <div className="template-detail">
        <h2>{templateType.toUpperCase()} Template Detail</h2>
        <div className="template-image-container">
          <img src={`/template-previews/${templateType}.jpg`} alt={`${templateType} template`} />
          {templateDescription.secondImage && (
            <img src={templateDescription.secondImage} alt="Second image" />
          )}
        </div>
        <h3>Description</h3>
        <p>{templateDescription.description}</p>
        <button onClick={handleUseTemplate}>Use Template</button>
        <div className="demo-description">
        </div>
      </div>
      <Footer />
    </>

  );
};

export default TemplateDetail;
