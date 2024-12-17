if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', unlock)
} else {
    unlock()
}

function unlock(){
let levelChecker = localStorage.getItem("flags")
if (!levelChecker || levelChecker == 0 || levelChecker == 1) {
    document.getElementById("leave3").style.display = "block"
}
else {
    document.getElementById("leave3").style.display = "none"
}
}

