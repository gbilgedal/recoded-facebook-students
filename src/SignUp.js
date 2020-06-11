import React, { useState } from "react";
import db from "./firebase";
import { provider } from "./firebase";
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import pic from './google-signin.png';
import firebase from "firebase";



const SignUpPage = () => {

  const [user, setUser]= useState({});
  
  const handleGoogle = ()=>{
    firebase.auth().signInWithPopup(provider).then(function (result) {
      var token = result.credential.accessToken;
      setUser({...result.user});
    }).catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });
    };
  const handleSubmit = (e) => {
    e.preventDefault();
    e.persist();

    db.collection("profiles").doc(user.uid)
      .set({
        city: e.target[0].value,
        name: user.displayName,      
        userId: user.uid,
        imageUrl: user.photoURL,
        profile: e.target[1].value,
      });
   
   
  };
  return <div>
    <form onSubmit={(e) => handleSubmit(e)}>
    <img src={pic} onClick={() => handleGoogle()} />
    <Form.Control type="text" placeholder="Enter city" />
    <Form.Control type="text" placeholder="Enter profile" />
    <Button variant="primary" type="submit"   >Submit</Button>
    </form>
  </div>;
};

export default SignUpPage;
