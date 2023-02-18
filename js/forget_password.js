let email=document.getElementById("email")
let message=document.getElementById("message")
let resetPassword=()=>{
    firebase.auth().sendPasswordResetEmail(email.value).then((res)=>{
        message.innerHTML="Password reset email sent"
        message.style.color="green"
        
    }).catch((err)=>{
        message.innerHTML=err.message+"!"
        message.style.color="red"
    })
}