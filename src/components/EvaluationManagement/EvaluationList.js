import React, { useState } from "react";
import {
    Table,
    Button,
    FormGroup,
    Label,
    Input,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    UncontrolledTooltip
} from "reactstrap";
import axios from "axios";

const EvaluationList = ({ evaluations, role, onEvaluationUpdated }) => {
    const [selectedEvaluation, setSelectedEvaluation] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [commentModalOpen, setCommentModalOpen] = useState(false);
    const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
    const [rating, setRating] = useState("");
    const [selectedFeedback, setSelectedFeedback] = useState("");

    const toggleModal = () => setModalOpen(!modalOpen);
    const toggleCommentModal = () => setCommentModalOpen(!commentModalOpen);
    const toggleFeedbackModal = () => setFeedbackModalOpen(!feedbackModalOpen);

    const handleSubmit = async () => {
        try {
            const updateData = {
                ...(role === "employee"
                    ? { employeeRating: rating, employeeFeedback: selectedFeedback }
                    : { managerRating: rating, managerFeedback: selectedFeedback }),
            };
            await axios.put(
                `http://localhost:3000/evaluations/${selectedEvaluation.id}`,
                updateData
            );
            setModalOpen(false);
            if (onEvaluationUpdated) onEvaluationUpdated(); // Call the callback to refresh data
        } catch (error) {
            console.error("Error submitting feedback:", error);
        }
    };

    const handleModalOpen = (evaluation) => {
        setSelectedEvaluation(evaluation);
        setRating(
            role === "employee"
                ? evaluation.employeeRating || ""
                : evaluation.managerRating || ""
        );
        setSelectedFeedback(
            role === "employee"
                ? evaluation.employeeFeedback || ""
                : evaluation.managerFeedback || ""
        );
        toggleModal();
    };

    const handleFeedbackClick = (feedback) => {
        setSelectedFeedback(feedback);
        toggleFeedbackModal();
    };

    const truncateText = (text, length) => {
        if (text.length > length) {
            return text.substring(0, length) + "...";
        }
        return text;
    };

    return (
        <div>
            <Table responsive className="align-items-center table-flush">
                <thead className="thead-light">
                <tr>
                    <th scope="col">Employee</th>
                    <th scope="col">Description</th>
                    <th scope="col">Employee Rating</th>
                    <th scope="col">Employee Feedback</th>
                    <th scope="col">Manager Rating</th>
                    <th scope="col">Manager Feedback</th>
                    <th scope="col">Date</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                {evaluations.map((evaluation) => (
                    <tr key={evaluation.id}>
                        <td>{evaluation.user.username}</td>
                        <td>
                                <span
                                    id={`comment-${evaluation.id}`}
                                    onClick={() => {
                                        setSelectedEvaluation(evaluation);
                                        toggleCommentModal();
                                    }}
                                    style={{ cursor: "pointer", textDecoration: "underline" }}
                                >
                                    {truncateText(evaluation.comments || "N/A", 50)}
                                </span>
                            <UncontrolledTooltip
                                placement="top"
                                target={`comment-${evaluation.id}`}
                            >
                                Click to view full comment
                            </UncontrolledTooltip>
                        </td>
                        <td>{evaluation.employeeRating || "N/A"}</td>
                        <td>
                                <span
                                    id={`employee-feedback-${evaluation.id}`}
                                    onClick={() =>
                                        handleFeedbackClick(evaluation.employeeFeedback || "N/A")
                                    }
                                    style={{ cursor: "pointer", textDecoration: "underline" }}
                                >
                                    {truncateText(evaluation.employeeFeedback || "N/A", 50)}
                                </span>
                            <UncontrolledTooltip
                                placement="top"
                                target={`employee-feedback-${evaluation.id}`}
                            >
                                Click to view full feedback
                            </UncontrolledTooltip>
                        </td>
                        <td>{evaluation.managerRating || "N/A"}</td>
                        <td>
                                <span
                                    id={`manager-feedback-${evaluation.id}`}
                                    onClick={() =>
                                        handleFeedbackClick(evaluation.managerFeedback || "N/A")
                                    }
                                    style={{ cursor: "pointer", textDecoration: "underline" }}
                                >
                                    {truncateText(evaluation.managerFeedback || "N/A", 50)}
                                </span>
                            <UncontrolledTooltip
                                placement="top"
                                target={`manager-feedback-${evaluation.id}`}
                            >
                                Click to view full feedback
                            </UncontrolledTooltip>
                        </td>
                        <td>{new Date(evaluation.evaluationDate).toLocaleDateString()}</td>
                        <td>
                            <Button
                                color="primary"
                                onClick={() => handleModalOpen(evaluation)}
                            >
                                Provide Feedback
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            {selectedEvaluation && (
                <>
                    <Modal isOpen={modalOpen} toggle={toggleModal}>
                        <ModalHeader toggle={toggleModal}>Provide Feedback</ModalHeader>
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
                                    value={selectedFeedback}
                                    onChange={(e) => setSelectedFeedback(e.target.value)}
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

                    <Modal isOpen={commentModalOpen} toggle={toggleCommentModal}>
                        <ModalHeader toggle={toggleCommentModal}>Full Comment</ModalHeader>
                        <ModalBody>{selectedEvaluation.comments || "N/A"}</ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={toggleCommentModal}>
                                Close
                            </Button>
                        </ModalFooter>
                    </Modal>

                    <Modal isOpen={feedbackModalOpen} toggle={toggleFeedbackModal}>
                        <ModalHeader toggle={toggleFeedbackModal}>Full Feedback</ModalHeader>
                        <ModalBody>{selectedFeedback}</ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={toggleFeedbackModal}>
                                Close
                            </Button>
                        </ModalFooter>
                    </Modal>
                </>
            )}
        </div>
    );
};

export default EvaluationList;
