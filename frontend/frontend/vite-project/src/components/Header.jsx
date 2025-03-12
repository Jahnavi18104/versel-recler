// import React, { useState } from "react";
// import { Link } from "react-router-dom"; // Import Link for routing
// import Logo from "../assets/F_Logo.png"; 
// import './Header.css'
//  // Adjust the path based on where the image is stored


// const Header = ({ onSearch }) => {
//   const [input, setInput] = useState(""); // To store search input

//   // Trigger search on button click
//   const handleSearch = () => {
//     onSearch(input); // Pass search input to parent component (App.js)style={{ textAlign: "center", padding: "20px", backgroundColor: "", color: "white" ,width:"100%"}}
//   };

//   return (
//     <header className="header">
      

// <br></br>
//       <div className="search-container" style={{ marginBottom: "20px" }}>
//       <img src={Logo} alt="Logo" style={{width: "150px" , height: "50px" }}/>
//         <input
//           type="text"
//           placeholder="Search for datasets..."
//           value={input}
//           onChange={(e) => setInput(e.target.value)} // Update input value on change
//           style={{
//             padding: "10px",
//             borderRadius: "5px",
//             border: "2px solid #ccc",
//             minWidth: "300px",
//             marginRight: "10px",
//           }}
//         />
//         <button
//           onClick={handleSearch}
//           style={{ padding: "10px 20px", backgroundColor: "white", color: "black", border: "none", borderRadius: "5px" }}
//         >
//           Search
//         </button>
    

//       {/* Auth Buttons (Signin and Register) */}
      
//         <Link to="/signin">
//           <button
//             style={{
//               padding: "10px 20px",
//               marginRight: "10px",
//               backgroundColor: "white",
//               color: "black",
//               border: "none",
//               borderRadius: "5px",
//             }}
//           >
//             Sign In
//           </button>
//         </Link>
//         <Link to="/register">
//           <button
//             style={{
//               padding: "10px 20px",
//               backgroundColor: "white",
//               color: "black",
//               border: "none",
//               borderRadius: "5px",
//             }}
//           >
//             Register
//           </button>
//         </Link>
//       </div>
//     </header>
//   );
// };

// export default Header;
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/F_Logo.png"; 
import './Header.css';

const Header = ({ onSearch }) => {
  const [input, setInput] = useState("");

  const handleSearch = () => {
    onSearch(input);
  };

  return (
    <header className="header">
      <div className="logo-container">
        <img src={Logo} alt="Logo" className="logo" />
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search for datasets..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">Search</button>
      </div>

      <div className="auth-buttons">
        <Link to="/signin" className="auth-button">Sign In</Link>
        <Link to="/register" className="auth-button">Register</Link>
      </div>
    </header>
  );
};

export default Header;