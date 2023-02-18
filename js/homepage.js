let uid;
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    if (user.emailVerified) {
      uid = user.uid;
      console.log(uid);
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
let nopost = document.getElementById("nopost");
let mainPostdataDiv = document.getElementById("mainPostdataDiv");
let currentUserINput = document.getElementById("currentUserINput");


firebase
  .firestore()
  .collection("posts/")
  .onSnapshot((postsValue) => {
    loader.style.display = "none";
    let postsMainArray = [];
// inputfree
firebase
  .database()
  .ref("users/")
  .on("value", (inputCurrent) => {
    inputCurrent.forEach((CurrentValue) => {
      console.log(CurrentValue.val());
      // console.log(uid)
      if (CurrentValue.val().uid === uid) {
        currentUserINput.innerHTML=""
        currentUserINput.style.display="block"
        console.log(CurrentValue.val().uid);
        let freeDiv = document.createElement("div");
        currentUserINput.appendChild(freeDiv);
        let profileimagephoto = document.createElement("img");
        profileimagephoto.setAttribute("src", "./../images/profile.png");
        profileimagephoto.setAttribute("class", "profile_image");
        freeDiv.appendChild(profileimagephoto);
        if (CurrentValue.val().profileImage === "") {
          profileimagephoto.setAttribute("src", "./../images/profile.png");
        } else {
          profileimagephoto.setAttribute(
            "src",
            CurrentValue.val().profileImage
          );
        }
        let freeinput=document.createElement(("input"))
        freeDiv.appendChild(freeinput)
        freeinput.setAttribute("type","text")
        let freetext="What's on your mind, "+CurrentValue.val().FirstName
        freeinput.setAttribute("value",freetext)
      }
    });
  });
// inputfree
    if (postsValue.size === 0) {
      nopost.style.display = "block";
    } else {
      postsValue.forEach((everyposts) => {
        postsMainArray.push(everyposts.data());
        console.log(everyposts.data());
        nopost.style.display = "none";
        mainPostdataDiv.innerHTML = "";

        for (
          let postsIndex = 0;
          postsIndex < postsMainArray.length;
          postsIndex++
        ) {
          // let id = postsMainArray[postsIndex].postId;
          let uidOfPost = postsMainArray[postsIndex].postuid;
          let innerPostDiv = document.createElement("div");
          innerPostDiv.setAttribute("class", "innerdiv");
          mainPostdataDiv.appendChild(innerPostDiv);
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
              let profileimagephoto = document.createElement("img");
              profileimagephoto.setAttribute("src", "./../images/profile.png");
              profileimagephoto.setAttribute("class", "profile_image");
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
              let profilename = document.createElement("h1");
              headerDivpost.appendChild(profilename);
              profilename.setAttribute("class", "profile_name");
              profilename.innerHTML =
                usersDataTarget.val().FirstName +
                usersDataTarget.val().LastName;
            });
          let descriptionpara = document.createElement("p");
          descriptionpara.setAttribute("class", "descriptionPost");
          innerPostDiv.appendChild(descriptionpara);
          descriptionpara.innerHTML = postsMainArray[postsIndex].posttext;
          // video or image condition
          if (postsMainArray[postsIndex].filetype === "") {
          } else {
            if (
              postsMainArray[postsIndex].filetype === "image/png" ||
              postsMainArray[postsIndex].filetype === "image/jpeg" ||
              postsMainArray[postsIndex].filetype === "image/jpg"
            ) {
              let filetypeimage = document.createElement("img");
              innerPostDiv.appendChild(filetypeimage);
              filetypeimage.setAttribute("class", "postfileimage");
              filetypeimage.setAttribute("src", postsMainArray[postsIndex].url);
            } else {
              let filetypevideo = document.createElement("video");
              filetypevideo.setAttribute("controls", "true");
              innerPostDiv.appendChild(filetypevideo);
              filetypevideo.setAttribute("class", "postfileimage");
              let source1 = document.createElement("source");
              filetypevideo.appendChild(source1);
              source1.setAttribute("src", postsMainArray[postsIndex].url);
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
            for (var likecolor = 0; likecolor < likeArray.length; likecolor++) {
              if (likeArray[likecolor] === uid) {
                liketext.style.color = "blue";
                likeimg.setAttribute("src", "./../images/likecolor.png");
              }
            }
          }
          // DIslike
          let dislikeSpan = document.createElement("span");
          footerPostdiv.appendChild(dislikeSpan);
          let dislikeimg = document.createElement("img");
          dislikeSpan.appendChild(dislikeimg);
          dislikeimg.setAttribute("src", "./../images/dislike.png");
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
                dislikeimg.setAttribute("src", "./../images/dislike (1).png");
              }
            }
          }
          // comment
          let commentspan = document.createElement("span");
          footerPostdiv.appendChild(commentspan);
          let commentimg = document.createElement("img");
          commentspan.appendChild(commentimg);
          commentimg.setAttribute("src", "./../images/comment.png");
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
              commentSection.setAttribute("class", "commentshown");
              innerPostDiv.appendChild(commentSection);
              let commentProfileSection = document.createElement("div");
              commentProfileSection.setAttribute("class", "commentprofile");
              let commentprofileimage = document.createElement("img");
              commentSection.appendChild(commentprofileimage);
              commentprofileimage.setAttribute(
                "src",
                "./../images/profile.png"
              );
              commentSection.appendChild(commentProfileSection);
              commentprofileimage.setAttribute("class", "profile_image");
              let commentProfielName = document.createElement("h1");
              commentProfileSection.appendChild(commentProfielName);
              commentProfielName.setAttribute("class", "commentprofile_name");
              let commentValue = document.createElement("p");
              commentProfileSection.appendChild(commentValue);
              commentValue.innerHTML =
                commentArray[commentCheckIdex].commentValue;
              commentValue.setAttribute("class", "commetn_text");
              firebase
                .database()
                .ref("users/" + commentArray[commentCheckIdex].uid)
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
          commentinput.setAttribute("placeholder", "Comment here ...");
          commentinput.setAttribute("class", "commentinputdiv");
          commentinput.setAttribute("id", "commentinputdiv");
          let commentbutton = document.createElement("img");
          commentBox.appendChild(commentbutton);
          commentbutton.setAttribute("src", "./../images/paper-plane.png");
          commentbutton.setAttribute("class", "commentbutton");

          // if (commentArray.length !== 0) {
          //   let commentsShow = document.createElement("div");
          //   innerPostDiv.appendChild(commentsShow);
          // }

          // like setting
          likeSpan.addEventListener("click", () => {
            let like = false;
            for (var checklike = 0; checklike < likeArray.length; checklike++) {
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
          // // comment home show
          // if (commentArray.length !== 0) {
          //   for (
          //     var commentCheckIdex = 0;
          //     commentCheckIdex < commentArray.length;
          //     commentCheckIdex++
          //   ) {
          //     let commentSection = document.createElement("div");
          //     commentSection.setAttribute("class","commentshown")
          //     innerPostDiv.appendChild(commentSection);
          //     let commentProfileSection = document.createElement("div");
          //     commentProfileSection.setAttribute("class","commentprofile")
          //     let commentprofileimage = document.createElement("img");
          //     commentSection.appendChild(commentprofileimage);
          //     commentprofileimage.setAttribute(
          //       "src",
          //       "./../images/profile.png"
          //       );
          //       commentSection.appendChild(commentProfileSection);
          //     commentprofileimage.setAttribute("class", "profile_image");
          //     let commentProfielName=document.createElement("h1")
          //     commentProfileSection.appendChild(commentProfielName)
          //     commentProfielName.setAttribute("class","commentprofile_name")
          //     let commentValue=document.createElement("p")
          //     commentProfileSection.appendChild(commentValue)
          //     commentValue.innerHTML=commentArray[commentCheckIdex].commentValue
          //     commentValue.setAttribute("class","commetn_text")
          //     firebase
          //       .database()
          //       .ref("users/" + commentArray[commentCheckIdex].uid)
          //       .on("value", (profileRes) => {
          //         if (profileRes.val().profileImage === "") {
          //           commentprofileimage.setAttribute(
          //             "src",
          //             "./../images/profile.png"
          //           );
          //         } else {
          //           commentprofileimage.setAttribute(
          //             "src",
          //             profileRes.val().profileImage
          //           );
          //         }
          //         commentProfielName.innerHTML=profileRes.val().FirstName+" "+profileRes.val().LastName
          //       });
          //   }

          // }
          // // comment home show
        }
      });
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
