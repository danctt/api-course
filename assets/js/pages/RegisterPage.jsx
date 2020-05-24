import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Field from "../components/forms/Field";
import usersAPI from "../services/usersAPI";

const registerPage = ({ history }) => {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  // Gestion des changements des inputs dans le formulaire
  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setUser({ ...user, [name]: value });
  };

  // Gestion de la soumission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const apiErrors = {};
    if (user.password !== user.passwordConfirm) {
      apiErrors.passwordConfirm =
        "La confirmation du mot de passe n'est pas valide";
      setErrors(apiErrors);
      toast.error("Des erreurs dans votre formulaire d'inscription !");
      return;
      console.log(user);
    }
    try {
      await usersAPI.register(user);
      setErrors({});
      history.replace("/login");
      //Notification de succès
      toast.success("Vous êtes enregistré, vous povez vous connecter");
    } catch (error) {
      console.log(error.response);
      const { violations } = error.response;

      if (violations) {
        violations.forEach((violation) => {
          apiErrors[violation.propertyPath] = violation.message;
        });
        setErrors(apiErrors);
        //TO DO notification d'erreurs
        toast.error("Des erreurs dans votre formulaire d'inscription !");
      }
    }
    console.log(user);
  };

  return (
    <>
      <h1>Inscription</h1>
      <form onSubmit={handleSubmit}>
        <Field
          name="firstname"
          label="Prénom"
          placeholder="Votre prénom"
          type="text"
          value={user.firstname}
          error={errors.firstname}
          onChange={handleChange}
        />
        <Field
          name="lastname"
          label="Nom de famille"
          placeholder="Votre nom de famille"
          type="text"
          value={user.lastname}
          error={errors.lastname}
          onChange={handleChange}
        />
        <Field
          name="email"
          label="Email"
          placeholder="Votre adresse email"
          type="email"
          value={user.email}
          error={errors.email}
          onChange={handleChange}
        />
        <Field
          name="password"
          label="Mot de passe"
          placeholder="Votre mot de passe"
          type="password"
          value={user.password}
          error={errors.password}
          onChange={handleChange}
        />
        <Field
          name="passwordConfirm"
          label="Confirmation mot de passe"
          placeholder="Confirmez votre mot de passe"
          type="password"
          value={user.passwordConfirm}
          error={errors.passwordConfirm}
          onChange={handleChange}
        />
        <div className="form-group">
          <button type="submit" className="btn btn-success">
            Confirmation
          </button>
          <Link to="/login" className="btn btn-link">
            J'ai déjà un compte
          </Link>
        </div>
      </form>
    </>
  );
};

export default registerPage;
