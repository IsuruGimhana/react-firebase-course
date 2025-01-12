import React, { useState } from 'react';
import { auth, googleProvider } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';


export const Auth = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  console.log(auth?.currentUser?.email)
  console.log(auth?.currentUser?.photoURL)

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
    } catch (err) {
      console.error(err)
    }
  }

  const SignInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
    } catch (err) {
      console.error(err)
    }
  }

  const SignOut = async () => {
    try {
      await signOut(auth)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <input 
      type='email'
      placeholder="Email" 
      onChange={(e) => setEmail(e.target.value)}
      />
      <input 
      type='password'
      placeholder="Password" 
      onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signIn}>Sign In</button>

      <button onClick={SignInWithGoogle}>Sign in with Google</button>

      <button onClick={SignOut}>Sign Out</button>
    </div>
  )
}