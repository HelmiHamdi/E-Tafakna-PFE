
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import "./index.css"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { useState,useContext } from "react";


const Login = () => {
  const { login } = useContext(AuthContext);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  // State pour gérer les erreurs de connexion
  const [err, setErr] = useState(null);

  // Hook pour la navigation
  const navigate = useNavigate();

  // Fonction pour mettre à jour les informations de connexion lors de la saisie de l'utilisateur
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Fonction pour gérer la soumission du formulaire de connexion
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      
      navigate("/dashboard");
     
    } catch (err) {
      setErr(err.response.data);
    }
  };

   return (
    <div className="test">
    <div className="wrapper">
      {/* <h1 style={{margin:"auto",paddingBottom:"10px"}}>E-Tafakna</h1> */}
      <form onSubmit={handleLogin}>
           <img style={{
             width: "100px",
              height: "100px",
}} src="https://res.cloudinary.com/dcscfcsdfrefrefreferfersdfersdf/image/upload/v1664808728/Image-Landing-Page/logo_rdxb3d.png" alt="Your Company"></img>
        <div className="inputboxing">
          <input
            type="email"
            placeholder="Email"
            required
            name="email"
            style={{backgroundColor:"RoyalBlue"}}
            value={inputs.email}
              onChange={handleChange}
          />
          <MdEmail className="icon"  />
        </div>
        <div className="inputboxing">
          <input
            type="password"
            placeholder="Password"
            required
            name="password"
            style={{backgroundColor:"RoyalBlue"}}
            value={inputs.password}
              onChange={handleChange}
          />
          <FaLock className="icon"  />
        </div>
        <div >
        {err && <p>{err}</p>}
        </div>
        <div>
        <button type="submit">
         <span className='loading loading-spinner '>Login</span> 
        </button>
        </div>
      </form>
    </div>
  </div>
);
     };
    export default Login;
