import { Layout } from "../components/Layout";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Layout>
      <div className="has-text-centered">
        <h1 className="title is-1 has-text-primary">404 - Pagina no encontrada!</h1>
        <p className="subtitle is-4">
          Oops! La pagina no existe o fue eliminada.
        </p>
        <div className="buttons is-centered mt-5">
          <Link to="/" className="button is-primary is-outlined">
            Go Home
          </Link>
          <Link to="/dashboard" className="button is-link is-outlined">
            Visita el panel de control
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export { NotFound };
