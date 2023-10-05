import React, { useState } from "react";

const EditCustomerForm = ({customer, onSave, onCancel}) => {
    const [firstName, setFirstName] = useState(customer.first_name);
    const [lastName, setLastName] = useState(customer.last_name);

    const handleSave = () => {
        onSave(customer.customer_id, firstName, lastName);
    };

    return (
        <div>
            <label>First Name:</label>
            <input 
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />
            <label>Last Name:</label>
            <input 
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />
            <button onClick={handleSave}>Save</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
};

export default EditCustomerForm;