
async function getLocationData(latitude, longitude) {
    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&=localityLanguage=en`
    const response = await fetch(url)
    return await response.json()
}

function maxSpeed(rides) {

    let maxSpeed = 0;

    rides.forEach((ride) => {

        if (ride.speed != null && ride.speed > maxSpeed) {
            maxSpeed = ride.speed;
        }
    });
    return (maxSpeed * 3.6).toFixed(1);
}

function getDistance(positions) {
    const earthRadiusKm = 6371
    let totalDistance = 0
    for (let i = 0; i < positions.length - 1; i++) {
        const p1 = {
            latitude: positions[i].latitude,
            longitude: positions[i].longitude
        }
        const p2 = {
            latitude: positions[i + 1].latitude,
            longitude: positions[i + 1].longitude
        }

        const deltaLatitude = toRad(p2.latitude - p1.latitude)
        const deltaLongitude = toRad(p2.longitude - p1.longitude)

        const a = Math.sin(deltaLatitude / 2) *
            Math.sin(deltaLatitude / 2) +
            Math.sin(deltaLongitude / 2) *
            Math.sin(deltaLongitude / 2) *
            Math.cos(toRad(p1.latitude)) *
            Math.cos(toRad(p2.latitude))

        const c = 2 * Math.atan2(Math.sqrt(a),
            Math.sqrt(1 - a))

        const distance = earthRadiusKm * c

        totalDistance += distance
    }

    function toRad(degree) {
        return degree * Math.PI / 180
    }

    return totalDistance.toFixed(2)
}

function getDuration(timeStart, timeEnd) {

    const interval =  (timeEnd - timeStart)/1000; // Em seg

    const hours = Math.trunc(interval / 3600);
    const minutes = Math.trunc((interval % 3600) / 60);
    const seconds = (interval % 60);

    return `${format(hours)}:${format(minutes)},${format(seconds)}`

    function format(number){

        return (number.toFixed(0)).padStart(2,'0');
    }
}

function getDate(startTime){

    const date = new Date(startTime);

    var options = {
        year: "numeric",
        month: "long",
        day: "numeric"
      };

      var optionsHour = {
       hour:"2-digit",
       minute:"2-digit"
      };

        const day = date.toLocaleDateString("pt-BR",options);
        const hour = date.toLocaleString("pt-BR",optionsHour);

        return `${hour} - ${day}`;

}