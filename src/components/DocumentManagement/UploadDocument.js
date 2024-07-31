import React, { useState } from 'react';
import { Button, Input, FormGroup, Label, Form } from 'reactstrap';
import axios from 'axios';

const UploadDocument = ({ userId, onUploadSuccess }) => {
    const [file, setFile] = useState(null);
    const [filename, setFilename] = useState('');
    const [description, setDescription] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleFilenameChange = (e) => {
        setFilename(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file || !filename || !description) {
            alert('Please provide all required fields');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('filename', filename);
        formData.append('description', description);

        try {
            await axios.post(`http://localhost:3000/documents/upload/${userId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Document uploaded successfully');
            if (onUploadSuccess) onUploadSuccess();
        } catch (error) {
            if (error.response) {
                console.error('Server responded with error:', error.response.data);
                alert(`Error: ${error.response.data.message || 'Failed to upload document'}`);
            } else if (error.request) {
                console.error('No response received:', error.request);
                alert('No response received from server');
            } else {
                console.error('Error setting up request:', error.message);
                alert('Error in setting up request');
            }
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label for="file">Choose Document</Label>
                <Input
                    type="file"
                    id="file"
                    name="file"
                    onChange={handleFileChange}
                    required
                />
            </FormGroup>
            <FormGroup>
                <Label for="filename">Document Name</Label>
                <Input
                    type="text"
                    id="filename"
                    value={filename}
                    onChange={handleFilenameChange}
                    required
                />
            </FormGroup>
            <FormGroup>
                <Label for="description">Description</Label>
                <Input
                    type="textarea"
                    id="description"
                    value={description}
                    onChange={handleDescriptionChange}
                    required
                />
            </FormGroup>
            <Button color="primary" type="submit">Upload</Button>
        </Form>
    );
};

export default UploadDocument;
