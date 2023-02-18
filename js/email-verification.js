const userEmail=document.getElementById("userEmail")
const message=document.getElementById("message")
firebase.auth().onAuthStateChanged((res)=>{
   if(res.emailVerified){
       window.location.assign("./home.html")
       }else{
           userEmail.innerHTML=res.email
       }
})
const ResendEmail = () => {
   const user = firebase.auth().currentUser;
   user
     .sendEmailVerification()
     .then(() => {
       message.innerHTML = "Email verification sent!";
       message.style.color = "green";
     })
     .catch((err) => {
       message.innerHTML = err.message;
       message.style.color = "red";
     });
 };
const reloadpage=()=>{
   location.reload()
}