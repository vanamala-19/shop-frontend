import ProductCard from "./ProductCard";

const SimilarProducts = ({ products }) => {
  return (
    <div>
      <h3>Similar Products</h3>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default SimilarProducts;
