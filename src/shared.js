document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded called for shared.js");
    // #region Darkmode and Hamburger Menu
    console.log("loaded JS");
    const themeToggle = document.querySelector("#theme-toggle");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const storedTheme = localStorage.getItem("theme");
    const themeIcon = document.querySelector("#theme-icon");
    const burgerIcon = document.querySelector("#burgerImage");
    
    //Darkmode detection function:
    if (storedTheme == "dark" || (!storedTheme && prefersDark)) {
      document.body.classList.add("dark");
      themeIcon.src = "images/darkmode_white.png";
      burgerIcon.src = "images/nav-burger-menu-white.png";
    }
    
    //Darkmode Click Function:
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
      if(themeIcon.src.includes("darkmode_white.png"))
        {
          themeIcon.src = "images/darkmode_black.png";
          burgerIcon.src = "images/nav-burger-menu.png";
        }
        else
        {
          themeIcon.src = "images/darkmode_white.png";
          burgerIcon.src = "images/nav-burger-menu-white.png";
        }
    });
      
    //Hamburger Click Function:
    const burgerMenu = document.querySelector("#burger-menu-button");
    const navLinks = document.getElementsByClassName("nav-item");
    //TODO: Swap src image for hamburger for an opened version of the same color variant.
    burgerMenu.addEventListener("click", () => {
      for(let i = 0; i < 3; i++)
      {
        // navLinks[i].classList.toggle("hamburger-active");
        navLinks[i].classList.toggle("mobile-hidden");
      }
    });
});