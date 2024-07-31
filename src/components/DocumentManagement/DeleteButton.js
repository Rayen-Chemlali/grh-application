import React from 'react';
import { Button } from 'reactstrap';
import { deleteDocument } from './documentService';

const DeleteButton = ({ documentId, onDelete }) => {
    const handleDelete = async () => {
        try {
            await deleteDocument(documentId);
            onDelete();
        } catch (error) {
            console.error('Error deleting document', error);
            alert('Failed to delete document');
        }
    };

    return (
        <Button color="danger" size="sm" onClick={handleDelete}>
            Delete
        </Button>
    );
};

export default DeleteButton;
