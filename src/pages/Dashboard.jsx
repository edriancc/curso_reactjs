import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../config/firebase.js";
import { Layout } from "../components/Layout";
import "@fortawesome/fontawesome-free/css/all.css";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    longDescription: "",
    price: "",
    quotas: "",
    sku: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const productsCollection = collection(db, "products");

  const fetchProducts = async () => {
    const data = await getDocs(productsCollection);
    setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    setFormData((prevFormData) => {
      const newFormData = { 
        ...prevFormData, 
        [name]: type === 'checkbox' ? checked : value 
      };

      if (name === "name" || name === "price") {
        newFormData.sku = generateSKU(newFormData.name, newFormData.price);
      }
  
      return newFormData;
    });
  };  

  const generateSKU = (name, price) => {
    const randomString = Math.random().toString(36).substring(2, 5).toUpperCase();
    const pricePart = price ? price.substring(0, 3) : "000";
    const namePart = name ? name.substring(0, 3).toUpperCase() : "XXX";
    return `${namePart}-${pricePart}-${randomString}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      const productDoc = doc(db, "products", editingId);
      await updateDoc(productDoc, formData);
      setEditingId(null);
    } else {
      await addDoc(productsCollection, formData);
    }
    setFormData({
      name: "",
      description: "",
      longDescription: "",
      price: "",
      quotas: "",
      sku: "",
    });
    fetchProducts();
    setFormVisible(false); 
  };

  const handleDelete = async (id) => {
    if (confirm("¿Estas seguro que quieres borrar el producto?")) {
      const productDoc = doc(db, "products", id);
      await deleteDoc(productDoc);
      fetchProducts();
    }
  };

  const handleEdit = (product) => {
    setFormData(product);
    setEditingId(product.id);
    setFormVisible(true); 
  };

  const handleClearForm = () => {
    setFormData({
      name: "",
      description: "",
      longDescription: "",
      price: "",
      quotas: "",
      sku: "",
      featured: false,
    });
    setEditingId(null);
    setFormVisible(false);
  };

  const handleFeatured = async (id, currentFeaturedStatus) => {
    const productDoc = doc(db, "products", id);
    await updateDoc(productDoc, { featured: !currentFeaturedStatus }); 
    fetchProducts(); 
  };

  return (
    <Layout>
      <div>
        <div className="is-flex is-justify-content-space-between">
          <h1 className="title">Carga de productos</h1>
          <button
            className="button is-primary"
            onClick={() => setFormVisible(!formVisible)}
          >
            Nuevo
          </button>
        </div>
        {formVisible && (
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">Nombre</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Descripcion</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Descripcion Completa</label>
              <div className="control">
                <textarea
                  className="textarea"
                  name="longDescription"
                  value={formData.longDescription}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
            </div>

            <div className="field">
              <label className="label">Precio</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Cuotas</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="quotas"
                  value={formData.quotas}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label">SKU</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="sku"
                  value={formData.sku}
                  disabled
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Destacar</label>
              <div className="control">
                <input
                  className="checkbox"
                  type="checkbox"
                  name="featured"
                  checked={formData.featured || false}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="control">
              <button className="button is-primary" type="submit">
                {editingId ? "Actualizar Producto" : "Agregar Producto"}
              </button>
              {editingId && (
                <button
                  className="button is-info ml-3"
                  type="button"
                  onClick={handleClearForm}
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        )}

        {products.length > 0 && (
          <table className="table is-fullwidth is-striped mt-5">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripcion</th>
                <th>SKU</th>
                <th>Precio</th>
                <th>Cuotas</th>
                <th>Destacado</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.sku}</td>
                  <td>{product.price}</td>
                  <td>{product.quotas}</td>
                  <td>
                    {product.featured ? (
                      <i className="fas fa-star" style={{ color: 'gold' }}></i> 
                    ) : (
                      <i className="far fa-star" style={{ color: 'gray' }}></i> 
                    )}
                  </td>
                  <td>
                    <button
                      className="button is-small is-warning mr-2"
                      style={{ width: '100px' }}
                      onClick={() => handleFeatured(product.id, product.featured)}
                    >
                      {product.featured ? "No Destacar" : "Destacar"}
                    </button>
                    <button
                      className="button is-small is-info mr-2"
                      style={{ width: '100px' }}
                      onClick={() => handleEdit(product)}
                    >
                      Editar
                    </button>
                    <button
                      className="button is-small is-danger"
                      style={{ width: '100px' }}
                      onClick={() => handleDelete(product.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
};

export { Dashboard };
