import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StatisticsByMedication = () => {
  const [medicationStats, setMedicationStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMedicationStats = async () => {
      try {
        const response = await axios.get('/api/medications/medication-sales-report');
        setMedicationStats(response.data.report.totalSales);
        setLoading(false);
      } catch (error) {
        console.error('There was an error fetching the medication statistics!', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchMedicationStats();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>There was an error fetching the medication statistics!</div>;
  }

  return (
    <div>
      <h2>Statistics By Medication</h2>
      <table>
        <thead>
          <tr>
            <th>Medication Name</th>
            <th>Total Quantity</th>
            <th>Total Revenue</th>
          </tr>
        </thead>
        <tbody>
          {medicationStats.map((medication) => (
            <tr key={medication._id}>
              <td>{medication._id}</td>
              <td>{medication.totalQuantity}</td>
              <td>{medication.totalRevenue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StatisticsByMedication;