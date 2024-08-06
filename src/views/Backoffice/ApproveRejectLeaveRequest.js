import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Table,
  Container,
  Row,
  Col,
} from 'reactstrap';
import axios from 'axios';
import SimpleFooter from 'components/Footers/SimpleFooter';
import DemoNavbar from 'components/Navbars/DemoNavbar';

const ApproveRejectLeaveRequest = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const response = await axios.get('http://localhost:3000/conge/9'); 
        setLeaveRequests(response.data);
      } catch (error) {
        console.error('Error fetching leave requests:', error);
      }
    };

    fetchLeaveRequests();
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.patch(`http://localhost:3000/conge/${id}/approve`);
      setLeaveRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === id ? { ...request, status: 'Approved' } : request
        )
      );
    } catch (error) {
      console.error('Error approving leave request:', error);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.patch(`http://localhost:3000/conge/${id}/reject`);
      setLeaveRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === id ? { ...request, status: 'Rejected' } : request
        )
      );
    } catch (error) {
      console.error('Error rejecting leave request:', error);
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
              <h3>Approve/Reject Leave Requests</h3>
            </CardHeader>
            <CardBody>
              <Table responsive>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Reason</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leaveRequests.map((request) => (
                    <tr key={request.id}>
                      <td>{request.id}</td>
                      <td>{new Date(request.startDate).toLocaleDateString()}</td>
                      <td>{new Date(request.endDate).toLocaleDateString()}</td>
                      <td>{request.reason}</td>
                      <td>{request.status}</td>
                      <td>
                        {request.status === 'Pending' && (
                          <>
                            <Button
                              color="success"
                              size="sm"
                              onClick={() => handleApprove(request.id)}
                              className="mr-2"
                            >
                              Approve
                            </Button>
                            <Button
                              color="danger"
                              size="sm"
                              onClick={() => handleReject(request.id)}
                            >
                              Reject
                            </Button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
    </section>
  </main>
<SimpleFooter />
</>
  );
};

export default ApproveRejectLeaveRequest;
