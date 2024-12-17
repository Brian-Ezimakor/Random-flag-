if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', fetch)
} else {
    fetch()
}

function fetch() {
let levelChecker = localStorage.getItem("flags")
if(levelChecker == 0 || !levelChecker) {
    document.getElementById("mylevel").innerHTML = "Beginner&#128640;"
}
else if(levelChecker == 1) {
    document.getElementById("mylevel").innerHTML = "Intermediate&#129353;"
}
else if(levelChecker == 2 || levelChecker == 3) {
    document.getElementById("mylevel").innerHTML = "Advanced&#129352;"
}
else if(levelChecker == 4) {
    document.getElementById("mylevel").innerHTML = "Intermediate&#129353;"
}
else if(levelChecker == 5) {
    document.getElementById("mylevel").innerHTML = "Veteran&#129351;"
}

let savedName = localStorage.getItem("yourname")
document.getElementById("myname").innerHTML = savedName

let themeChecker = localStorage.getItem("theme")
document.getElementById("theme").innerHTML = themeChecker

let flags = localStorage.getItem("flags")
let stars = localStorage.getItem("totalScore")
if (flags == null || stars == null) {
    document.getElementById("starFlag").innerHTML = `3` + "&#11088;," + ` 0` + "&#128681;" 
}
else {
document.getElementById("starFlag").innerHTML = `${stars}` + "&#11088;," + ` ${flags}` + "&#128681;"
}
}

document.addEventListener("click", e => {
if (e.target.matches(".theme")) {
let themeChecker = localStorage.getItem("theme")
document.getElementById("theme").innerHTML = themeChecker
}
})

