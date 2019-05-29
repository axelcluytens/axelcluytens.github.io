let shapes = document.querySelectorAll(".scroll-shape");
let type = document.querySelector(".type");
let image = document.querySelectorAll(".image-expand");
let modal = document.querySelector(".modal");
let modalClose = document.querySelector(".modal .close");
let modalImage = document.querySelector(".modal img");
let modalContent = modal.querySelector(".modal-content");
let fadeIn = document.querySelectorAll(".fade-in");
let arrowDown = document.querySelector(".arrow-down");

// Parallax
window.addEventListener("scroll", function(e){
  let st = this.pageYOffset;
  let windowHeight = document.documentElement.clientHeight;
  
  for (let i=0;i<shapes.length;i++) {
    // Parallax effect
    shapes[i].style.marginTop = st * shapes[i].getAttribute("data-speed") + "px";
    // Rotate on scroll
//    shapes[i].style.transform = "rotate(" + (st/10 * shapes[i].getAttribute("data-rotation") - 20) + "deg)";    
    if (st + shapes[i].getBoundingClientRect().top > windowHeight/1.2) {
      shapes[i].style.opacity = 0;
    } else {
      shapes[i].style.opacity = 1;
    }
  }
});
// Smooth scroll down
arrowDown.addEventListener("click", function(e){
  e.preventDefault();
  document.querySelector('.images').scrollIntoView({ 
    behavior: 'smooth' 
  });
});
// Open image modal
for (let i=0;i<image.length;i++) {
  image[i].addEventListener("click", function(e){
    let imageURL = this.querySelector("img").getAttribute("src");
    let newImage = document.createElement("img");
    newImage.src=imageURL;
    newImage.style.opacity = 0;
    // Remove image
    if (document.querySelector(".modal img")) {document.querySelector(".modal img").remove();}
    e.preventDefault();
    modal.classList.add("active");
    setTimeout(function(){
      modal.querySelector(".modal-content").append(newImage);
      modal.classList.remove("loading");
      setTimeout(function(){
        newImage.style.opacity = 1;
      }, 100);
    }, 300);
  });
}
// Stop modal from closing on click
modalContent.addEventListener("click", function(e){
  e.stopImmediatePropagation();
});
// Close modal on click
modal.addEventListener("click", function(){
  modal.classList.remove("active");
  // Remove image
  if (document.querySelector(".modal img")) {document.querySelector(".modal img").remove();}
  modal.classList.add("loading");
});
// Close modal when clicking close
modalClose.addEventListener("click", function(e){
  e.preventDefault();
  modal.classList.remove("active");
  // Remove image
  if (document.querySelector(".modal img")) {document.querySelector(".modal img").remove();}
  modal.classList.add("loading");
});

let mobile;
checkSize();

window.addEventListener("resize", function(){
  checkSize();
});
// Check for mobile
function checkSize() {
  let windowWidth = document.documentElement.clientWidth;
  if (windowWidth > 750) {
    mobile = false;
  } else {
    mobile = true;
  }
}  
// Fade in items when in viewport
window.addEventListener("scroll", function(e){
  if (!mobile) {
    let scroll = this.pageYOffset;
    let windowHeight = document.documentElement.clientHeight;
    for (let i=0;i<fadeIn.length;i++) {
      if (fadeIn[i].getBoundingClientRect().top < scroll - (windowHeight/8)) {
        fadeIn[i].style.opacity = 1;
      }
      if (fadeIn[i].getBoundingClientRect().bottom - windowHeight - fadeIn[i].height/2 > 0) {
        fadeIn[i].style.opacity = 0;
      }
      if (fadeIn[i].getBoundingClientRect().bottom - fadeIn[i].height/2 < 0) {
        fadeIn[i].style.opacity = 0;
      }
    }
  } else {
    for (let i=0;i<fadeIn.length;i++) {
      fadeIn[i].style.opacity = 1;
    }
  }
});
