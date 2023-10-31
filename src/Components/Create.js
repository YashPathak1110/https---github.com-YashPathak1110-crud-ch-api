import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Create = () => {
    const [goalName, setName] = useState("")
    const [goalStatus, setEmail] = useState("");
    const history = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        

        // Create a new goal object
        const newGoal = {
            
            goalName,
            goalStatus,
        };

        axios.post(` http://174.129.98.186:3010/addGoal `, newGoal)
            .then(() => {
                console.log('Goal added successfully');
                history('/read');
            })
            .catch((error) => {
                console.error('Error adding goal:', error);
            });
    };

    return (
        <div>
            <div className='d-flex justify-content-between m-2'>
            <h2>Create</h2>
            <Link to="/read"><button className='btn btn-success'> Show Data </button></Link>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label  className="form-label">GoalName</label>
                    <input type="text" className="form-control"  
                    onChange={(e) => setName(e.target.value)}

                    />
                </div> 
                <div className="mb-3">
                    <label  className="form-label">GoalStatus</label>
                    <input type="option" className="form-control"  
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                
                <button type="submit" className="btn btn-primary"
                onClick={handleSubmit}
                >Submit</button>
            </form>

        </div>
    )
}

export default Create