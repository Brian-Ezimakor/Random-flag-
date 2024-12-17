
window.onload = function() {
     //   alert(tim)
     let savedName = localStorage.getItem("yourname")
     document.getElementById("name").innerHTML = savedName
     document.getElementById("user").innerHTML = savedName
        
     
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
    
    if (localStorage.getItem("totalScore")) {
        document.getElementById("points").innerHTML = localStorage.getItem("totalScore")
        document.getElementById("flag").innerHTML = localStorage.getItem("flags")
        // let points = localStorage.getItem("totalScore")
    
        // if (points <= 19) {
        //     let value = 0;
        //     localStorage.setItem("flags", value)
        //     document.getElementById("flag").innerHTML = localStorage.getItem("flags")
        // }
        // else if (points >= 20 && points < 39) {
        //     let value = 1;
        //     localStorage.setItem("flags", value)
        //     document.getElementById("flag").innerHTML = localStorage.getItem("flags")
        // }
        // else if (points >= 40 && points < 59) {
        //     let value = 2;
        //     localStorage.removeItem("flags")
        //     localStorage.setItem("flags", value)
        //     document.getElementById("flag").innerHTML = localStorage.getItem("flags")
    
        // }
        // else if (points >= 60 && points < 79) {
        //     let value = 3;
        //     localStorage.removeItem("flags")
        //     localStorage.setItem("flags", value)
        //     document.getElementById("flag").innerHTML = localStorage.getItem("flags")
        // }
        // else if (points >= 80 && points < 99) {
        //     let value = 4;
        //     localStorage.removeItem("flags")
        //     localStorage.setItem("flags", value)
        //     document.getElementById("flag").innerHTML = localStorage.getItem("flags")
        // }
        // else if (points >= 100 && points < 119) {
        //     let value = 5;
        //     localStorage.removeItem("flags")
        //     localStorage.setItem("flags", value)
        //     document.getElementById("flag").innerHTML = localStorage.getItem("flags")
        // }
        // else if (points >= 120 && points < 139) {
        //     let value = 6;
        //     localStorage.removeItem("flags")
        //     localStorage.setItem("flags", value)
        //     document.getElementById("flag").innerHTML = localStorage.getItem("flags")
        // }
        // else if (points >= 140 && points < 159) {
        //     let value = 7;
        //     localStorage.removeItem("flags")
        //     localStorage.setItem("flags", value)
        //     document.getElementById("flag").innerHTML = localStorage.getItem("flags")
        // }
        // else if (points >= 160 && points < 179) {
        //     let value = 8;
        //     localStorage.removeItem("flags")
        //     localStorage.setItem("flags", value)
        //     document.getElementById("flag").innerHTML = localStorage.getItem("flags")
        // }
        // else if (points >= 180 && points < 199) {
        //     let value = 9;
        //     localStorage.removeItem("flags")
        //     localStorage.setItem("flags", value)
        //     document.getElementById("flag").innerHTML = localStorage.getItem("flags")
        // }
        // else if (points >= 200 && points < 219) {
        //     let value = 10;
        //     localStorage.removeItem("flags")
        //     localStorage.setItem("flags", value)
        //     document.getElementById("flag").innerHTML = localStorage.getItem("flags")
        // }
        // else if (points >= 220 && points < 239) {
        //     let value = 11;
        //     localStorage.removeItem("flags")
        //     localStorage.setItem("flags", value)
        //     document.getElementById("flag").innerHTML = localStorage.getItem("flags")
        // }
        // else if (points >= 240 && points < 259) {
        //     let value = 12;
        //     localStorage.removeItem("flags")
        //     localStorage.setItem("flags", value)
        //     document.getElementById("flag").innerHTML = localStorage.getItem("flags")
        // }
        // else if (points >= 260 && points < 279) {
        //     let value = 13;
        //     localStorage.removeItem("flags")
        //     localStorage.setItem("flags", value)
        //     document.getElementById("flag").innerHTML = localStorage.getItem("flags")
        // }
        // else if (points >= 280 && points < 299) {
        //     let value = 14;
        //     localStorage.removeItem("flags")
        //     localStorage.setItem("flags", value)
        //     document.getElementById("flag").innerHTML = localStorage.getItem("flags")
        // }
        // else if (points == 300) {
        //     let value = 15;
        //     localStorage.removeItem("flags")
        //     localStorage.setItem("flags", value)
        //     document.getElementById("flag").innerHTML = localStorage.getItem("flags")
        // }
    }
    
    else {
        document.getElementById("points").innerHTML = 3;
        document.getElementById("flag").innerHTML = 0;
    }
    
    
let levelChecker = localStorage.getItem("flags")
if(levelChecker == 0 || !levelChecker) {
    document.getElementById("level").innerHTML = "Beginner&#128640;"
}
else if(levelChecker == 1) {
    document.getElementById("level").innerHTML = "Intermediate&#129353;"
}
else if(levelChecker == 2 || levelChecker == 3) {
    document.getElementById("level").innerHTML = "Advanced&#129352;"
}
else if(levelChecker == 4) {
    document.getElementById("level").innerHTML = "Intermediate&#129353;"
}
else if(levelChecker == 5) {
    document.getElementById("level").innerHTML = "Veteran&#129351;"
}


setTimeout(() => {
if (localStorage.getItem("newUser")) {
    document.querySelector(".displaytoggler").style.display = "none";
}
else {
    document.querySelector(".displaytoggler").style.display = "block";
    document.querySelector(".displaytoggler").style.opacity = "1";
    document.addEventListener("click", e => {
        if (e.target.matches(".x")) {
        document.querySelector(".displaytoggler").style.display = "none";
        let no = "no"
        localStorage.setItem("newUser", no)
    }
    })    
}
}, 3300);

}


function startQuiz() {
    window.location.href = "quizsection.html"
}

function alertUser() {
    alert("These section is still under development. We will update you when it's complete")
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
     const tim = document.querySelector(".image").src = `${fileReaderEvent.target.result}`;
    }
}

    
function menu() {
    document.querySelector('body').classList.toggle("activeSlide") 
    document.querySelector('body').classList.toggle("activeMenu") 
    document.querySelector('body').classList.toggle("activeMenu1") 
}

document.addEventListener("mouseover", e => {
if (e.target.matches(".court")) {
    document.querySelector(".level").style.display = "block";
}
})

document.addEventListener("mouseout", e => {
if (e.target.matches(".court")) {
    document.querySelector(".level").style.display = "none";
}
})
