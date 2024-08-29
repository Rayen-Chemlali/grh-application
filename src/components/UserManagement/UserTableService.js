import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const fetchUsers = () => axios.get(`${API_URL}/users`).then(res => res.data);

export const fetchManagers = () => axios.get(`${API_URL}/users/role/1`).then(res => res.data);

export const fetchRoles = () => axios.get(`${API_URL}/roles`).then(res => res.data);

export const updateUser = (id, updatedUser) => axios.put(`${API_URL}/users/${id}`, updatedUser).then(res => res.data);

export const deleteUser = (id) => axios.delete(`${API_URL}/users/${id}`).then(res => res.data);
