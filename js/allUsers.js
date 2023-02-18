let uid;
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log()
        if (user.emailVerified) {
            uid=user.uid
            console.log(uid)
      } else {
        setTimeout(() => {
          window.location.assign("./email-verification.html");
        }, 3000);
      }
    } else {
      setTimeout(() => {
        window.location.assign("./login.html");
      }, 3000);
    }
  });

  let loader = document.getElementById("loader");


  let accordionExample = document.getElementById("accordionExample")


firebase.database().ref("users/").on("value",(allUsers)=>{
loader.style.display="none"

accordionExample.innerHTML=""

let allUsersArray=[]
allUsers.forEach((allusersProfile)=>{
allUsersArray.push(allusersProfile.val())

})

for(var allprofiles=0;allprofiles<allUsersArray.length;allprofiles++){
    console.log(allUsersArray[allprofiles])
let accordionButton=document.createElement("div")
accordionButton.setAttribute("class","accordion")
accordionExample.appendChild(accordionButton)
// accordian profile
let profilePic=document.createElement("img")
profilePic.setAttribute("src","./../images/profile.png")
profilePic.setAttribute("class","profilePic")
accordionButton.appendChild(profilePic)
if(allUsersArray[allprofiles].profileImage===""){
  profilePic.setAttribute("src","./../images/profile.png")
}else{
  profilePic.setAttribute("src",allUsersArray[allprofiles].profileImage)
}
let profileName=document.createElement("h1")
profileName.setAttribute("class","profile_name")
profileName.innerHTML=`${allUsersArray[allprofiles].FirstName} ${allUsersArray[allprofiles].LastName}`
if(allUsersArray[allprofiles].uid===uid){
  profileName.innerHTML=`${allUsersArray[allprofiles].FirstName} ${allUsersArray[allprofiles].LastName} (Me)`

}
accordionButton.appendChild(profileName)
let arrowIMage=document.createElement("img")
accordionButton.appendChild(arrowIMage)
arrowIMage.setAttribute("src","./../images/arrowDown.png")
arrowIMage.setAttribute("class","arrows")
// accordian profile over
let panelDiv=document.createElement("div")

panelDiv.setAttribute("class","panel")
accordionExample.appendChild(panelDiv)
// panel div setting
let coverPic=document.createElement("img")
panelDiv.appendChild(coverPic)
coverPic.setAttribute("src","./../images/coverimage.png")
coverPic.setAttribute("class","cover_image")
if(allUsersArray[allprofiles].coverIMage===""){
  coverPic.setAttribute("src","./../images/coverimage.png")
}else{
  coverPic.setAttribute("src",allUsersArray[allprofiles].coverIMage)
}
let coverProfileImage=document.createElement("img")
panelDiv.appendChild(coverProfileImage)
coverProfileImage.setAttribute("src","./../images/profile.png")
coverProfileImage.setAttribute("class","cover_profile")
if(allUsersArray[allprofiles].profileImage===""){
  coverProfileImage.setAttribute("src","./../images/profile.png")
}else{
  coverProfileImage.setAttribute("src",allUsersArray[allprofiles].profileImage)
}
let Covername=document.createElement("h1")
panelDiv.appendChild(Covername)
Covername.setAttribute("class","profile_name")
Covername.innerHTML=`${allUsersArray[allprofiles].FirstName} ${allUsersArray[allprofiles].LastName}`
// panel div setting over



}

// accordian
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
 
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";

  
    }
  });
}
// accordian over
})





let logout = () => {
  firebase
    .auth()
    .signOut()
    .then((res1) => {
      setTimeout(() => {
        window.location.assign("./login.html");
      }, 1000);
    });
};


















