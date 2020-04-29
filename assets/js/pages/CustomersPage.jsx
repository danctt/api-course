import React, { useEffect, useState } from "react";
import axios from "axios";

const CustomersPage = (props) => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/customers")
      //.then((response) => console.log(response.data["hydra:member"]));
      .then((response) => response.data["hydra:member"])
      .then((data = setCustomers(data)));
  }, []);

  return (
    <>
      <h1>Liste des clients</h1>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Id.</th>
            <th>Client</th>
            <th>Email</th>
            <th>Entreprise</th>
            <th className="text-center">Factures</th>
            <th className="text-center">Montant total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>
                {customer.firstName} {customer.lastName}
              </td>
              <td>{customer.email}</td>
              <td>{customer.company}</td>
              <td className="text-center">
                <span className="badge badge-dark">
                  {customer.invoices.length}
                </span>
              </td>
              <td className="text-center">
                {customer.totalAmount.toLocaleString()} €
              </td>
              <td>
                <button className="btn btn-sm btn-danger">Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default CustomersPage;
