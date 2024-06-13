import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import ResultDetails from './ResultDetails';

const App = () => {
  const [results, setResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/results');
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  };

  const viewResult = async (resultId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/results/${resultId}`);
      console.log(response.data); // Log de ontvangen data
      setSelectedResult(response.data);
      document.getElementById("myModal").style.display = "block";
    } catch (error) {
      console.error('Error fetching result details:', error);
    }
  };

  const deleteResult = async (resultId) => {
    if (window.confirm('Weet je zeker dat je dit resultaat wilt verwijderen?')) {
      try {
        await axios.delete(`http://localhost:5000/api/results/${resultId}`);
        fetchResults();
      } catch (error) {
        console.error('Error deleting result:', error);
      }
    }
  };

  const closeModal = () => {
    setSelectedResult(null);
    document.getElementById("myModal").style.display = "none";
  };

  return (
    <div className="container">
      <h1>Resultaten</h1>
      <table>
        <thead>
          <tr>
            <th>Naam</th>
            <th>Type</th>
            <th>Datum</th>
            <th>Acties</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => (
            <tr key={result.id}>
              <td>{result.name}</td>
              <td>{result.type}</td>
              <td>{new Date(result.date).toLocaleString()}</td>
              <td className="actions">
                <i className="fas fa-eye" onClick={() => viewResult(result.id)}></i>
                <i className="fas fa-trash" onClick={() => deleteResult(result.id)}></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedResult && (
        <div id="myModal" className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <ResultDetails resultId={selectedResult.id} />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
