// import React, { useState } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import DatasetGrid from "./components/DatasetGrid";
// import CategoryButtons from "./components/CategoryButtons";
// import { datasets }  from "./data";
// import Signin from "./components/Signin";
// import Register from "./components/Register";
// import DatasetDetails from "./components/DatasetDetails";
// //import FileDownloader from "./components/FileDownloader";
// import "./App.css";

// function App() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredDatasets, setFilteredDatasets] = useState(datasets);

//   const handleSearch = (term) => {
//     console.log("Searching for:", term);
//     setSearchTerm(term);
//     setFilteredDatasets(
//       datasets.filter((dataset) =>
//         dataset.name.toLowerCase().includes(term.toLowerCase())
//       )
//     );
//   };

//   const filterByCategory = (category) => {
//     console.log("Filtering by category:", category);
//     setFilteredDatasets(
//       category === "All" ? datasets : datasets.filter((d) => d.category === category)
//     );
//   };

//   console.log("Filtered datasets:", filteredDatasets);

//   return (
//     <Router>
//       <Header onSearch={handleSearch} />
//       <main>
//         <Routes>
//           <Route
//             path="/"
//             element={
//               <div>
//                 <CategoryButtons onFilter={filterByCategory} />
//                 <DatasetGrid datasets={filteredDatasets} />
//                 {/* <FileDownloader filename="example.pdf" /> */}
//               </div>
//             }
//           />
//           <Route path="/signin" element={<Signin />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/dataset/:id" element={<DatasetDetails />} />
//         </Routes>
//       </main>
//       <Footer />
//     </Router>
//   );
// }

// export default App;











import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DatasetGrid from "./components/DatasetGrid";
import CategoryButtons from "./components/CategoryButtons";
import { datasets } from "./data";
import Signin from "./components/Signin";
import Register from "./components/Register";
import DatasetDetails from "./components/DatasetDetails";
//import ScrollToTop from "./components/ScrollToTop";

import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDatasets, setFilteredDatasets] = useState(datasets);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setFilteredDatasets(
      datasets.filter((dataset) =>
        dataset.name.toLowerCase().includes(term.toLowerCase())
      )
    );
  };

  const filterByCategory = (category) => {
    setFilteredDatasets(
      category === "All" ? datasets : datasets.filter((d) => d.category === category)
    );
  };

  return (
    <Router>
      {/* <ScrollToTop /> */}
      <div className="app-container">
        {/* Fixed Header */}
        <Header onSearch={handleSearch} className="header" />

        {/* Scrollable Content */}
        <div className="content-container">
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <CategoryButtons onFilter={filterByCategory} />
                  <DatasetGrid datasets={filteredDatasets} />
                </div>
              }
            />
            <Route path="/signin" element={<Signin />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dataset/:id" element={<DatasetDetails />} />
            
          </Routes>
        </div>

        {/* Fixed Footer */}
        {/* <Footer className="footer" /> */}
      </div>
    </Router>
  );
}

export default App;

