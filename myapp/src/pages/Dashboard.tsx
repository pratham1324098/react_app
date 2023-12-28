import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import '../styles/Dashboard.css';

interface User {
  _id: string;
  name: string;
  email: string;
  address: string;
  phonenumber: string;
}

function Dashboard() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');

  const addUsers = async () => {
    try {
      const response = await fetch('/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          address,
          phoneNumber,
        }),
      });

      const data = await response.json();

      if (data.success) {
        fetchUsers();
        console.log('User added successfully:', data.user);
        // Add any additional logic or state updates if needed
      } else {
        console.error('Failed to add user:', data.message);
      }
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      // Call your API endpoint to fetch all users
      const response = await fetch('/api/v1/data/all');
      const data = await response.json();

      if (data.success) {
        setUsers(data.users);
      } else {
        console.error('Failed to fetch users');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const removeUser = async (userId: string) => {
    try {
      const response = await fetch(`/api/v1/data/remove/${userId}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.success) {
        // Fetch users again after successful removal
        fetchUsers();
      } else {
        console.error('Failed to remove user');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Fetch users when the component mounts
    fetchUsers();
  }, []);

  return (
    <>
      {/* <SearchBar/> */}
      <Container className="mt-5">
        <Row>
          <Col sm={20}>
            <Form className="d-flex">
              <Form.Control
                onChange={(e) => setSearch(e.target.value)}
                type="search"
                placeholder="Search"
                className="me-2 rounded-pill"
                aria-label="Search"
              />
              <Button className="rounded-pill" variant="outline-primary">
                Search
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <div className="total">
        <h1>All the Users are listed here</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Address</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Remove </th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter((user) =>
                search.toLowerCase() === ''
                  ? user
                  : user.name.toLowerCase().includes(search)
              )
              .map((user) => (
                <tr key={user._id}>
                  <th scope="row">{user.name}</th>
                  <td>{user.email}</td>
                  <td>{user.address}</td>
                  <td>{user.phonenumber}</td>
                  <td>
                    <button onClick={() => removeUser(user._id)}>Remove</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <form className="form-container" onSubmit={addUsers}>
          <div className="form-group">
            <label htmlFor="fullName">Name</label>
            <input
              type="text"
              className="form-control input-field"
              id="fullName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your Name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control input-field"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control input-field"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              className="form-control input-field"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter Address"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phonenumber">Phone Number</label>
            <input
              type="text"
              className="form-control input-field"
              id="phonenumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Phone Number"
            />
          </div>
          <button type="submit">Add New User</button>
        </form>
      </div>
    </>
  );
}

export default Dashboard;
