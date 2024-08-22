import React, { useState, useEffect } from 'react';
import { Modal, ModalBody, Button, FormGroup, Label, Input, Form } from 'reactstrap';
import axios from 'axios';

const UpdateProjectModal = ({ isOpen, toggle, project, onProjectUpdated }) => {
  const [projectData, setProjectData] = useState(project);

  useEffect(() => {
    setProjectData(project);
  }, [project]);

  const handleChange = (e) => {
    setProjectData({ ...projectData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/projects/${projectData.id}`, projectData);
      onProjectUpdated(response.data);
      toggle();
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalBody>
        <h4>Update Project</h4>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="name">Project Name</Label>
            <Input type="text" name="name" value={projectData.name} onChange={handleChange} required />
          </FormGroup>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input type="text" name="description" value={projectData.description} onChange={handleChange} required />
          </FormGroup>
          <FormGroup>
            <Label for="startDate">Start Date</Label>
            <Input type="date" name="startDate" value={projectData.startDate} onChange={handleChange} required />
          </FormGroup>
          <FormGroup>
            <Label for="endDate">End Date</Label>
            <Input type="date" name="endDate" value={projectData.endDate} onChange={handleChange} required />
          </FormGroup>
          <FormGroup>
            <Label for="projectManagerId">Project Manager ID</Label>
            <Input type="number" name="projectManagerId" value={projectData.projectManagerId} onChange={handleChange} />
          </FormGroup>
          <Button type="submit" color="primary">Update Project</Button>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default UpdateProjectModal;
