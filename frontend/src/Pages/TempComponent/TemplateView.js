import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BirthdayTemplate from './BirthdayTemplate';

const TemplateView = () => {
  const { type, id } = useParams();
  const [template, setTemplate] = useState(null);

  useEffect(() => {
    const fetchTemplate = async () => {
      console.log('Fetching template with Type:', type, 'and ID:', id);
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/wish/template/${type}/${id}`);
        setTemplate(response.data);
      } catch (error) {
        console.error('Error fetching template:', error);
      }
    };

    if (type && id) {
      fetchTemplate();
    }r
  }, [type, id]);

  if (!template) {
    return <div>Loading...</div>;
  }


  // Construct photo URLs
  const photoURLs = template.photoURLs.map(photoId => `${process.env.REACT_APP_API}${photoId}`);
  console.log(photoURLs);

  return (
    <BirthdayTemplate
      name={template.name}
      nickname={template.nickname}
      description1={template.description1}
      description2={template.description2}
      templateType={template.templateType}
      photos={photoURLs} // Pass the photo URLs
    />
  );
};

export default TemplateView;
