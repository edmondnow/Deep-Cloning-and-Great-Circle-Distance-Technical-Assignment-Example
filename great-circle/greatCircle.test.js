let partners = require("./partners.json");
const  { getNearbyOffices } = require("./greatCircle");




test.only("out", () => {
    getNearbyOffices(partners) !==false;
})