import { useState, useEffect } from "react";
import { Layout } from "../components/Layout";
import { ProductDetail } from "../components/ProductDetail.jsx";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase.js";
import Slider from "react-slick";


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsData = querySnapshot.docs.map((doc) => doc.data());
      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openProductDetail = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeProductDetail = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  const featuredProducts = products.filter((product) => product.featured);

  return (
    <Layout>
      <div>
        {featuredProducts.length > 0 && (
          <section className="section">
            <div className="container">
              <h2 className="title is-3 has-text-centered has-text-primary">Productos Destacados</h2>
              <Slider
                dots={true}
                infinite={true}
                speed={500}
                slidesToShow={3}
                slidesToScroll={1}
              >
                {featuredProducts.map((product, index) => (
                  <div key={index}>
                    <div
                      className="card has-shadow-small"
                      style={{ cursor: "pointer", borderRadius: "8px", overflow: "hidden" }}
                      onClick={() => openProductDetail(product)}
                    >
                      <div className="card-content">
                        <p className="title is-4 has-text-centered">{product.name}</p>
                        <p className="subtitle is-6 has-text-centered">{product.description}</p>
                        <div className="content has-text-centered">
                          <p className="has-text-weight-bold">Precio: {product.price}</p>
                          <p>Cuotas: {product.quotas}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </section>
        )}

        <section className="section">
          <div className="container">
            <h2 className="title is-3 has-text-centered has-text-primary">Nuestros Productos</h2>
            <div className="columns is-multiline">
              {products
                .filter((product) => !product.featured)
                .map((product, index) => (
                  <div key={index} className="column is-one-third">
                    <div
                      style={{ cursor: "pointer" }}
                      className="card has-shadow-small"
                      onClick={() => openProductDetail(product)}
                    >
                      <div className="card-content">
                        <p className="title is-4 has-text-centered">{product.name}</p>
                        <p className="subtitle is-6 has-text-centered">{product.description}</p>
                        <div className="content has-text-centered">
                          <p className="has-text-weight-bold">Precio: {product.price}</p>
                          <p>Cuotas: {product.quotas}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>

        <ProductDetail
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={closeProductDetail}
        />
      </div>
    </Layout>
  );
};

export { Home };
