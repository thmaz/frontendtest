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
        console.log(response.data); // Log de ontvangen data
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
  if (!result) return <p>Geen data beschikbaar</p>;

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

      {result.type === 'Radiologie' && (
        <div className="radiology-details">
          <h2>Radiologie uitslagen</h2>
          {result.details && Array.isArray(result.details) && (
            <table>
              <thead>
                <tr>
                  <th>Aspect</th>
                  <th>Type</th>
                  <th>Beoordeling</th>
                </tr>
              </thead>
              <tbody>
                {result.details.map((detail, index) => (
                  <tr key={index}>
                    <td>{detail.aspect}</td>
                    <td>{detail.type}</td>
                    <td>{detail.comments}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {result.details && !Array.isArray(result.details) && (
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
                  <td>{result.details.comments}</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      )}

      {result.type === 'Myometrie' && (
        <div className="myometry-details">
          <h2>Myometrie uitslagen</h2>
          {result.details && Array.isArray(result.details) && (
            <div className="myometry-table">
              <div className="myometry-header">
                <span>aspect</span>
                <span>type</span>
                <span>behaalde score</span>
                <span>gemiddelde score</span>
                <span></span>
              </div>
              {result.details.map((detail, index) => (
                <div key={index} className={`myometry-row ${detail.score >= detail.average_score ? 'positive' : 'negative'}`}>
                  <span>{detail.aspect}</span>
                  <span>{detail.type}</span>
                  <span>+{detail.score}/50</span>
                  <span>{detail.average_score}/50</span>
                  <span><i className="fas fa-search"></i></span>
                </div>
              ))}
            </div>
          )}
          {result.details && !Array.isArray(result.details) && (
            <div className="myometry-table">
              <div className="myometry-header">
                <span>aspect</span>
                <span>type</span>
                <span>behaalde score</span>
                <span>gemiddelde score</span>
                <span></span>
              </div>
              <div className={`myometry-row ${result.details.score >= result.details.average_score ? 'positive' : 'negative'}`}>
                <span>{result.details.aspect}</span>
                <span>{result.details.type}</span>
                <span>+{result.details.score}/50</span>
                <span>{result.details.average_score}/50</span>
                <span><i className="fas fa-search"></i></span>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="blood-chemistry">
        <h2>Bloedchemie</h2>
        {result.blood_chemistry && result.blood_chemistry.length > 0 ? (
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
                  <td>{chemistry.value} {chemistry.unit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Geen bloedchemie gegevens beschikbaar</p>
        )}
      </div>
    </div>
  );
};

export default ResultDetails;
