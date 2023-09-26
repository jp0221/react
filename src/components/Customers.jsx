import React, { useEffect, useState } from "react";
import NewCustomerForm from "./NewCustomers";
import axios from 'axios';

const Customers = () => {
    const [Customers, setCustomers] = useState([]);
    const [search, setSearch] = useState("");
    const [data, setData] = useState([]);

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

    return (
        <div>
            <header>
            <a href="http://localhost:3000/">Home</a>
               <link rel="stylesheet" href="HomePage.css" />
            </header>
            <div class="topnav">
                <a class="active" href="http://localhost:3000/Movies">Movies</a>
                <a href="http://localhost:3000/customers">Customers</a>
                <a href="#Reports">Reports</a>
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
                    </tr>
                    {data.map(customer=>(
                    <tr key={customer.customer_id}>
                        <td>{customer.customer_id}</td>
                        <td>{customer.first_name}</td>
                        <td>{customer.last_name}</td>
                        <td>{customer.count}</td>
                    </tr>
                ))}
                </tbody>
                </table>
                {data.length === 0 && <span>No records found to display!</span>}
            </div>
        </div>
    )
};

export default Customers;