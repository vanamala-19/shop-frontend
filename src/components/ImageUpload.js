import { useState } from "react";
import upload from "../Image/upload.png";
import useAxiosPrivate from "../Hooks/useAxiosPrivate";

const ImageUpload = ({ url }) => {
  const username = localStorage.getItem("user");
  const axiosPrivate = useAxiosPrivate();
  const [image, setImage] = useState();
  // const [previewURL, setPreviewURL] = useState("path/to/default/image.jpg"); // path to a default image

  const handleUpload = async () => {
    const formData = new FormData();
    const blob = image.slice(0, image.size);

    try {
      formData.append("image", blob);
      formData.append("username", JSON.parse(username));
      console.log(username);
      const response = await axiosPrivate.post("/user/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="dark:bg-dark bg-light dark:text-white text-dark">
      <label className="cursor-pointer">
        {image ? (
          <img
            src={URL.createObjectURL(image)}
            alt="preview"
            className="max-w-50 max-h-50"
          />
        ) : (
          <img
            src={upload}
            alt="default preview"
            className="max-w-50 max-h-50"
          />
        )}

        <input
          type="file"
          name="file"
          className="hidden"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </label>
      <button
        onClick={handleUpload}
        className="mt-4 bg-green-500 dark:bg-green-400 text-white px-4 py-2 rounded cursor-pointer hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300">
        Upload
      </button>
    </div>
  );
};

export default ImageUpload;
