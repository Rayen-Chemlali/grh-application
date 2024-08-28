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

const SubmitAnnualGoal = ({ closeModal, selectedEmployee }) => {
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Not Started');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));

    const userId = selectedEmployee && selectedEmployee !== 'manager' ? selectedEmployee : user.id;

    try {
      const response = await axios.post('http://localhost:3000/goals', {
        user_id: userId, 
        description,
        status,
      });
      alert('Annual goal submitted successfully');
      closeModal();
    } catch (error) {
      console.error('Error submitting annual goal:', error);
      alert('Failed to submit annual goal');
    }
  };

  return (
    <Container>
      <Row>
        <Col md="8" className="ml-auto mr-auto">
          <Card>
            <CardHeader>
              <h3>Submit Annual Goal</h3>
            </CardHeader>
            <CardBody>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>Description</InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>Status</InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="select"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      required
                    >
                      <option value="Not Started">Not Started</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </Input>
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
  );
};

export default SubmitAnnualGoal;
