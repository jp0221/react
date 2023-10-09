import React, { useEffect, useState } from "react";
import NewCustomerForm from "./NewCustomers";
import EditCustomerForm from "./EditCustomerForm";
import axios from 'axios';

const Customers = () => {
    const [Customers, setCustomers] = useState([]);
    const [search, setSearch] = useState("");
    const [data, setData] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editingCustomerId, setEditingCustomerId] = useState(null);
    const [expandedRows, setExpandedRows] = useState({});

    useEffect(()=>{
        const fetchAllCust = async () => {
            try{
                const res = await axios.get("http://localhost:5000/customers");
                setCustomers(res.data)
                setData(res.data);
                console.log(res)
            } catch(err){
                console.log(err);
            }
        }
        fetchAllCust()
    },[]);

    const handleChange = value => {
        setSearch(value);
        filterData(value);
    }

    const filterData = value => {
        const lowerCaseValue = value.toLowerCase().trim();
        if(!lowerCaseValue) {
            setData(Customers);
        } else {
            const filteredData = Customers.filter(item => {
                return (
                    item.first_name.toLowerCase().includes(lowerCaseValue) ||
                    item.last_name.toLowerCase().includes(lowerCaseValue) ||
                    item.customer_id.toString() === lowerCaseValue
                );
            });
            setData(filteredData);
        }
    }

    const handleDelete = async(customerId) => {
        try {
            await axios.delete(`http://localhost:5000/customers/${customerId}`)

            const updatedData = data.filter((customer) => customer.customer_id !== customerId);
            setData(updatedData);
        } catch (err) {
            console.log(err);
        }
    }

    const handleEdit = (customerId) => {
        setEditingCustomerId(customerId);
        setEditMode(true);
    }

    const handleSaveEdit = async(customerId, newFirstName, newLastName) => {
        try {
            await axios.put(`http://localhost:5000/customers/${customerId}`, {first_name: newFirstName, last_name: newLastName});

            const updatedData = data.map((customer) => {
                if (customer.customer_id === customerId){
                    return { ...customer, first_name: newFirstName, last_name: newLastName };
                }
                return customer;
            });

            setData(updatedData);
            setEditMode(false);
            setEditingCustomerId(null);
        } catch (err) {
            console.log(err);
        }
    };

    const handleCancelEdit = () => {
        setEditMode(false);
        setEditingCustomerId(null);
    }

    const handleReturn = async (customerId) => {
        try {
            const response = await axios.put(`http://localhost:5000/customers/return/${customerId}`);
            
            if (response.status === 200) {
                const updatedData = data.map((customer) => {
                    if (customer.customer_id === customerId) {
                        return { ...customer, return_date: response.data.return_date };
                    }
                    return customer;
                });
                setData(updatedData);
            } else {
                alert(response.data.message);
            }
        } catch (err) {
            console.log(err);
        }
    };
    
    const toggleRow = (customerId) => {
        setExpandedRows((prevState) => ({
            ...prevState,
            [customerId]: !prevState[customerId]
        }));
    };

    return (
        <div>
            <header>
                <link rel="stylesheet" href="HomePage.css" />
                <h1><a class="home" href="http://localhost:3000/">Home Page</a></h1>
            </header>
            <div class="topnav">
                <a class="active" href="http://localhost:3000/Movies">Movies</a>
                <a class="active" href="http://localhost:3000/customers">Customers</a>
                <a class="active" href="#Reports">Reports</a>
            </div>
            <h1>List of Customers</h1>
            <NewCustomerForm />
            <div className="customers">
            <input type="text" placeholder="Search for customers" value={search} onChange={e => handleChange(e.target.value)}/>
                <table>
                <tbody>
                    <tr>
                        <th>Customer Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Rental Count</th>
                        <th>Return Date</th>
                    </tr>
                    {data.map(customer=>(
                    <React.Fragment key={customer.customer_id}>
                    <tr key={customer.customer_id}>
                        <td>
                            <button onClick={() => toggleRow(customer.customer_id)}>
                            {expandedRows[customer.customer_id] ? "▼" : "▶"}
                            </button>
                            {customer.customer_id}
                        </td>
                        <td>{customer.first_name}</td>
                        <td>{customer.last_name}</td>
                        <td>{customer.count}</td>
                        <td>{customer.return_date}</td>
                        <td>
                            <button onClick={() => handleDelete(customer.customer_id)}>Delete</button>
                            <button onClick={() => handleEdit(customer.customer_id)}>Edit</button>
                            <button onClick={() => handleReturn(customer.customer_id)}>Return</button>
                        </td>
                    </tr>
                    {expandedRows[customer.customer_id] && (
                        <tr>
                            <td colSpan="6">
                            {customer.rented_movies && customer.rented_movies.length > 0 ? (
                                <ul>
                                    {customer.rented_movies.map((movie, index) => (
                                        <li key={index}>{movie}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No rented movie for this customer</p>
                            )}
                            </td>
                        </tr>
                    )}
                    {editMode && editingCustomerId === customer.customer_id && (
                        <tr key={`edit-${customer.customer_id}`}>
                            <td colSpan="4">
                                <EditCustomerForm 
                                    customer={customer}
                                    onSave={handleSaveEdit}
                                    onCancel={handleCancelEdit}
                                />
                            </td>
                        </tr>
                    )}
                </React.Fragment>
                ))}
                </tbody>
                </table>
                {data.length === 0 && <span>No records found to display!</span>}
            </div>
        </div>
    )
};

export default Customers;