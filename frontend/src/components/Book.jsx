import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

const Book = () => {
  const [files, setFiles] = useState([]);
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchFiles = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('https://file-service-api.onrender.com/api/files');
        setFiles(response.data);
        setFilteredFiles(response.data); // Initially show all files
      } catch (error) {
        setError('Error fetching files. Please try again later.');
        console.error('Error fetching files:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []); // Empty dependency array to fetch files only once on component mount

  useEffect(() => {
    const results = files.filter(file =>
      file.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFiles(results);
  }, [searchTerm, files]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar handleSearch={handleSearch} />
      <div className="p-4">
        {/* Search Input Always Visible */}
   

        {error && <div>{error}</div>}

        {/* Conditionally render "No files found" or file list */}
        {filteredFiles.length === 0 ? (
          <div>No files found</div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {filteredFiles.map(file => (
              <div
                key={file._id}
                className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden"
              >
                <Link to={`/file/${file._id}`} className="block">
                  {file.coverImage && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={file.coverImage.url}
                        alt={file.title ? `${file.title} cover` : 'File cover'}
                        className="w-full h-full object-cover"
                        style={{ height: '200px' }} // Fixed height to avoid layout shifts
                      />
                    </div>
                  )}
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Book;
