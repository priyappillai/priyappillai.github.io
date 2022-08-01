var defaultTransTime = .8;
var defaultRotTime = 90;
var transTime = defaultTransTime;
var rotTime = defaultRotTime;
var dotRotation = {duration: rotTime, rotation: 360, repeat:-1, ease: "linear.out" } 

var menuElts = $(".menu");
var menuSpacing = spacing(menuElts.length, 15, 15);
var menuHeaderSpacing = spacing(menuElts.length, 10, 50);
var menuYPlacement = "8vw";
var projXPlacement = 22;
var projYPlacement = 20;
var sectPlacement = 32;
var page = window.location.hash;

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

function spacing(n, firstmargin, secondmargin, total=100, unit="vw") {
  var spaces = new Array();
  for(i=0;i<n;i++){
    spaces.push((firstmargin + (total-firstmargin-secondmargin)*i/(n-1)).toString().concat(unit))
  }
  return spaces;
}

function hide(elt) {
  gsap.to(elt, {duration: transTime, autoAlpha: 0});
  gsap.to(elt, {duration: 0, display: "none", delay: transTime});
}

function hover(e) {
  var target = e.target;
  if (typeof target === "undefined") {
    target = e;
  }
  gsap.to(target, {duration: transTime/3, autoAlpha: .6});
  gsap.to(target.nextElementSibling, {duration: transTime/3, autoAlpha: .6});
}

function hoverOff(e) {
  var target = e.target;
  if (typeof e.target === "undefined") {
    target = e;
  }
  gsap.to(target, {duration: transTime/3, autoAlpha: 1});
  gsap.to(target.nextElementSibling, {duration: transTime/3, autoAlpha: 1});
}

function removeHovers(elts, alpha=0) {
  for(i=0;i<elts.length;i++){
    gsap.to(elts[i].nextElementSibling, {duration: transTime, autoAlpha: alpha})
    $(elts[i]).off("mouseenter", hover);
    $(elts[i]).off("mouseleave", hoverOff);
    $(elts[i].nextElementSibling).off("click");
  }
}

function selectMenu(e) {
  var target = e.target;
  if (typeof(target) === "undefined") {
    target = e;
  }
  gsap.to("#sitelogo", {duration: transTime, top: "0", left:"45vw", scale: .5});
  window.location.hash = target.id;
  removeHovers(menuElts);
  for(i=0;i<menuElts.length;i++){
    gsap.to(menuElts[i], {duration: transTime, 
      top: menuYPlacement, 
      scale: .3, 
      left: menuHeaderSpacing[i] })
    if (menuElts[i] == target) {
      gsap.to(menuElts[i], {duration: transTime, autoAlpha: 1 })
    }
    else {
      gsap.to(menuElts[i], {duration: transTime, autoAlpha: .25 })
    }
  }
  if (target.id == "about") {
    hide(".page");
    hide(".proj");
    hide("h3");
    removeHovers($(".proj"));
    gsap.to(target.nextElementSibling.nextElementSibling, {duration: 0, 
      top: "calc(3vh + ".concat(sectPlacement.toString()).concat("vmin)")})
    gsap.to(target.nextElementSibling.nextElementSibling, {duration: transTime, 
      autoAlpha: 1, display: "block"})
    var projElts = $(".proj"); 
  }
  else {
    var sectID = "proj";
    if (target.classList.length <= 3) {
      sectID = target.classList[1];
    }
    var filtProj = (".proj.").concat(sectID);
    var othProj = ((".proj:not(.").concat(sectID)).concat(")");
    hide(othProj);
    hide(".page");
    removeHovers($(othProj));
    gsap.to(filtProj, dotRotation);
    var projElts = $(filtProj);
    var projTop = projYPlacement;
    for(i=0;i<projElts.length;i++){
      gsap.to(projElts[i], {duration: transTime, top: projTop.toString().concat("vw"), 
        left: projXPlacement.toString().concat("vw"), scale: 1, autoAlpha: 1, display: "block" });
      gsap.to(projElts[i].nextElementSibling, {duration: transTime, top: (projTop - 4.5).toString().concat("vw"),
        left: (projXPlacement + 6).toString().concat("vw"), autoAlpha: 1, display: "block"});
      projTop += 13;
    }
    othProjElts = $(othProj);
    for(i=0;i<othProjElts.length;i++){
      gsap.to(othProjElts[i], {duration: transTime, top: projYPlacement.toString().concat("vw")});
      gsap.to(othProjElts[i].nextElementSibling, {duration: transTime, top: (projYPlacement - 4.5).toString().concat("vw"),
        left: (projXPlacement + 6).toString().concat("vw")});
    }
    setTimeout(function(){ setUpHovers(projElts) },transTime*1000);
    setTimeout(function(){ setUpHovers($("#home")) },transTime*1000);
  }
}

function selectProj(e, elts) {
  var target = e.target;
  if (typeof(target) === "undefined") {
    target = e;
  }
  window.location.hash = target.id
  hoverOff(e)
  removeHovers(elts);
  for(i=0;i<elts.length;i++){
    if (elts[i] == target) {
      gsap.to(target, {duration: transTime, 
        top: "calc(3vh + ".concat(projPlacement.toString()).concat("vmin)"), 
        width: "calc(0vw + 4vmin)", height: "calc(0vw + 4vmin)", left: "50vw" });
      gsap.to(target.nextElementSibling.nextElementSibling, {duration: 0, 
        top: "calc(3vh + ".concat(sectPlacement.toString()).concat("vmin)")})
      gsap.to(target.nextElementSibling.nextElementSibling, {duration: transTime, 
        autoAlpha: 1, display: "block"})
    }
    else {
      hide(elts[i]);
      hoverOff(elts[i]);
    }
  }
  for(i=0;i<menuElts.length;i++){
    var cat = menuElts[i].classList[1];
    if (target.classList.contains(cat)){
      gsap.to(menuElts[i], {duration: transTime, autoAlpha: 1 })
    } else {
      gsap.to(menuElts[i], {duration: transTime, autoAlpha: 0.25 })
    }
  }
}

function selectWrap(e) {
  var target = e.target;
  if (typeof(target) === "undefined") {
    target = e;
  }
  $(".dot").off("click", selectWrap);
  if (target.classList.contains("menu")){
    selectMenu(e);
  }
  else if (target.classList.contains("proj")){
    selectProj(e, $(".proj"));
  }
  else {
    home(e);
  }
  setTimeout(function () {$(".dot").on("click", selectWrap)}, transTime*1000);
}

function setUpHovers(elts) {
  for(i=0;i<elts.length;i++){
    $(elts[i]).on("mouseenter", hover);
    $(elts[i]).on("mouseleave", hoverOff);
    $(elts[i].nextElementSibling).on("click", function(e) {console.log(e); selectWrap(e.target.previousElementSibling);});
  }
}

function menuSetUp() {
  for(i=0;i<menuElts.length;i++){
    gsap.to(menuElts[i], {duration: transTime, left:menuSpacing[i] });
    gsap.to(menuElts[i].nextElementSibling, {duration: 0, left:menuSpacing[i] });
    gsap.to(menuElts[i].nextElementSibling, {duration: transTime, autoAlpha: 1 });
  }
  setTimeout(function(){ setUpHovers(menuElts) },transTime*1000);
  setTimeout(function(){ removeHovers($("#home"), alpha=1) },transTime*1000);
}

function home(e) {
  window.location.hash = "";
  hide(".proj");
  hide(".page");
  removeHovers($(".proj"));
  hide("h3");
  gsap.to("#sitelogo", {duration: transTime, top: "10vh", left:"20vw", scale: 1});
  gsap.to(".menu", {duration: transTime, top: "calc(55vh + 0vmin)", 
    scale: 1, autoAlpha: 1});
  menuSetUp()
}

async function checkPage() {
  if (page != "") {
      $("#home").click();
      if ($(page)[0].classList.contains("proj")) {
        let category = "#" + $(page)[0].classList[1]
        $(category).off("click");
        $(category).on("click", selectWrap);
        $(category).click();
        setTimeout(function(){removeHovers($(".proj"))}, transTime*1000);
      }
      $(page).off("click");
      $(page).on("click", selectWrap);
      $(page).click();
      setTimeout(function(){removeHovers(menuElts)}, transTime*1000);
    }
}

async function startUp() {
  $(".dot").on("click", selectWrap);

  gsap.to("h2", {duration: 0, top: "calc(55vh + 5vw)" });
  gsap.to(".menu", {duration: 0, autoAlpha: 1 });
  gsap.to(".menu", {duration: 0, top: "calc(55vh + 0vmin)",
    xPercent: "-50", yPercent: "-50", x:0, y:0, z:0});

  gsap.to(".proj", {duration: 0, top: projYPlacement.toString().concat("vw"),
    left: projXPlacement.toString().concat("vw")});
  gsap.to("h3", {duration: 0, top: (projYPlacement - 4.5).toString().concat("vw"),
    left: (projXPlacement + 6).toString().concat("vw")});

  gsap.to("#home", dotRotation);
  gsap.to(".menu", dotRotation);
  
  transTime = 0;
  menuSetUp();
  await checkPage();
  transTime = defaultTransTime
  
  gsap.to("#content", {duration: transTime, autoAlpha: 1});
  
  var projElts = $(".proj");
  for(i=0;i<projElts.length;i++){
    gsap.to(projElts[i], {duration: 0, xPercent: "-50", yPercent: "-50", x:0, y:0, z:0, 
      rotation: Math.floor(Math.random() * 360)});
  }
}

startUp();
