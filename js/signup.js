// Targeted data
let fName = document.getElementById("fName");
let lName = document.getElementById("lName");
let mobileNumber = document.getElementById("mobileNumber");
let Email = document.getElementById("Email");
let password = document.getElementById("password");
let re_password = document.getElementById("re_password");
let message = document.getElementById("message");
// Targeted data over
// signup function
let signup = () => {
  if (fName.value === "") {
    message.innerHTML = "Please put yout FirstName!";
    message.style.color = "red";
  } else if (lName.value === "") {
    message.innerHTML = "Please put yout LastName!";
    message.style.color = "red";
  } else if (mobileNumber.value === "") {
    message.innerHTML = "Please put yout MobileNumber!";
    message.style.color = "red";
  } else if (Email.value === "") {
    message.innerHTML = "Please put yout Email!";
    message.style.color = "red";
  } else if (password.value === "") {
    message.innerHTML = "Please put yout Password!";
    message.style.color = "red";
  } else if (re_password.value === "") {
    message.innerHTML = "Re-enter Password for confirmation!";
    message.style.color = "red";
  } else if (password.value !== re_password.value) {
    message.innerHTML = "Password didn't match!";
    message.style.color = "red";
  } else {
    let userData = {
      FirstName: fName.value,
      LastName: lName.value,
      MobileNumber: mobileNumber.value,
      Email: Email.value,
      Password: password.value,
      profileImage:"",
      coverIMage:"",
    };
    console.log(userData);
    firebase
      .auth()
      .createUserWithEmailAndPassword(Email.value, password.value)
      .then((res) => {
        useridUid = res.user.uid;
        res.user.sendEmailVerification();
        message.innerHTML = "Sign up successfully";
        message.style.color = "green";
        firebase
        .database()
        .ref("users/"+useridUid)
        .set(userData)
        firebase
        .database()
        .ref("users/"+useridUid)
        .update({
            uid:useridUid
        })
    })
    .then(() => {
      setTimeout(() => {
        window.location.assign("./email-verification.html");
      }, 3000);
    })
      .catch((err) => {
        message.innerHTML = err.message;
        message.style.color = "red";
      });
    setTimeout(() => {
      message.innerHTML = "";
    }, 2000);
}
};

// signup function over
