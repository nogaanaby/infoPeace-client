import React, { useEffect, useState } from 'react';
import axios from 'axios';
import env from './CONSTS.js';

function Participants() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const participantsPerPage = 10;

  useEffect(() => {
    fetch(`${env}/api`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log("Fetched participants data:", data);
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching participants:', error);
        setLoading(false);
      });
  }, []);

  const indexOfLastParticipant = currentPage * participantsPerPage;
  const indexOfFirstParticipant = indexOfLastParticipant - participantsPerPage;
  const currentParticipants = data.slice(indexOfFirstParticipant, indexOfLastParticipant);

  const handleNextPage = () => {
    if (indexOfLastParticipant < data.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className='d-flex vh-100 justify-content-center align-items-center'>
      <div className='container bg-white rounded p-3'>
        {loading ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="container-md mt-5">
            <div className="table-responsive">
              <table className='table table-bordered mt-3'>
                <thead className='thead-dark'>
                  <tr>
                    <th>Id</th>
                    <th>cond_id</th>
                    <th>country</th>
                    <th>city</th>
                    <th>date_of_birth</th>
                  </tr>
                </thead>
                <tbody>
                  {currentParticipants.map((person, index) => (
                    <tr key={index}>
                      <td>{person.per_id}</td>
                      <td>{person.condition_id}</td>
                      <td>{person.country}</td>
                      <td>{person.city}</td>
                      <td>{person.date_of_birth}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="d-flex justify-content-between mt-3">
              <button className="btn btn-primary" onClick={handlePrevPage} disabled={currentPage === 1}>
                Previous
              </button>
              <button className="btn btn-primary" onClick={handleNextPage} disabled={indexOfLastParticipant >= data.length}>
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Participants;