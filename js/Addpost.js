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
let posttext=document.getElementById("posttext")
let filetype=""
let url=""


let Uploadpost=()=>{
    let postObject={
        posttext:posttext.value,
    postuid:uid,
    filetype:filetype,
    url:url,
    like:[],
    comment:[],
    dislike:[]
    }
    // firebase.database().ref("posts/").push(postObject).then((res)=>{
    //   console.log(res)
    //     firebase.database().ref("posts/"+res.key).update({
    //         pushid:res.key
    //     })
    // })
    let message=document.getElementById("message")
    firebase.firestore().collection("posts/").add(postObject).then((res)=>{
      console.log(res)
      firebase.firestore().collection("posts/").doc(res.id).update({
        postId:res.id
      })
      message.innerHTML="Posts uploaded"
      message.style.color="green"
      // message.style.fontSize="16px"
    }).catch((err)=>{
      message.innerHTML=err.message
      message.style.color="red"
      // message.style.fontSize="16px"
    })

}
let imageUpload=(event)=>{
  let progress123=document.getElementById("progress")
  let progress_bar=document.getElementById("progress-bar")
let file=event.target.files[0]
filetype=file.type
console.log(file)

var storageRef = firebase.storage().ref();
// Create the file metadata
var metadata = {
    contentType: 'image/jpeg'
  };
  
  // Upload file and metadata to the object 'images/mountains.jpg'
  var uploadTask = storageRef.child('file/' + file.name).put(file);
  
  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
  (snapshot) => {
    progress123.style.display = "block"
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
progress_bar.style.width=Math.round(progress)+"%"
progress_bar.innerHTML=Math.round(progress)+"%"

    }, 
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;
        case 'storage/canceled':
          // User canceled the upload
          break;
  
        // ...
  
        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    }, 
    () => {
      // Upload completed successfully, now we can get the download URL
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        console.log('File available at', downloadURL);
        url=downloadURL
        progress123.style.display = "none"
      });
    }
  );}






  // logout
  let logout = () => {
    firebase
      .auth()
      .signOut()
      .then((res1) => {
        setTimeout(() => {
          window.location.assign("./login.html");
        }, 2000);
      });
  };