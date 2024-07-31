
import React from 'react';
import { Button } from 'reactstrap';
import { FaEdit } from 'react-icons/fa';

const EditButton = ({ onEdit }) => {
    return (
        <Button color="primary" size="sm" onClick={onEdit}>
            <FaEdit /> Confirm Changes
        </Button>
    );
};

export default EditButton;
