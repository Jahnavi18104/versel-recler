import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { datasets } from "../data/datasets"; // ✅ Import datasets array
import "./DatasetFiles.css"; // ✅ Import CSS

const API_URL = "http://localhost:5000";

const DatasetFiles = () => {
  const { id } = useParams();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [dataset, setDataset] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // ✅ Handle errors

  useEffect(() => {
    if (!id) {
      setError("Invalid dataset ID.");
      setLoading(false);
      return;
    }

    console.log("Fetching dataset for ID:", id); // ✅ Debugging log

    // ✅ Find dataset from local datasets.js
    const foundDataset = datasets.find((d) => d.id === id);
    if (!foundDataset) {
      setError("Dataset not found.");
      setLoading(false);
      return;
    }
    setDataset(foundDataset);

    // ✅ Fetch dataset files from backend
    axios
      .get(`${API_URL}/datasets/${id}`)
      .then((res) => {
        console.log("Fetched Files:", res.data.files);
        setUploadedFiles(res.data.files || []);
      })
      .catch((error) => {
        console.error("Error fetching files:", error);
        setError("Failed to fetch dataset files.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="dataset-container">
      <div className="dataset-box">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : dataset ? (
          <>
            {/* Left Side - Dataset Image (Separate Box) */}
            <div className="dataset-image-box">
              <img src={dataset.image} alt={dataset.name} />
            </div>

            {/* Right Side - Dataset Details (Separate Box) */}
            <div className="dataset-details-box">
              <h2>{dataset.name} Files</h2>
              <p><strong>Description:</strong> {dataset.description}</p>

              {uploadedFiles.length > 0 ? (
                <ul>
                  {uploadedFiles.map((file, index) => (
                    <li key={index}>
                      {/* ✅ Display dataset name instead of file.fileName */}
                      <p><strong>File Name:</strong> {dataset.name}</p>
                      <a href={`${API_URL}${file.filePath}`} download>Download</a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No files available.</p>
              )}
            </div>
          </>
        ) : (
          <p style={{ color: "red" }}>Dataset Not Found. Please check the URL.</p>
        )}
      </div>
    </div>
  );
};

export default DatasetFiles;
