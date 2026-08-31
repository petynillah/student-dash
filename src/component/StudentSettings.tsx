import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../api';
import axios from 'axios';

interface StudentProfile {
  id: string;
  student_id: string;
  name: string;
  gender: string;
  age: number | string;
  education_level: string;
  institution_name: string;
  role: string;
}

interface DecodedToken {
  id: string | number;
  student_id: string;
  name: string;
  role: string;
}

function Settings(): React.JSX.Element {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchProfile = async (): Promise<void> => {
      try {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
          setError('You are not logged in.');
          setLoading(false);
          return;
        }

        const decoded = jwtDecode<DecodedToken>(token);
        const response = await api.get(`/student/${decoded.id}`);
        setProfile(response.data?.data || null);
      } catch (err: unknown) {
        console.error('Failed to load profile:', err);
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || 'Failed to load your profile.');
        } else {
          setError('Could not reach the server.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div className="settings"><p>Loading your profile...</p></div>;
  }

  if (error) {
    return <div className="settings"><p style={{ color: 'red' }}>{error}</p></div>;
  }

  if (!profile) {
    return <div className="settings"><p>No profile data found.</p></div>;
  }

  return (
    <div className="settings">
      <h1 className="head1">My Profile</h1>
      <div className="table-part">
        <table>
          <tbody>
            <tr>
              <td><strong>Student ID</strong></td>
              <td>{profile.student_id}</td>
            </tr>
            <tr>
              <td><strong>Name</strong></td>
              <td>{profile.name}</td>
            </tr>
            <tr>
              <td><strong>Gender</strong></td>
              <td>{profile.gender}</td>
            </tr>
            <tr>
              <td><strong>Age</strong></td>
              <td>{profile.age}</td>
            </tr>
            <tr>
              <td><strong>Education Level</strong></td>
              <td>{profile.education_level}</td>
            </tr>
            <tr>
              <td><strong>Institution</strong></td>
              <td>{profile.institution_name}</td>
            </tr>
            <tr>
              <td><strong>Role</strong></td>
              <td>{profile.role}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Settings;