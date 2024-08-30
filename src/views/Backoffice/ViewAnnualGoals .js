import React, { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Table,
  Container,
  Row,
  Col,
  Button,
  Modal,
  ModalBody,
  Input,
  FormGroup,
  Label,
} from 'reactstrap';
import axios from 'axios';
import { FaPlus, FaTrash, FaCheck, FaTimes, FaEdit, FaEye } from 'react-icons/fa';
import SimpleFooter from 'components/Footers/SimpleFooter';
import DemoNavbar from 'components/Navbars/DemoNavbar';
import EvaluationList from "components/EvaluationManagement/EvaluationList.js";
import './ViewAnnualGoals.css';
import SubmitAnnualGoal from "./SubmitAnnualGoal ";

const ViewAnnualGoals = () => {
  const [annualGoals, setAnnualGoals] = useState([]);
  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isEvaluationModalOpen, setIsEvaluationModalOpen] = useState(false); // New state for evaluation modal
  const [currentGoal, setCurrentGoal] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [manager, setManager] = useState(false);
  const [user, setUser] = useState(null);
  const [myGoals, setMyGoals] = useState("My Goals");
  const [evaluations, setEvaluations] = useState([]); // New state for evaluations

  useEffect(() => {
    const fetchAnnualGoals = async () => {
      try {
        const loggedInUser = JSON.parse(localStorage.getItem("user"));
        setUser(loggedInUser);
        const response = await axios.get(`http://localhost:3000/goals/${loggedInUser.id}`);
        setAnnualGoals(response.data);

        if (loggedInUser.role.name === "manager") {
          setManager(true);
          const employees = await axios.get(`http://localhost:3000/users/${loggedInUser.id}/managed-employees`);
          setUsers(employees.data);
        }
      } catch (error) {
        console.error('Error fetching annual goals:', error);
      }
    };

    fetchAnnualGoals();
  }, []);
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const currentRole=loggedInUser.role.name;

  const fetchEmployeeGoals = async (employeeId) => {
    try {
      const idToFetch = employeeId === 'manager' ? user.id : employeeId;
      const response = await axios.get(`http://localhost:3000/goals/${idToFetch}`);
      setAnnualGoals(response.data);
    } catch (error) {
      console.error('Error fetching employee goals:', error);
    }
  };

  const toggleModal = () => setModal(!modal);
  const handleCloseModal = () => setModal(false);
  const openUpdateModal = (goal) => {
    setCurrentGoal(goal);
    setIsUpdateModalOpen(true);
  };
  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setCurrentGoal(null);
  };

  const handleToggle = async (goal, field) => {
    const updatedValue = !goal[field];
    try {
      const updatedGoal = {
        ...goal,
        [field]: updatedValue,
      };
      await axios.put(`http://localhost:3000/goals/${goal.id}`, updatedGoal);
      setAnnualGoals(annualGoals.map(g => (g.id === goal.id ? updatedGoal : g)));
    } catch (error) {
      console.error(`Failed to update the ${field} field:`, error);
    }
  };

  const handleUpdateGoal = async (e, goalId) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/goals/${goalId}`, {
        description: currentGoal.description,
        status: currentGoal.status,
      });
      setAnnualGoals(annualGoals.map(g => (g.id === goalId ? response.data : g)));
      closeUpdateModal();
    } catch (error) {
      console.error('Failed to update the goal:', error);
    }
  };

  const handleDeleteGoal = async (goalId) => {
    try {
      await axios.delete(`http://localhost:3000/goals/${goalId}`);
      setAnnualGoals(annualGoals.filter(goal => goal.id !== goalId));
    } catch (error) {
      console.error('Failed to delete the goal:', error);
    }
  };

  const handleEmployeeChange = (event) => {
    const employeeId = event.target.value;
    setSelectedEmployee(employeeId);
    fetchEmployeeGoals(employeeId);
  };

  const openEvaluationModal = (goal) => {
    setCurrentGoal(goal);
    setEvaluations(goal.evaluations || []);
    setIsEvaluationModalOpen(true);
  };


  return (
      <>
        <DemoNavbar />
        <main>
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
            <Container className="mt-5">
              <Row>
                <Col md="10" className="ml-auto mr-auto">
                  <Card>
                    <CardHeader>
                      <h3>View Annual Goals</h3>
                      {manager && (
                          <FormGroup>
                            <Label for="employeeSelect">Select Employee</Label>
                            <Input type="select" id="employeeSelect" onChange={handleEmployeeChange}>
                              <option value="manager">My Goals</option>
                              {users.map(user => (
                                  <option key={user.id} value={user.id}>
                                    {user.username}
                                  </option>
                              ))}
                            </Input>
                          </FormGroup>
                      )}
                    </CardHeader>
                    <CardBody>
                      <Table responsive>
                        <thead>
                        <tr>
                          <th>Description</th>
                          <th>Status</th>
                          <th>Employee Approved</th>
                          <th>Manager Approved</th>
                          <th>Edit</th>
                          <th>Evaluations</th> {/* New column */}
                        </tr>
                        </thead>
                        <tbody>
                        {annualGoals.map((goal) => (
                            <tr key={goal.id}>
                              <td>{goal.description}</td>
                              <td>{goal.status}</td>
                              <td>
                                {!manager || myGoals === 'My Goals' ? (
                                    <div className="toggle-box">
                                      <button
                                          className={`icon-button ${goal.employeeApproved ? 'active' : 'inactive'}`}
                                          onClick={() => handleToggle(goal, 'employeeApproved')}
                                      >
                                        <FaCheck />
                                      </button>
                                      <button
                                          className={`icon-button ${!goal.employeeApproved ? 'active' : 'inactive'}`}
                                          onClick={() => handleToggle(goal, 'employeeApproved')}
                                      >
                                        <FaTimes />
                                      </button>
                                    </div>
                                ) : (
                                    <div className="status-icon">
                                      {goal.employeeApproved ? (
                                          <FaCheck className="icon-active" />
                                      ) : (
                                          <FaTimes className="icon-inactive" />
                                      )}
                                    </div>
                                )}
                              </td>
                              <td>
                                {manager && myGoals !== 'My Goals' ? (
                                    <div className="toggle-box">
                                      <button
                                          className={`icon-button ${goal.managerApproved ? 'active' : 'inactive'}`}
                                          onClick={() => handleToggle(goal, 'managerApproved')}
                                      >
                                        <FaCheck />
                                      </button>
                                      <button
                                          className={`icon-button ${!goal.managerApproved ? 'active' : 'inactive'}`}
                                          onClick={() => handleToggle(goal, 'managerApproved')}
                                      >
                                        <FaTimes />
                                      </button>
                                    </div>
                                ) : (
                                    <div className="status-icon">
                                      {goal.managerApproved ? (
                                          <FaCheck className="icon-active" />
                                      ) : (
                                          <FaTimes className="icon-inactive" />
                                      )}
                                    </div>
                                )}
                              </td>
                              <td>
                                <Button color="warning" className="btn-icon btn-round mr-2" onClick={() => openUpdateModal(goal)}>
                                  <FaEdit />
                                </Button>
                              </td>
                              <td>
                                <Button color="info" className="btn-icon btn-round" onClick={() => openEvaluationModal(goal)}>
                                  <FaEye />
                                </Button>
                              </td>
                            </tr>
                        ))}
                        </tbody>
                      </Table>
                      <div className="text-center mt-4">
                        <Button color="primary" onClick={toggleModal} className="btn-icon btn-round">
                          <FaPlus />
                        </Button>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </section>
          <SimpleFooter />
        </main>
        {/* Evaluation Modal */}
        <Modal isOpen={isEvaluationModalOpen} toggle={() => setIsEvaluationModalOpen(!isEvaluationModalOpen)} size={"xl"}>
          <ModalBody>
            <h5>Evaluations for Goal: {currentGoal?.description}</h5>
            <EvaluationList evaluations={evaluations} role={currentRole} />
            <Button color="secondary" onClick={() => setIsEvaluationModalOpen(false)}>Close</Button>
          </ModalBody>
        </Modal>

        {/* Update Goal Modal */}
        <Modal isOpen={isUpdateModalOpen} toggle={closeUpdateModal}>
          <ModalBody>
            <h5>Update Goal</h5>
            <form onSubmit={(e) => handleUpdateGoal(e, currentGoal?.id)}>
              <FormGroup>
                <Label for="goalDescription">Description</Label>
                <Input
                    type="text"
                    id="goalDescription"
                    value={currentGoal?.description || ''}
                    onChange={(e) => setCurrentGoal({ ...currentGoal, description: e.target.value })}
                    required
                />
              </FormGroup>
              <FormGroup>
                <Label for="goalStatus">Status</Label>
                <Input
                    type="text"
                    id="goalStatus"
                    value={currentGoal?.status || ''}
                    onChange={(e) => setCurrentGoal({ ...currentGoal, status: e.target.value })}
                    required
                />
              </FormGroup>
              <Button color="primary" type="submit">Update</Button>
              <Button color="secondary" onClick={closeUpdateModal}>Cancel</Button>
            </form>
          </ModalBody>
        </Modal>

        {/* Submit Annual Goal Modal */}
        <Modal isOpen={modal} toggle={toggleModal}>
          <ModalBody>
            <SubmitAnnualGoal closeModal={toggleModal} />
          </ModalBody>
        </Modal>
      </>
  );
};

export default ViewAnnualGoals;
