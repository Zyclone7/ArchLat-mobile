import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ReactReader } from 'react-reader';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { 
  ChevronLeftIcon, 
  BookOpenIcon, 
  UserCircleIcon 
} from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

const FileRead = () => {
  const { fileId } = useParams();
  const navigate = useNavigate();
  const [epubUrl, setEpubUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(localStorage.getItem(`epub-location-${fileId}`) || 'epubcfi(/6/2[cover]!/6)');
  const { user } = useSelector((state) => state.auth);

  // Fetch EPUB URL
  useEffect(() => {
    const fetchFileEpubUrl = async () => {
      try {
        const response = await axios.get(`http://localhost:5003/api/files/${fileId}`);
        if (response.data.url) {
          setEpubUrl(response.data.url);
        } else {
          toast.error('No EPUB URL found for this file.');
        }
      } catch (error) {
        toast.error('Error fetching EPUB URL. Please try again later.');
        console.error('Error fetching EPUB URL:', error);
      } finally {
        setLoading(false);
      }
    };

    if (!user) {
      navigate('/login');
      return;
    }

    fetchFileEpubUrl();
  }, [fileId, navigate, user]);

  const handleLocationChange = (epubcfi) => {
    setLocation(epubcfi);
    localStorage.setItem(`epub-location-${fileId}`, epubcfi);
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100"
      >
        <div className="flex flex-col items-center space-y-4">
          <BookOpenIcon className="h-16 w-16 text-blue-600 animate-pulse" />
          <p className="text-xl text-gray-700">Loading your book...</p>
        </div>
      </motion.div>
    );
  }

  if (!epubUrl) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center min-h-screen bg-red-50"
      >
        <div className="text-center">
          <p className="text-red-600 text-xl mb-4">Failed to load the book</p>
          <button 
            onClick={handleBack} 
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Go Back
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* Header */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md"
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBack} 
            className="text-gray-600 hover:text-blue-600 transition"
          >
            <ChevronLeftIcon className="h-8 w-8" />
          </motion.button>

          <div className="flex items-center space-x-3">
            {user?.name && (
              <div className="flex items-center space-x-2">
                <UserCircleIcon className="h-8 w-8 text-blue-600" />
                <span className="text-gray-800 font-medium">{user.name}</span>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* EPUB Reader */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="pt-16 h-screen"
      >
        <ReactReader
          url={epubUrl}
          location={location}
          locationChanged={handleLocationChange}
          styles={{
            container: {
              height: '100%',
              background: 'transparent',
            },
            readerArea: {
              transition: 'transform 0.3s ease',
            },
          }}
        />
      </motion.div>
    </div>
  );
};

export default FileRead;