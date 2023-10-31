import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

    function Read() {
    const [data, setData] = useState([]);
    const [tabledark, setTableDark]= useState('')

    const fetchData = () => {
        // Fetch data from the API when the component mounts
        axios.get(` http://174.129.98.186:3010/getGoals`)
            .then((response) => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Failed to fetch data:', error);
              });
    };

    const handleDelete = (goalId) =>{

        axios.post(` http://174.129.98.186:3010/deleteGoal`, {id: goalId })
            .then(() => {
                console.log('Goal deleted successfully');
             fetchData(); 
            })
            .catch((error) => {
                console.log('Error deleting goal:', error);
            });
    };
        

    const setToLocalStorage = (id, GoalName, GoalStatus) =>{
        localStorage.setItem("id", id);
        localStorage.setItem("GoalName", GoalName);
        localStorage.setItem("GoalStatus", GoalStatus);
    }

    useEffect(() => {
        // Fetch data from the API when the component mounts
        fetchData();
    }, []);
    
    return (
        <div >
       <div class="form-check form-switch m-3">
       <input class="form-check-input" type="checkbox" 
        onClick={() => {  
            if (tabledark === 'table-dark') setTableDark("")
            else setTableDark("table-dark");
        }}
       />
       </div>     
     <div className='d-flex justify-content-between m-2'>
            <h2>Read Operation</h2>
            <Link to="/"><button className='btn btn-warning'> Create Data </button></Link>
            </div>
            <table className={`table ${tabledark}`}>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">GoalName</th>
                        <th scope="col">GoalStatus</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((eachdata) => (
                        <tr key={eachdata.id}>
                            <th scope="row">{eachdata.id}</th>
                            <td>{eachdata.goalName}</td>
                            <td>{eachdata.goalStatus}</td>
                            <td>
                                <Link to="/Update" className='btn btn-success' onClick={() => setToLocalStorage(
                                    eachdata.id, 
                                    eachdata.goalName, 
                                    eachdata.goalStatus
                                    )}>Edit</Link>
                            </td>
                            <td>
                                <button
                                    className='btn btn-danger'
                                    onClick={() => handleDelete(eachdata.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Read;