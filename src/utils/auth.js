import firebase from "./firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { toastErrorNotify, toastSuccessNotify, toastWarnNotify } from "../helpers/ToasNotify";

const auth = getAuth(firebase);

export const createUser = async (email, password, navigate, displayName) => {
  try {
    let userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(auth.currentUser, {
      displayName: displayName,
    });
    toastSuccessNotify('Registered successfully!');
    navigate("/");
    console.log(userCredential);
   
  } catch (error) {
    console.log(error.message);
    if(error.message.includes("email-already-in-use")){
      toastErrorNotify("Email Already In Use")
    }else if(error.message.includes("weak-password")){
      toastErrorNotify("Password should be at least 6 characters")
    }else if(error.message.includes("invalid-email")){
      toastErrorNotify("Please enter email and password")
    }else if(error.message.includes("internal-error" )){
      toastErrorNotify("Please Enter Password")
    }
  }
};

export const SignIn = async (email, password, navigate) => {
  try {
    let userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    navigate("/");
    toastSuccessNotify('Logged in successfully!');
    console.log(userCredential);
  } catch (error) {
  
    if(error.message.includes("wrong-password")){
      toastWarnNotify("Wrong Password")
    }else if(error.message.includes("invalid-email")){
      toastWarnNotify("Invalid Email")
    }else if(error.message.includes("internal-error" )){
      toastWarnNotify("Please Enter Password")
    }else{
      toastErrorNotify("User Not Found")
    }
  }
};

export const signUpProvider = (navigate) => {
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then((result) => {
      toastSuccessNotify('Logged in successfully!');
      navigate("/");
    })
    .catch((error) => {
      // Handle Errors here.
      console.log(error);
    });
};

export const userObserver = (setCurrentUser) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setCurrentUser(user);
    } else {
      setCurrentUser(false);
    }
  });
};

export const logOut = () => {
  signOut(auth);
};


export const forgotPassword = (email) => {
  //? Email yoluyla şifre sıfırlama için kullanılan firebase metodu
  sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      toastWarnNotify('Please check your mail box!');
      // alert("Please check your mail box!");
    })
    .catch((error) => {
      console.log(error);
      toastErrorNotify("Please Enter Email");
      // alert(err.message);
      // ..
    });
};