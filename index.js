function redirectToServer1() {
    updateServerSpecs("server1Specs");
    document.querySelector(".circle").style.opacity = 0.5;
    document.querySelector(".circle2").style.opacity = 1;
}

function redirectToServer2() {
    updateServerSpecs("server2Specs");
    document.querySelector(".circle").style.opacity = 1;
    document.querySelector(".circle2").style.opacity = 0.5;
}

function updateServerSpecs(serverSpecsId) {
    document.getElementById("server1Specs").style.display = "none";
    document.getElementById("server2Specs").style.display = "none";
    document.getElementById(serverSpecsId).style.display = "block";
}
