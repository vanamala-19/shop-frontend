import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../Hooks/useAxiosPrivate";

const Cart = () => {
  const axiosPrivate = useAxiosPrivate();
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [alert, setAlert] = useState({ message: "", type: "" });
  document.title = "SHOP | CART";
  const getImage = async () => {
    return await fetch("https://dummyjson.com/products?limit=100&skip=0")
      .then((res) => res.json())
      .then((res) => {
        setProducts(res.products);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const nextProduct = () => {
    if (currentIndex < products.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevProduct = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleImageSelect = (image) => {
    setSelectedImage({
      imageId: image,
      productId: products[currentIndex].id,
    });
    setAlert({ message: "", type: "" });
  };

  const handleSubmit = async () => {
    try {
      // Download the image as a Blob object
      const response = await fetch(selectedImage.imageId);
      const blob = await response.blob();

      // Create a new File object from the Blob
      const file = new File([blob], "image.jpg", { type: blob.type });

      // Prepare the FormData object
      const formData = new FormData();
      formData.append("image", file);
      formData.append("productId", selectedImage.productId);

      // Send the FormData object to the backend
      const res = await axiosPrivate.post("/admin/product/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      console.log(res);
      console.log(selectedImage.productId);
      setAlert({ message: "Image uploaded successfully", type: "success" });
    } catch (err) {
      console.error(err);
      setAlert({ message: "Image upload failed", type: "failure" });
    }
  };

  useEffect(() => {
    getImage();
  }, []);

  return (
    <div className="dark:bg-dark dark:text-white bg-light text-dark">
      {alert.message && (
        <div
          style={{
            backgroundColor: alert.type === "success" ? "green" : "red",
          }}>
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
                    selectedImage?.imageId === image
                      ? "border-blue-500"
                      : "border-transparent"
                  }`}>
                  {/* eslint-disable-next-line */}
                  <img
                    src={image}
                    alt={`Image`}
                    className="w-64 h-64 object-cover rounded-lg"
                  />
                </button>
              </div>
            ))}
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={prevProduct}>
            Prev
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={nextProduct}>
            Next
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSubmit}>
            Submit
          </button>
        </div>
      ) : (
        <p>No products</p>
      )}
    </div>
  );
};

export default Cart;
