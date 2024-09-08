import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ReactReader } from 'react-reader';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { reset } from '../features/auth/authSlice';

const FileRead = () => {
  const { fileId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [epubUrl, setEpubUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(localStorage.getItem(`epub-location-${fileId}`) || 'epubcfi(/6/2[cover]!/6)');
  const [startTime, setStartTime] = useState(null);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const [inactiveTime, setInactiveTime] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [resumeTimeout, setResumeTimeout] = useState(null);

  const { user } = useSelector((state) => state.auth);
  const userId = user ? user._id : null;

  // Fetch EPUB URL
  useEffect(() => {
    const fetchFileEpubUrl = async () => {
      try {
        const response = await axios.get(`https://file-service-api.onrender.com/api/files/${fileId}`);
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
    }

    fetchFileEpubUrl();

    return () => {
      dispatch(reset());
    };

  }, [fileId, navigate, dispatch, user]);

  const handleLocationChange = (epubcfi) => {
    setLocation(epubcfi);
    localStorage.setItem(`epub-location-${fileId}`, epubcfi); // Save location in localStorage
  };

  // Track user activity and inactivity
  useEffect(() => {
    const handleUserActivity = () => {
      setLastActivityTime(Date.now());
      if (!isActive) {
        setIsActive(true);
        if (resumeTimeout) {
          clearTimeout(resumeTimeout);
          setResumeTimeout(null);
        }
      }
    };

    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('keydown', handleUserActivity);

    const checkInactivity = setInterval(() => {
      const currentTime = Date.now();
      const timeSinceLastActivity = currentTime - lastActivityTime;

      if (isActive && timeSinceLastActivity > 300000) { // 5 minutes
        setIsActive(false);
        setInactiveTime((prev) => prev + (currentTime - lastActivityTime));
        setResumeTimeout(setTimeout(() => {
          setIsActive(true);
          setLastActivityTime(Date.now());
        }, 600000)); // 10 minutes
      }
    }, 1000);

    return () => {
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
      clearInterval(checkInactivity);
      if (resumeTimeout) clearTimeout(resumeTimeout);
    };
  }, [lastActivityTime, isActive, resumeTimeout]);

  // Start tracking time on component mount
  useEffect(() => {
    setStartTime(Date.now());

    return async () => {
      if (startTime && userId) {
        const currentTime = Date.now();
        const totalTimeSpent = (currentTime - startTime) - inactiveTime;

        if (totalTimeSpent > 0) {
          try {
            await axios.post(`http://localhost:5000/time-spent/${userId}/${fileId}`, { timeSpent: Math.floor(totalTimeSpent / 1000) }); // time in seconds
          } catch (error) {
            console.error('Error saving time spent:', error);
          }
        }
      } else if (!userId) {
        console.error('User ID is not available');
      }
    };
  }, [startTime, userId, inactiveTime]);

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return <div>Loading EPUB...</div>;
  }

  if (!epubUrl) {
    return <div>Failed to load EPUB. Please check the URL or try again later.</div>;
  }

  return (
    <div>
      <button onClick={handleBack}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
        </svg>
      </button>
      <div style={{ height: '100vh' }}>
        <ReactReader
          url={epubUrl}
          location={location}
          locationChanged={handleLocationChange} // Save location change
        />
      </div>
    </div>
  );
};

export default FileRead;
