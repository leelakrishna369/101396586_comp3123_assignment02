import 'bulma/css/bulma.min.css';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../apiClient';

export const ViewById = () => {
  const { id } = useParams();
  const [viewEmp, setViewEmp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployeeId = async () => {
      try {
        const response = await apiClient.get(`/api/v1/emp/employees/${id}`);
        setViewEmp(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch employee details.');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeId();
  }, [id]);

  if (loading) {
    return <p className="has-text-centered mt-4">Loading employee details...</p>;
  }

  if (error) {
    return <p className="notification is-danger has-text-centered mt-4">{error}</p>;
  }

  if (!viewEmp) {
    return <p className="has-text-centered mt-4">No employee data available.</p>;
  }

  return (
    <div className="container is-max-desktop mt-5">
      <div className="box">
        <h1 className="title is-4 has-text-centered">Employee Details</h1>
        <div className="content">
          <p>
            <strong>First Name: </strong> {viewEmp.first_name}
          </p>
          <p>
            <strong>Last Name: </strong> {viewEmp.last_name}
          </p>
          <p>
            <strong>Email: </strong> {viewEmp.email}
          </p>
          <p>
            <strong>Department: </strong> {viewEmp.department}
          </p>
          <p>
            <strong>Position: </strong> {viewEmp.position}
          </p>
          <p>
            <strong>Salary: </strong> {viewEmp.salary}
          </p>
          <p>
            <strong>Date of Joining: </strong> {new Date(viewEmp.date_of_joining).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};
