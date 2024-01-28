import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import httpClient from '../httpClient';
import './Modify.css';

const ModifyUserForm: React.FC = () => {
  const { employeeId } = useParams<{ employeeId: string }>();
  const [userData, setUserData] = useState<any>({});
  const [editedData, setEditedData] = useState<any>({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const resp = await httpClient.get(`//localhost:5000/userDetails/${employeeId}`);
        setUserData(resp.data);
        setEditedData(resp.data); // Initialize editedData with existing data
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserData();
  }, [employeeId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedData((prevData: any) => ({ ...prevData, [name]: value }));

  };

  const handleSubmit = async () => {
    try {
      // Assuming there is an API endpoint for modifying user details
      await httpClient.put(`//localhost:5000/modify-user/${employeeId}`, editedData);
      // Redirect back to the user details page after modification
      alert("Data Modified!")
      navigate('/details');
      
    } catch (error) {
      console.error('Error modifying user:', error);
    }
  };

  return (
    <div className='full'>
    <div className='modifyDetails'>
      <h1>Modify Employee's Detail</h1>
      <form>
        <input type="text" placeholder='Enter New Position' name="employee_position" value={editedData.employee_position || ''} onChange={handleInputChange}/>
        <input type="text" placeholder='Enter New Salary' name="employee_salary" value={editedData.employee_salary || ''} onChange={handleInputChange}
        />

        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
    </div>
  );
};

export default ModifyUserForm;
