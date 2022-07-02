let CURRENT_LOCATION = null;
let A = null;
let B = null;

function main() {
    let geolocation = null;

    if (window.navigator && window.navigator.geolocation) {
        geolocation = window.navigator.geolocation;
    }

    if (geolocation) {
        geolocation.watchPosition(onLocationUpdate, onError, {
            enableHighAccuracy: true,
            maximumAge: 1000,
        });
    } else {
        alert('cannot access location');
    }
}

function onLocationUpdate(event) {
    CURRENT_LOCATION = event.coords;
    document.getElementById('loc').innerHTML =
        'Your Location:<br><span class="locFont">Lat: ' +
        CURRENT_LOCATION.latitude.toFixed(5) +
        '<br>Lon: ' +
        CURRENT_LOCATION.longitude.toFixed(5) +
        '</span>';
}

function onError(error) {
    alert('Cannot access location' + error);
}

function setA() {
    A = CURRENT_LOCATION;
    updateInfo();
}

function setB() {
    B = CURRENT_LOCATION;
    updateInfo();
}

function updateInfo() {
    if (A != null) {
        document.getElementById('aBtn').innerHTML = A.latitude.toFixed(5) + '<br>' + A.longitude.toFixed(5);
        document.getElementById('aBtn').classList.add('locFont');
    }

    if (B != null) {
        document.getElementById('bBtn').innerHTML = B.latitude.toFixed(5) + '<br>' + B.longitude.toFixed(5);
        document.getElementById('bBtn').classList.add('locFont');
    }

    if (A != null && B != null) {
        let dist = getDistance(A, B);
        document.getElementById('info').innerHTML = 'distance<br>---------------------------<br> ' + Math.round(dist) + ' meters';
    }
}

function latlonToXYZ(latlon, radius) {
    const xyz = { x: 0, y: 0, z: 0 };
    xyz.y = Math.sin(degToRad(latlon.latitude)) * radius;
    const r = Math.cos(degToRad(latlon.latitude)) * radius;
    xyz.x = Math.sin(degToRad(latlon.latitude)) * r;
    xyz.z = Math.sin(degToRad(latlon.longitude)) * r;
    return xyz;
}

function degToRad(degree) {
    return (degree * Math.PI) / 100;
}

function getDistance(latlon1, latlon2) {
    const radius = 6371000; // Radius of the earth in km
    const xyz1 = latlonToXYZ(latlon1, radius);
    const xyz2 = latlonToXYZ(latlon2, radius);

    const euc1 = euclidean(xyz1, xyz2);
    return euc1;
}

function euclidean(p1, p2) {
    return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y) + (p1.z - p2.z) * (p1.z - p2.z));
}
