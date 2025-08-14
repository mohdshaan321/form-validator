import React, { useState } from 'react'
// import {Link, useNavigate} from "react-router-dom"
import { Link } from 'react-router-dom';
import {useNavigate} from "react-router-dom"
import {ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from '../utils';

function Signup() {
     const[signupInfo,setSignupInfo] = useState({
      name: "",
      email:"",
      password:""
     });
 
     const navigate = useNavigate();


     const handleSignup=  (e)=>{
     const {name,value} = e.target;
     const copySignupInfo = {...signupInfo}
     copySignupInfo[name] = value
     setSignupInfo(copySignupInfo)
     
     }
  
    const handleSubmit = async (e)=>{
          e.preventDefault();
          const{name,email,password}=signupInfo;
          const url = "https://form-validator-sazz.onrender.com/auth/signup";

          
      if(!name || !email || !password){
          handleError("name, email or password are required")
        }
 
      try {
      
        const response = await fetch(url,{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify(signupInfo)
        })

       const result = await response.json()
       console.log(result);
       
      
       const {message,success,error} = result;
     
        if(success){
        handleSuccess(message);

        setTimeout(() => {
          navigate("/login")
        }, 1000);
        } else if(error){
          const details = error?.details[0].message
          handleError(details)
        }
        else if(!success){
          handleError(message)
        }
        

        
        
      } catch (error) {
        handleError(error)
      }
      
      
    }

    
  
     

  return (
    <div className='container'>
    <h1>SignUp</h1>
    <form onSubmit={handleSubmit}>
        <div>
             <label htmlFor='name'>name</label>
             <input
             onChange={handleSignup}
             type='text'
             name='name'
             autoFocus
             placeholder='Enter your name...'
             value={signupInfo.name}
             />
        </div>
        <div>
             <label htmlFor='email'>email</label>
             <input
             onChange={handleSignup}
             type='email'
             name='email'
             autoFocus
             placeholder='Enter your email...'
             value={signupInfo.email}
             />
        </div>
        <div>
             <label htmlFor='password'>password</label>
             <input
            onChange={handleSignup}
             type='password'
             name='password'
             autoFocus
             placeholder='Enter your password...'
             value={signupInfo.password}
             />
        </div>
        <button>SignUp</button>
        <span>Already have an account?
           <Link to={"/login"}>Login</Link>
        </span>
        

    </form>
    <ToastContainer/>
    
</div>
  )
}

export default Signup
