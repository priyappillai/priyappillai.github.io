gsap.to("#home", {duration: 0, display: "block"});
gsap.to("#home", {duration: 90, rotation: 360, repeat:-1, ease: "linear.out" });
let blink = gsap.fromTo("#home", {opacity: .25}, {duration: 2, opacity: 1, yoyo: true, repeat:-1, ease: "power1.in", repeatDelay:.5 });
blink.play();
document.querySelector("#home").addEventListener("click",  function(){  
  blink.pause();
  blink.progress(1);
  gsap.to(".menu", {duration: 0, display: "block"});
  gsap.to("#name", {duration: 1, top: "0", fontSize: "10vmin"});
  gsap.to("#home", {duration: 1, top: "0", top: "calc(3vh + 10vmin)", width: "4vmin", height: "4vmin" });
  gsap.to(".menu", {duration: 1, opacity: 1, ease: "power1.in", delay: 1 });
  gsap.to(".menu", {duration: 90, rotation: 360, repeat:-1, ease: "linear.out", delay: 1 });
});