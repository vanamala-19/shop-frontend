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
      console.log(response);
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
        product?.category
      );
      const filteredProducts = response?.products?.filter(
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
      <div className="product-details-container">
        <div className="product-details flex flex-col md:flex-row md:items-center">
          <div className="product-image mb-4 md:mb-0 md:w-2/5 md:pr-8">
            <div className="aspect-w-1 aspect-h-1 md:aspect-w-4 md:aspect-h-3 overflow-hidden rounded-lg">
              <img
                className="h-full w-full object-cover"
                src={`data:image/jpeg;base64,${product?.image}`}
                alt="Product pic"
              />
            </div>
          </div>
          <div className="product-info mt-4 md:mt-0 md:w-3/5 md:pl-8">
            <h2 className="text-2xl font-bold">{product?.name}</h2>
            <p className="mt-2">Description: {product?.description}</p>
            <p className="mt-2 text-lg font-semibold">
              Price: {product?.price} $
            </p>
            <p className="mt-2">Quantity: {product?.quantity} in stock</p>
            <p className="mt-2">Rating: {product?.rating} stars</p>
            <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300">
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <Reviews reviews={reviews} />

      <SimilarProducts products={similarProducts} />
    </div>
  );
};

export default ProductPage;
