const start = document.querySelector(".start");
const stop = document.querySelector(".stop");
const velocimetro = document.querySelector(".velocimetro");
let id = null;
let raceId = null;

start.addEventListener("click", () => {

    if (id) {
        return;
    }
    const options = {
        enableHighAccuracy: true,
    };

    raceId = createNewRide();

    id = navigator.geolocation.watchPosition(sucess, error, options);

    function sucess(pos) {

        velocimetro.innerHTML = pos.coords.speed ? pos.coords.speed : 0;
        SavePositionRace(raceId, pos);
    }

    function error(error) {
        console.log(error.msg);
    }

    changeDisplay();
    
})

stop.addEventListener("click", () => {

    if (!id) {
        return;
    }
    StopRace(raceId);
    navigator.geolocation.clearWatch(id);
    raceId = null;
    id = null;
    changeDisplay();
})


function changeDisplay() {
    start.classList.toggle("d-none");
    stop.classList.toggle("d-none");
}