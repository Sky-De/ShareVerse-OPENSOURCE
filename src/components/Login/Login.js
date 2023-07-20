import React, { useState } from "react";
import styles from "./Login.module.css";
import user from "../images/user.png";
import lock from "../images/lock.png";
import google from "../images/google.png";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { auth, provider } from "../../firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handlelogin = () => {
    if (!values.email || !values.password) {
      toast.error("All fields are mandatory");
      return;
    }

    toast.promise(
      signInWithEmailAndPassword(auth, values.email, values.password)
        .then((res) => {
          const user = res.user;
          console.log(user);
          navigate("/mainpage");
        })
        .catch((err) => {
          throw err.message;
        }),

      {
        loading: "Saving...",
        success: <b>Successfully Signed up!</b>,
        error: (err) => <b>{err}</b>,
      }
    );
  };
  const handlegoogle = () => {
    console.log("hi");
    toast.promise(
      signInWithPopup(auth, provider)
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          const user = result.user;
          console.log(user);
          console.log(token);
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
        }),
      {
        loading: "Saving...",
        success: <b>Successfully Signed up!</b>,
        error: (err) => <b>{err}</b>,
      }
    );
    navigate("/mainpage");
  };
  return (
    <div className={styles.container}>
      <div className={styles.signinouter}>
        <h1>Log in</h1>
        <div className={styles.signinusername}>
          <input
            type="text"
            placeholder="Email"
            onChange={(e) =>
              setValues((prev) => ({ ...prev, email: e.target.value }))
            }
          ></input>
          <img src={user} alt="username"></img>
        </div>
        <div className={styles.signinpassword}>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setValues((prev) => ({ ...prev, password: e.target.value }))
            }
          ></input>
          <img src={lock} alt="username"></img>
        </div>
        <div className={styles.additionalline}>
          <input type="checkbox" className={styles.checkbox}></input>
          <span>Remember me</span>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.4 }}
          onClick={handlelogin}
        >
          Login
        </motion.button>
        <div className={styles.google} onClick={handlegoogle}>
          <img src={google} alt="google"></img>
          <span>Login in with google</span>
        </div>
        <div className={styles.signinbtmsignup}>
          <span>Already have an account?</span>
          <span onClick={() => navigate("/")} className={styles.signupbtm}>
            Sign Up
          </span>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
