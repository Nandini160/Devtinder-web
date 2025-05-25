import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';



const Login = () => {

   const [emailId , setEmailId] = useState("");
   const [password, setPassword] = useState("");
   const [firstName , setFirstName] = useState("");
   const [ lastName , setLastName] = useState("");
   const [isLoginForm , setIsLoginForm] = useState(true);
   const [error , setError] = useState("");
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

   const handleSignUp = async () => {
    try{
      const res = await axios.post(
        BASE_URL + "/Signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        {withCredentials : true}
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile")
    }catch(err){
       setError(err?.response?.data || "Something went wrong");

    }

   }


  return (
    <div className='flex justify-center my-10'>
      <div className="card card-border bg-base-300 w-80">
          <div className="card-body">
          <h2 className="card-title justify-center">{isLoginForm ? "login" : "signup"}</h2>
          <div>
            {!isLoginForm && (
            <>
            <fieldset className="fieldset my-2">
            <legend className="fieldset-legend">First Name</legend>
            <input type="text"
             value={firstName}
             className="input" placeholder=" " 
             onChange={(e) => setFirstName(e.target.value)}
             />
            </fieldset>

            <fieldset className="fieldset my-2">
            <legend className="fieldset-legend">Last Name</legend>
            <input type="text"
             value={lastName}
             className="input" placeholder=" " 
             onChange={(e) => setLastName(e.target.value)}
             />
            </fieldset>
            </>
          )}
            <fieldset className="fieldset my-2">
            <legend className="fieldset-legend">Email Id</legend>
            <input type="text"
             value={emailId}
             className="input" placeholder=" " 
             onChange={(e) => setEmailId(e.target.value)}
             />
            </fieldset>
            
            
            <fieldset className="fieldset my-2">
            <legend className="fieldset-legend">Password</legend>
            <input type="text"
             value={password}
            className="input" placeholder=" "
            onChange={(e) => setPassword(e.target.value)}
             />
            </fieldset>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center m-2">
           <button className="btn btn-primary" onClick={isLoginForm ?handleLogin : handleSignUp}>
            {isLoginForm ? "Login" : "Sign Up"}</button>
          </div>

          <p className='m-auto cursor-pointer py-2' onClick={() => setIsLoginForm((value) => !value)}>
             {isLoginForm ? "New user ? SignUp Here" : "Exsting User? Login Here"}
          </p>
       </div>
  </div>
     
    </div>
  )
};

export default Login;
