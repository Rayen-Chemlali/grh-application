import React, { useState } from "react";
import { Table, Button, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";

const EvaluationList = ({ evaluations, role, userId, onEvaluationUpdated }) => {
    const [selectedEvaluation, setSelectedEvaluation] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [rating, setRating] = useState("");
    const [feedback, setFeedback] = useState("");

    const toggleModal = () => setModalOpen(!modalOpen);

    const handleSubmit = async () => {
        try {
            const updateData = {
                ...(role === "employee" ? { employeeRating: rating, employeeFeedback: feedback } : { managerRating: rating, managerFeedback: feedback }),
            };
            await axios.put(`http://localhost:3000/evaluations/${selectedEvaluation.id}`, updateData);
            setModalOpen(false);
            if (onEvaluationUpdated) onEvaluationUpdated(); // Call the callback to refresh data
        } catch (error) {
            console.error("Error submitting feedback:", error);
        }
    };

    const handleModalOpen = (evaluation) => {
        setSelectedEvaluation(evaluation);
        setRating(role === "employee" ? evaluation.employeeRating || "" : evaluation.managerRating || "");
        setFeedback(role === "employee" ? evaluation.employeeFeedback || "" : evaluation.managerFeedback || "");
        toggleModal();
    };

    return (
        <div>
            <Table responsive className="align-items-center table-flush">
                <thead className="thead-light">
                <tr>
                    <th scope="col">Employee</th>
                    <th scope="col">Employee Rating</th>
                    <th scope="col">Employee Feedback</th>
                    <th scope="col">Manager Rating</th>
                    <th scope="col">Manager Feedback</th>
                    <th scope="col">Comments</th>
                    <th scope="col">Date</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                {evaluations.map((evaluation) => (
                    <tr key={evaluation.id}>
                        <td>{evaluation.user.username}</td>
                        <td>{evaluation.employeeRating || "N/A"}</td>
                        <td>{evaluation.employeeFeedback || "N/A"}</td>
                        <td>{evaluation.managerRating || "N/A"}</td>
                        <td>{evaluation.managerFeedback || "N/A"}</td>
                        <td>{evaluation.comments || "N/A"}</td>
                        <td>{new Date(evaluation.evaluationDate).toLocaleDateString()}</td>
                        <td>
                            <Button color="primary" onClick={() => handleModalOpen(evaluation)}>
                                Provide Feedback
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            {selectedEvaluation && (
                <Modal isOpen={modalOpen} toggle={toggleModal}>
                    <ModalHeader toggle={toggleModal}>
                        Provide Feedback
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="rating">Rating</Label>
                            <Input
                                type="select"
                                id="rating"
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                                required
                            >
                                <option value="">Select Rating</option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                                <option value="D">D</option>
                                <option value="E">E</option>
                                <option value="F">F</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="feedback">Feedback</Label>
                            <Input
                                type="textarea"
                                id="feedback"
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                required
                            />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={handleSubmit}>
                            Submit
                        </Button>
                        <Button color="secondary" onClick={toggleModal}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            )}
        </div>
    );
};

export default EvaluationList;
