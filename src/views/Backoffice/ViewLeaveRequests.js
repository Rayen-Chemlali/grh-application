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
import SubmitLeaveRequest from './SubmitLeaveRequest'; 

const ViewLeaveRequests = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const response = await axios.get(`http://localhost:3000/conge/employee/${user.id}`);
        setLeaveRequests(response.data);
      } catch (error) {
        console.error('Error fetching leave requests:', error);
      }
    };

    fetchLeaveRequests();
  }, []);

  const toggleModal = () => setModal(!modal);


  const handleCloseModal = () => setModal(false);

  const handleDeleteRequest = async (requestId) => {
    try {
      await axios.delete(`http://localhost:3000/conge/${requestId}`);
      setLeaveRequests(leaveRequests.filter(request => request.id !== requestId));
    } catch (error) {
      console.error('Failed to delete the request:', error);
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
                    <h3>View Leave Requests</h3>
                  </CardHeader>
                  <CardBody>
                    <Table responsive>
                      <thead>
                        <tr>
  
                          <th>Start Date</th>
                          <th>End Date</th>
                          <th>Reason</th>
                          <th>Status</th>
                          <th>Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {leaveRequests.map((request) => (
                          <tr key={request.id}>
                            <td>{new Date(request.startDate).toLocaleDateString()}</td>
                            <td>{new Date(request.endDate).toLocaleDateString()}</td>
                            <td>{request.reason}</td>
                            <td>{request.status}</td>
                           {request.status === "Pending"  && (<td>
          <Button color="danger" className="btn-icon btn-round" onClick={() => handleDeleteRequest(request.id)}>
            <FaTrash />
          </Button>
        </td>)}
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
          <SubmitLeaveRequest closeModal={handleCloseModal} />
        </ModalBody>
      </Modal>
    </>
  );
};

export default ViewLeaveRequests;
