import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
const url='http://localhost:5000'

function App() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ username: '', age: '' });
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${url}/users`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (selectedUserId) {
        await axios.put(`${url}/users/${selectedUserId}`, formData);
      } else {
        await axios.post(`${url}/users`, formData);
      }
      fetchUsers();
      setFormData({ username: '', age: '' });
      setSelectedUserId(null);
    } catch (error) {
      console.error('Error adding/updating user:', error);
    }
  };

  const selectUser = user => {
    setFormData({ username: user.username, age: user.age });
    setSelectedUserId(user._id);
  };

  const deleteUser = async id => {
    try {
      await axios.delete(`${url}/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="App">
      <h1>Users</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
        />
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Age"
        />
        <button type="submit">{selectedUserId ? 'Update User' : 'Add User'}</button>
      </form>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            <p >Name:{user.username}</p> 
            <p>Age: {user.age}</p>
            <button onClick={() => selectUser(user)}>Edit</button>
            <button onClick={() => deleteUser(user._id)}>Delete</button>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default App;

