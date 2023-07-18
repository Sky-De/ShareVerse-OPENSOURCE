import React, { useState } from 'react'
import styles from './Signup.module.css'
import user from '../images/user.png'
import lock from '../images/lock.png'
import email from '../images/email.png'
import { motion } from 'framer-motion'
import { Toaster, toast } from 'react-hot-toast'
import { auth } from '../../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'

export default function Login() {
    const[values,setValues]=useState({
        name:"",
        email:"",
        password:"",
    })
   

    const handlesignup=()=>{
        if(!values.name || !values.email || !values.password){
            toast.error("All fields are mandatory")
            return;
        }
        toast.promise(
            fetch("https://cat-fact.herokuapp.com/facts"),
             {
               loading: 'Saving...',
               success: <b>Settings saved!</b>,
               error: <b>Could not save.</b>,
             }
           );
        createUserWithEmailAndPassword(auth,values.email,values.password).then((res)=>{
            const user=res.user;
            console.log(user)
        }).catch((err)=>{
            toast.error(err)
        })
    }
    
  return (
    <div className={styles.container}>
        <div className={styles.signinouter}>
            <h1>Sign Up</h1>
            <div className={styles.signinusername}>
                <input type='text' placeholder='Username' 
                onChange={(e)=>{setValues((prev)=>({...prev,name:e.target.value}))}}></input>
                <img src={user} alt='username'></img>
            </div>
            <div className={styles.signinemail}>
                <input type='email' placeholder='Email Address'
                onChange={(e)=>{setValues((prev)=>({...prev,email:e.target.value}))}}></input>
                <img src={email} alt='username'></img>
            </div>
            <div className={styles.signinpassword}>
                <input type='password' placeholder='Password'
                onChange={(e)=>{setValues((prev)=>({...prev,password:e.target.value}))}}></input>
                <img src={lock} alt='username'></img>
            </div>
            <div className={styles.additionalline}>
                <input type='checkbox' className={styles.checkbox}></input>
                <span>Remember me</span>
            </div>
            <motion.button
                whileHover={{scale:1.1}}
                whileTap={{scale:0.4}}
                onClick={handlesignup}
            >Sign Up</motion.button>
            <div className={styles.signinbtmsignup}>
                <span>Already have an account?</span>
                <span>Sign In</span>
            </div>

        </div>
            <Toaster/>
        
    </div>
  )
}