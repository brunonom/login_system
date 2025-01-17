import React from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './PrivateRoute';
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import EditUser from "./pages/EditUser";
import { AuthContext } from "./context/auth";
import Login from "./pages/Login";
import Signup from './pages/Signup';

function App(props) {
  const setTokens = (data) => {
    data ? localStorage.setItem("tokens", JSON.stringify(data)) : localStorage.removeItem("tokens")
  }

  const getTokens = () => {
    return JSON.parse(localStorage.getItem("tokens"));
  }

  return (
    <AuthContext.Provider value={{ authTokens: getTokens , setAuthTokens: setTokens }}>
      <Router>
        <div>
          <ToastContainer position="top-right" autoClose={5000} pauseOnHover />
          <div className="pure-menu pure-menu-horizontal">
            <ul className="pure-menu-list">
              <li className="pure-menu-item">
                <Link to="/" className="pure-menu-link">Página Inicial</Link>
              </li>
              <li className="pure-menu-item">
                <Link to="/admin" className="pure-menu-link">Gerenciar usuários</Link>
              </li>
              <li className="pure-menu-item">
                <Link to="/edit" className="pure-menu-link">Editar perfil</Link>
              </li>
            </ul>
          </div>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <PrivateRoute path="/admin" component={Admin} />
          <PrivateRoute path="/edit" component={EditUser} />
          <PrivateRoute path="/edit/:id" component={EditUser} />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
