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
        const response = await axios.get('http://localhost:5003/api/files');
        setFiles(response.data);
        setFilteredFiles(response.data); 
      } catch (error) {
        setError('Error fetching files. Please try again later.');
        console.error('Error fetching files:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []); 

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
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar handleSearch={handleSearch} />
      <div className="p-4 bg-gray-50 min-h-screen">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            {error}
          </div>
        )}

        {filteredFiles.length === 0 ? (
          <div className="text-center text-gray-500 text-xl mt-10">No files found</div>
        ) : (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {filteredFiles.map(file => (
              <Link 
                to={`/file/${file._id}`} 
                key={file._id} 
                className="transform transition duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                  {file.coverImage && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={file.coverImage.url}
                        alt={file.title ? `${file.title} cover` : 'File cover'}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
                    </div>
                  )}
              
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Book;