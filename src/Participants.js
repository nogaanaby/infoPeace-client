import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Participants() {
  const [data,setData] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3001/')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
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
                  <td>{person.cond_selection_id}</td>
                  <td>{person.country_id}</td>
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
