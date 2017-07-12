// Requiring modules
var toBinary = require('./tools/binaryToInt8.js'); //8-bit binary tools

// Defining constants
const signature = new Uint8Array([0x4E, 0x45, 0x53, 0x1A]);

/**
 * Recognize if data is an iNES rom.
 * @param {Buffer} data 
 * @returns {Boolean}
 */
function recognize(data) {
    if (data[0] == 0x4E && data[1] == 0x45 && data[2] == 0x53 && data[3] == 0x1A) {
        return true;
    }
    return false;
}

/**
 * Return the size of PRG ROM.
 * @param {Buffer} data 
 * @returns {Number} Size of PRG ROM in KBytes
 */
function prgRom(data) {
    return data[4] * 16;
}

/**
 * Return the size of CHR ROM
 * @param {Buffer} data 
 * @returns {Number} CHR ROM size in KBytes, if 0, then ROM uses CHR RAM
 */
function chrRom(data) {
    return data[5] * 8;
}

/**
 * Return the size of PRG RAM
 * @param {Buffer} data
 * @returns {Number} PRG RAM size in KBytes
 */
function prgRam(data) {
    return (data[8] + 1) * 8;
}

/**
 * Return the orientation of the game
 * @param {Buffer} data
 * @returns {String} "Horizontal", "Vertical" or "Four-screen VRAM" (or null)
 */
function orientation(data) {
    var convert = toBinary(data[6]);
    var value = convert[7];
    var ignore = convert[4];
    if (ignore == "0") {
        if (value == "0") {
            return "Horizontal";
        } else if (value == "1") {
            return "Vertical"
        } else {
            return null;
        }
    } else if (ignore == "1") {
        return "Four-screen VRAM";
    } else {
        return null;
    }
}

/**
 * Return if cartridge contains battery-backed RAM
 * @param {Buffer} data 
 * @returns {Boolean}
 */
function batteryBackedRam(data) {
    var convert = toBinary(data[6]);
    var value = convert[6];
    if (value == "1") {
        return true;
    } else if (value == "0") {
        return false;
    } else {
        return null;
    }
}

/**
 * Return if ROM has trainer data
 * @param {Buffer} data 
 * @returns {Boolean}
 */
function hasTrainerData(data) {
    var convert = toBinary(data[6]);
    var value = convert[5];
    if (value == "1") {
        return true;
    } else if (value == "0") {
        return false;
    } else {
        return null;
    }
}

/**
 * Return mapper number
 * @param {Buffer} data
 * @returns {Number} Mapper number
 */
function mapper(data) {
    var lower = toBinary(data[6]);
    var upper = toBinary(data[7]);
    var binary = upper[0] + upper[1] + upper[2] + upper[3] + lower[0] + lower[1] + lower[2] + lower[3];
    return parseInt(binary, 2);
}

/**
 * Return TV System info
 * @param {Buffer} data 
 * @returns {String} "NTSC", "PAL" or "Unknown"
 */
function tvSystem(data){
    var convert = toBinary(data[9]);
    var value = convert[7];
    if (value == "0"){
        return "NTSC";
    } else if (value == "1"){
        return "PAL";
    } else {
        return "Unknown";
    }
}

module.exports.recognize = recognize;
module.exports.prgRom = prgRom;
module.exports.prgRam = prgRam;
module.exports.chrRom = chrRom;
module.exports.orientation = orientation;
module.exports.batteryBackedRam = batteryBackedRam;
module.exports.hasTrainerData = hasTrainerData;
module.exports.mapper = mapper;
module.exports.tvSystem = tvSystem;