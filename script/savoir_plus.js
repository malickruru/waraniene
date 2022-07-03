var id = 0;
const position = 500;
var openTL, rotateTL;

const content = [
  {
    titre: "Découvrir Waraniéné",
    txt: "Cliquez sur les flèches pour naviguer",
    color: "#e2bc74",
    txtColor: "#000",
  },
  {
    titre: "Situation géographique",
    txt: "Waraniéné est un village du nord de la Côte d'Ivoire, proche de la ville de Korhogo et qui est particulièrement réputé pour la qualité de ses tisserands.",
    color: "e7a854",
    txtColor: "#000",
  },
  {
    titre: "Histoire",
    txt: "Dans le Nord de la Côte d’Ivoire, le tissage est apparu au XVIIè siècle, probablement apporté par les routes intérieures depuis l'Egypte ancienne. Depuis cette époque, ce sont les hommes d'ethnie dioula, venus du royaume de Kong, qui pratiquent cet artisanat. ",
    color: "#faa153",
    txtColor: "#000",
  },
  {
    titre: "Activité du village",
    txt: "A l'origine, les motifs tissés étaient liées aux usages des vêtements selon les événements : fêtes d'initiation, mariages... les linceuls restaient toujours blancs. Ces motifs portent des noms évocateurs comme 'dents de panthère', 'cauris' ou 'peau d'ananas'.",
    color: "#ffa500",
    txtColor: "#fff",
  },
  {
    titre: "Outils des tisserants",
    txt: "Le tissage se fait sur une structure rudimentaire, composée d’un cadre fixe en bois. L’artisant tisse à partir de fils en coton produits localement et filés et teints industriellement. ",
    color: "#ff8c00",
    txtColor: "#fff",
  },
  {
    titre: "Les motifs",
    txt: "Les motifs insérés dans la trame sont tous faits de mémoire, et un bon tisserand peut posséder jusqu'à 80 motifs différents ! Certains motifs anciens peuvent être complexes et signent ainsi l'expertise du tisserand.",
    color: "#e67e30",
    txtColor: "#fff",
  },
  {
    titre: "La technique des tisserants en video",
    txt: `<div class="play-backdrop"></div>
    <div class="play-button">
      <svg class="play-circles" viewBox="0 0 152 152">
        <circle class="play-circle-01" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="343 343" cx="76" cy="76" r="72.7"/>
        <circle class="play-circle-02" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="309 309" cx="76" cy="76" r="65.5"/>
      </svg>
      <div class="play-perspective">
        <button class="play-close"></button>
        <div class="play-triangle">
          <div class="play-video">
          <video width="600" height="400" src="video/travail.mp4" controls ></video>
          </div>
        </div>
      </div>
    </div>`,
    color: "#f4661b",
    txtColor: "#fff",
  },
];

let HideTxt = gsap.to(".contenttxt", {
  opacity: 0,
  y: 20,
  duration: 0.3,
  paused: true,
  onComplete: ShowTxt,
});

// $$(".stack")[0].addEventListener("scroll", () => {
//   $("p").innerHTML = $_(".stack").scrollTop;
// });

$("prev").addEventListener("click", () => {
  id == 0 ? (id = 0) : id--;
  Navigation(id);
  HideTxt.play();
  changeColor(id);
});

$("next").addEventListener("click", () => {
  id == 6 ? (id = 6) : id++;
  Navigation(id);
  HideTxt.play();
  changeColor(id);
});

const removeActiveClass = () => {
  $$(".stack__item").forEach((item) => {
    item.classList.remove("active");
  });
};

function ShowTxt() {
  $("h1").innerHTML = content[id].titre;
  $("p").innerHTML = content[id].txt;
  HideTxt.reverse();
  if (id == 6) {
    video();
  }
}

function Navigation(index) {
  var newPosition;
  switch (index) {
    case 0:
      newPosition = 0;
      break;
    case 1:
      newPosition = 400;
      break;
    case 2:
      newPosition = 875;
      break;
    case 3:
      newPosition = 1350;
      break;
    case 4:
      newPosition = 1800;
      break;
    case 5:
      newPosition = 2300;
      break;
    case 6:
      newPosition = 2750;
      break;
    case 7:
      newPosition = 3200;
      break;

    default:
      break;
  }

  $_(".stack").scrollTo({
    top: newPosition,
    left: 0,
    behavior: "smooth",
  });
  removeActiveClass();
  index == 0 ? null : $$(".stack__item")[index - 1].classList.add("active");
}

function changeColor(index) {
  $("body").style.backgroundColor = content[index].color;
  $("h1").style.color = content[index].txtColor;
  $("p").style.color = content[index].txtColor;
  $("next").style.color = content[index].txtColor;
  $("prev").style.color = content[index].txtColor;
}

//la video

function video() {
  gsap.set(".play-circle-01", {
    rotation: 90,
    transformOrigin: "center",
    backgroundColor: "#000",
  });

  gsap.set(".play-circle-02", {
    rotation: -90,
    transformOrigin: "center",
    backgroundColor: "#000",
  });

  gsap.set(".play-perspective", {
    xPercent: 6.5,
    scale: 0.175,
    transformOrigin: "center",
    perspective: 1,
  });

  gsap.set(".play-video", {
    visibility: "hidden",
    opacity: 0,
  });

  gsap.set(".play-triangle", {
    transformOrigin: "left center",
    transformStyle: "preserve-3d",
    rotationY: 10,
    scaleX: 2,
  });

  rotateTL = new gsap.timeline({ paused: true })
    .to(
      ".play-circle-01",
      0.7,
      {
        opacity: 0.1,
        rotation: "+=360",
        strokeDasharray: "456 456",
        ease: Power1.easeInOut,
      },
      0
    )
    .to(
      ".play-circle-02",
      0.7,
      {
        opacity: 0.1,
        rotation: "-=360",
        strokeDasharray: "411 411",
        ease: Power1.easeInOut,
      },
      0
    );

  openTL = new gsap.timeline({ paused: true })
    .to(
      ".play-backdrop",
      1,
      {
        opacity: 0.95,
        visibility: "visible",
        ease: Power2.easeInOut,
      },
      0
    )
    .to(
      ".play-close",
      1,
      {
        opacity: 1,
        ease: Power2.easeInOut,
      },
      0
    )
    .to(
      ".play-perspective",
      1,
      {
        xPercent: 0,
        scale: 1,
        x: "30vw",
        y: "-10vh",
        ease: Power2.easeInOut,
      },
      0
    )
    .to(
      ".play-triangle",
      1,
      {
        scaleX: 1,
        //ease: ExpoScaleEase.config(2, 1, Power2.easeInOut),
      },
      0
    )
    .to(
      ".play-triangle",
      1,
      {
        rotationY: 0,
        //ease: ExpoScaleEase.config(10, 0.01, Power2.easeInOut),
      },
      0
    )
    .to(
      ".play-video",
      1,
      {
        visibility: "visible",
        opacity: 1,
      },
      0.5
    );

  document
    .querySelector(".play-button")
    .addEventListener("mouseover", () => rotateTL.play());
  document
    .querySelector(".play-button")
    .addEventListener("mouseleave", () => rotateTL.reverse());
  document
    .querySelector(".play-button")
    .addEventListener("click", () => openTL.play());
  document
    .querySelector(".play-backdrop")
    .addEventListener("click", () => openTL.reverse());
  document.querySelector(".play-close").addEventListener("click", (e) => {
    e.stopPropagation();
    openTL.reverse();
  });
}
