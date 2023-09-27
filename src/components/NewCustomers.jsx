import React, { useState } from "react";
import axios from 'axios';

const NewCustomerForm = () => {
    const [formData, setFormData] = useState({
        customer_id: 0,  // Assuming customer_id is an integer
        store_id: 1,     // Assuming store_id is an integer
        first_name: "",
        last_name: "",
        email: "",
        address_id: 0,   // Assuming address_id is an integer
        active: 0,       // Assuming active is a tinyint (0 or 1)
        create_date: "", // Assuming create_date is a date or timestamp
        last_update: ""  // Assuming last_update is a date or timestamp
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/customers", formData);
            console.log(res.data); // Log the response
            if (res.status === 201) {
                console.log("Customer created successfully");
            } else {
                console.error("Error creating customer");
            }
        } catch (error) {
            console.error(error);
        } finally {
            // Clear the form or perform any other actions needed
            setFormData({
                customer_id: 0,
                store_id: 1,
                first_name: "",
                last_name: "",
                email: "",
                address_id: 0,
                active: 0,
                create_date: "",
                last_update: ""
            });
        }
    };
    
    

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="customer_id">Customer ID:</label>
            <input
                type="number" // Assuming customer_id is an integer
                id="customer_id"
                name="customer_id"
                value={formData.customer_id}
                onChange={handleChange}
            />
            <label htmlFor="store_id">Store ID:</label>
            <input
                type="number" // Assuming store_id is an integer
                id="store_id"
                name="store_id"
                value={formData.store_id}
                onChange={handleChange}
                min="1"
                max="2"
            />
            <label htmlFor="first_name">First Name:</label>
            <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
            />
            <label htmlFor="last_name">Last Name:</label>
            <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
            />
            <label htmlFor="email">Email:</label>
            <input
                type="email" // Assuming email is in the correct format
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
            />
            <label htmlFor="address_id">Address ID:</label>
            <input
                type="number" // Assuming address_id is an integer
                id="address_id"
                name="address_id"
                value={formData.address_id}
                onChange={handleChange}
            />
            <label htmlFor="active">Active:</label>
            <input
                type="number" // Assuming active is a tinyint (0 or 1)
                id="active"
                name="active"
                value={formData.active}
                onChange={handleChange}
                min="0"
                max="1"
            />
            <label htmlFor="create_date">Create Date:</label>
            <input
                type="text" // Assuming create_date is in the correct format
                id="create_date"
                name="create_date"
                value={formData.create_date}
                onChange={handleChange}
            />
            <label htmlFor="last_update">Last Update:</label>
            <input
                type="text" // Assuming last_update is in the correct format
                id="last_update"
                name="last_update"
                value={formData.last_update}
                onChange={handleChange}
            />
            <button type="submit">Add Customer</button>
        </form>
    );
};

export default NewCustomerForm;
