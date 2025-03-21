import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_URL = "https://versel-recler-8.onrender.com"; // Backend URL

const DatasetDetails = () => {
  const { id } = useParams();
  const [dataset, setDataset] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [file, setFile] = useState(null);

  // Fetch dataset details
  useEffect(() => {
    axios
      .get(`${API_URL}/datasets/${id}`)
      .then((res) => setDataset(res.data))
      .catch(() => setDataset(null)); // If dataset not found, allow upload
  }, [id]);

  // Fetch uploaded files
  useEffect(() => {
    axios
      .get(`${API_URL}/datasets/${id}`)
      .then((res) => setUploadedFiles(res.data.files || []))
      .catch(() => setUploadedFiles([])); // If no files, set empty array
  }, [id]);

  // Handle file selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // 🔥 Updated Handle File Upload Function
  const handleUpload = async () => {
    if (!file) {
      alert("❌ Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(`${API_URL}/datasets/${id}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        alert("✅ File uploaded successfully!");
        setFile(null); // Reset file input after upload

        // Refresh dataset and uploaded files list
        axios.get(`${API_URL}/datasets/${id}`).then((res) => setDataset(res.data));
        axios.get(`${API_URL}/datasets/${id}`).then((res) => setUploadedFiles(res.data.files || []));
      } else {
        alert("❌ Unexpected error occurred.");
      }
    } catch (error) {
      console.error("❌ Error uploading file:", error);

      if (error.response) {
        alert(`❌ Upload failed: ${error.response.data.message || "Unknown error"}`);
      } else if (error.request) {
        alert("❌ Server did not respond. Check if backend is running.");
      } else {
        alert(`❌ Request error: ${error.message}`);
      }
    }
  };

  return (
    <div className="dataset-details">
      {dataset ? (
        <>
          <h2>{dataset.name}</h2>
          <img src={dataset.image} alt={dataset.name} width="300" />
          <p>Category: {dataset.category}</p>
        </>
      ) : (
        <h2> Upload a new dataset below.</h2>
      )}

      <h3>Uploaded Files</h3>
      {uploadedFiles.length > 0 ? (
        <ul>
          {uploadedFiles.map((file, index) => (
            <li key={index}>
              <a href={`${API_URL}/uploads/${file.fileName}`} download>
                {file.fileName}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No files uploaded yet.</p>
      )}

      <h3>Upload a File</h3>
      <input type="file" onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        style={{
          backgroundColor: "white",
          color: "black",
          border: "1px solid black",
          padding: "10px 15px",
          cursor: "pointer",
        }}
      >
        Upload
      </button>
    </div>
  );
};

export default DatasetDetails;
