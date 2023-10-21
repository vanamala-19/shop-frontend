import React, { useEffect, useState } from "react";
// import ProductCard from "./ProductCard";
import Reviews from "./Reviews";
import SimilarProducts from "./SimilarProducts";
import { useParams } from "react-router-dom";
import ProductService from "../api/ProductService";
import LoadingPage from "./Loading";

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  // eslint-disable-next-line
  const [reviews, setReviews] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);
  const { id } = useParams();
  const { getProductById, getAllProductsByCategory } = ProductService();

  useEffect(() => {
    // // Fetch product details by ID

    const getProduct = async () => {
      const response = await getProductById(id);
      setProduct(response);
    };
    // // Fetch reviews for the product
    // fetch(`/api/reviews/${id}`)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setReviews(data);
    //   });
    // // Fetch similar products by category
    const similar = async () => {
      const response = await getAllProductsByCategory(
        0,
        8,
        "id",
        "asc",
        product.category
      );
      const filteredProducts = response.products.filter(
        (p) => p.id !== product.id
      );
      setSimilarProducts(filteredProducts);
    };
    if (product) {
      similar();
    }

    getProduct();
    // eslint-disable-next-line
  }, [product?.category]);

  if (!product) {
    return <LoadingPage />;
  }

  return (
    <div className="product-details-container">
      <div className="product-details">
        <div className="product-image">
          <div className="aspect-square overflow-hidden flex items-center">
            <img
              className="h-full w-full object-contain"
              src={`data:image/jpeg;base64,${product.image}`}
              alt="Product pic"
            />
          </div>
        </div>
        <div className="product-info">
          <h2>{product?.name}</h2>
          <p>{product?.description}</p>
          <p className="product-price">{product?.price} $</p>
          <p>{product?.quantity} in stock</p>
          <p>{product?.rating} stars</p>
          <button className="add-to-cart-button">Add to Cart</button>
        </div>
      </div>

      <Reviews reviews={reviews} />

      <SimilarProducts products={similarProducts} />
    </div>
  );
};

export default ProductPage;
