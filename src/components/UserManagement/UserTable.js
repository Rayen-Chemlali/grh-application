import React, { useEffect, useState } from 'react';
import { Card, CardBody, Table, Input, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { fetchUsers, fetchManagers, fetchRoles, updateUser, deleteUser } from './UserTableService';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [managers, setManagers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [editingUser, setEditingUser] = useState({});
    const [passwordFields, setPasswordFields] = useState({});

    useEffect(() => {
        const loadData = async () => {
            try {
                const [usersData, managersData, rolesData] = await Promise.all([
                    fetchUsers(),
                    fetchManagers(),
                    fetchRoles(),
                ]);
                setUsers(usersData);
                setManagers(managersData);
                setRoles(rolesData);
            } catch (error) {
                console.error('There was an error loading data!', error);
            }
        };

        loadData();
    }, []);

    const handleInputChange = (e, id) => {
        const { name, value } = e.target;
        if (name === 'password') {
            setPasswordFields(prevState => ({
                ...prevState,
                [id]: value,
            }));
        } else {
            setEditingUser(prevState => ({
                ...prevState,
                [id]: {
                    ...prevState[id],
                    [name]: value,
                },
            }));
        }
    };

    const handleConfirm = async (id) => {
        const updatedUser = {
            ...editingUser[id],
            password: passwordFields[id] || users.find(user => user.id === id)?.password,
        };

        try {
            const response = await updateUser(id, updatedUser);
            setUsers(users.map(user => user.id === id ? response : user));
            setEditingUser(prevState => {
                const newState = { ...prevState };
                delete newState[id];
                return newState;
            });
            setPasswordFields(prevState => {
                const newState = { ...prevState };
                delete newState[id];
                return newState;
            });
        } catch (error) {
            console.error('There was an error updating the user!', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteUser(id);
            setUsers(users.filter(user => user.id !== id));
        } catch (error) {
            console.error('There was an error deleting the user!', error);
        }
    };

    return (
        <Card className="shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
                <div className="text-center text-muted mb-4">
                    <h2>Users List</h2>
                </div>
                <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Password</th>
                        <th scope="col" style={{ width: '120px' }}>Role</th>
                        <th scope="col">Manager</th>
                        <th scope="col">Manage Documents</th>
                        <th scope="col">Confirm Changes</th>
                        <th scope="col">Delete</th>
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
                                    type="password"
                                    name="password"
                                    placeholder="Enter new password"
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
                                        <option value="">Select role</option>
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
                                <Link to={`/documents/${user.id}`}>
                                    <Button color="info" size="sm">Manage Documents</Button>
                                </Link>
                            </td>
                            <td>
                                <EditButton onEdit={() => handleConfirm(user.id)} />
                            </td>
                            <td>
                                <DeleteButton onDelete={() => handleDelete(user.id)} />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    );
};

export default UserTable;
