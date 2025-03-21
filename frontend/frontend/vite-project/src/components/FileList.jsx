import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams to access dynamic URL params

const FileList = () => {
  const { id } = useParams(); // Get the dynamic id from the URL
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);  // Error state for handling issues

  useEffect(() => {
    if (!id) {
      setError("Invalid dataset ID.");
      return;
    }

    console.log("Fetching files for dataset ID:", id);  // Debugging log

    // Fetch files for the dynamic dataset ID
    fetch(`https://versel-recler-8.onrender.com/datasets/${id}`) // API URL updated here
      .then((response) => response.json())
      .then((data) => {
        setFiles(data.files || []); // Make sure to handle the files returned from the backend
      })
      .catch((error) => {
        console.error("Error fetching files:", error);
        setError("Failed to fetch dataset files.");
      });
  }, [id]); // Re-run the effect when the dynamic `id` changes

  return (
    <div>
      <h2>Uploaded Files for Dataset {id}</h2>
      {error ? (
        <p style={{ color: "red" }}>{error}</p> // Display error if there is an issue fetching the files
      ) : (
        <ul>
          {files.length === 0 ? (
            <li>No files available for this dataset.</li> // Message when no files are available
          ) : (
            files.map((file) => (
              <li key={file._id}>
                {/* Preview and download links */}
                <a 
                  href={`https://versel-recler-8.onrender.com${file.filePath}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {file.fileName}
                </a>
                &nbsp;|&nbsp;
                <a 
                  href={`https://versel-recler-8.onrender.com${file.filePath}`} 
                  download
                >
                  Download
                </a>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default FileList;
