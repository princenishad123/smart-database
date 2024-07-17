import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  signInWithPhoneNumber,
  sendPasswordResetEmail,
} from "firebase/auth";

class authenticateUsers {
  constructor() {
    this.auth = getAuth();
    this.gooleProvider = new GoogleAuthProvider();
    this.facebookProvider = new FacebookAuthProvider();
    this.appVerifier = window.recaptchaVerifier;
    
  }
  // sign up with email and password
  async signUpWithEmailAndPassword(email, password) {
    try {
      let userCredentioal = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      return userCredentioal.user;
    } catch (error) {
      console.log(error);
    }
  }

  // sign in with email and password

  async signInWithEmailAndPassword(email,password) {
    try {
      const signIn = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );

      return signIn.user;
    } catch (error) {
      return error.code;
    }
  }

  // get user is logged in or not
  loggedInUser() {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(
        this.auth,
        (user) => {
          if (user) {
            resolve(user);
          } else {
            resolve(null); // resolve with null if no user is logged in
          }
        },
        (error) => {
          reject(error); // reject the promise if there's an error
        }
      );
    });
  }

  // signout
  async signOut() {
    let a = await signOut(this.auth);
    return a;
  }


  // sign in with goole

  async signInWithGoogle(){
  try {
    let credential = await signInWithPopup(this.auth,this.gooleProvider);
    
    return credential.user
  } catch (error) {
    return error
  }

  }

  // login with  facebook
  // I will create signwith facebook later
  async signInWithFacebook(){
  try {
    let credential = await signInWithPopup(this.auth,this.facebookProvider);
    return credential.user
  } catch (error) {
    return error
  }

  }


  // its also hard challange but i will try to create this
   signInWithPhone(phoneNumber){
        signInWithPhoneNumber(this.auth, phoneNumber, this.appVerifier)
    .then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      window.confirmationResult = confirmationResult;
      console.log(confirmationResult)
      // ...
    }).catch((error) => {
      // Error; SMS not sent
      // ...
      console.log(error)
    });

  }

  // sendPassword rese email;
   
 async resetPassword(email){
   const res = await sendPasswordResetEmail(this.auth, email)
     
   return res

  }
}

const authentication = new authenticateUsers();
export { authentication };
