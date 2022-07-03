let isLogin, connectMethod, user, token, image;
let isMenuOpen = false;

function OpenMenu() {
  isMenuOpen = !isMenuOpen;

  if (isMenuOpen) {
    $("mobile-menu").classList.remove("d-none");
  } else {
    $("mobile-menu").classList.add("d-none");
  }
}

const VerifyCredentials = () => {
  isLogin = localStorage.getItem("waraninene_isLogIn");
  if (isLogin == "true") {
    connectMethod = localStorage.getItem("waraninene_connectMethod");
    switch (connectMethod) {
      case "google":
        user = JSON.parse(localStorage.getItem("waraninene_user"));
        token = localStorage.getItem("waraninene_token");
        image = user.photoURL;
        break;

      case "facebook":
        user = JSON.parse(localStorage.getItem("waraninene_user"));
        token = localStorage.getItem("waraninene_token");
        image = user.photoURL;
        break;

      default:
        break;
    }
  }
};

//logique de connection

const connectedContent = () => {
  if (isLogin != "true") {
    $("userOption").innerHTML =
      "<button onclick='Loggin()' >Se Connecter</button>";
  } else {
    $("userOption").innerHTML =
      "<a href='profil.html'>Voir profil</a><br><button onclick='Logout()'>se déconnecter</button>";
    $(
      "toggle_userOption"
    ).innerHTML = `<img src=${image} width="50px" class="click"/>`;
  }
};

const Loggin = () => {
  // isLoggedin = true;
  // connectedContent()
  window.location.href = "connexion.html";
};

const Logout = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
      localStorage.removeItem("waraninene_user");
      localStorage.removeItem("waraninene_connectMethod");
      localStorage.setItem("waraninene_isLogIn", "false");
      localStorage.removeItem("waraninene_token");
      VerifyCredentials();
      connectedContent();
    })
    .catch((error) => {
      console.log(error);
    });
};

const createUser = (uid) => {
  //initialiser firestore
  const db = app.firestore();
  var isRecordExist = true;

  db.collection("user")
    .doc(uid)
    .set({
      mail: user.email,
      myLike: [],
      nom: user.displayName,
      photo: user.photoURL,
      uid: uid,
    })
    .then(() => {
      console.log("user créer");
    });
};
//toggle profile
let isProfileMenuOpen = false;

const timeline = gsap.timeline();
const animateShowMenu = () => {
  timeline.to("#userOption", {
    opacity: 1,
    pointerEvents: "auto",
    y: 20,
    duration: 0.3,
  });
};
const animateHideMenu = () => {
  timeline.to("#userOption", {
    pointerEvents: "none",
    opacity: 0,
    y: -20,
    duration: 0.3,
  });
};
$("toggle_userOption").addEventListener("click", () => {
  isProfileMenuOpen = !isProfileMenuOpen;
  isProfileMenuOpen ? animateShowMenu() : animateHideMenu();
});

window.addEventListener("load", () => {
  VerifyCredentials();
  connectedContent();
});

//google

const googleSignIn = () => {
  firebase
    .auth()
    .signInWithPopup(provider)

    .then((result) => {
      console.log("ok");
      // This gives youaGoogle Access Token.You can use it to access Google APIs.
      const credential = result.credential;
      token = credential.accessToken;
      // The signed-in user info.
      connectMethod = "google";
      user = result.user;
      localStorage.setItem("waraninene_user", JSON.stringify(user));
      localStorage.setItem("waraninene_connectMethod", connectMethod);
      localStorage.setItem("waraninene_isLogIn", "true");
      localStorage.setItem("waraninene_token", token);
      createUser(user.uid);
      window.location.href = "index.html";
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = error.credential;
    });

  //window.location.href = "index.html";
};

//facebook

const facebookSignIn = () => {
  firebase
    .auth()
    .signInWithPopup(FacebookProvider)
    .then((result) => {
      var credential = result.credential;

      // The signed-in user info.
      user = result.user;
      connectMethod = "facebook";
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = credential.accessToken;
      // ...
      localStorage.setItem("waraninene_user", JSON.stringify(user));
      localStorage.setItem("waraninene_connectMethod", connectMethod);
      localStorage.setItem("waraninene_isLogIn", "true");
      localStorage.setItem("waraninene_token", token);
      createUser(user.uid);
      window.location.href = "index.html";
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
      console.log(errorMessage);
    });
};

//twitter
const twitterSignIn = () => {
  firebase
    .auth()
    .signInWithPopup(TwitterProvider)
    .then((result) => {
      var credential = result.credential;

      token = credential.accessToken;
      var secret = credential.secret;

      user = result.user;
      console.log(token);
      console.log(secret);
      console.log(user);
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;

      var email = error.email;

      var credential = error.credential;

      console.log(error.message);
    });
};
