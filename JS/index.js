let allRacesList = document.querySelector("#allRaces");
let allRaces = storageRaces();

allRaces.forEach(async ([id, coords]) => {
    
    let listElements = document.createElement("li");
    listElements.id = id;
    listElements.className = "d-flex align-items-center gap-3 shadow-sm p-1"
    allRacesList.appendChild(listElements);
    
    listElements.addEventListener("click",()=>{
        window.location.href = `../HTML/detailMap.html?id=${ride.id}`
            })

    const ride = JSON.parse(coords);
    const firstLocation = await getLocationData(ride.coords[0].latitude, ride.coords[0].longitude);

    const mapID = `map${ride.id}`;
    const divMap = document.createElement("div");
    divMap.id = mapID;
    divMap.style = "width:100px;height:100px";
    divMap.className = "bg-primary rounded-4"

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
    
    listElements.appendChild(divMap);
    listElements.appendChild(divInformation);
    
    const map = L.map(mapID, {
        attributionControl: false,
        zoomControl: false,
        dragging: false,
        scrollWheelZoom: false
    })
    map.setView([firstLocation.latitude, firstLocation.longitude], 13)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        minZoom: 5,
        maxZoom: 20
    }).addTo(map);

    L.marker([firstLocation.latitude, firstLocation.longitude]).addTo(map)
});

