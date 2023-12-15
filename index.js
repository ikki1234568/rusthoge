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
/*rustのサーバーに入ってる人のやつ*/
async function popStatus(serverId, elementId) {
    const url = `https://api.battlemetrics.com/servers/${serverId}`;

    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            const status = data.data.attributes.status.toLowerCase();
            const connectedPlayers = data.data.attributes.players;
            const maxPlayers = data.data.attributes.maxPlayers;
            const queuedPlayers = data.data.attributes.details.rust_queued_players || 0;

            let statusText = "";
            if (status === "online" || status === "playing") {
                if (queuedPlayers > 0) {
                    statusText = `${connectedPlayers}/${maxPlayers} (+${queuedPlayers})`;
                } else {
                    statusText = `${connectedPlayers}/${maxPlayers} `;
                }
            } else {
                statusText = "[Offline]";
            }

            document.getElementById(elementId).innerText = ` ${statusText}`;
        } else {
            console.error(`Battlemetrics Error with status code: ${response.status}`);
            document.getElementById(elementId).innerText = `Battlemetrics Error -> ${response.status}`;
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

popStatus("24768964", "server-status");
popStatus("24807998", "server-status2");

setInterval(() => {
    popStatus("24768964", "server-status");
    popStatus("24807998", "server-status2");
}, 60000);