import React, { useState, useEffect } from "react";
import httpClient from "../httpClient";
import { User } from "../types";
import { Link } from 'react-router-dom';
import './WelcomePage.css'


const LandingPage: React.FC = () => {
  const [employee_id, setEmployeeId] = useState<string>("");
  const [employee_name, setEmployeeName] = useState<string>("");
  const [employee_position, setEmployeePosition] = useState<string>("");
  const [employee_salary, setEmployeeSalary] = useState<string>("");

  const registerUser = async () => {
    try {
      const resp = await httpClient.post("//localhost:5000/register", {
        employee_id,
        employee_name,
        employee_position,
        employee_salary,
      });
      alert("Details Submitted.")
      window.location.href = "/";
    } catch (error: any) {
      if (error.response.status === 401) {
        alert("Invalid credentials");
      }
    }
  };
  const Details = async () => {
    window.location.href = "/details"
  }

  // To Erase Data
  // const eraseData = async () => {
  //   try {
  //     await httpClient.post("//localhost:5000/erase-data");
  //     alert("All data erased.");
  //   } catch (error: any) {
  //     console.error("Error erasing data:", error);
  //     alert("Failed to erase data.");
  //   }
  // };
  return (
    <div className="par">
      <div className="addDetails">
      <h1>Add Details</h1>
          <input type="text" placeholder="Employee ID" value={employee_id} onChange={(e) => setEmployeeId(e.target.value)} id=""/>
          <input type="text" placeholder="Employee Name" value={employee_name} onChange={(e) => setEmployeeName(e.target.value)} id=""/>
          <input type="text" placeholder="Employee Position" value={employee_position} onChange={(e) => setEmployeePosition(e.target.value)} id=""/>
          <input type="text" placeholder="Employee Salary" value={employee_salary} onChange={(e) => setEmployeeSalary(e.target.value)} id=""/>
          <div className="button" onClick={() => registerUser()}>Submit</div>
          <div>or</div>
          <div className="button" onClick={() => Details()}>Show Details</div>
          {/* To Erase Data */}
          {/* <div>or</div>
          <div className="button" onClick={() => eraseData()}>Erase Data</div> */}

    </div>
    </div>
  );
};
export default LandingPage;