var transTime = 2
var rotTime = 90

gsap.to("#home", {duration: 0, display: "block", width: "40vmin", height: "40vmin", top: "calc(36vh + 30vmin)", left: "50vw"});
gsap.to("#home", {duration: rotTime, rotation: 360, repeat:-1, ease: "linear.out" });
var blink = gsap.fromTo("#home", {autoAlpha: .25}, {duration: transTime, autoAlpha: 1, yoyo: true, repeat:-1, ease: "power1.in", repeatDelay:.5 });
var menuElts = document.querySelectorAll(".menu");
var menuPlacement = 20;
blink.play();

var isMobile = {
  Android: function() {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function() {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function() {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function() {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function() {
    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
  }
}

function hover(e) {
  gsap.to(e.target.nextElementSibling, {duration: transTime, autoAlpha: 1});
}

function hoverOff(e) {
  if (typeof e.target === "undefined") {
    gsap.to(e.nextElementSibling, {duration: transTime, autoAlpha: 0});
  }
  else{
    gsap.to(e.target.nextElementSibling, {duration: transTime, autoAlpha: 0});
  }
}

function removeHovers(elts) {
  for(i=0;i<elts.length;i++){
    if (isMobile.any()) {
      $(elts[i]).off("click");
      $(elts[i]).on("click", selectWrap);
      $(document).off("click");
    }
    else{
      $(elts[i]).off("mouseenter", hover);
      $(elts[i]).off("mouseleave", hoverOff);
    }
  }
}

function select(e, elts, placement) {
  hoverOff(e)
  for(i=0;i<elts.length;i++){
    if (elts[i] == e.target) {
      gsap.to(elts[i], {duration: transTime, 
        top: "calc(3vh + ".concat(placement.toString()).concat("vmin)"), 
        width: "calc(0vw + 6vmin)", height: "calc(0vw + 6vmin)" })
    }
    else {
      gsap.to(elts[i], {duration: transTime, 
        top: "calc(3vh + ".concat(placement.toString()).concat("vmin)"), 
        width: "calc(0vw + 4vmin)", height: "calc(0vw + 4vmin)" })
    }
  }
  removeHovers(elts);
}

function selectWrap(e) {
  if (e.target.classList.contains("menu")){
    select(e, menuElts, menuPlacement);
  }
}

function hoverWrap(e) {
  hover(e);
  $(e.target).off(e.type);
  $(e.target).on("click", selectWrap);
}

function setUp(elts, placement) {
  if (isMobile.any()) {
    $(document).on("click", function(e) {
      for(i=0;i<elts.length;i++) {
        if (e.target != elts[i]) {
          hoverOff(elts[i]);
          $(elts[i]).off("click");
          $(elts[i]).on("click", hoverWrap);
        }
      }
    });
    for(i=0;i<elts.length;i++){
      $(elts[i]).off("click");
      $(elts[i]).on("click", hoverWrap);
    }
  }
  else {
    for(i=0;i<elts.length;i++){
      $(elts[i]).on("mouseenter", hover);
      $(elts[i]).on("mouseleave", hoverOff);
      $(elts[i]).on("click", selectWrap);
    }
  }
}

function home(e) {
  gsap.to(".menu", {duration: transTime, top: "calc(50vh + 0vmin)", width: "calc(15vw + 0vmin)", height: "calc(15vw + 0vmin)"});
  gsap.to("h2", {duration: 0, top: "calc(50vh + 7.5vw)" });
  gsap.to("#about .dot", {duration: transTime, left:"15vw" });
  gsap.to("#about h2", {duration: 0, left:"15vw" });
  gsap.to("#cs .dot", {duration: transTime, left:"38.33vw" });
  gsap.to("#cs h2", {duration: 0, left:"38.33vw" });
  gsap.to("#des .dot", {duration: transTime, left:"61.67vw" });
  gsap.to("#des h2", {duration: 0, left:"61.67vw" });
  gsap.to("#bio .dot", {duration: transTime, left:"85vw" });
  gsap.to("#bio h2", {duration: 0, left:"85vw" });
  setTimeout(function(){ setUp(menuElts, menuPlacement) },transTime*1000);
}

function firstHome(e) {
  blink.pause();
  blink.progress(1);
  gsap.to(".menu", {duration: 0, display: "block"});
  gsap.to("h2", {duration: 0, display: "block"});
  gsap.to("h1", {duration: transTime, top: "calc(3vh + 5vmin)", scale:.5});
  gsap.to("#home", {duration: transTime, top: "calc(4vh + 12vmin)", width: "4vmin", height: "4vmin"});
  gsap.to(".menu", {duration: transTime, autoAlpha: 1, ease: "power1.in", delay: transTime });
  gsap.to(".menu", {duration: rotTime, rotation: 360, repeat:-1, ease: "linear.out", delay: transTime });
  $(e.target).off(e.type, arguments.callee);
  home(e);
  $(e.target).on("click", home);
}

$("#home").on("click", firstHome);