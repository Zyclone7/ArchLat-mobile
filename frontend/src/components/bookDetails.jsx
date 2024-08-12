import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const BookDetails = () => {
  const { fileId } = useParams();
  const navigate = useNavigate(); // Hook for navigation
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFileDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`http://localhost:5001/api/files/${fileId}`);
        setFile(response.data);
      } catch (error) {
        setError('Error fetching file details. Please try again later.');
        toast.error('Error fetching file details. Please try again later.');
        console.error('Error fetching file details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFileDetails();
  }, [fileId]);

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!file) {
    return <div>File not found</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <button onClick={handleBack} style={{ marginBottom: '20px', padding: '10px 20px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
        Back
      </button>
      <h1>{file.title}</h1>
      <p><strong>Author:</strong> {file.author}</p>
      <p><strong>Description:</strong> {file.description || 'No description available'}</p>
      {file.coverImage && (
        <Link to={`/read/${file._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <img 
            src={file.coverImage.url} 
            alt={file.title || 'File cover'} 
            style={{ maxWidth: '100%', cursor: 'pointer' }} 
          />
        </Link>
      )}
      {file.url && (
        <Link to={`/read/${file._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <button 
            style={{ marginTop: '20px', padding: '10px 20px', background: '#ff0000', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            Read
          </button>
        </Link>
      )}
    </div>
  );
};

export default BookDetails;
