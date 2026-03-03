// ======================================================
// JR MOURA AUTO CENTER - SCRIPT PRINCIPAL
// ======================================================

(function () {
"use strict";

document.addEventListener("DOMContentLoaded", function(){

// ======================================================
// CARROSSEL HORIZONTAL DE SERVIÇOS
// ======================================================

const carousel = document.querySelector(".carousel");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

const CONFIG = {
SCROLL_SPEED: 1,
AUTOPLAY: false,
AUTOPLAY_DELAY: 5000
};

let autoplayTimer = null;

if (carousel) {

function getScrollAmount(){
const card = carousel.querySelector(".service-card");
if(!card) return 300;

const gap = parseInt(getComputedStyle(carousel).gap) || 16;
return (card.offsetWidth + gap) * CONFIG.SCROLL_SPEED;
}

function scrollNext(){
carousel.scrollBy({
left: getScrollAmount(),
behavior: "smooth"
});
}

function scrollPrev(){
carousel.scrollBy({
left: -getScrollAmount(),
behavior: "smooth"
});
}

if(nextBtn) nextBtn.addEventListener("click", scrollNext);
if(prevBtn) prevBtn.addEventListener("click", scrollPrev);

function updateButtons(){
if(!nextBtn || !prevBtn) return;

const maxScroll = carousel.scrollWidth - carousel.clientWidth;

prevBtn.disabled = carousel.scrollLeft <= 5;
nextBtn.disabled = carousel.scrollLeft >= maxScroll - 5;
}

carousel.addEventListener("scroll", updateButtons);
window.addEventListener("resize", updateButtons);

let isDragging = false;
let startX;
let scrollLeftStart;

carousel.addEventListener("mousedown", e => {
isDragging = true;
carousel.classList.add("dragging");
startX = e.pageX - carousel.offsetLeft;
scrollLeftStart = carousel.scrollLeft;
});

carousel.addEventListener("mouseleave", () => {
isDragging = false;
carousel.classList.remove("dragging");
});

carousel.addEventListener("mouseup", () => {
isDragging = false;
carousel.classList.remove("dragging");
});

carousel.addEventListener("mousemove", e => {
if(!isDragging) return;
e.preventDefault();

const x = e.pageX - carousel.offsetLeft;
const walk = (x - startX) * 1.5;
carousel.scrollLeft = scrollLeftStart - walk;
});

function startAutoplay(){
if(!CONFIG.AUTOPLAY) return;

autoplayTimer = setInterval(() => {

const maxScroll = carousel.scrollWidth - carousel.clientWidth;

if(carousel.scrollLeft >= maxScroll - 10){
carousel.scrollTo({ left: 0, behavior:"smooth" });
}else{
scrollNext();
}

}, CONFIG.AUTOPLAY_DELAY);
}

function stopAutoplay(){
if(autoplayTimer) clearInterval(autoplayTimer);
}

carousel.addEventListener("mouseenter", stopAutoplay);
carousel.addEventListener("mouseleave", startAutoplay);

updateButtons();
startAutoplay();
}

// ======================================================
// CARROSSEL 3D MONTADORAS
// ======================================================

const ring = document.getElementById("brandsRing");

if (ring) {

const items = ring.querySelectorAll(".brand");
const total = items.length;

if(total > 0){

const radius = 320;
const rotateSpeed = 0.3;

let angle = 0;

items.forEach((item, index) => {
const theta = (360 / total) * index;
item.style.transform = `rotateY(${theta}deg) translateZ(${radius}px)`;
});

function animate3D(){
angle += rotateSpeed;
ring.style.transform = `rotateY(${angle}deg)`;
requestAnimationFrame(animate3D);
}

animate3D();
}
}

}); // DOMContentLoaded

})();