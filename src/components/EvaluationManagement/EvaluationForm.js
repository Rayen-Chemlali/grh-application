import React, { useState, useEffect } from "react";
import { FormGroup, Label, Input, Button, Alert } from "reactstrap";
import axios from "axios";

const EvaluationForm = () => {
    const [formData, setFormData] = useState({
        userId: "",
        comments: "",
        evaluationDate: "",
    });
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState({ text: "", color: "" });

    useEffect(() => {
        // Fetch users from the API
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:3000/users");
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3000/evaluations", formData);
            // Set success message
            setMessage({ text: "Evaluation submitted successfully", color: "success" });
            // Reset form
            setFormData({
                userId: "",
                comments: "",
                evaluationDate: "",
            });
        } catch (error) {
            console.error("Error submitting evaluation:", error);
            // Set error message
            setMessage({ text: "Error submitting evaluation. Please try again.", color: "danger" });
        }
    };

    return (
        <div>
            <h2 className="text-center">Submit Evaluation</h2>
            {message.text && (
                <Alert color={message.color} className="text-center">
                    {message.text}
                </Alert>
            )}
            <form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="userId">Employee</Label>
                    <Input
                        type="select"
                        name="userId"
                        id="userId"
                        value={formData.userId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Employee</option>
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.username}
                            </option>
                        ))}
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="evaluationDate">Evaluation Date</Label>
                    <Input
                        type="date"
                        name="evaluationDate"
                        id="evaluationDate"
                        value={formData.evaluationDate}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="comments">Comments</Label>
                    <Input
                        type="textarea"
                        name="comments"
                        id="comments"
                        value={formData.comments}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <Button type="submit" color="primary">
                    Submit Evaluation
                </Button>
            </form>
        </div>
    );
};

export default EvaluationForm;
