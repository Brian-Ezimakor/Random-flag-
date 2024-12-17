window.onload = function() { 
 
 function calculateSettingAsThemeString({localStorageTheme, systemDarkSettings}) {
     if (localStorageTheme !== null) {
         return localStorageTheme;
     }
 
     if (systemDarkSettings.matches) {
         return "dark";
     }
 
     return "light";
 }
 
 function updateButton({ buttonClick, isDark }) {
     const newCta = isDark? "light_mode" : "dark_mode";
     buttonClick.setAttribute("aria-label", newCta)
     buttonClick.innerText = newCta;
 }
 
 function updateThemeOnLoad({ theme }) {
     document.querySelector("html").setAttribute("data-theme", theme) 
 }
 
 const button = document.querySelector("[data-theme-toggle]");
 const localStorageTheme = localStorage.getItem("theme");
 const systemDarkSettings = window.matchMedia("(prefers-color-scheme: dark)")
 
 let currentThemeSetting = calculateSettingAsThemeString({localStorageTheme, systemDarkSettings})
 
 updateButton({buttonClick: button, isDark: currentThemeSetting === "dark"});
 updateThemeOnLoad({ theme: currentThemeSetting })
 
 document.querySelector("[data-theme-toggle]").addEventListener("click", (event) => {
     const newTheme = currentThemeSetting === "dark" ? "light" : "dark";
 
 
 localStorage.setItem("theme", newTheme)
 updateButton({buttonClick: button, isDark: newTheme === "dark"});
 updateThemeOnLoad({ theme: newTheme })
 
 currentThemeSetting = newTheme
 }) 

}

function upload() {
    const top = document.querySelector(".upload");
    const image = top.files[0];
 
    if (!image.type.includes("image")) {
     return alert('Only images are allowed!');
    }
 
    if (image.size > 10_000_000) {
     return alert('Maximum upload is 10mb!');
    }
 
    const fileReader = new FileReader();
    fileReader.readAsDataURL(image);
 
 
    fileReader.onload = (fileReaderEvent) => {
     const profile = document.querySelector(".image");
     const tim = profile.src = `${fileReaderEvent.target.result}`;
    }
   }

 function menu() {
     document.querySelector('body').classList.toggle("activeSlide") 
     document.querySelector('body').classList.toggle("activeMenu") 
     document.querySelector('body').classList.toggle("activeMenu1") 
 }
