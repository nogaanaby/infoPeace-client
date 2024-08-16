import React, { useEffect, useState } from 'react';
import axios from 'axios';
import env from './CONSTS.js';

function Participants() {
  const [data,setData] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log("Fetched participants data:", data);
                setData(data);
            })
            .catch(error => console.error('Error fetching participants:', error));
    }, []);



  return (
    <div className='d-flex vh-100 justify-content-center align-items-center' >
        <div className='w-50 bg-white rounded p-3'>
          <table className='table'>
          <thead>
              <tr>
                <th>Id</th>
                <th>cond_id</th>
                <th>cond_selection_id</th>
                <th>date_of_birth</th>
              </tr>
            </thead>
            <tbody>
              {data.map((person,index) => {
                return <tr key={index}>
                  <td>{person.per_id}</td>
                  <td>{person.condition_id}</td>
                  <td>{person.country}</td>
                  <td>{person.city}</td>
                  <td>{person.date_of_birth}</td>
                </tr>
              })}
            </tbody>
          </table>
        </div>
    </div>
  );
}

export default Participants;
