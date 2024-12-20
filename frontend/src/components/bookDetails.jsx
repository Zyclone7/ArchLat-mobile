import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { logout, reset } from '../features/auth/authSlice';
import { ChevronLeft, Book } from 'lucide-react';

const BookDetails = () => {
  const { fileId, courseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const userId = user ? user.userId : null;

  useEffect(() => {
    let isMounted = true;

    const fetchFileDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`http://localhost:5003/api/files/${fileId}`);
        if (isMounted) {
          setFile(response.data);
        }
      } catch (error) {
        setError('Error fetching file details. Please try again later.');
        toast.error('Error fetching file details. Please try again later.');
        console.error('Error fetching file details:', error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (!user) {
      toast.info('Please log in to view the file details.');
      navigate('/login');
      return;
    }

    fetchFileDetails();

    return () => {
      isMounted = false;
      dispatch(reset());
    };
  }, [fileId, userId, user, navigate, dispatch]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleRead = () => {
    if (file) {
      navigate(`/read/${file._id}`);
    } else {
      toast.error('Course ID not found for this file.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-xl font-semibold text-gray-700 animate-pulse">
          Loading book details...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 p-4">
        <p className="text-red-600 text-lg mb-4 text-center">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!file) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-700 text-xl">File not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 p-4 z-10">
        <button 
          onClick={handleBack} 
          className="group flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ChevronLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back
        </button>
      </nav>

      {/* Book Details Container */}
      <div className="container mx-auto px-4 py-16 grid md:grid-cols-2 gap-8 items-center">
        {/* Book Cover Section */}
        <div className="flex flex-col items-center">
          {file.coverImage && (
            <div className="relative">
              <img
                src={file.coverImage.url}
                alt={`Cover of ${file.title}`}
                className="w-64 h-96 object-cover rounded-xl shadow-2xl transform transition-transform hover:scale-105"
              />
              <div className="absolute inset-0 bg-black opacity-10 rounded-xl"></div>
            </div>
          )}
          <button
            onClick={handleRead}
            className="mt-6 w-full max-w-xs flex items-center justify-center bg-blue-600 text-white py-3 px-6 rounded-full shadow-lg hover:bg-blue-700 transition-colors group"
          >
            <Book className="mr-2 group-hover:animate-bounce" />
            Start Reading
          </button>
        </div>

        {/* Book Information Section */}
        <div className="text-center md:text-left space-y-4">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">{file.title}</h1>
          <p className="text-xl text-gray-600 italic mb-4">by {file.author}</p>
          
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-3">Description</h2>
            <p className="text-gray-600 leading-relaxed">
              {file.description || 'No description available.'}
            </p>
          </div>

          {/* Optional: Additional Book Metadata */}
          <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="font-semibold text-gray-600">Genre</p>
              <p className="text-gray-800">{file.genre || 'Unknown'}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="font-semibold text-gray-600">Pages</p>
              <p className="text-gray-800">{file.pageCount || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;