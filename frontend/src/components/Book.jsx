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
        const response = await axios.get('https://file-service-api.onrender.com/api/files');
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
    <div className="grid grid-cols-2 sm:grid-cols-2 gap-6 p-4">
      {files.map(file => (
        <div key={file._id} className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
          <Link to={`/file/${file._id}`}>
            {file.coverImage && (
              <img
                src={file.coverImage.url}
                alt={file.title || 'File cover'}
                className="w-full h-48 object-cover"
              />
            )}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Book;
