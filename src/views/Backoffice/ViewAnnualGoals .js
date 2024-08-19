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
} from 'reactstrap';
import axios from 'axios';
import { FaPlus, FaTrash } from 'react-icons/fa';
import SimpleFooter from 'components/Footers/SimpleFooter';
import DemoNavbar from 'components/Navbars/DemoNavbar';
import SubmitAnnualGoal from './SubmitAnnualGoal ';

const ViewAnnualGoals = () => {
  const [annualGoals, setAnnualGoals] = useState([]);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const fetchAnnualGoals = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const response = await axios.get(`http://localhost:3000/annual-goals/${user.id}`);
        setAnnualGoals(response.data);
      } catch (error) {
        console.error('Error fetching annual goals:', error);
      }
    };

    fetchAnnualGoals();
  }, []);

  const toggleModal = () => setModal(!modal);

  const handleCloseModal = () => setModal(false);

  const handleDeleteGoal = async (goalId) => {
    try {
      await axios.delete(`http://localhost:3000/annual-goals/${goalId}`);
      setAnnualGoals(annualGoals.filter(goal => goal.id !== goalId));
    } catch (error) {
      console.error('Failed to delete the goal:', error);
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
                    <h3>View Annual Goals</h3>
                  </CardHeader>
                  <CardBody>
                    <Table responsive>
                      <thead>
                        <tr>
                          <th>Description</th>
                          <th>Status</th>
                          <th>Employee Approved</th>
                          <th>Manager Approved</th>
                          <th>Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {annualGoals.map((goal) => (
                          <tr key={goal.id}>
                            <td>{goal.description}</td>
                            <td>{goal.status}</td>
                            <td>{goal.employeeApproved ? "Yes" : "No"}</td>
                            <td>{goal.managerApproved ? "Yes" : "No"}</td>
                            {(!goal.employeeApproved && !goal.managerApproved) && (
                              <td>
                                <Button color="danger" className="btn-icon btn-round" onClick={() => handleDeleteGoal(goal.id)}>
                                  <FaTrash />
                                </Button>
                              </td>
                            )}
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
          <SubmitAnnualGoal closeModal={handleCloseModal} />
        </ModalBody>
      </Modal>
    </>
  );
};

export default ViewAnnualGoals;
