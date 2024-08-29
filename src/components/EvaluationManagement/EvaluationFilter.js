import React from "react";
import { FormGroup, Label, Input } from "reactstrap";

const EvaluationFilter = ({ users, selectedUser, onChange }) => {
    return (
        <FormGroup>
            <Label for="filterUser">Filter by Employee</Label>
            <Input
                type="select"
                name="filterUser"
                id="filterUser"
                value={selectedUser || ""}
                onChange={(e) => onChange(e.target.value)}
            >
                <option value="">All Employees</option>
                {users.map((user) => (
                    <option key={user.id} value={user.id}>
                        {user.username}
                    </option>
                ))}
            </Input>
        </FormGroup>
    );
};

export default EvaluationFilter;
