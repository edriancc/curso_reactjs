import { useState } from "react";
import { Layout } from "../components/Layout";
import { register } from "../config/auth";
import { useAuth } from "../context/UserContext";

const Register = () => {
  const { setUser } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const newUser = await register(
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.password
      );
      setUser(newUser);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Layout>
      <div className="container is-flex is-justify-content-center is-align-items-center" style={{ height: "100vh" }}>
        <div className="box" style={{ width: "400px" }}>
          <h1 className="title has-text-centered">Crear cuenta</h1>
          {error && <p className="has-text-danger has-text-centered">{error}</p>}
          <form onSubmit={handleRegister}>
            <div className="field">
              <label className="label">Nombre</label>
              <div className="control has-icons-left">
                <input
                  className="input"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  style={{ paddingLeft: "2.5rem" }}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-user"></i>
                </span>
              </div>
            </div>

            <div className="field">
              <label className="label">Apellido</label>
              <div className="control has-icons-left">
                <input
                  className="input"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  style={{ paddingLeft: "2.5rem" }} 
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-user"></i>
                </span>
              </div>
            </div>

            <div className="field">
              <label className="label">Correo electrónico</label>
              <div className="control has-icons-left">
                <input
                  className="input"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  style={{ paddingLeft: "2.5rem" }}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </div>
            </div>

            <div className="field">
              <label className="label">Confirmar contraseña</label>
              <div className="control has-icons-left">
                <input
                  className="input"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  style={{ paddingLeft: "2.5rem" }}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </div>
            </div>

            <button className="button is-primary is-fullwidth" type="submit">
              Registrarse
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export { Register };
