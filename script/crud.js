const db = app.firestore()

function createArticle( ){
    var image = $('article_image').value;
    var nom = $('article_nom').value;
    var auteur = $('article_auteur').value;
    var contact = $('article_contact').value;
    var nbrJaime = $('article_nbrJaime').value;
    db.collection("article").add({
        auteur : auteur ,
        contact:contact,
        images:image,
        likers:[],
        nbr_like:nbrJaime,  
        nom:nom
}).then(() => {
    alert('cet article à été ajouté')
})}


function createCommentaires() {
    var id_article = $('commentaire_id_article').value;
    var id_user = $('commentaire_id_user').value;
    var texte = $('commentaire_texte').value;
    var date = $('commentaire_date').value;
    db.collection("commentaire").add({
        id_article : id_article,
        id_user : id_user,
        texte : texte,
        date : date
}).then(() => {
    alert('cet article à été ajouté')
})
}
