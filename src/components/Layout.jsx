import { Link } from "react-router-dom";
import { useAuth } from "../context/UserContext";
import { logout } from "../config/auth";

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  const { user, setUser } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <header className="navbar is-primary">
        <div className="container">
          <div className="navbar-brand">
            <Link className="navbar-item" to="/">
              <strong>EdriProducts</strong>
            </Link>
            <span className="navbar-burger" data-target="navbarMenu">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>

          <div id="navbarMenu" className="navbar-menu">
            <div className="navbar-start">
              <Link to="/" className="navbar-item">
                Inicio
              </Link>
              {user && (
                <Link to="/dashboard" className="navbar-item">
                  Panel de control
                </Link>
              )}
            </div>

            <div className="navbar-end">
              {user ? (
                <>
                  <figure className="image is-32x32 is-inline-block is-align-self-center">
                    <img
                      className="is-rounded"
                      src={user.photoURL || "/images/nouserimg.jpg"}
                      alt="Avatar"
                    />
                  </figure>
                  <button onClick={handleLogout} className="navbar-item button is-danger ml-3">
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="navbar-item button is-light">Login</Link>
                  <Link to="/register" className="navbar-item button is-primary">Registro</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <main style={{ minHeight: "100vh" }} className="section">
        <div className="container">{children}</div>
      </main>

      <footer className="footer has-background-primary has-text-white">
        <div className="content has-text-centered">
          <p>&copy; {new Date().getFullYear()} Realizado por Edrian Castillo. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export { Layout };
