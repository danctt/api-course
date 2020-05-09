import axios from "axios";
import jwtDecode from "jwt-decode";

/**
 * Déconnexion (suppression du token du locaStorage et sur Axios)
 */
function logout() {
  window.localStorage.removeItem("authToken");
  delete axios.defaults.headers["Authorization"];
}

/**
 * requête HTTP d'authentification et stockage du token dans le storage et sur Axios
 * @param {object} credentials
 */
function authenticate(credentials) {
  return axios
    .post("http://localhost:8000/api/login_check", credentials)
    .then((response) => response.data.token)
    .then((token) => {
      // Stockage du token dans le localStorage
      window.localStorage.setItem("authToken", token);

      // On prévient axios qu'on a maintenant un header par défaut sur toutes nos futures requêtes HTTP
      setAxiosToken(token);
    });
}
/**
 * Positionne le token JWT sur Axios
 * @param {string} token le token JWT
 */
function setAxiosToken(token) {
  axios.defaults.headers["Authorization"] = "Bearer " + token;
}

/**
 * Mise en place lors du chargement de l'application
 */
function setup() {
  // Voir si on a un token
  const token = window.localStorage.getItem("authToken");
  // voir si le token est encore valide
  if (token) {
    const jwtData = jwtDecode(token);
    if (jwtData.exp * 1000 > new Date().getTime()) {
      setAxiosToken(token);
    }
  }
}

/**
 * Permet de savoir si on est authentifié ou pas
 * return boolean
 */
function isAuthenticated() {
  // Voir si on a un token
  const token = window.localStorage.getItem("authToken");
  // voir si le token est encore valide
  if (token) {
    const jwtData = jwtDecode(token);
    if (jwtData.exp * 1000 > new Date().getTime()) {
      return true;
    }
    return false;
  }
  return false;
}

export default {
  authenticate,
  logout,
  setup,
  isAuthenticated,
};
