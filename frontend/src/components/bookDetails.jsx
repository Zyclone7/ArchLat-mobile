import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { logout, reset } from '../features/auth/authSlice';

const BookDetails = () => {
  const { fileId } = useParams();
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
        const response = await axios.get(`https://file-service-api.onrender.com/api/files/${fileId}`);
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
    navigate(`/read/${file._id}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        {error}
        <button onClick={() => window.location.reload()} style={{ marginTop: '20px' }}>
          Retry
        </button>
      </div>
    );
  }

  if (!file) {
    return <div>File not found</div>;
  }

  return (
    <div className="relative">
      {/* Back button at the top-left corner */}
      <button onClick={handleBack} className="absolute top-4 left-4 p-2 text-blue-500 hover:text-blue-700">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
        </svg>
      </button>

      {/* First section with a specific height */}
      <div className="text-white p-8 h-48" style={{ backgroundColor: '#ad8440' }}>
        {/* Add content here if needed */}
      </div>

      {/* Floating image with custom dimensions and button */}
      <div className="absolute left-1/2 transform -translate-x-1/2 top-10">
        {file.coverImage && (
          <img
            src={file.coverImage.url}
            alt="Floating"
            className="shadow-lg w-[150px] h-[200px]"
          />
        )}
        <div className="mt-4 flex justify-center">
          <button
            className="text-white py-2 px-4 rounded shadow-md hover:bg-blue-600"
            style={{ backgroundColor: '#0C5673' }}
            onClick={handleRead}
          >
            Read
          </button>
        </div>
      </div>

      {/* Second section with a full-height background color and text */}
      <div className="p-8 h-screen flex items-center justify-center" style={{ backgroundColor: '#EDE7D9' }}>
        <div className="text-center mt-[-40px]">
          <h2 className="text-2xl font-semibold mb-2">{file.title}</h2>
          <p className="text-lg mb-4">{file.author}</p>
          <p className="text-base">{file.description}</p> {/* Display description */}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
