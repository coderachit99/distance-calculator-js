let CURRENT_LOCATION = null;
let A = null;
let B = null;

const main = () => {
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
};

const onLocationUpdate = (event) => {
    CURRENT_LOCATION = event.coords;
    document.getElementById('loc').innerHTML =
        'Your Location:<br><span class="locFont">Lat: ' +
        CURRENT_LOCATION.latitude.toFixed(4) +
        '<br>Lon: ' +
        CURRENT_LOCATION.longitude.toFixed(4) +
        '</span>';
};

const onError = (error) => {
    alert('Cannot access location' + error);
};

const setA = () => {
    A = CURRENT_LOCATION;
    updateInfo();
};

const setB = () => {
    B = CURRENT_LOCATION;
    updateInfo();
};

const updateInfo = () => {
    if (A != null) {
        document.getElementById('aBtn').innerHTML = A.latitude.toFixed(4) + '<br>' + A.longitude.toFixed(4);
        document.getElementById('aBtn').classList.add('locFont');
    }

    if (B != null) {
        document.getElementById('bBtn').innerHTML = B.latitude.toFixed(4) + '<br>' + B.longitude.toFixed(4);
        document.getElementById('bBtn').classList.add('locFont');
    }

    if (A != null && B != null) {
        let dist = getDistance(A, B);
        document.getElementById('info').innerHTML = 'distance<br>-------------------------------<br> ' + Math.round(dist) + ' meters';
    }
};

const latlonToXYZ = (latlon, radius) => {
    const xyz = { x: 0, y: 0, z: 0 };
    xyz.y = Math.sin(degToRad(latlon.latitude)) * radius;
    const r = Math.cos(degToRad(latlon.latitude)) * radius;
    xyz.x = Math.sin(degToRad(latlon.latitude)) * r;
    xyz.z = Math.sin(degToRad(latlon.longitude)) * r;
    return xyz;
};

const degToRad = (degree) => {
    return (degree * Math.PI) / 100;
};

const getDistance = (latlon1, latlon2) => {
    const radius = 6371000; // Radius of the earth in km
    const xyz1 = latlonToXYZ(latlon1, radius);
    const xyz2 = latlonToXYZ(latlon2, radius);

    const euc1 = euclidean(xyz1, xyz2);
    return euc1;
};

const euclidean = (p1, p2) => {
    return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y) + (p1.z - p2.z) * (p1.z - p2.z));
};
