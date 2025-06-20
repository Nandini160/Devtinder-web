import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice';
import axios from 'axios';

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {
      // Error logic maybe redirect to error page
      console.log(err);
    }
  };


  return (
    // <div className="navbar bg-base-300 shadow-sm h-12 min-h-0 px-4">
    <div className="navbar bg-base-300 ">
    <div className="flex-1">
      <Link to= "/" className="btn btn-ghost text-xl">😎DevTinder</Link>
    </div>
     <div className="flex gap-2">
      {/* <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />  */}
      {user!== null && (
      <div className="dropdown dropdown-end mx-5 flex items-center">
        <p className='px-4'>Welcome,{user.firstName}</p>
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img
              alt="user photo"
              src= {user.photoUrl}/>
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
          <li>
            <Link to="/profile" className="justify-between">
              Profile
              <span className="badge">New</span>
            </Link>
          </li>
          <Link to ="/connections">Connections</Link>

          <li>
                <Link to="/requests">Requests</Link>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </div>
      )}
    </div>
   </div>
  )
}

export default Navbar;


