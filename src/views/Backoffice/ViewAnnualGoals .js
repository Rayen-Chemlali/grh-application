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
import { FaPlus, FaTrash, FaCheck, FaTimes, FaEdit } from 'react-icons/fa';
import SimpleFooter from 'components/Footers/SimpleFooter';
import DemoNavbar from 'components/Navbars/DemoNavbar';
import SubmitAnnualGoal from './SubmitAnnualGoal ';
import './ViewAnnualGoals.css';

const ViewAnnualGoals = () => {
  const [annualGoals, setAnnualGoals] = useState([]);
  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [currentGoal, setCurrentGoal] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [manager, setManager] = useState(false);
  const [user, setUser] = useState(null);
  const [myGoals, setMyGoals] = useState("My Goals");

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
      console.log("updated")
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
    const selectedOptionName = event.target.options[event.target.selectedIndex].text; // Get the name of the selected option
    setMyGoals(selectedOptionName);
    console.log(selectedOptionName);
  
    setSelectedEmployee(employeeId);
    fetchEmployeeGoals(employeeId);
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
      </main>
      <SimpleFooter />

      <Modal isOpen={modal} toggle={toggleModal} size="lg">
        <ModalBody className="p-4">
        <SubmitAnnualGoal closeModal={handleCloseModal} selectedEmployee={selectedEmployee} />
        </ModalBody>
      </Modal>

      <Modal isOpen={isUpdateModalOpen} toggle={closeUpdateModal} size="lg">
        <ModalBody className="p-4">
          <h4>Update Annual Goal</h4>
          <form onSubmit={(e) => handleUpdateGoal(e, currentGoal.id)}>
            <div className="form-group">
              <label>Description</label>
              <input
                type="text"
                className="form-control"
                value={currentGoal?.description || ''}
                onChange={(e) => setCurrentGoal({ ...currentGoal, description: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select
                className="form-control"
                value={currentGoal?.status || ''}
                onChange={(e) => setCurrentGoal({ ...currentGoal, status: e.target.value })}
              >
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <Button color="primary" type="submit">
              Update Goal
            </Button>
            <Button color="danger" className="btn-icon btn-round" onClick={() => handleDeleteGoal(currentGoal.id)}>
              <FaTrash />
            </Button>
            <Button color="secondary" onClick={closeUpdateModal}>
              Cancel
            </Button>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ViewAnnualGoals;

