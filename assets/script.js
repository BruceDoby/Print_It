// le code est pas exactement organisé dans l'ordre vu que les étapes était dans l'ordre de d'abord les bullets points et ensuite les
// images et textes, ducoup pour comprendre, commence par là où j'ai écris 1ere partie puis ensuite par la 2e qui est ici :

// ici la première ligne est faites pour que l'évènement ci dessous s'execute après que tout le contrenu html du DOM soit chargé, sinon
// ça ne marchais pas, pour ce qui est de l'espèce de tableau juste en dessous, il existait déjà quand j'ai ouvert le script pour la 
// première fois, ce n'est donc pas moi qu'il l'ait fait, c'est là qu'il y a les noms des images ainsi que les textes qui doivent changer
// dans le carrousel
document.addEventListener('DOMContentLoaded', () => {
const slides = [
	{
		"image":"slide1.jpg",
		"tagLine":"Impressions tous formats <span>en boutique et en ligne</span>"
	},
	{
		"image":"slide2.jpg",
		"tagLine":"Tirages haute définition grand format <span>pour vos bureaux et events</span>"
	},
	{
		"image":"slide3.jpg",
		"tagLine":"Grand choix de couleurs <span>de CMJN aux pantones</span>"
	},
	{
		"image":"slide4.png",
		"tagLine":"Autocollants <span>avec découpe laser sur mesure</span>"
	}
]

// pour ce qui est des nodelist j'ai déjà expliqué dans la 1ere partie, la seule différence ici c'est que là ce qui est sélectionné c'est
// la balise img avec la class banner-img et la div avec l'id banner

const bannerImg = document.querySelector('.banner-img');

const bannerTxt = document.querySelector('#banner p');

let actualSlide = 0;

function updateSlide(one_slide) {
	/*console.log(`Mise à jour du slide : ${index}`);*/

	// cette partie ici sert à faire en sorte que le script marche, ici les ! corresponde à "not" et si j'ai bien compris, ils font office
	// de négation enfait, et signifie donc l'inverse de la balise, donc ça signifie en gros "si bannerImg n'existe pas" et || correspond
	// à "or", ce que ça veut dire dans le code en gros c'est "si une des deux variables n'existe pas/est invalide, il y a erreur, et
	// le code ne s'execute donc pas, il s'arrête (grâce à return)", et la partie console.error affiche un message d'erreur dans la console
	// le message ici se trouve donc entre les parenthèses
	if (!bannerImg || !bannerTxt) {
		console.error("Élément(s) manquant(s) dans le DOM.");
		return;
	}

	// ici ce que ces deux fonctions font c'est mettre à jour la partie src et alt de la balise img dans le html, pour le alt c'est assez
	// simple car pas besoin de le changer, suffit juste de le déplacer en quelques sortes, la partie comprise entre $() sert donc à donner
	// la valeure de la slide sur laquelle on se trouve après avoir cliqué, en en ajoutant + 1 ça permets de mettre l'alt de l'img sur
	// la slide actuelle, pour le src c'est unpeu plus compliqué, car là il faut changer l'image carrèment, donc le chemin construit ici
	// est plus différent et est donc celui d'un dossier qui va chercher parmi les images pour les changer, slides correspond donc au tableau
	// du début, c'est donc de la que va chercher la balise pour changer les images, et la partie comprise entre $() permets donc de changer
	// l'image qui correspondra à la slide actuel une fois une des flèches cliqué
	bannerImg.src = `./assets/images/slideshow/${slides[one_slide].image}`;
	bannerImg.alt = `Slide ${one_slide + 1}`;

	// cette partie fait donc à peu près la même chose qu'au dessus, mais change le texte contenu dans la slide en utilisant la tagLine
	// du tableau correspondante, elle est différente des deux car ici on utilise bannerTxt qui cible la balise p de la div avec comme id
	// "banner" et utilise innerHTML pour pouvoir exploiter le texte compris dans la span dans le tableau du début
	bannerTxt.innerHTML = slides[one_slide].tagLine;
}

// ici c'est la même chose que dans la 1ere partie avec les bullet points, la seule différence c'est qu'il n'y a pas de nextSlide ou de
// previousSlide parce que pour que le changement de slide avec les textes et autre marchent, il faut que la valeure de actualSlide change
// elle doit être mis à jour, donc il faut que ce soit une variable plus général qui opère le changement sur la slide actuel, il faut qu'elle
// soit globale, et comme il faut qu'elle soit globable on ne peut pas utiliser let parce que utiliser une propriété comme let rend la
// balise locale, ce qui l'empêche de fonctionner correctement
// on a également pas mis de const ici parce que la valeure d'actualSlide est changeante, et que mettre une const bloquerai tout, puisque
// const est censé être pour une valeure constante comme son nom l'indique, une valeure qui ne bougera donc pas
// Normalement à ce moment là le code est terminé, le carrousel fonctionne bien, je te laisse lire ma conclusion tout à la fin du code
arrowRight.addEventListener('click', () => {
	actualSlide = (actualSlide + 1) % slides.length;
	updateSlide(actualSlide);
});

arrowLeft.addEventListener('click', () => {
	actualSlide = (actualSlide - 1 + slides.length) % slides.length;
	updateSlide(actualSlide);
});
});


// 1ere partie :
// ici ce sont les node lists donc qui permettent de sélectioner soit une des deux flèche soit les bullet points ayant la class .dots
// j'ai utilisé const parce que la valeure de sa variable ne bougera pas, alors que pour let normalDot = 0; qui sert à fixer le point
// coché de base à 0 (donc au début), on utilise let parce que la valeur de la variable changera au fil des click

const arrowRight = document.getElementById('right');

const arrowLeft = document.getElementById('left');

const dots = document.querySelectorAll('.dot');

let normalDot = 0;

// ici la fonction permet d'ajouter ou de retirer la class dot_selected qui produit l'effet dans le code qu'un point est coché, normalDot
// qui est donc le point de départ se retrouve retiré de sa class dot_selected pour que celle-ci soit ajouté à un des point suivant ou
// précédent lorsqu'il y a un click sur une des flèche

function updateSelectedDot(selectedDot) {
    dots[normalDot].classList.remove('dot_selected');
    dots[selectedDot].classList.add('dot_selected');
    normalDot = selectedDot;
}

// et ducoup là c'est les fonction qui execute la fonction au dessus lorsque l'une ou l'autre des flèches est cliqué
// la const nextDot et previousDot sont constantes parce qu'en soit c'est pas elles qui changent mais normalDot, puisqu'on rajoute à sa
// valeur soit +1 soit -1, et chacune des deux à un rôle différents, étant donné que arrowRight va vers la droite, il faut lui ajouter
// une valeure de +1, puisque son point de départ est 0 comme précisé plus haut, et pour faire en sorte qu'elle ne reste pas bloqué à la
// fin et qu'elle revienne au début quand on clique une nouvelle fois sur la droite, on utilise un modulo (le %) qui opère en gros une division
// qui prends le reste de la division entre (normalDot +1) et dots.length, enfin c'est unpeu compliqué mais en résumé le modulo permet de
// faire un défilement infini, comme attendu donc. Et pour arrowLeft donc même chose, mais étant donné que ça va vers la gauche, on ne fais
// pas +1 mais -1, il fallait également ajouter + dots.length parce que en gros ça permet de ne pas avoir une valeure négative, pour que
// le dot reste présent parmi les 4 autres et qu'il soit toujours compté ducoup, et on remets quand même % dots.length également parce que
// comme pour le précédent c'est ça qui provoque le bouclement infini, donc + dots.length et % dots.length ont deux rôles différents enfait
// et aussi là où on pourrait croire que dots.length est une variable comme ça auxquel on peut donner le nom qu'on veut, c'est le cas pour
// dots, qui correspond donc à la const du début, mais length est une propriété unique de javascript qui crée un comportement pour le code,
// donc on ne peut pas le changer et lui donner un nom random

arrowRight.addEventListener('click', () => {
    const nextDot = (normalDot + 1) % dots.length;
    updateSelectedDot(nextDot);
});

arrowLeft.addEventListener('click', () => {
    const previousDot = (normalDot - 1 + dots.length) % dots.length;
    updateSelectedDot(previousDot);
});


// Conclusion : 
// j'ai utilisé pas mal l'IA pour ce projet pour javascript parce que je parvenais pas vraiment à trouver de ressources qui m'aidait
// sur internet ou dans les cours d'openclassroom, c'est pour ça aussi que j'ai fais les explications au dessus, c'est pour être sûr, moi
// même d'avoir compris pour pouvoir le refaire à l'avenir et de pas juste recopier bêtement
// ça fais beaucoup de ligne inutile ducoup au sein du code mais je les enlèverais avant la soutenance du projet 5 de toute façon et c'était
// histoire d'être sûr de pouvoir m'expliquer le plus clairement possible