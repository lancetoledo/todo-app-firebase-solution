import React, { useRef } from 'react'
import { Login } from '../components/Login'


export const SignIn = () => {
    // Holds two references
    const emailRef = useRef()
    const passwordRef = useRef()

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
        />
    </div>
  )
}
