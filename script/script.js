let menu = document.querySelector(".hamburger");
let body = document.querySelector("body");
let menuItems = document.querySelectorAll("header ul li");

// Starting animation
setTimeout(function(){
  body.classList.remove("loading");
}, 100);

// Fix transition on page load glitch
document.addEventListener("DOMContentLoaded", function(event) { 
  setTimeout(function(){
    body.style.display = "block";
  }, 100);
});
// Toggle menu function
function showMenu() {
  body.classList.toggle("active");
  for (let i=0;i<menuItems.length;i++) {
    if (body.classList.contains("active")) {
      // Show all items with small delay
      setTimeout(function(){
        // Fix glitch when clicking on hamburger menu too fast
        if (body.classList.contains("active")) {
          menuItems[i].style.opacity = 1;   
        }
      }, (i+1) * 100); 
    } else {
      menuItems[i].style.opacity = 0;  
    }
  }
}
// Toggle menu
menu.addEventListener("click", function(e){
  e.preventDefault();
  e.stopImmediatePropagation();
  showMenu();
});
// Don't close menu when clicking links
for (let i=0;i<menuItems.length;i++) {
  menuItems[i].addEventListener("click", function(e){
    e.stopImmediatePropagation();
  });
}
// Hide menu on body click
body.addEventListener("click", function(){
  if (body.classList.contains("active")) {
    showMenu();
  }
});