// Requiring modules
var md5 = require('md5'); //MD5 hashing

// Defining constants
const nintendoLogoHash = "e0434707845307679464ae1c22f0ec2d";

/**
 * Recognize if data is a GBA ROM.
 * @param {Buffer} data 
 * @returns {Boolean}
 */
function recognize(data){
    if (data.byteLength < 0x0E0){
        return false;
    }
    if (md5(new Buffer(data.subarray(0x004, 0x0A0))) == nintendoLogoHash){
        return true;
    }
    return false;
}

/**
 * Return game name from ROM
 * @param {Buffer} data 
 * @returns {String} Game name
 */
function title(data) {
	return new Buffer(data.subarray(0x0A0, 0x0AC)).toString('ascii');
}

/**
 * Return maker code from ROM
 * @param {Buffer} data 
 * @returns {String} Maker code
 */
function maker(data) {
    return new Buffer(data.subarray(0x0B0, 0x0B2)).toString('ascii');
}

/**
 * Return info about game/cartridge
 * @param {Buffer} data 
 * @returns {String}
 */
function info(data){
    var source = new Buffer([data[0x0AC]]).toString('ascii');
    switch(source){
        case "A": return "Older game";
        case "B": return "Newer game";
        case "F": return "Emulated";
        case "K": return "Uses acceleration sensor";
        case "P": return "e-Reader";
        case "R": return "Cartridge with rumble and Z-axis gyroscope";
        case "U": return "Cartridge with RTC and solar sensor";
        case "V": return "Cartridge with rumble";
    }
    return "Unknown";
}

/**
 * Return ROM region information
 * @param {Buffer} data 
 * @returns {String} Region
 */
function region(data){
    var source = new Buffer([data[0x0AF]]).toString('ascii');
    switch(source){
        case "J": return "Japan";
        case "P": return "Europe";
        case "F": return "France";
        case "S": return "Spain";
        case "E": return "USA";
        case "D": return "Germany";
        case "I": return "Italy";
    }
    return "Unknown";
}

module.exports.recognize = recognize;
module.exports.title = title;
module.exports.maker = maker;
module.exports.info = info;
module.exports.region = region;