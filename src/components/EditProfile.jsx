import React, { useState } from 'react'
import UserCard from "./UserCard"
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const EditProfile = ({user}) => {
  
      const [firstName, setFirstName] = useState(user?.firstName || "");
      const [lastName, setLastName] = useState(user?.lastName || "");
      const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
      const [age, setAge] = useState(user?.age || "");
      const [gender, setGender] = useState(user?.gender || "");
      const [about, setAbout] = useState(user?.about || "");
      const [showToast , setShowToast] = useState(false);

     const [error , setError] = useState("");
     const dispatch = useDispatch();

     const saveProfile =  async() => {
    //     if (!firstName || !lastName || !photoUrl || !age || !gender || !about) {
    //     setError("All fields are required.");
    //      return;
    //  }
       setError("");
        try{
            const res = await axios.patch(
                BASE_URL + "/profile/edit" ,
            {
              firstName,
              lastName,
              photoUrl,
              age,
              gender,
              about,
            },
            {withCredentials:true}
        );
        dispatch(addUser(res?.data?.data));
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        },2000);
        } catch(err){
            setError(err.response.data);
        }
     }

    return (
    <>
    <div className= "flex justify-center my-10">  
      <div className='flex justify-center mx-10'>
        <div className="card card-border bg-base-300 w-80">
            <div className="card-body">
            <h2 className="card-title justify-center">Profile</h2>
            <div>
             <fieldset className="fieldset my-2">
              <legend className="fieldset-legend">FirstName</legend>
              <input type="text"
               value={firstName}
               className="input" placeholder=" " 
               onChange={(e) => setFirstName(e.target.value)}
               />
             </fieldset>

             <fieldset className="fieldset my-2">
              <legend className="fieldset-legend">LastName</legend>
              <input type="text"
               value={lastName}
               className="input" placeholder=" " 
               onChange={(e) => setLastName(e.target.value)}
               />
             </fieldset>

             <fieldset className="fieldset my-2">
              <legend className="fieldset-legend">PhotoUrl</legend>
              <input type="text"
               value={photoUrl}
               className="input" placeholder=" " 
               onChange={(e) => setPhotoUrl(e.target.value)}
               />
             </fieldset>

             <fieldset className="fieldset my-2">
              <legend className="fieldset-legend">Age</legend>
              <input type="text"
               value={age}
               className="input" placeholder=" " 
               onChange={(e) => setAge(e.target.value)}
               />
             </fieldset>

            <fieldset className="fieldset my-2">
             <legend className="fieldset-legend">Gender</legend>
             <select
                 value={gender}
                  className="input"
                  onChange={(e) => setGender(e.target.value)}
                 >
                   <option value="">Select Gender</option>
                   <option value="Male">Male</option>
                   <option value="Female">Female</option>
                   <option value="Other">Other</option>
               </select>
            </fieldset>


             <fieldset className="fieldset my-2">
              <legend className="fieldset-legend">About</legend>
              <input type="text"
               value={about}
               className="input" placeholder=" " 
               onChange={(e) => setAbout(e.target.value)}
               />
             </fieldset>
              
            </div>
            <p className="text-red-500">{error}</p>
            <div className="card-actions justify-center m-2">
             <button className="btn btn-primary" onClick={saveProfile}>Save Profile</button>
            </div>
         </div>
    </div>
       
      </div>
      <UserCard  user = { {firstName, lastName ,photoUrl , age , gender , about} }/>
    </div>
    {showToast && <div className="toast toast-top toast-center">
 
       <div className="alert alert-success">
          <span>Profile Saved successfully.</span>
       </div>
    </div>}
    </>
    )
};

export default EditProfile;
