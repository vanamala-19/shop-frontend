import { useState } from "react";
import useAxiosPrivate from "../Hooks/useAxiosPrivate";

const ImageUpload = ({ url }) => {
  const [username] = localStorage.getItem("user");
  const axiosPrivate = useAxiosPrivate();
  const [image, setImage] = useState("");
  const handleUpload = async () => {
    const formData = new FormData();
    const blob = image.slice(0, image.size);
    var newFile = new File([blob], `${username}`, { type: `${image.type}` });
    console.log(newFile);
    formData.append("image", newFile);
    const response = await axiosPrivate.post("/user/image", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });
    console.log(response);
  };
  return (
    <div>
      <input
        type="file"
        name="file"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button onClick={handleUpload}>Submit</button>
    </div>
  );
};

export default ImageUpload;
