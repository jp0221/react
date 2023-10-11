import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function Reports() {
  const [customerRentals, setCustomerRentals] = useState([]);
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    if (customerRentals.length > 0) {
      setShowTable(true);
    } else {
      setShowTable(false);
    }
  }, [customerRentals]);

  const fetchCustomerData = () => {
    fetch('http://localhost:5000/customer-rentals')
      .then((response) => response.json())
      .then((data) => {
        setCustomerRentals(data);
      })
      .catch((error) => {
        console.error('Error fetching customer rentals:', error);
      });
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.text('Customer Rental Report', 105, 10, null, null, 'center');

    const columns = ['Customer ID', 'Name', 'Rental Date', 'Movie Title'];
    const data = customerRentals.map((rental) => [
      rental.customer_id,
      `${rental.first_name} ${rental.last_name}`,
      rental.rental_date,
      rental.movie_title,
    ]);

    doc.autoTable({
      startY: 20,
      head: [columns],
      body: data,
      margin: { top: 20 },
    });

    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.text(`Page ${i} of ${pageCount}`, 180, 290, null, null, 'center');
    }

    doc.save('customer_rental_report.pdf');
  };

  return (
    <div>
      <header>
        <a class="home" href='http://localhost:3000/'><h1>Home Page</h1></a>
        <link rel="stylesheet" href="HomePage.css" />
      </header>
      <main>
        <div class="topnav">
          <a class="active" href="http://localhost:3000/Movies">Movies</a>
          <a class="active" href="http://localhost:3000/customers">Customers</a>
          <a class="active" href="http://localhost:3000/Report">Reports</a>
        </div>
        <h1>Generate Customer Rental Report</h1>
        <button onClick={fetchCustomerData}>Fetch Customer Rentals</button>
        <button onClick={generatePDF}>Generate PDF</button>
        {showTable && (
          <table>
            <thead>
              <tr>
                <th>Customer ID</th>
                <th>Name</th>
                <th>Rental Date</th>
                <th>Movie Title</th>
              </tr>
            </thead>
            <tbody>
              {customerRentals.map((rental) => (
                <tr key={rental.customer_id}>
                  <td>{rental.customer_id}</td>
                  <td>{`${rental.first_name} ${rental.last_name}`}</td>
                  <td>{rental.rental_date}</td>
                  <td>{rental.movie_title}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
}

export default Reports;
