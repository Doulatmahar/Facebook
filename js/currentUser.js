let uid;
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log();
    if (user.emailVerified) {
      uid = user.uid;
      console.log(uid);
      // all code
      let loader = document.getElementById("loader");
      let message = document.getElementById("message");
      let mainDiv = document.getElementById("mainDiv");
      let postsAllDiv = document.getElementById("postsAllDiv");
      let button_input = document.getElementById("button_poinID");
      let button_posts = document.getElementById("button_poId");
      let allinputs = document.getElementById("allinputs");
      firebase
        .database() 
        .ref("users/" + uid)
        .on("value", (currentprofile) => {
          loader.style.display = "none";
        currentUserINput.innerHTML=""
          currentUserINput.style.display="block"
          console.log(currentprofile.val().uid);
          let freeDiv = document.createElement("div");
          currentUserINput.appendChild(freeDiv);
          let profileimagephoto = document.createElement("img");
          profileimagephoto.setAttribute("src", "./../images/profile.png");
          profileimagephoto.setAttribute("class", "profile_image");
          freeDiv.appendChild(profileimagephoto);
          if (currentprofile.val().profileImage === "") {
            profileimagephoto.setAttribute("src", "./../images/profile.png");
          } else {
            profileimagephoto.setAttribute(
              "src",
              currentprofile.val().profileImage
            );
          }
          let freeinput=document.createElement(("input"))
          freeDiv.appendChild(freeinput)
          freeinput.setAttribute("type","text")
          let freetext="What's on your mind, "+currentprofile.val().FirstName
          freeinput.setAttribute("value",freetext)
          mainDiv.style.display = "block";
          console.log(currentprofile.val());
          let coverImageHTML = document.getElementById("coverimage");
          let profileImageHTML = document.getElementById("profileimage");
          if (currentprofile.val().coverIMage !== "") {
            coverImageHTML.setAttribute("src", currentprofile.val().coverIMage);
          }
          if (currentprofile.val().profileImage !== "") {
            profileImageHTML.setAttribute(
              "src",
              currentprofile.val().profileImage
            );
          }
          let firstname = document.getElementById("firstname");
          let lastname = document.getElementById("lastname");
          let mobilenumber = document.getElementById("mobilenumber");
          let emailaddress = document.getElementById("emailaddress");
          firstname.value = currentprofile.val().FirstName;
          lastname.value = currentprofile.val().LastName;
          mobilenumber.value = currentprofile.val().MobileNumber;
          emailaddress.value = currentprofile.val().Email;
          let Update_Button = document.getElementById("Update_Button");
          Update_Button.addEventListener("click", () => {
            firebase
              .database()
              .ref("users/" + uid)
              .update({
                FirstName: firstname.value,
                LastName: lastname.value,
                MobileNumber: mobilenumber.value,
              })
              .then(() => {
                if(emailaddress.value!== currentprofile.val().Email){

                  alert("Can't update email!");
                }
                message.innerHTML = "Profile Updated";
                message.style.color = "green";
              })
              .catch((err) => {
                message.innerHTML = err.message;
                message.style.color = "red";
              });
          });
          // functions of buttons
          button_input.addEventListener("click", () => {
            postsAllDiv.style.display = "none";
            allinputs.style.display = "flex";
            button_input.setAttribute("id", "button_poinID");
            button_posts.setAttribute("id", "button_poId");
          });
          button_posts.addEventListener("click", () => {
            allinputs.style.display = "none";
            postsAllDiv.style.display = "block";
            button_input.setAttribute("id", "button_poID");
            button_posts.setAttribute("id", "button_poinID");
            // post setting
            firebase
              .firestore()
              .collection("posts/")
              .onSnapshot((postsValue) => {
                let postsMainArray = [];
                console.log(postsMainArray);
                
                if (postsValue.size === 0) {
                  // data avialiblity
                } else {
                  postsValue.forEach((everyposts) => {
                    postsMainArray.push(everyposts.data());


                    postsAllDiv.innerHTML = "";
                    for (
                      let postsIndex = 0;
                      postsIndex < postsMainArray.length;
                      postsIndex++
                    ) {
                      if (postsMainArray[postsIndex].postuid === uid) {
                        // let id = postsMainArray[postsIndex].postId;

                        let uidOfPost = postsMainArray[postsIndex].postuid;
                        let innerPostDiv = document.createElement("div");
                        innerPostDiv.setAttribute("class", "innerdiv");
                        postsAllDiv.appendChild(innerPostDiv);
                        // media
                        let likeArray = postsMainArray[postsIndex].like;
                        let dislikeArray = postsMainArray[postsIndex].dislike;
                        let commentArray = postsMainArray[postsIndex].comment;
                        // header div
                        let headerDivpost = document.createElement("div");
                        headerDivpost.setAttribute("class", "post_header");
                        innerPostDiv.appendChild(headerDivpost);
                        firebase
                          .database()
                          .ref("users/" + uidOfPost)
                          .on("value", (usersDataTarget) => {
                            let profileimagephoto =
                              document.createElement("img");
                            profileimagephoto.setAttribute(
                              "src",
                              "./../images/profile.png"
                            );
                            profileimagephoto.setAttribute(
                              "class",
                              "profile_image"
                            );
                            headerDivpost.appendChild(profileimagephoto);
                            if (usersDataTarget.val().profileImage === "") {
                              profileimagephoto.setAttribute(
                                "src",
                                "./../images/profile.png"
                              );
                            } else {
                              profileimagephoto.setAttribute(
                                "src",
                                usersDataTarget.val().profileImage
                              );
                            }
                            // profile name
                            let profilenameDiv = document.createElement("div");
                            profilenameDiv.setAttribute(
                              "class",
                              "editdeletename"
                            );
                            headerDivpost.appendChild(profilenameDiv);
                            let profilename = document.createElement("h1");
                            profilenameDiv.appendChild(profilename);
                            profilename.setAttribute("class", "profile_name");
                            profilename.innerHTML =
                              usersDataTarget.val().FirstName +
                              usersDataTarget.val().LastName;
                            let editpost = document.createElement("i");
                            editpost.setAttribute("class", "fa-solid fa-pen");

                            profilenameDiv.appendChild(editpost);
                         
                            let deletePost = document.createElement("i");
                            deletePost.setAttribute(
                              "class",
                              "fa-solid fa-trash"
                            );
                            profilenameDiv.appendChild(deletePost);
                            // delete function
                            deletePost.addEventListener("click", () => {
                              firebase
                                .firestore()
                                .collection("posts/")
                                .doc(postsMainArray[postsIndex].postId)
                                .delete();
                            });
                            // delete function
                          });
                        let descriptionpara = document.createElement("p");
                        descriptionpara.setAttribute(
                          "class",
                          "descriptionPost"
                        );
                        innerPostDiv.appendChild(descriptionpara);
                        descriptionpara.innerHTML =
                          postsMainArray[postsIndex].posttext;
                        // video or image condition
                        if (postsMainArray[postsIndex].filetype === "") {
                        } else {
                          if (
                            postsMainArray[postsIndex].filetype ===
                              "image/png" ||
                            postsMainArray[postsIndex].filetype ===
                              "image/jpeg" ||
                            postsMainArray[postsIndex].filetype === "image/jpg"
                          ) {
                            let filetypeimage = document.createElement("img");
                            innerPostDiv.appendChild(filetypeimage);
                            filetypeimage.setAttribute(
                              "class",
                              "postfileimage"
                            );
                            filetypeimage.setAttribute(
                              "src",
                              postsMainArray[postsIndex].url
                            );
                          } else {
                            let filetypevideo = document.createElement("video");
                            filetypevideo.setAttribute("controls", "true");
                            innerPostDiv.appendChild(filetypevideo);
                            filetypevideo.setAttribute(
                              "class",
                              "postfileimage"
                            );
                            let source1 = document.createElement("source");
                            filetypevideo.appendChild(source1);
                            source1.setAttribute(
                              "src",
                              postsMainArray[postsIndex].url
                            );
                          }
                        }

                        let footerPostdiv = document.createElement("div");
                        innerPostDiv.appendChild(footerPostdiv);
                        footerPostdiv.setAttribute("class", "footerpost");
                        // like

                        let likeSpan = document.createElement("span");
                        footerPostdiv.appendChild(likeSpan);
                        let likeimg = document.createElement("img");
                        likeSpan.appendChild(likeimg);
                        likeimg.setAttribute("src", "./../images/like.png");
                        let liketext = document.createElement("p");
                        likeSpan.appendChild(liketext);
                        liketext.innerHTML = `Like (${likeArray.length})`;
                        if (likeArray.length === 0) {
                          liketext.style.color = "black";
                        } else {
                          for (
                            var likecolor = 0;
                            likecolor < likeArray.length;
                            likecolor++
                          ) {
                            if (likeArray[likecolor] === uid) {
                              liketext.style.color = "blue";
                              likeimg.setAttribute(
                                "src",
                                "./../images/likecolor.png"
                              );
                            }
                          }
                        }
                        // DIslike
                        let dislikeSpan = document.createElement("span");
                        footerPostdiv.appendChild(dislikeSpan);
                        let dislikeimg = document.createElement("img");
                        dislikeSpan.appendChild(dislikeimg);
                        dislikeimg.setAttribute(
                          "src",
                          "./../images/dislike.png"
                        );
                        let disliketext = document.createElement("p");
                        dislikeSpan.appendChild(disliketext);
                        disliketext.innerHTML = `Dislike (${dislikeArray.length})`;
                        if (dislikeArray.length === 0) {
                          disliketext.style.color = "black";
                        } else {
                          for (
                            var dislikeColor = 0;
                            dislikeColor < dislikeArray.length;
                            dislikeColor++
                          ) {
                            if (dislikeArray[dislikeColor] === uid) {
                              disliketext.style.color = "blue";
                              dislikeimg.setAttribute(
                                "src",
                                "./../images/dislike (1).png"
                              );
                            }
                          }
                        }
                        // comment
                        let commentspan = document.createElement("span");
                        footerPostdiv.appendChild(commentspan);
                        let commentimg = document.createElement("img");
                        commentspan.appendChild(commentimg);
                        commentimg.setAttribute(
                          "src",
                          "./../images/comment.png"
                        );
                        let commenttext = document.createElement("p");
                        commentspan.appendChild(commenttext);
                        commenttext.innerHTML = `Comment (${commentArray.length})`;
                        // comment home show
                        if (commentArray.length !== 0) {
                          for (
                            var commentCheckIdex = 0;
                            commentCheckIdex < commentArray.length;
                            commentCheckIdex++
                          ) {
                            let commentSection = document.createElement("div");
                            commentSection.setAttribute(
                              "class",
                              "commentshown"
                            );
                            innerPostDiv.appendChild(commentSection);
                            let commentProfileSection =
                              document.createElement("div");
                            commentProfileSection.setAttribute(
                              "class",
                              "commentprofile"
                            );
                            let commentprofileimage =
                              document.createElement("img");
                            commentSection.appendChild(commentprofileimage);
                            commentprofileimage.setAttribute(
                              "src",
                              "./../images/profile.png"
                            );
                            commentSection.appendChild(commentProfileSection);
                            commentprofileimage.setAttribute(
                              "class",
                              "profile_image"
                            );
                            let commentProfielName =
                              document.createElement("h1");
                            commentProfileSection.appendChild(
                              commentProfielName
                            );
                            commentProfielName.setAttribute(
                              "class",
                              "commentprofile_name"
                            );
                            let commentValue = document.createElement("p");
                            commentProfileSection.appendChild(commentValue);
                            commentValue.innerHTML =
                              commentArray[commentCheckIdex].commentValue;
                            commentValue.setAttribute("class", "commetn_text");
                            firebase
                              .database()
                              .ref(
                                "users/" + commentArray[commentCheckIdex].uid
                              )
                              .on("value", (profileRes) => {
                                if (profileRes.val().profileImage === "") {
                                  commentprofileimage.setAttribute(
                                    "src",
                                    "./../images/profile.png"
                                  );
                                } else {
                                  commentprofileimage.setAttribute(
                                    "src",
                                    profileRes.val().profileImage
                                  );
                                }
                                commentProfielName.innerHTML =
                                  profileRes.val().FirstName +
                                  " " +
                                  profileRes.val().LastName;
                              });
                          }
                        }
                        // comment home show
                        //  comment box
                        let commentBox = document.createElement("div");
                        innerPostDiv.appendChild(commentBox);
                        let commentinput = document.createElement("input");
                        
                        commentBox.appendChild(commentinput);
                        commentBox.setAttribute("class", "commentbox");
                        commentinput.setAttribute("type", "text");
                        commentinput.setAttribute(
                          "placeholder",
                          "Comment here ..."
                        );
                        commentinput.setAttribute("class", "commentinputdiv");
                        commentinput.setAttribute("id", "commentinputdiv");
                        let commentbutton = document.createElement("img");
                        commentBox.appendChild(commentbutton);
                        commentbutton.setAttribute(
                          "src",
                          "./../images/paper-plane.png"
                        );
                        commentbutton.setAttribute("class", "commentbutton");

                        // if (commentArray.length !== 0) {
                        //   let commentsShow = document.createElement("div");
                        //   innerPostDiv.appendChild(commentsShow);
                        // }

                        // like setting
                        likeSpan.addEventListener("click", () => {
                          let like = false;
                          for (
                            var checklike = 0;
                            checklike < likeArray.length;
                            checklike++
                          ) {
                            if (likeArray[checklike] === uid) {
                              like = true;
                              likeArray.splice(checklike, 1);
                            }
                          }
                          if (!like) {
                            likeArray.push(uid);
                          }
                          firebase
                            .firestore()
                            .collection("posts/")
                            .doc(postsMainArray[postsIndex].postId)
                            .update({
                              like: likeArray,
                            });
                        });
                        // Dislike setting
                        dislikeSpan.addEventListener("click", () => {
                          let dislike = false;
                          for (
                            var checkDislike = 0;
                            checkDislike < dislikeArray.length;
                            checkDislike++
                          ) {
                            if (dislikeArray[checkDislike] === uid) {
                              dislike = true;
                              dislikeArray.splice(checkDislike, 1);
                            }
                          }
                          if (!dislike) {
                            dislikeArray.push(uid);
                          }
                          firebase
                            .firestore()
                            .collection("posts/")
                            .doc(postsMainArray[postsIndex].postId)
                            .update({
                              dislike: dislikeArray,
                            });
                        });
                        // comment setting

                        commentbutton.addEventListener("click", () => {
                          if(commentinput.value===""){
                            alert("Write comment!")
                          }else{

                          
                          console.log(commentinput.value);
                          // console.log(commentinputdiv.value)

                          commentDataObj = {
                            commentValue: commentinput.value,
                            uid: uid,
                          };
                          commentArray.push(commentDataObj);
                          firebase
                            .firestore()
                            .collection("posts/")
                            .doc(postsMainArray[postsIndex].postId)
                            .update({
                              comment: commentArray,
                            });
                          }
                        });
                        //
                        //
                        //
                      }
                    }
                  });
                }
              });
            // post settig
          });
          // functions of buttons
        });

  // // profile upload over
  // let profileUploadfunction = (e) => {
  //   console.log(e.target.files[0]);
  //   alert("great");
  // };
  // // profile upload
      // all code over
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
let profileimagefunction=(e)=>{
  console.log(e.target.files[0])
  let progress123=document.getElementById("progress")
  let progress_bar=document.getElementById("progress-bar")
let file=e.target.files[0]
filetype=file.type
console.log(file)

var storageRef = firebase.storage().ref();
// Create the file metadata
var metadata = {
    contentType: 'image/jpeg'
  };
  
  // Upload file and metadata to the object 'images/mountains.jpg'
  var uploadTask = storageRef.child('profile/' + file.name).put(file);
  
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
        // url=downloadURL
        firebase.database().ref("users/"+uid).update({
          profileImage:downloadURL,
        })
        progress123.style.display = "none"
      });
    }
  );
}


let coverimagefunction=(eve)=>{
  console.log(eve.target.files[0])
  let progress123=document.getElementById("progress")
  let progress_bar=document.getElementById("progress-bar")
let file123=eve.target.files[0]
// filetype=file.type
console.log(file123)

var storageRef = firebase.storage().ref();
// Create the file metadata
var metadata = {
    contentType: 'image/jpeg'
  };
  
  // Upload file and metadata to the object 'images/mountains.jpg'
  var uploadTask = storageRef.child('coverImage/' + file123.name).put(file123);
  
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
        // url=downloadURL
        firebase.database().ref("users/"+uid).update({
          coverIMage:downloadURL,
        })
        progress123.style.display = "none"
      });
    }
  );
}