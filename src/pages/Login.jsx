import { useState } from "react";
import { Layout } from "../components/Layout";
import { loginWithEmail, loginWithGoogle, logout } from "../config/auth";
import { useAuth } from "../context/UserContext";

const Login = () => {
  const { user, setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLoginWithEmail = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const loggedInUser = await loginWithEmail(email, password);
      setUser(loggedInUser);
    } catch (error) {
      setError("Error al iniciar sesión: Verifique Usuario y contraseña");
      console.error(error);
    }
  };

  const handleLoginWithGoogle = async () => {
    try {
      const loggedInUser = await loginWithGoogle();
      setUser(loggedInUser);
      console.log(loggedInUser); 
    } catch (error) {
      console.error("Error de autenticación con Google:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className="container is-flex is-justify-content-center is-align-items-center" style={{ height: "100vh" }}>
        <div className="box" style={{ width: "400px" }}>
          <h1 className="title has-text-centered">Iniciar sesión</h1>
          
          {error && <p className="has-text-danger has-text-centered">{error}</p>}

          {user ? (
            <div className="has-text-centered">
              <figure className="image is-128x128 is-inline-block">
                <img
                  className="is-rounded"
                  src={user.photoURL || "/images/nouserimg.jpg"}
                  alt="Avatar"
                />
              </figure>
              <p className="subtitle">Bienvenido, {user.displayName}</p>
              <button className="button is-danger is-fullwidth" onClick={handleLogout}>
                Cerrar sesión
              </button>
            </div>
          ) : (
            <>
              <form onSubmit={handleLoginWithEmail}>
                <div className="field">
                  <label className="label">Correo electrónico</label>
                  <div className="control has-icons-left">
                    <input
                      className="input"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      style={{ paddingLeft: "2.5rem" }}
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </div>
                </div>

                <div className="field">
                  <label className="label">Contraseña</label>
                  <div className="control has-icons-left">
                    <input
                      className="input"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      style={{ paddingLeft: "2.5rem" }}
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-lock"></i>
                    </span>
                  </div>
                </div>

                <button className="button is-primary is-fullwidth" type="submit">
                  Iniciar sesión
                </button>
              </form>

              <div className="has-text-centered my-3">o</div>

              <button className="button is-danger is-fullwidth" onClick={handleLoginWithGoogle}>
                <span className="icon">
                  <i className="fab fa-google"></i>
                </span>
                <span>Iniciar sesión con Google</span>
              </button>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export { Login };
