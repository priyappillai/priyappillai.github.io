var transTime = 2
var rotTime = 90

gsap.to("#home", {duration: 0, display: "block"});
gsap.to("#home", {duration: rotTime, rotation: 360, repeat:-1, ease: "linear.out" });
let blink = gsap.fromTo("#home", {autoAlpha: .25}, {duration: transTime, autoAlpha: 1, yoyo: true, repeat:-1, ease: "power1.in", repeatDelay:.5 });
blink.play();


function hover(e) {
  gsap.to(e.target.nextElementSibling, {duration: transTime, autoAlpha: 1});
}

function hover_off(e) {
  gsap.to(e.target.nextElementSibling, {duration: transTime, autoAlpha: 0});
}

function remove_hovers(elts){
  for(i=0;i<elts.length;i++){
    elts[i].removeEventListener("mouseenter", hover);
    elts[i].removeEventListener("mouseleave", hover_off);
  }
}

function select(e, elts, placement) {
  hover_off(e)
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
  remove_hovers(elts)
}

function set_up(elts, placement){
  for(i=0;i<elts.length;i++){
    elts[i].addEventListener("mouseenter", hover);
    elts[i].addEventListener("mouseleave", hover_off);
    elts[i].addEventListener("click", function(e) {select(e, elts, placement)});
  }
}

function home(e){
  gsap.to(".menu", {duration: transTime, top: "calc(50vh + 0vmin)", width: "calc(15vw + 0vmin)", height: "calc(15vw + 0vmin)"});
  gsap.to("h2", {duration: transTime, top: "calc(50vh + 7.5vw)" });
  gsap.to("#about .dot", {duration: transTime, left:"15vw" });
  gsap.to("#about h2", {duration: 0, left:"15vw" });
  gsap.to("#cs .dot", {duration: transTime, left:"38.33vw" });
  gsap.to("#cs h2", {duration: 0, left:"38.33vw" });
  gsap.to("#des .dot", {duration: transTime, left:"61.67vw" });
  gsap.to("#des h2", {duration: 0, left:"61.67vw" });
  gsap.to("#bio .dot", {duration: transTime, left:"85vw" });
  gsap.to("#bio h2", {duration: 0, left:"85vw" });
  var menu_elts = document.querySelectorAll(".menu");
  setTimeout(function(){ set_up(menu_elts, 20) },transTime*1000);
}

function first_home(e){
  blink.pause();
  blink.progress(1);
  gsap.to(".menu", {duration: 0, display: "block"});
  gsap.to("h2", {duration: 0, display: "block"});
  gsap.to("h1", {duration: transTime, top: "calc(3vh + 5vmin)", scale:.5});
  gsap.to("#home", {duration: transTime, top: "calc(4vh + 10vmin)", width: "4vmin", height: "4vmin" });
  gsap.to(".menu", {duration: transTime, autoAlpha: 1, ease: "power1.in", delay: transTime });
  gsap.to(".menu", {duration: rotTime, rotation: 360, repeat:-1, ease: "linear.out", delay: transTime });
  e.target.removeEventListener(e.type, arguments.callee);
  home(e);
  e.target.addEventListener("click", home);
}

document.querySelector("#home").addEventListener("click", first_home);