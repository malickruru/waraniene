const db = app.firestore();

var Users = [];
var LoggedUser;
var currentId;

window.addEventListener("load", () => {
  var isLogin = localStorage.getItem("waraninene_isLogIn");
  if (isLogin == "true") {
    db.collection("user")
      .doc(JSON.parse(localStorage.getItem("waraninene_user")).uid)
      .get()
      .then((doc) => {
        LoggedUser = doc.data();
        getUser();
      });
  } else {
    window.location.href = "connexion.html";
  }
});

function setLike() {
  LoggedUser.myLike.forEach((item) => {
    console.log(`heart_${item}`);
    $(`heart_${item}`).style.color = "pink";
  });
}

function DisplayCard() {
  db.collection("article")
    .get()
    .then((snap) => {
      $("carte_container").innerHTML = "";
      snap.forEach((doc) => {
        // console.log(doc.data())
        // console.log(doc.id)
        var params = doc.data();

        $("carte_container").innerHTML += `<div class="carte my-3">
        <div class="carte-img"><img src=${params.images} /></div>
        <div class="carte-text">
          <div class="carte-titre"><h3>${params.nom}</h3> <p>${params.auteur}</p></div>
          <div class="carte-commentaire" id="article-${doc.id}"></div>
          <div class="carte-options">
            <div class="carte-btn">
            <i class='bi bi-heart-fill click' id='heart_${doc.id}' title="Ajouter un ''j'aime'' " onclick="isLiking('${doc.id}')"></i>
            <i class="bi bi-chat-left-text click" title="Ajouter un commentaire " onclick="addComment('${doc.id}')"></i> 
            <i class="bi bi-phone-vibrate click" title="Contacter l'artisant"  onclick="contact('${params.contact}')"></i></div>
            <div class="carte-stat"><p><span id='stat_${doc.id}'>${params.nbr_like}</span> j'aime</p></div>
          </div>
        </div>
      </div>
        `;
      });
      DisplayComment();
    });
}

function DisplayComment() {
  db.collection("commentaire")
    .get()
    .then((snap) => {
      snap.forEach((doc) => {
        // console.log(doc.data())
        // console.log(doc.id)

        var params = doc.data();
        var activeUser = Users.filter((data) => data.id == params.id_user);

        $("article-" + params.id_article).innerHTML += `<div class="comment">
          <div class="comment-user-info">
          <img src=${activeUser[0].data.photo} />
          <p>${activeUser[0].data.nom}</p>
          </div>
          <div class="comment-right">
            <div class="comment-date"><p><em>${params.date}</em></p></div>
            <div class="comment-txt"><p>${params.texte}</p></div>
          </div>
        </div>
          `;
      });
      setLike();
    });
}

function getUser() {
  db.collection("user")
    .get()
    .then((snap) => {
      snap.forEach((doc) => {
        var params = doc.data();
        Users.push({ id: doc.id, data: params });
      });
      DisplayCard();
    });
}

function isLiking(id) {
  if (LoggedUser.myLike.includes(id)) {
    removeLike(id);
  } else {
    addLike(id);
  }
}

function addLike(id) {
  let nbrLike = parseInt($("stat_" + id).textContent) + 1;
  LoggedUser.myLike.push(id);
  let NewLikes = LoggedUser.myLike;
  console.log(NewLikes);
  db.collection("user")
    .doc(LoggedUser.uid)
    .update({
      myLike: NewLikes,
    })
    .then(() => {
      db.collection("article").doc(id).update({
        nbr_like: nbrLike,
      });
    });
  $("heart_" + id).style.color = "pink";
  $("stat_" + id).innerHTML = nbrLike;
}

function removeLike(id) {
  let nbrLike = parseInt($("stat_" + id).textContent) - 1;

  let idx = LoggedUser.myLike.indexOf(id);
  LoggedUser.myLike.splice(idx, 1);
  let NewLikes = LoggedUser.myLike;
  db.collection("user")
    .doc(LoggedUser.uid)
    .update({
      myLike: NewLikes,
    })
    .then(() => {
      db.collection("article").doc(id).update({
        nbr_like: nbrLike,
      });
    });
  $("heart_" + id).style.color = "black";
  $("stat_" + id).innerHTML = nbrLike;
}

function addComment(id) {
  document.querySelector(".popup-wrapper").style.display = "flex";
  currentId = id;
}

$("popupClose").addEventListener("click", () => {
  document.querySelector(".popup-wrapper").style.display = "none";
});

$("popupAdd").addEventListener("click", () => {
  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  db.collection("commentaire")
    .add({
      id_article: currentId,
      id_user: LoggedUser.uid,
      texte: $("popupInput").value,
      date: JSON.stringify(date),
    })
    .then(() => {
      document.querySelector(".popup-wrapper").style.display = "none";
      $("article-" + currentId).innerHTML += `<div class="comment">
  <div class="comment-user-info">
  <img src=${LoggedUser.photo} />
  <p>${LoggedUser.nom}</p>
  </div>
  <div class="comment-right">
    <div class="comment-date"><p><em>${JSON.stringify(date)}</em></p></div>
    <div class="comment-txt"><p>${$("popupInput").value}</p></div>
  </div>
</div>
  `;
    });
});

function contact(url) {
  //console.log(url);
  window.location.href = url;
}
