import React from 'react';
import { Button } from 'reactstrap';
import { FaTrash } from 'react-icons/fa';

const DeleteButton = ({ onDelete }) => {
    const handleClick = () => {
        if (window.confirm('Ar.e you sure you want to delete this user?')) {
            onDelete();
        }
    };

    return (
        <Button color="danger" size="sm" onClick={handleClick}>
            <FaTrash /> Delete
        </Button>
    );
};

export default DeleteButton;
