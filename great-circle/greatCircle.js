
let partners = require("./partners.json");

const CENTRAL_LONDON_COORDS = [51.515419, -0.141099]
const EARTH_RADIUS_KM = 6371.1;

const formatNearbyPartners = p => p.map(({name, offices}) => [name, offices.map((({address}) => address))]);

const filterPartners = p => p.filter(({offices}) => offices.length > 0);

const filterOffices = (offs) => offs.filter(({distanceFromLondonKM}) => distanceFromLondonKM <= 100);

const degreesToRadians = (degrees) => degrees * (Math.PI / 180);

const parseCoords = coords => coords.split(",").map(str => parseFloat(str));

const convertToRadians = coords => parseCoords(coords).map(degree => parseFloat(degreesToRadians(degree).toFixed(10)));

const getDistanceFromLondonKM = (centralAngle, meanEarthRadiusKM) => parseFloat((centralAngle * meanEarthRadiusKM).toFixed(2));


const calculateCentralAngle = (([lat1, long1], [lat2, long2]) => {  
    const { sin, cos, acos } = Math;
    const longAbsDiff = long1 > long2 ? long1 - long2 : long2 - long1;
    return acos((sin(lat1) * sin(lat2)) + (cos(lat1) * cos(lat2) * cos(longAbsDiff)));
});

const enrichOffices = offs => offs.map(off => { 
    const CENTRAL_LONDON_RADIANS = CENTRAL_LONDON_COORDS.map(coord => degreesToRadians(coord))
    const radians = convertToRadians(off.coordinates)
    const centralAngle = calculateCentralAngle(radians, CENTRAL_LONDON_RADIANS);
    const distanceFromLondonKM = getDistanceFromLondonKM(centralAngle, EARTH_RADIUS_KM)
    return {address: off.address, distanceFromLondonKM}
});

const formatPartners = (p) =>  p.map(p =>  ({name: p.organization, offices: enrichOffices(p.offices)}));

function getNearbyOffices(partners) {
    const nearbyOffices = formatPartners(partners).map(({ offices, ...rest}) => ({ ...rest, offices: filterOffices(offices) }));
    const nearbyPartners = filterPartners(nearbyOffices);
    return formatNearbyPartners(nearbyPartners);
}


module.exports = {
    getNearbyOffices,
    formatPartners,
    enrichOffices,
    calculateCentralAngle,
    getDistanceFromLondonKM,
    convertToRadians, 
    parseCoords,
    degreesToRadians,
    filterOffices,
    filterPartners,
    formatNearbyPartners
};

