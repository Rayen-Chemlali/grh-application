import axios from "axios";

const API_URL = "http://localhost:3000/evaluations";

const getEvaluationsByManager = async (managerId) => {
    try {
        const response = await axios.get(`${API_URL}/manager/${managerId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching evaluations by manager:', error);
        throw error;
    }
};

const getManagedUsers = async (managerId) => {
    try {
        const response = await axios.get(`http://localhost:3000/users/${managerId}/managed-employees`);
        return response.data;
    } catch (error) {
        console.error('Error fetching managed users:', error);
        throw error;
    }
};

const createEvaluation = async (evaluationData) => {
    try {
        const response = await axios.post(API_URL, evaluationData);
        return response.data;
    } catch (error) {
        console.error('Error creating evaluation:', error);
        throw error;
    }
};

const updateEvaluation = async (id, updateData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, updateData);
        return response.data;
    } catch (error) {
        console.error('Error updating evaluation:', error);
        throw error;
    }
};

const getEvaluationsByUser = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/user/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching evaluations by user:', error);
        throw error;
    }
};

const EvaluationService = {
    getEvaluationsByManager,
    getManagedUsers,
    createEvaluation,
    updateEvaluation,
    getEvaluationsByUser
};

export default EvaluationService;
