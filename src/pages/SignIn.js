import React, { useRef } from 'react'
import { Login } from '../components/Login'
import {auth} from "../utils/firebase"
import { signInWithEmailAndPassword } from "firebase/auth"

export const SignIn = () => {
    // Holds two references
    const emailRef = useRef()
    const passwordRef = useRef()

    // Async function that calls to Firebase to sign in the user
  // using authentication of email and password
  const login = async () => 
  {
    // Try to sign in with email and password
    try 
    {
      // Sign in the user using email and password
      await signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
      // After signing in if the user exists then navigate the user to the dashboard
      .then(user => 
        {
          if(user) 
          {
            window.location = "/dashboard"
          } 
        })
    }
    // Else catch the fail logging and display an alert to the user 
    catch(error) 
    {
      alert(error.message)   
    }
  }

  return (
    <div>
        <Login 
            title = "Sign in"
            button = "Sign in"
            href = "/signup"
            link = "Sign up"
            headerStatement = "Need an account?"
            emailInput = {emailRef}
            passwordInput = {passwordRef}
            btnFunction = {login}
        />
    </div>
  )
}
