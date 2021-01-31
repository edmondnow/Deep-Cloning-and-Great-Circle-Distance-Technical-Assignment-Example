let partners = require("./partners.json");
const {
    formatPartners,
    calculateCentralAngle,
    getDistanceFromLondonKM,
    convertToRadians, 
    parseCoords,
    degreesToRadians,
    filterOffices,
    filterPartners,
    formatNearbyPartners,
    EARTH_RADIUS_KM,
} = require("./greatCircle");


describe.only("test getNearbyOffices", () => {

    test("formatPartners", () => {
        const partners = [{organization: "spidergap", offices: []}, {organization: "remotecomp", offices: []}];
        const formatted =  formatPartners(partners);
        expect(formatted).toEqual([{name: "spidergap", offices: []}, {name: "remotecomp", offices: []}]);
    });

    test("calculateCentralAngle", () => {
        const radians1 =  [0.8988703380541438, -0.0012454826621854634];
        const radians2 = [0.8991136770944448, -0.002462642121271479];
        const centralAngle = calculateCentralAngle(radians1, radians2);
        expect(centralAngle).toEqual(0.0007956818788655464);
    })
    
    test("getDistranceFromLondonKM", () => {
        const centralAngle = 0.0007956818788655464;
        const distranceFromLondonKM =  getDistanceFromLondonKM(centralAngle, EARTH_RADIUS_KM);
        expect(distranceFromLondonKM).toEqual(5.07) 
    })

    test("converToRadians", () => {
        const degree = 51.515419;
        const radians = convertToRadians(degree);
        expect(radians).toEqual(0.8991136771)
    })

    test("parseCoords", () => {
        const coords = "25.214124, -11,232542";
        const parsed = parseCoords(coords);
        expect(parsed).toEqual([25.214124, -11, 232542]);
    })

    test("degreesToRadians", () => {
        const degrees = 25.214124;
        const radians = degreesToRadians(25.214124);
        expect(radians).toEqual(0.44006948180612276);
    })

    test("filterOffices", () => { 
        const offices = [{address: "blizzard", distanceFromLondonKM: 80}, {address: "Dunbo", distanceFromLondonKM: 101}];
        const filtered = filterOffices(offices);
        expect(filtered).toEqual([{address: "blizzard", distanceFromLondonKM: 80}]);
    })

    test("filterPartners", () => {
        const partners = [{name: "blizzard", offices: [{address: "LDN", distanceFromLondonKM: 80}]}, {name: "Dunno", offices: []}];
        const filtered = filterPartners(partners)
        expect(filtered).toEqual([{name: "blizzard", offices: [{address: "LDN", distanceFromLondonKM: 80}]}]);
    })

    test("formatNearbyPartners", () => {
        const partners = [{name: "blizzard", offices: [{address: "LDN", distanceFromLondonKM: 80}]}];
        const formatted = formatNearbyPartners(partners);
        expect(formatted).toEqual([["blizzard", ["LDN"]]])
    })
});

