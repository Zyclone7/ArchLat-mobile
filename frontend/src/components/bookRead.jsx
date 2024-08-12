import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ReactReader } from 'react-reader';
import axios from 'axios';
import { toast } from 'react-toastify';

const FileRead = () => {
  const { fileId } = useParams();
  const navigate = useNavigate(); // Hook for navigation
  const [epubUrl, setEpubUrl] = useState('');
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [location, setLocation] = useState('epubcfi(/6/2[cover]!/6)');

  useEffect(() => {
    const fetchFileEpubUrl = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/files/${fileId}`);
        if (response.data.url) {  // Updated to use the file URL field
          setEpubUrl(response.data.url); // Assuming `url` is the field containing the EPUB URL
        } else {
          toast.error('No EPUB URL found for this file.');
        }
      } catch (error) {
        toast.error('Error fetching EPUB URL. Please try again later.');
        console.error('Error fetching EPUB URL:', error);
      } finally {
        setLoading(false); // Update loading state regardless of success or failure
      }
    };

    fetchFileEpubUrl();
  }, [fileId]);

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  if (loading) {
    return <div>Loading EPUB...</div>; // Show loading indicator while fetching
  }

  if (!epubUrl) {
    return <div>Failed to load EPUB. Please check the URL or try again later.</div>;
  }

  return (
    <div>
<button onClick={handleBack} style={{ marginBottom: '20px', padding: '10px 20px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
        Back
      </button>
      <div style={{ height: '100vh' }}>
        <ReactReader
          url={epubUrl}
          location={location}
          locationChanged={(epubcfi) => setLocation(epubcfi)}
        />
      </div>
    </div>
  );
};

export default FileRead;
