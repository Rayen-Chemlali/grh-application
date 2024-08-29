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
import { FaPlus, FaTrash, FaEdit, FaTimes } from 'react-icons/fa';
import DemoNavbar from 'components/Navbars/DemoNavbar';
import SimpleFooter from 'components/Footers/SimpleFooter';

const ViewProjects = () => {
  const [projects, setProjects] = useState([]);
  const [modal, setModal] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [isProjectCreated, setIsProjectCreated] = useState(false); // New state variable

  useEffect(() => {
    const fetchProjects = async () => {
      const loggedInUser = JSON.parse(localStorage.getItem("user"));
      const employees = await axios.get(`http://localhost:3000/users/${loggedInUser.id}/managed-employees`);
      setUsers(employees.data);
      try {
        const response = await axios.get('http://localhost:3000/projects');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    fetchProjects();
  }, []);

  const toggleModal = () => setModal(!modal);
  const handleCloseModal = () => {
    setModal(false);
    setCurrentProject(null);
    setSelectedEmployees([]);
    setIsProjectCreated(false); // Reset the project creation status
  };

  const openUpdateModal = (project) => {
    setCurrentProject(project);
    setIsUpdateModalOpen(true);
    fetchAssignedEmployees(project.id);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setCurrentProject(null);
    setSelectedEmployees([]);
  };

  const handleUpdateProject = async (e, projectId) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/projects/${projectId}`, currentProject);
      setProjects(projects.map(p => (p.id === projectId ? response.data : p)));
      closeUpdateModal();
    } catch (error) {
      console.error('Failed to update the project:', error);
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      await axios.delete(`http://localhost:3000/projects/${projectId}`);
      setProjects(projects.filter(project => project.id !== projectId));
    } catch (error) {
      console.error('Failed to delete the project:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProject({ ...currentProject, [name]: value });
  };

  const handleSubmitProject = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/projects', currentProject);
      setProjects([...projects, response.data]);
      setCurrentProject(response.data); // Set the created project as the current project
      setIsProjectCreated(true); // Mark the project as created
    } catch (error) {
      console.error('Failed to create the project:', error);
    }
  };

  const handleSelectEmployee = async (e) => {
    const userId = e.target.value;
    const selectedUser = users.find(user => user.id === parseInt(userId));
    try {
      await axios.post(`http://localhost:3000/projects/${currentProject.id}/users/${selectedUser.id}`);
      setSelectedEmployees([...selectedEmployees, selectedUser]);
    } catch (error) {
      console.error('Failed to assign employee:', error);
    }
  };

  const handleUnassignEmployee = async (userId) => {
    try {
      await axios.delete(`http://localhost:3000/projects/${currentProject.id}/users/${userId}`);
      setSelectedEmployees(selectedEmployees.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Failed to unassign employee:', error);
    }
  };

  const fetchAssignedEmployees = async (projectId) => {
    try {
      const response = await axios.get(`http://localhost:3000/projects/${projectId}/users`);
      setSelectedEmployees(response.data);
    } catch (error) {
      console.error('Failed to fetch assigned employees:', error);
    }
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
                    <h3>View Projects</h3>
                  </CardHeader>
                  <CardBody>
                    <Table responsive>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Description</th>
                          <th>Start Date</th>
                          <th>End Date</th>
                          <th>Status</th>
                          <th>Edit</th>
                        </tr>
                      </thead>
                      <tbody>
                        {projects.map((project) => (
                          <tr key={project.id}>
                            <td>{project.name}</td>
                            <td>{project.description}</td>
                            <td>{new Date(project.startDate).toLocaleDateString()}</td>
                            <td>{new Date(project.endDate).toLocaleDateString()}</td>
                            <td>{project.status}</td>
                            <td>
                              <Button color="warning" onClick={() => openUpdateModal(project)}>
                                <FaEdit />
                              </Button>
                              <Button color="danger" onClick={() => handleDeleteProject(project.id)}>
                                <FaTrash />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    <Button color="primary" onClick={toggleModal}>
                      <FaPlus /> Add Project
                    </Button>
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
          <h4>Create Project</h4>
          {!isProjectCreated ? (
            <form onSubmit={handleSubmitProject}>
              <FormGroup>
                <Label>Name</Label>
                <Input type="text" name="name" onChange={handleInputChange} />
              </FormGroup>
              <FormGroup>
                <Label>Description</Label>
                <Input type="text" name="description" onChange={handleInputChange} />
              </FormGroup>
              <FormGroup>
                <Label>Start Date</Label>
                <Input type="date" name="startDate" onChange={handleInputChange} />
              </FormGroup>
              <FormGroup>
                <Label>End Date</Label>
                <Input type="date" name="endDate" onChange={handleInputChange} />
              </FormGroup>
              <FormGroup>
                <Label>Status</Label>
                <Input type="select" name="status" onChange={handleInputChange}>
                  <option value="Planned">Planned</option>
                  <option value="InProgress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="OnHold">On Hold</option>
                </Input>
              </FormGroup>
              <Button color="primary" type="submit">
                Submit
              </Button>
              <Button color="secondary" onClick={handleCloseModal}>
                Cancel
              </Button>
            </form>
          ) : (
            <div>
              <FormGroup>
                <Label for="employeeSelect">Select Employee</Label>
                <Input type="select" id="employeeSelect" onChange={handleSelectEmployee}>
                  <option value="">Select an employee</option>
                  {users.map(user => (
                    <option key={user.id} value={user.id}>
                      {user.username}
                    </option>
                  ))}
                </Input>
              </FormGroup>

              <div>
                <h5>Selected Employees:</h5>
                {selectedEmployees.map((user) => (
                  <div key={user.id} className="d-flex align-items-center">
                    <span>{user.username}</span>
                    <Button
                      color="danger"
                      size="sm"
                      onClick={() => handleUnassignEmployee(user.id)}
                      className="ml-2"
                    >
                      <FaTimes />
                    </Button>
                  </div>
                ))}
              </div>

              <Button color="secondary" onClick={handleCloseModal}>
                Close
              </Button>
            </div>
          )}
        </ModalBody>
      </Modal>

      <Modal isOpen={isUpdateModalOpen} toggle={closeUpdateModal} size="lg">
        <ModalBody className="p-4">
          <h4>Update Project</h4>
          <form onSubmit={(e) => handleUpdateProject(e, currentProject.id)}>
            <FormGroup>
              <Label>Name</Label>
              <Input
                type="text"
                name="name"
                value={currentProject?.name || ''}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={currentProject?.description || ''}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Start Date</Label>
              <Input
                type="date"
                name="startDate"
                value={currentProject?.startDate || ''}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>End Date</Label>
              <Input
                type="date"
                name="endDate"
                value={currentProject?.endDate || ''}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Status</Label>
              <Input
                type="select"
                name="status"
                value={currentProject?.status || ''}
                onChange={handleInputChange}
              >
                <option value="Planned">Planned</option>
                <option value="InProgress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="OnHold">On Hold</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="employeeSelect">Select Employee</Label>
              <Input type="select" id="employeeSelect" onChange={handleSelectEmployee}>
                <option value="">Select an employee</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.username}
                  </option>
                ))}
              </Input>
            </FormGroup>

            <div>
              <h5>Selected Employees:</h5>
              {selectedEmployees.map((user) => (
                <div key={user.id} className="d-flex align-items-center">
                  <span>{user.username}</span>
                  <Button
                    color="danger"
                    size="sm"
                    onClick={() => handleUnassignEmployee(user.id)}
                    className="ml-2"
                  >
                    <FaTimes />
                  </Button>
                </div>
              ))}
            </div>

            <Button color="primary" type="submit">
              Update Project
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

export default ViewProjects;
