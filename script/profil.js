//afficher les info user

user = JSON.parse(localStorage.getItem("waraninene_user"));

$("profilPic").innerHTML = `<img src=${user.photoURL} />`;
$("profilName").innerHTML = `<h1>Bonjour, ${user.displayName}</h1> 
                            <p>${user.email}</p>`;

//recpérer les commentaires
const db = app.firestore();

db.collection("commentaire")
  .get()
  .then((snap) => {
    $("profilComment").innerHTML = "";
    $("profilComment").style.paddingTop = '5px'
    snap.forEach((doc) => {
      var params = doc.data();
      if (params.id_user == user.uid) {
        $("profilComment").innerHTML += `
          <div class="profilComments ">
          <div ><p id="txtComment">${params.texte}</p></div>
        <div ><p><em>${params.date}</em></p></div>
          </div>
          `;
      }
    });
  });
