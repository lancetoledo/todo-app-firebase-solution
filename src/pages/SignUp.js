import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useRef } from 'react'
import { Login } from '../components/Login'
import { auth } from '../utils/firebase'
import { setDoc,doc } from 'firebase/firestore'
import db from '../utils/firebase'
export const SignUp = () => {

    // What does useRef do?
    const emailRef = useRef()
    const passwordRef = useRef()

    // Create a function that registers a new user
    const register = async () => {
   
        try {
           await createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value )
           //After creating the user make an api call to firestore to add it to the users collection
           .then(async (cred)=>{
                // Create a document for the user using the credentials, setDoc()
                await setDoc(doc(db,"users", `${cred.user.uid}`),
                //Payload of how your data should be structured 
                {
                    tasks: [
                        {
                            text:"first todo",
                            status:true
                        }
                    ]
                }
            )

                if(cred) {
                    window.location ="/dashboard"
                }
           })

                    
        }
        

        catch(error){
            alert(error.message)
        }
    }
  return (
    <div>
    <Login 
        title = "Sign up"
        button = "Sign up"
        href = "/"
        link = "Sign in"
        headerStatement = "Already have an account?"
        btnFunction = {register}
        emailInput = {emailRef}
        passwordInput = {passwordRef}
    />
    </div>
  )
}
