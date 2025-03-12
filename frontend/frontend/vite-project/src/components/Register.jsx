// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import "./Register.css";
// import Logo from "../assets/F_Logo.png";
// import img from '../assets/register.jpg';

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//     rePassword: "",
//   });
//   const [message, setMessage] = useState("");
//   const [isError, setIsError] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.password !== formData.rePassword) {
//       setMessage("Passwords do not match.");
//       setIsError(true);
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:5000/register", { // ✅ Ensure this matches backend
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name: formData.name,
//           email: formData.email,
//           phone: formData.phone,
//           password: formData.password,
//         }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setMessage("✅ Registration successful! Redirecting...");
//         setIsError(false);
//         setTimeout(() => {
//           window.location.href = "/signin"; // ✅ Redirect after 2s
//         }, 2000);
//       } else {
//         setMessage(data.message);
//         setIsError(true);
//       }
//     } catch (err) {
//       console.error("❌ Fetch Error:", err);
//       setMessage("❌ Error connecting to the server.");
//       setIsError(true);
//     }
//   };

//   return (
//     <div className="container">
//     <div className="register-box image-box">
//         <img src={img} alt="Register" className="register-image" />
//       </div>
//       <div className="card">
//         <img src={Logo} alt="Logo" className="logo" />
//         <h1>Register</h1>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name="name"
//             placeholder="Enter name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//           <br /><br />
//           <input
//             type="email"
//             name="email"
//             placeholder="Enter email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//           <br /><br />
//           <input
//             type="tel"
//             name="phone"
//             placeholder="Enter phone number"
//             value={formData.phone}
//             onChange={handleChange}
//             required
//           />
//           <br /><br />
//           <input
//             type="password"
//             name="password"
//             placeholder="Enter password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//           <br /><br />
//           <input
//             type="password"
//             name="rePassword"
//             placeholder="Re-enter password"
//             value={formData.rePassword}
//             onChange={handleChange}
//             required
//           />
//           <br /><br />
//           <button
//             type="submit"
//             style={{ backgroundColor: "black", color: "white" }}
//           >
//             Submit
//           </button>
//         </form>
//         <p
//           style={{
//             marginTop: "10px",
//             color: isError ? "red" : "green",
//           }}
//         >
//           {message}
//         </p>
//       </div>
//       <p className="footer-text">
//         Have an account? <Link to="/signin">Sign In</Link>
//       </p>
//     </div>
//   );
// };

// export default Register;









// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import "./Register.css";
// import Logo from "../assets/F_Logo.png";
// import Img from "../assets/register.jpg";

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//     rePassword: "",
//   });
//   const [message, setMessage] = useState("");
//   const [isError, setIsError] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.password !== formData.rePassword) {
//       setMessage("Passwords do not match.");
//       setIsError(true);
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:5000/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name: formData.name,
//           email: formData.email,
//           phone: formData.phone,
//           password: formData.password,
//         }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setMessage("✅ Registration successful! Redirecting...");
//         setIsError(false);
//         setTimeout(() => {
//           window.location.href = "/signin";
//         }, 2000);
//       } else {
//         setMessage(data.message);
//         setIsError(true);
//       }
//     } catch (err) {
//       console.error("❌ Fetch Error:", err);
//       setMessage("❌ Error connecting to the server.");
//       setIsError(true);
//     }
//   };

//   return (
//     <div className="register-wrapper">
//       <div className="register-box image-box">
//         <img src={Img} alt="Register" className="register-image" />
//       </div>
//       <div className="register-box form-box">
//         <img src={Logo} alt="Logo" className="logo" />
//         <h1>Register</h1>
//         <form onSubmit={handleSubmit}>
//           <input type="text" name="name" placeholder="Enter name" value={formData.name} onChange={handleChange} required />
//           <input type="email" name="email" placeholder="Enter email" value={formData.email} onChange={handleChange} required />
//           <input type="tel" name="phone" placeholder="Enter phone number" value={formData.phone} onChange={handleChange} required />
//           <input type="password" name="password" placeholder="Enter password" value={formData.password} onChange={handleChange} required />
//           <input type="password" name="rePassword" placeholder="Re-enter password" value={formData.rePassword} onChange={handleChange} required />
//           <button type="submit">Submit</button>
//         </form>
//         <p className={isError ? "error-message" : "success-message"}>{message}</p>
//         <p>
//           Have an account? <Link to="/signin">Sign In</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;















import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import Logo from "../assets/F_Logo.png";
import Img from "../assets/register.jpg";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    rePassword: "",
  });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.rePassword) {
      setMessage("Passwords do not match.");
      setIsError(true);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("✅ Registration successful! Redirecting...");
        setIsError(false);
        setTimeout(() => {
          window.location.href = "/signin";
        }, 2000);
      } else {
        setMessage(data.message);
        setIsError(true);
      }
    } catch (err) {
      console.error("❌ Fetch Error:", err);
      setMessage("❌ Error connecting to the server.");
      setIsError(true);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box image-box">
        <img src={Img} alt="Register" className="register-image" />
      </div>
      <div className="register-box form-box">
        <img src={Logo} alt="Logo" className="logo" />
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Enter name" value={formData.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Enter email" value={formData.email} onChange={handleChange} required />
          <input type="tel" name="phone" placeholder="Enter phone number" value={formData.phone} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Enter password" value={formData.password} onChange={handleChange} required />
          <input type="password" name="rePassword" placeholder="Re-enter password" value={formData.rePassword} onChange={handleChange} required />
          <button type="submit">Submit</button>
        </form>
        <p className={isError ? "error-message" : "success-message"}>{message}</p>
        <p>
          Have an account? <Link to="/signin">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
