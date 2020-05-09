import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import customerAPI from "../services/customerAPI";

const CustomersPage = (props) => {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  //permet de récupérer les customers
  const fetchCustomers = async () => {
    try {
      const data = await customerAPI.findAll();
      setCustomers(data);
      setLoading(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  // Au chargement du composant on va chercher les customers
  useEffect(() => {
    fetchCustomers();
  }, []);

  // Gestion de suppression d'un customer
  const handleDelete = async (id) => {
    const originalCustomers = customers.slice();
    setCustomers(customers.filter((customer) => customer.id !== id));

    try {
      await customerAPI.delete(id);
    } catch (error) {
      setCustomers(originalCustomers);
      console.log(error.response);
    }
  };

  // Gestion du changement de page
  const handlePageChange = (page) => {
    setCurrentPage(page);
    setLoading(false);
  };

  // Gestion de la recherche
  // avant déstructuration ...
  //const handleSearch = (event) => {
  //  const value = event.currentTarget.value;
  //  setSearch(value);
  const handleSearch = ({ currentTarget }) => {
    setSearch(currentTarget.value);
    setCurrentPage(1);
  };

  const itemsPerPage = 10;

  // Filtrage des customers en fonction de la recherche
  const filteredCustomers = customers.filter(
    (c) =>
      c.firstName.toLowerCase().includes(search.toLowerCase()) ||
      c.lastName.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      (c.company && c.company.toLowerCase().includes(search.toLowerCase()))
  );

  //pagination des données
  const paginatedCustomers = Pagination.getData(
    filteredCustomers,
    currentPage,
    itemsPerPage
  );

  return (
    <>
      <h1>Liste des clients</h1>

      <div className="form-group">
        <input
          type="text"
          onChange={handleSearch}
          value={search}
          className="form-control"
          placeholder="rechercher..."
        />
      </div>

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
          {loading && (
            <tr>
              <td>... Chargement ...</td>
            </tr>
          )}
          {!loading &&
            paginatedCustomers.map((customer) => (
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
                  <button
                    disabled={customer.invoices.length > 0}
                    onClick={() => handleDelete(customer.id)}
                    className="btn btn-sm btn-danger"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {itemsPerPage < filteredCustomers.length && (
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          length={filteredCustomers.length}
          onPageChanged={handlePageChange}
        />
      )}
    </>
  );
};

export default CustomersPage;
