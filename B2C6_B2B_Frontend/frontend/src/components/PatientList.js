import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'voornaam', direction: 'ascending' });

  useEffect(() => {
    axios.get('http://localhost:5000/patients')
      .then(response => {
        console.log('Data fetched from API:', response.data);
        setPatients(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the patients!', error);
      });
  }, []);

  const sortPatients = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedPatients = [...patients].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });
  const Dropdown = ({ label, options, onSelect }) => {
    return (
      <select value={sortConfig.key} onChange={(e) => onSelect(e.target.value)}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  };

  return (

    
    <div>
      <tr>
        <th>
          <Dropdown
            label="Sort By"
            options={[
              { value: 'voornaam', label: 'Voornaam' },
              { value: 'achternaam', label: 'achternaam' },
              { value: 'geboortedatum', label: 'geboortedatum' },
              { value: 'geslacht', label: 'geslacht' },
              { value: 'diagnose', label: 'diagnose' }
            ]}
            onSelect={(selectedKey) => sortPatients(selectedKey)}
          />
        </th>
      </tr>
      <h1>Patiënten Overzicht</h1>
      <table>
        <thead>
          <tr>
            <th className="patient-header">Voornaam</th>
            <th className="patient-header">Achternaam</th>
            <th className="patient-header">Geboortedatum</th>
            <th className="patient-header">Geslacht</th>
            <th className="patient-header">Diagnose</th>
          </tr>
        </thead>
        <tbody>
          {sortedPatients.map((patient) => (
            <tr key={patient.id}className="patient-row">
              <td className="patient-cell">{patient.voornaam}</td>
              <td className="patient-cell">{patient.achternaam}</td>
              <td className="patient-cell">{patient.geboortedatum}</td>
              <td className="patient-cell">{patient.geslacht}</td>
              <td className="patient-cell">{patient.diagnose}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientList;
