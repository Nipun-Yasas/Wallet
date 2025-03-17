import React from 'react'

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/Inputs/Input";

import { validateEmail } from "../../utils/helper.js";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";

export default function SignUp() {

  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError] = useState(null);

  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();

    let profilePicUrl = '';

    if(!fullName){
      setError("Please enter your full name")
      return
    }
    if(!validateEmail(email)){
      setError("Please enter a valid email")
      return
    }
    if(!password){
      setError("Please enter the password")
      return
    }

    setError("");
  }

  return (
    <AuthLayout>
      <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Create a Account</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>Join us today by entering your details below</p>

        <form onSubmit={handleSignUp}>

          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            value={fullName}
            onChange={(target) => setFullName(target.value)}
            label='Full Name'
            placeholder='Enter your full name'
            type='text'
          />

          <Input
            value={email}
            onChange={(target) => setEmail(target.value)}
            label='Email Address'
            placeholder='Enter your email address'
            type='email'
          />

          <div className="col-span-2">
          <Input
            value={password}
            onChange={(target) => setPassword(target.value)}
            label='Password'
            placeholder='Enter your password'
            type='password'
          />
          </div>
          </div>

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
          
                    <button type="submit" className="btn-primary mt-4">
                      Sign up
                    </button>
          
                    <p className="text-[13px] text-slate-800 mt-3">
                      Alreadt have an account?{" "}
                      <Link to="/Login" className="font-medium text-(color:--primary) underline">
                        Login
                      </Link>
          
                    </p></form>

      </div>
      
    </AuthLayout>
  )
}
