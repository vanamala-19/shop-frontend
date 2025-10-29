import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../Hooks/useAxiosPrivate";

const Product = () => {
  const axiosPrivate = useAxiosPrivate();
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [alert, setAlert] = useState({ message: "", type: "" });

  // Fetch products from dummyjson API
  const getImage = async () => {
    try {
      const res = await fetch("https://dummyjson.com/products?limit=100&skip=0");
      const data = await res.json();
      setProducts(data.products);
    } catch (err) {
      console.error(err);
    }
  };

  const nextProduct = () => {
    if (currentIndex < products.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const prevProduct = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleImageSelect = (image) => {
    setSelectedImage({
      imageId: image,
      productId: products[currentIndex].id,
    });
    setAlert({ message: "", type: "" });
  };

  // Upload image
  const handleSubmit = async () => {
    try {
      const response = await fetch(selectedImage.imageId);
      const blob = await response.blob();
      const file = new File([blob], "image.jpg", { type: blob.type });

      const formData = new FormData();
      formData.append("image", file);
      formData.append("productId", selectedImage.productId);

      await axiosPrivate.post("/admin/product/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      setAlert({ message: "Image uploaded successfully", type: "success" });
    } catch (err) {
      console.error(err);
      setAlert({ message: "Image upload failed", type: "failure" });
    }
  };

  // Add product to backend DB
  const handleAddProduct = async (product) => {
    try {
      const payload = {
        id: product.id,
        name: product.title,
        description: product.description,
        price: product.price,
        quantity: product.stock || 1,
        category: product.category,
        brand: product.brand,
        rating: product.rating,
      };

      await axiosPrivate.post("/admin/product/add", payload, { withCredentials: true });

      setAlert({ message: `Product "${product.title}" added successfully`, type: "success" });
    } catch (err) {
      console.error(err);
      setAlert({ message: `Failed to add product "${product.title}"`, type: "failure" });
    }
  };

  // Add all products at once
  const handleAddAllProducts = async () => {
    for (let i = 0; i < products.length; i++) {
      await handleAddProduct(products[i]);
    }
    setAlert({ message: "All products added successfully!", type: "success" });
  };

  useEffect(() => {
    getImage();
  }, []);

  return (
    <div>
      {alert.message && (
        <div style={{ backgroundColor: alert.type === "success" ? "green" : "red", color: "white", padding: "5px" }}>
          {alert.message}
        </div>
      )}

      {products.length > 0 ? (
        <div>
          <div>
            <label>{products[currentIndex].title}</label>
            <br />
            <label>{products[currentIndex].id}</label>
            <br />
            {products[currentIndex].images.map((image, j) => (
              <div key={j}>
                <button
                  onClick={() => handleImageSelect(image)}
                  className={`border-4 ${
                    selectedImage?.imageId === image ? "border-blue-500" : "border-transparent"
                  }`}
                >
                  <img src={image} alt="Product" className="w-64 h-64 object-cover rounded-lg" />
                </button>
              </div>
            ))}
          </div>

          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={prevProduct}>
            Prev
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={nextProduct}>
            Next
          </button>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleAddProduct(products[currentIndex])}>
            Add This Product
          </button>
          <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded" onClick={handleAddAllProducts}>
            Add All Products
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSubmit}>
            Upload Selected Image
          </button>
        </div>
      ) : (
        <p>Loading products...</p>
      )}
    </div>
  );
};

export default Product;
