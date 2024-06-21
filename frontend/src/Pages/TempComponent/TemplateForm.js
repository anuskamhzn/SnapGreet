import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/auth';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './Style.css'; // Import the CSS file

const TemplateForm = ({ onNewTemplate }) => {
  const [auth] = useAuth();
  const { templateType } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [description1, setDescription1] = useState('');
  const [description2, setDescription2] = useState('');
  const [photos, setPhotos] = useState([]);
  const [photoPreviews, setPhotoPreviews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setPhotos(files);

    // Create preview URLs
    const previewUrls = files.map(file => URL.createObjectURL(file));
    setPhotoPreviews(previewUrls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!auth?.user) {
      toast.error("Please log in to create a template.");
      navigate("/login");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('nickname', nickname);
    formData.append('description1', description1);
    formData.append('description2', description2);
    formData.append('templateType', templateType);
    photos.forEach(photo => {
      formData.append('photos', photo);
    });

    try {
      const response = await axios.post('/api/v1/wish/template', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Set session storage and navigate to the homepage with state
      sessionStorage.setItem('showPopup', 'true');
      navigate('/', { state: { showPopup: true } });
    } catch (error) {
      console.error('Error creating template:', error);
      setError(error.response?.data?.message || 'Failed to create template. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="template-form mt-4">
        <h2>Create Template</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
          />
          <textarea
            placeholder="Description 1"
            value={description1}
            onChange={(e) => setDescription1(e.target.value)}
            required
          ></textarea>
          <textarea
            placeholder="Description 2"
            value={description2}
            onChange={(e) => setDescription2(e.target.value)}
            required
          ></textarea>
          <input
            type="file"
            multiple
            onChange={handlePhotoUpload}
          />

          {/* Display chosen photos */}
          <div className="photo-previews">
            {photoPreviews.map((preview, index) => (
              <img key={index} src={preview} alt={`Photo ${index + 1}`} className="photo-preview" />
            ))}
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Template'}
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default TemplateForm;
