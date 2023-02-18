 let email=document.getElementById("email")
 let password=document.getElementById("password")

let login=()=>{
 if (email.value === "") {
    message.innerHTML = "Please put yout FirstName!";
    message.style.color = "red";
  } else if (password.value === "") {
    message.innerHTML = "Please put yout LastName!";
    message.style.color = "red";
  } else{
    firebase
    .auth()
    .signInWithEmailAndPassword(email.value, password.value)
    .then((res) => {
      res.user.sendEmailVerification();
      message.innerHTML = "Log in successfully";
      message.style.color = "green";
      if (res.user.emailVerified) {
        setTimeout(() => {
          window.location.assign("./home.html");
        }, 2000);
      } else {
        setTimeout(() => {
          window.location.assign("./email-verification.html");
        }, 2000);
      }
    })
    .catch((error) => {
      message.innerHTML = error.message;
      message.style.color = "red";
    
    });
 
  }}