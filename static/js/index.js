var transTime = 2;
var rotTime = 90;

gsap.to("#home", {duration: 0, display: "block", width: "40vmin", height: "40vmin", top: "calc(36vh + 30vmin)", left: "50vw"});
gsap.to("#home", {duration: rotTime, rotation: 360, repeat:-1, ease: "linear.out" });
var blink = gsap.fromTo("#home", {autoAlpha: .25}, {duration: transTime, autoAlpha: 1, yoyo: true, repeat:-1, ease: "power1.in", repeatDelay:.5 });
var menuElts = $(".menu");
var menuPlacement = 20;
var projPlacement = 25;
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

function spacing(n, margin) {
  var spaces = new Array();
  for(i=0;i<n;i++){
    spaces.push((margin + (100-2*margin)*i/(n-1)).toString().concat("vw"))
  }
  return spaces;
}

function hide(elt) {
  gsap.to(elt, {duration: transTime, autoAlpha: 0});
  gsap.to(elt, {duration: 0, display: "none", delay: transTime});
}

function hover(e) {
  if (typeof e.target === "undefined") {
    gsap.to(e.nextElementSibling, {duration: transTime, autoAlpha: 1});
  }
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
      $(document).off("click");
    }
    else{
      $(elts[i]).off("mouseenter", hover);
      $(elts[i]).off("mouseleave", hoverOff);
    }
  }
}

function selectMenu(e, elts, placement) {
  hoverOff(e)
  removeHovers(elts);
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
}

function selectProj(e, elts, placement) {
  hoverOff(e)
  removeHovers(elts);
  for(i=0;i<elts.length;i++){
    if (elts[i] == e.target) {
      gsap.to(elts[i], {duration: transTime, 
        top: "calc(3vh + ".concat(placement.toString()).concat("vmin)"), 
        width: "calc(0vw + 5vmin)", height: "calc(0vw + 5vmin)", left: "50vw" });
    }
    else {
      hide(elts[i]);
      hoverOff(elts[i]);
    }
  }
}

function selectWrap(e) {
  $(".dot").off("click", selectWrap);
  if (e.target.classList.contains("menu")){
    selectMenu(e, menuElts, menuPlacement);
    if (e.target.classList.contains("about")) {
      hide(".proj");
      removeHovers($(".proj"));
    }
    else {
      var sectID = e.target.classList[1];
      var filtProj = (".proj.").concat(sectID);
      var othProj = ((".proj:not(.").concat(sectID)).concat(")");
      hide(othProj);
      removeHovers($(othProj));
      gsap.to(filtProj, {duration: 0, display: "block"});
      gsap.to("h3", {duration: 0, display: "block"});
      gsap.to(filtProj, {duration: transTime, top: "calc(50vh + 0vmin)", width: "calc(15vw + 0vmin)", height: "calc(15vw + 0vmin)"});
      gsap.to("h3", {duration: 0, top: "calc(50vh + 7.5vw)" });
      gsap.to(filtProj, {duration: transTime, autoAlpha: 1, ease: "power1.in", delay: transTime });
      gsap.to(filtProj, {duration: rotTime, rotation: 360, repeat:-1, ease: "linear.out", delay: transTime });
      var projElts = $(filtProj);
      var projSpacing = spacing(projElts.length, 15);
      for(i=0;i<projElts.length;i++){
        gsap.to(projElts[i], {duration: transTime, left:projSpacing[i] });
        gsap.to(projElts[i].nextElementSibling, {duration: 0, left:projSpacing[i] });
      }
      setTimeout(function(){ setUp(projElts, projPlacement) },transTime*1000);
    }
  }
  else if (e.target.classList.contains("proj")){
    selectProj(e, $(".proj"), projPlacement);
  }
  if (isMobile.any()) {
    setTimeout(function () {$(".menu").on("click", selectWrap)}, transTime*1000);
  }
  else {
    setTimeout(function () {$(".dot").on("click", selectWrap)}, transTime*1000);
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
    }
  }
}

function home(e) {
  hide(".proj");
  removeHovers($(".proj"));
  hide("h3");
  gsap.to(".menu", {duration: transTime, top: "calc(50vh + 0vmin)", width: "calc(15vw + 0vmin)", height: "calc(15vw + 0vmin)"});
  gsap.to("h2", {duration: 0, top: "calc(50vh + 7.5vw)" });
  var menuSpacing = spacing(menuElts.length, 15);
  for(i=0;i<menuElts.length;i++){
    gsap.to(menuElts[i], {duration: transTime, left:menuSpacing[i] });
    gsap.to(menuElts[i].nextElementSibling, {duration: 0, left:menuSpacing[i] });
  }
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
if (!(isMobile.any())) {
  $(".dot").on("click", selectWrap);
}