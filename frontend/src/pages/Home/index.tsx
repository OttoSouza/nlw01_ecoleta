import React from "react";
import logo from "../../assets/logo.svg";
import { FiLogIn } from "react-icons/fi";
import {Link} from 'react-router-dom'
import "./styles.css";

const Home: React.FC = () => {
  return (
    <div id="page-home">
      <div className="content">
        <header>
          <img src={logo} alt="Ecoleta" />
        </header>

        <main>
          <h1>Seu marketplace de coleta de residuos</h1>
          <p>
            Ajudamos pessoas a encontrarem pontos de coletas de forma eficientes
          </p>
          <Link to="/create-point">
            <span>
              <FiLogIn />
            </span>
            <strong>Cadastrar ponto de coleta</strong>
          </Link>
        </main>
      </div>
    </div>
  );
};

export default Home;
