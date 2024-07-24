import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardBody, Container, Row, Col, Table, Button, Input } from 'reactstrap';
import SimpleFooter from 'components/Footers/SimpleFooter';
import DemoNavbar from 'components/Navbars/DemoNavbar';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [managers, setManagers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [editingUser, setEditingUser] = useState({});

  useEffect(() => {
    axios.get('http://localhost:3000/users')
        .then(response => {
          setUsers(response.data);
        })
        .catch(error => {
          console.error('There was an error fetching the users!', error);
        });

    axios.get('http://localhost:3000/users/role/1')
        .then(response => {
          setManagers(response.data);
        })
        .catch(error => {
          console.error('There was an error fetching the managers!', error);
        });

    axios.get('http://localhost:3000/roles')
        .then(response => {
          setRoles(response.data);
        })
        .catch(error => {
          console.error('There was an error fetching the roles!', error);
        });
  }, []);

  const handleInputChange = (e, id) => {
    const { name, value } = e.target;
    setEditingUser(prevState => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        [name]: value
      }
    }));
  };

  const handleConfirm = (id) => {
    const updatedUser = editingUser[id];
    axios.put(`http://localhost:3000/users/${id}`, updatedUser)
        .then(response => {
          setUsers(users.map(user => user.id === id ? response.data : user));
          setEditingUser(prevState => {
            const newState = { ...prevState };
            delete newState[id];
            return newState;
          });
          window.location.reload();

        })
        .catch(error => {
          console.error('There was an error updating the user!', error);
        });
  };

  return (
      <main>
        <DemoNavbar/>
        <section className="section section-shaped section-lg">
          <div className="shape shape-style-1 bg-gradient-default">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <Container className="pt-lg-7">
            <Row className="justify-content-center">
              <Col lg="12">
                <Card className="shadow border-0">
                  <CardBody className="px-lg-5 py-lg-5">
                    <div className="text-center text-muted mb-4">
                      <h2>User List</h2>
                    </div>
                    <Table className="align-items-center table-flush" responsive>
                      <thead className="thead-light">
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Manager</th>
                        <th scope="col">Actions</th>
                      </tr>
                      </thead>
                      <tbody>
                      {users.map(user => (
                          <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>
                              <Input
                                  type="text"
                                  name="username"
                                  defaultValue={user.username}
                                  onChange={(e) => handleInputChange(e, user.id)}
                              />
                            </td>
                            <td>
                              <Input
                                  type="email"
                                  name="email"
                                  defaultValue={user.email}
                                  onChange={(e) => handleInputChange(e, user.id)}
                              />
                            </td>
                            <td>
                              <Input
                                  type="select"
                                  name="role"
                                  value={editingUser[user.id]?.role || user.role?.id || ''}
                                  onChange={(e) => handleInputChange(e, user.id)}
                              >
                                {user.role ? (
                                    <option value={user.role.id}>
                                      {user.role.name}
                                    </option>
                                ) : (
                                    <option value="">Select Role</option>
                                )}
                                {roles
                                    .filter(role => role.id !== user.role?.id)
                                    .map(role => (
                                        <option key={role.id} value={role.id}>
                                          {role.name}
                                        </option>
                                    ))}
                              </Input>
                            </td>
                            <td>
                              <Input
                                  type="select"
                                  name="manager"
                                  value={editingUser[user.id]?.manager || user.manager?.id || ''}
                                  onChange={(e) => handleInputChange(e, user.id)}
                              >
                                {user.manager ? (
                                    <option value={user.manager.id}>
                                      {user.manager.username}
                                    </option>
                                ) : (
                                    <option value="">Select Manager</option>
                                )}
                                {managers
                                    .filter(manager => manager.id !== user.manager?.id)
                                    .map(manager => (
                                        <option key={manager.id} value={manager.id}>
                                          {manager.username}
                                        </option>
                                    ))}
                              </Input>
                            </td>
                            <td>
                              <Button color="primary" size="sm" onClick={() => handleConfirm(user.id)}>Confirm</Button>
                            </td>
                          </tr>
                      ))}
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
        <SimpleFooter />
      </main>
  );
};

export default UserTable;