import React, { useState } from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from 'reactstrap';
import axios from 'axios';
import SimpleFooter from 'components/Footers/SimpleFooter';
import DemoNavbar from 'components/Navbars/DemoNavbar';

const SubmitLeaveRequest = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user =  JSON.parse(localStorage.getItem("user"));
    try {
      const response = await axios.post('http://localhost:3000/conge', {
        employeeId: user.id, 
        startDate,
        endDate,
        reason,
      });
      alert('Leave request submitted successfully');
    } catch (error) {
      console.error('Error submitting leave request:', error);
      alert('Failed to submit leave request');
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
        <Col md="8" className="ml-auto mr-auto">
          <Card>
            <CardHeader>
              <h3>Submit Leave Request</h3>
            </CardHeader>
            <CardBody>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>Start Date</InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      required
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>End Date</InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      required
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>Reason</InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="text"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      required
                    />
                  </InputGroup>
                </FormGroup>
                <Button color="primary" type="submit">
                  Submit
                </Button>
              </Form>
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

export default SubmitLeaveRequest;
