// src/components/Header.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { persistor } from "../../store";

interface HeaderProps {
  isLogged: boolean;
  userName: string;
  role: string;
}

const Header: React.FC<HeaderProps> = ({ isLogged, userName, role }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    persistor.purge().then(() => {
      window.location.reload();
    });
  };

  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-gold font-bold text-xl">
            Inicio
          </Link>
          <Link to="/allied-dashboard" 
            className="text-wood-darker font-bold">
            Aliado
          </Link>
          <Link
            to="/practice-strategys-dashboard"
            className="text-wood-darker font-bold"
          >
            Practica Estrategica
          </Link>
          <Link
            to="/normative-aspects-dashboard"
            className="text-wood-darker font-bold"
          >
            Aspectos Normativos
          </Link>
          <Link
            to="/car-innovation-dashboard"
            className="text-wood-darker font-bold"
          >
            Car Innovacion
          </Link>
          <Link
            to="/university-dashboard"
            className="text-wood-darker font-bold"
          >
            Universidad
          </Link>
          <Link to="/approach-dashboard" 
            className="text-wood-darker font-bold">
            Enfoque
          </Link>
          <Link to="/faculty-dashboard" 
            className="text-wood-darker font-bold">
            Facultad
          </Link>
          <Link
            to="/internship-dashboard"
            className="text-wood-darker font-bold"
          >
            Pasantia
          </Link>
          <Link
            to="/teacher-programs-dashboard"
            className="text-wood-darker font-bold"
          >
             Programa Docente
          </Link>
          <Link
            to="/program-dashboard"
            className="text-wood-darker font-bold"
          >
            Programa
          </Link>
          <Link
            to="/qualified-registration-dashboard"
            className="text-wood-darker font-bold"
          >
            Registro calificado
          </Link>
          <Link
            to="/qualified-registration-dashboard"
            className="text-wood-darker font-bold"
          >
            Alianza
          </Link>
          <Link
            to="/alliance-dashboard"
            className="text-wood-darker font-bold"
          >
            Actividad académica
          </Link>
          <Link to="/award-dashboard" 
            className="text-wood-darker font-bold">
            Premio
          </Link>
          <Link
            to="/program-ci-dashboard"
            className="text-wood-darker font-bold"
          >
            
            Programa {"\n CarInnovation"}
          </Link>
          {isLogged && (
            <>
              <Link to="/payments" className="text-wood-darker font-bold">
                Mis pagos
              </Link>
            </>
          )}
          {isLogged && role == "admin" && (
            <>
              <Link
                to="/dashboard/users"
                className="text-wood-darker font-bold"
              >
                Usuarios
              </Link>
              <Link
                to="/dashboard/microsites"
                className="text-wood-darker font-bold"
              >
                Micrositios
              </Link>
            </>
          )}
        </div>
        <div className="flex items-center space-x-4">
          {isLogged ? (
            <div className="relative">
              <button
                className="text-wood-darker font-bold"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {userName}
                <span className="ml-1">&#9660;</span>
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg py-1">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-wood-darker hover:bg-wood-light"
                  >
                    Desloguearse
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-gold hover:bg-gold-dark text-white font-bold py-2 px-4 rounded-full"
              >
                Iniciar Sesión
              </Link>
              <Link
                to="/register"
                className="bg-gold hover:bg-gold-dark text-white font-bold py-2 px-4 rounded-full"
              >
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
