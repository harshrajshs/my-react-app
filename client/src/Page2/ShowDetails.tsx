import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import httpClient from '../httpClient';
import './ShowDetails.css';


const UserDetails: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]); // Array to store all users
  const [filterName, setFilterName] = useState<string>('');
  const [filterSalary, setFilterSalary] = useState<string>('');
  const [sortColumn, setSortColumn] = useState<string>(''); // State to store the column for sorting
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc'); // State to store the sorting order
  const navigate = useNavigate();

  // To get Users Data from server side

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const resp = await httpClient.get('//localhost:5000/userDetails');
        setUsers(resp.data); // Assuming resp.data is an array of user objects
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    fetchUserDetails();
  }, []);

  // Sorting Users based on the selected column

  const sortedUsers = [...users].sort((a, b) => {
    if (sortColumn === 'employee_name') {
      return sortOrder === 'asc' ? a.employee_name.localeCompare(b.employee_name) : b.employee_name.localeCompare(a.employee_name);
    } else if (sortColumn === 'employee_salary') {
      const salaryA = parseInt(a.employee_salary.replace(',', ''), 10); // Remove commas from salary
      const salaryB = parseInt(b.employee_salary.replace(',', ''), 10);
      return sortOrder === 'asc' ? salaryA - salaryB : salaryB - salaryA;
    }
    return 0;
  });

  // Filtering Employees by searching by name or salary

  const filteredUsers = sortedUsers.filter(
    (user) =>
      user.employee_name.toLowerCase().includes(filterName.toLowerCase()) &&
      user.employee_salary.includes(filterSalary)
  );

  // Handle column sorting

  const handleSort = (column: string) => {
    setSortColumn(column);
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  // To go back to Page1

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className='showDetails'>
      <h1>Employee's Details</h1>
      <div className='filter'>
        <input
          type='text'
          id='nameFilter'
          placeholder='Filter by Name'
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
        />
        <input
          type='text'
          id='salaryFilter'
          placeholder='Filter by Salary'
          value={filterSalary}
          onChange={(e) => setFilterSalary(e.target.value)}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th onClick={() => handleSort('employee_name')}>Name</th>
            <th>Position</th>
            <th onClick={() => handleSort('employee_salary')}>Salary</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={index}>
              <td>{user.employee_id}</td>
              <td>{user.employee_name}</td>
              <td>{user.employee_position}</td>
              <td>{user.employee_salary}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleBack}>Back</button>
    </div>
  );
};

export default UserDetails;