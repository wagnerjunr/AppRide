const params = new URLSearchParams(window.location.search);
const rideId = params.get("id");
const detail = document.querySelector(".details");
const btnDelete = document.querySelector(".btn_delete");


const ride = getStorage(rideId);
console.log(ride);

addEventListener("DOMContentLoaded",async()=>{

    const firstLocation = await getLocationData(ride.coords[0].latitude, ride.coords[0].longitude);
    
    const divInformation = document.createElement("div");
    
        const divLocation = document.createElement("div");
        divLocation.innerText = `${firstLocation.city} - ${firstLocation.countryCode}`;
        divLocation.className = "text-primary"
    
        const divSpeed = document.createElement("div");
        divSpeed.innerText = `Velocidade Maxima: ${maxSpeed(ride.coords)} Km/h`
        divSpeed.style = "font-weight: 500;";
    
        const divDistance = document.createElement("div");
        divDistance.innerText = `Distancia: ${getDistance(ride.coords)} Km`
    
        const divDuration = document.createElement("div");
        divDuration.innerText =  `Duração: ${getDuration(ride.id, ride.stopTime)}`; 
        divDuration.className = "mb-2"
    
        const divDate = document.createElement("div");
        divDate.innerText = getDate(ride.id);
        divDate.className = "text-secondary mb-2"
    
        divInformation.appendChild(divLocation);
        divInformation.appendChild(divSpeed);
        divInformation.appendChild(divDistance);
        divInformation.appendChild(divDuration);
        divInformation.appendChild(divDate);

        detail.appendChild(divInformation);

        btnDelete.addEventListener("click", ()=>{
            window.location.href = "./index.html";
            clearStorage(rideId);
        })

        function clearStorage(rideId){
            localStorage.removeItem(rideId);
        }

    const map = L.map("mapDetail");
    map.setView([firstLocation.latitude, firstLocation.longitude], 13)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        minZoom: 5,
        maxZoom: 20,
    }).addTo(map);

    const positionsArray = ride.coords.map((position => {
        return [position.latitude, position.longitude]
    }))

    const polyline = L.polyline(positionsArray, { color: "#F00" })
    polyline.addTo(map)

    map.fitBounds(polyline.getBounds())
  
})

