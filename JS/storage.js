function createNewRide(){

    const newRaceId = Date.now();

    const CheckRace = {
        id:newRaceId,
        coords: [],
        stopTime:null
    }

    saveStorage(newRaceId,CheckRace);
    return newRaceId;
}

function saveStorage(RaceId,CheckRace){
    
    localStorage.setItem(RaceId,JSON.stringify(CheckRace));
}

function getStorage(raceId){
    return JSON.parse(localStorage.getItem(raceId));
}

function SavePositionRace(raceId,position){

    const CheckRace = getStorage(raceId);
     
    const newCoords = {
        accuracy: position.coords.accuracy,
        altitude: position.coords.altitude,
        altitudeAccurancy:position.coords.altitudeAccurancy,
        heading:position.coords.heading,
        longitude:position.coords.longitude,
        latitude:position.coords.latitude,
        speed: position.coords.speed,
        timestamp:position.timestamp
    }

    CheckRace.coords.push(newCoords);
    saveStorage(raceId,CheckRace);
}

function StopRace(raceId){
    const stop = Date.now();
    const CheckRace = getStorage(raceId);

    CheckRace.stopTime = stop;
    saveStorage(raceId,CheckRace);
}

function storageRaces(){

    return Object.entries(localStorage); // Retornar como array o objeto das corridas armazernadas
}