import axios from 'axios';
import React, {  useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Update= () => {
  const [goalName, setgoalName] = useState("");
  const [goalStatus, setgoalStatus] = useState("");

  const navigate = useNavigate();

  
  
  
   const handleUpdate = (e) => {
    e.preventDefault();
    axios.post(`http://174.129.98.186:3010/updateGoal/`,
    {
      goalName: goalName,
      goalStatus: goalStatus,
    })
    
    .then(()=>{
      navigate("/read");
    })

    .catch((error) => {
      console.error('Error updating data:', error);
    });
  };
  return (
    <div className="container">
      <h2>Update Goal</h2>
      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label htmlFor="goalName">Goal Name</label>
          <input
            type="text"
            className="form-control"
            id="goalName"
            name='goalName'
            value={goalName}
            onChange={(e) => setgoalName( e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="goalStatus">Goal Status</label>
          <input
            type="text"
            className="form-control"
            id="goalStatus"
            name='goalStatus'
            value={goalStatus}
            onChange={(e) => setgoalStatus( e.target.value)}

          />
        </div>
        <button className="btn btn-success" onClick={handleUpdate}>Update</button>
        <Link to="/read" className="btn btn-primary ms-3">Back</Link>
      </form>
    </div>
  );
}

export default Update;
