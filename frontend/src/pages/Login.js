import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import {useNavigate} from "react-router-dom"
import {ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from '../utils';

function Login() {
     const[loginInfo,setLoginInfo] = useState({
      email:"",
      password:""
     });
 
     const navigate = useNavigate();


     const handleLogin=  (e)=>{
     const {name,value} = e.target;
     const copyLoginInfo = {...loginInfo}
     copyLoginInfo[name] = value
     setLoginInfo(copyLoginInfo)
     
     }
    //  console.log('signupInfo ->',signupInfo); 
   
    const handleSubmit = async (e)=>{
          e.preventDefault();
          const{email,password}=loginInfo;
          const url = "http://localhost:8081/auth/login";

          
          if(!email || !password){
              handleError("email or password are required")
            }
 
          try {
          
            const response = await fetch(url,{
              method:"POST",
              headers:{
                "Content-Type":"application/json"
              },
              body:JSON.stringify(loginInfo)
            })

            const result = await response.json()
            console.log(result);
            
            
            const {message,success,error,jwtToken,name} = result;
             

              if(success){
              handleSuccess(message);
              localStorage.setItem("loggedInUser", name);
              localStorage.setItem("token",jwtToken)
              

              setTimeout(() => {
                navigate("/home")
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
    <h1>Login</h1>
    <form onSubmit={handleSubmit}>
        
        <div>
             <label htmlFor='email'>email</label>
             <input
             onChange={handleLogin}
             type='email'
             name='email'
             autoFocus
             placeholder='Enter your email...'
             value={loginInfo.email}
             />
        </div>
        <div>
             <label htmlFor='password'>password</label>
             <input
            onChange={handleLogin}
             type='password'
             name='password'
             autoFocus
             placeholder='Enter your password...'
             value={loginInfo.password}
             />
        </div>
        <button>Login</button>
        <span>Don't have an account?
           <Link to={"/signup"}>SignUp</Link>
        </span>
        

    </form>
    <ToastContainer/>
    
</div>
  )
}

export default Login
