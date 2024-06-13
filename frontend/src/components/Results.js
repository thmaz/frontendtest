import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ResultDetails.css';

const ResultDetails = ({ resultId }) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/results/${resultId}`);
        setResult(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [resultId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container">
      <div className="header">
        <h1>Resultaten Radiologie</h1>
      </div>

      <div className="patient-info">
        <img src="path_to_patient_image.jpg" alt="Patient" width="100" height="100" />
        <div className="patient-details">
          <div>
            <strong>Naam:</strong> {result.name}
          </div>
          <div>
            <strong>Leeftijd:</strong> 10 jaar
          </div>
          <div>
            <strong>Diagnose:</strong> JDM (monocyclische)
          </div>
          <div>
            <strong>Medicatie:</strong> x medicijn
          </div>
          <div>
            <strong>Afpraken:</strong> 4
          </div>
        </div>
      </div>

      <div className="radiology-details">
        <h2>Radiologie uitslagen</h2>
        <table>
          <thead>
            <tr>
              <th>Aspect</th>
              <th>Type</th>
              <th>Beoordeling</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{result.details.aspect}</td>
              <td>{result.details.type}</td>
              <td>Beoordeling hier</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="blood-chemistry">
        <h2>Bloedchemie</h2>
        <table>
          <thead>
            <tr>
              <th>Parameter</th>
              <th>Referentiewaarde</th>
              <th>Waarde</th>
            </tr>
          </thead>
          <tbody>
            {result.blood_chemistry.map((chemistry, index) => (
              <tr key={index}>
                <td>{chemistry.parameter}</td>
                <td>{chemistry.reference_range}</td>
                <td><span>{chemistry.value}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultDetails;
