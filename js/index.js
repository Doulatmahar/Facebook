let uid;
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log()
        if (user.emailVerified) {
          setTimeout(() => {
            window.location.assign("./pages/home.html");
          }, 3000);
       
           
      } else {
        setTimeout(() => {
          window.location.assign("./pages/email-verification.html");
        }, 3000);
      }
    } else {
      setTimeout(() => {
        window.location.assign("./pages/login.html");
      }, 3000);
    }
  });