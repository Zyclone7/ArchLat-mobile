import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Book = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFiles = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('http://localhost:5001/api/files');
        setFiles(response.data);
      } catch (error) {
        setError('Error fetching files. Please try again later.');
        console.error('Error fetching files:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []); // Empty dependency array to fetch files only once on component mount

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (files.length === 0) {
    return <div>No files found</div>;
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
      {files.map(file => (
        <div key={file._id} style={{ width: '100%', maxWidth: '300px', marginBottom: '20px' }}>
          <div style={{ border: '1px solid #ddd', borderRadius: '5px', overflow: 'hidden' }}>
            <Link to={`/file/${file._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              {file.coverImage && (
                <img
                  src={file.coverImage.url}
                  alt={file.title || 'File cover'}
                  style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }}
                />
              )}
              <div style={{ padding: '10px' }}>
                <h2 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>{file.title || 'Untitled'}</h2>
                <p style={{ fontSize: '0.9rem', margin: '0' }}>Author: {file.author || 'Unknown'}</p>
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Book;
