// src/pages/AdminPanel/FeedbackReports.jsx
import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import BackButton from '../../components/BackButton';

const FeedbackReports = () => {
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      const response = await axios.get('/admin/feedback');
      setFeedback(response.data);
    };
    fetchFeedback();
  }, []);

  return (
    <div className="feedback-reports">
      <BackButton />
      <h2>Feedback & Reports</h2>
      <ul>
        {feedback.map((item) => (
          <li key={item._id}>
            {item.customerName} - {item.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeedbackReports;
