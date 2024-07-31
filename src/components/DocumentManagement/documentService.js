import axios from 'axios';

const API_URL = 'http://localhost:3000/documents';

export const uploadDocument = (formData, userId) => {
    return axios.post(`${API_URL}/upload/${userId}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const getDocumentsByUser = (userId) => {
    return axios.get(`${API_URL}/user/${userId}`);
};

export const downloadDocument = (documentId) => {
    return axios.get(`${API_URL}/download/${documentId}`, {
        responseType: 'blob',
    });
};

export const deleteDocument = (documentId) => {
    return axios.delete(`${API_URL}/${documentId}`);
};
