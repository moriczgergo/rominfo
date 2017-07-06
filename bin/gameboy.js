// Requiring modules
var md5 = require('md5'); //MD5 hashing

// Defining contstants
const nintendoLogoHash = "e512b1b96edf3c55588229f9435c6606";

/**
 * Recognize if data is a GameBoy rom.
 * @param {Buffer} data 
 * @returns {Boolean}
 */
function recognize(data) {
	if (data.byteLength < 0x014F) {
		return false;
	}
	if (md5(data.subarray(0x0104, 0x0133)) == nintendoLogoHash) {
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
	return new Buffer(data.subarray(0x0134, 0x013F)).toString('ascii');
}

/**
 * Return CGB(GBC) support
 * @param {Buffer} data 
 * @returns {Boolean}
 */
function cgb(data) {
	if (data[0x0143] == 0x80 || data[0x0143] == 0xC0){
		return true;
	} else {
		return false;
	}
}

/**
 * Return old licensee code from ROM
 * @param {Buffer} data 
 * @returns {Number} Old Licensee Code
 */
function oldLicenseeCode(data) {
	var oldLicenseeCode = data[0x014B];
	/*var licenseeCode = 0x00;
	if (oldLicenseeCode == 0x33){
		var newLicenseeCode = new Buffer(data.subarray(0x0144, 0x0145)).toString('ascii');
		licenseeCode = parseInt(newLicenseeCode, 16);
	} else {
		licenseeCode = oldLicenseeCode;
	}*/
	return oldLicenseeCode;
}

/**
 * Return new licensee code from ROM
 * @param {Buffer} data 
 * @returns {Number} New Licensee Code
 */
function newLicenseeCode(data) {
	var newLicenseeCode = parseInt(new Buffer(data.subarray(0x0144, 0x0145)).toString('ascii'), 16);
	return newLicenseeCode;
}

/**
 * Get licensee name from ROM
 * @param {Buffer} data 
 * @returns {String} Licensee
 */
function licensee(data) {
	var licenseeCode = oldLicenseeCode(data);
	if (licenseeCode == 0x33) {
		licenseeCode = newLicenseeCode(data);
		switch (licenseeCode) {
			case 0x00: return "Unknown";
			case 0x01: return "Nintendo R&D1";
			case 0x08: return "Capcom";
			case 0x13: return "Electronic Arts";
			case 0x18: return "Hudson Soft";
			case 0x19: return "b-ai";
			case 0x20: return "kss";
			case 0x22: return "pow";
			case 0x24: return "PCM Complete";
			case 0x25: return "san-x";
			case 0x28: return "Kemco Japan";
			case 0x29: return "seta";
			case 0x30: return "Viacom";
			case 0x31: return "Nintendo";
			case 0x32: return "Bandai";
			case 0x33: return "Ocean/Acclaim";
			case 0x34: return "Konami";
			case 0x35: return "Hector";
			case 0x37: return "Taito";
			case 0x38: return "Hudson";
			case 0x39: return "Banpresto";
			case 0x41: return "Ubi Soft";
			case 0x42: return "Atlus";
			case 0x44: return "Malibu";
			case 0x46: return "angel";
			case 0x47: return "Bullet-Proof";
			case 0x49: return "irem";
			case 0x50: return "Absolute";
			case 0x51: return "Acclaim";
			case 0x52: return "Activision";
			case 0x53: return "American sammy";
			case 0x54: return "Konami";
			case 0x55: return "Hi tech entertainment";
			case 0x56: return "LJN";
			case 0x57: return "Matchbox";
			case 0x58: return "Mattel";
			case 0x59: return "Milton Bradely";
			case 0x60: return "Titus";
			case 0x61: return "Virgin";
			case 0x64: return "LucasArts";
			case 0x67: return "Ocean";
			case 0x69: return "Electronic Arts";
			case 0x70: return "Infogrames";
			case 0x71: return "Interplay";
			case 0x72: return "Broderbund";
			case 0x73: return "sculptured";
			case 0x75: return "sci";
			case 0x78: return "THQ";
			case 0x79: return "Accolade";
			case 0x80: return "misawa";
			case 0x83: return "lozc";
			case 0x86: return "tokuma shoten i*";
			case 0x87: return "tsukuda ori*";
			case 0x91: return "Chunsoft";
			case 0x92: return "Video system";
			case 0x93: return "Ocean/Acclaim";
			case 0x95: return "Varie";
			case 0x96: return "Yonezawa/s'pal";
			case 0x97: return "Kaneko";
			case 0x99: return "Pack in soft";
			case 0xA4: return "Konami (Yu-Gi-Oh!)";
		}
	} else {
		switch (licenseeCode) {
			case 0x00: return "none";
			case 0x01: return "nintendo";
			case 0x08: return "capcom";
			case 0x09: return "hot-b";
			case 0x0A: return "jaleco";
			case 0x0B: return "coconuts";
			case 0x0C: return "elite systems";
			case 0x13: return "electronic arts";
			case 0x18: return "hudsonsoft";
			case 0x19: return "itc entertainment";
			case 0x1A: return "yanoman";
			case 0x1D: return "clary";
			case 0x1F: return "virgin";
			case 0x24: return "pcm complete";
			case 0x25: return "san-x";
			case 0x28: return "kotobuki systems";
			case 0x29: return "seta";
			case 0x30: return "infogrames";
			case 0x31: return "nintendo";
			case 0x32: return "bandai";
			case 0x33: return "GBC - see above";
			case 0x34: return "konami";
			case 0x35: return "hector";
			case 0x38: return "capcom";
			case 0x39: return "banpresto";
			case 0x3C: return "*entertainment i";
			case 0x3E: return "gremlin";
			case 0x41: return "ubi soft";
			case 0x42: return "atlus";
			case 0x44: return "malibu";
			case 0x46: return "angel";
			case 0x47: return "spectrum holoby";
			case 0x49: return "irem";
			case 0x4A: return "virgin";
			case 0x4D: return "malibu";
			case 0x4F: return "u.s. gold";
			case 0x50: return "absolute";
			case 0x51: return "acclaim";
			case 0x52: return "activision";
			case 0x53: return "american sammy";
			case 0x54: return "gametek";
			case 0x55: return "park place";
			case 0x56: return "ljn";
			case 0x57: return "matchbox";
			case 0x59: return "milton bradley";
			case 0x5A: return "mindscape";
			case 0x5B: return "romstar";
			case 0x5C: return "naxat soft";
			case 0x5D: return "tradewest";
			case 0x60: return "titus";
			case 0x61: return "virgin";
			case 0x67: return "ocean";
			case 0x69: return "electronic arts";
			case 0x6E: return "elite systems";
			case 0x6F: return "electro brain";
			case 0x70: return "infogrames";
			case 0x71: return "interplay";
			case 0x72: return "broderbund";
			case 0x73: return "sculptered soft";
			case 0x75: return "the sales curve";
			case 0x78: return "t*hq";
			case 0x79: return "accolade";
			case 0x7A: return "triffix entertainment";
			case 0x7C: return "microprose";
			case 0x7F: return "kemco";
			case 0x80: return "misawa entertainment";
			case 0x83: return "lozc";
			case 0x86: return "tokuma shoten intermedia";
			case 0x8B: return "bullet-proof software";
			case 0x8C: return "vic tokai";
			case 0x8E: return "ape";
			case 0x8F: return "i'max";
			case 0x91: return "chun soft";
			case 0x92: return "video system";
			case 0x93: return "tsuburava";
			case 0x95: return "varie";
			case 0x96: return "yonezawa/s'pal";
			case 0x97: return "kaneko";
			case 0x99: return "arc";
			case 0x9A: return "nihon bussan";
			case 0x9B: return "tecmo";
			case 0x9C: return "imagineer";
			case 0x9D: return "banpresto";
			case 0x9F: return "nova";
			case 0xA1: return "hori electric";
			case 0xA2: return "bandai";
			case 0xA4: return "konami";
			case 0xA6: return "kawada";
			case 0xA7: return "takara";
			case 0xA9: return "technos japan";
			case 0xAA: return "broderbund";
			case 0xAC: return "toei animation";
			case 0xAD: return "toho";
			case 0xAF: return "namco";
			case 0xB0: return "acclaim";
			case 0xB1: return "ascii or nexoft";
			case 0xB2: return "bandai";
			case 0xB4: return "enix";
			case 0xB6: return "hal";
			case 0xB7: return "snk";
			case 0xB9: return "pony canyon";
			case 0xBA: return "*culture brain o";
			case 0xBB: return "sunsoft";
			case 0xBD: return "sony imagesoft";
			case 0xBF: return "sammy";
			case 0xC0: return "taito";
			case 0xC2: return "kemco";
			case 0xC3: return "squaresoft";
			case 0xC4: return "tokuma shoten intermedia";
			case 0xC5: return "data east";
			case 0xC6: return "tonkin house";
			case 0xC8: return "koei";
			case 0xC9: return "ufl";
			case 0xCA: return "ultra";
			case 0xCB: return "vap";
			case 0xCC: return "use";
			case 0xCD: return "meldac";
			case 0xCE: return "*pony canyon or";
			case 0xCF: return "angel";
			case 0xD0: return "taito";
			case 0xD1: return "sofel";
			case 0xD2: return "quest";
			case 0xD3: return "sigma enterprises";
			case 0xD4: return "ask kodansha";
			case 0xD6: return "naxat soft";
			case 0xD7: return "copya systems";
			case 0xD9: return "banpresto";
			case 0xDA: return "tomy";
			case 0xDB: return "ljn";
			case 0xDD: return "ncs";
			case 0xDE: return "human";
			case 0xDF: return "altron";
			case 0xE0: return "jaleco";
			case 0xE1: return "towachiki";
			case 0xE2: return "uutaka";
			case 0xE3: return "varie";
			case 0xE5: return "epoch";
			case 0xE7: return "athena";
			case 0xE8: return "asmik";
			case 0xE9: return "natsume";
			case 0xEA: return "king records";
			case 0xEB: return "atlus";
			case 0xEC: return "epic/sony records";
			case 0xEE: return "igs";
			case 0xF0: return "a wave";
			case 0xF3: return "extreme entertainment";
			case 0xFF: return "ljn";
		}
	}
	return "Unknown";
}

/**
 * Returns ROM Super GameBoy support data
 * @param {Buffer} data 
 * @returns {Boolean}
 */
function sgb(data){
	var flag = data[0x0146];
	if(flag == 0x00){
		return false;
	} else {
		return true;
	}
}

/**
 * Returns ROM Cartridge Type
 * @param {Buffer} data 
 * @returns {String} Cartridge type
 */
function cartridgeType(data){
	var value = data[0x0147];
	switch(value){
		case 0x00: return "ROM ONLY";
		case 0x01: return "MBC1";
		case 0x02: return "MBC1+RAM";
		case 0x03: return "MBC1+RAM+BATTERY";
		case 0x05: return "MBC2";
		case 0x06: return "MBC2+BATTERY";
		case 0x08: return "ROM+RAM";
		case 0x09: return "ROM+RAM+BATTERY";
		case 0x0B: return "MMM01";
		case 0x0C: return "MMM01+RAM";
		case 0x0D: return "MMM01+RAM+BATTERY";
		case 0x0F: return "MBC3+TIMER+BATTERY";
		case 0x10: return "MBC3+TIMER+RAM+BATTERY";
		case 0x11: return "MBC3";
		case 0x12: return "MBC3+RAM";
		case 0x13: return "MBC3+RAM+BATTERY";
		case 0x19: return "MBC5";
		case 0x1A: return "MBC5+RAM";
		case 0x1B: return "MBC5+RAM+BATTERY";
		case 0x1C: return "MBC5+RUMBLE";
		case 0x1D: return "MBC5+RUMBLE+RAM";
		case 0x1E: return "MBC5+RUMBLE+RAM+BATTERY";
		case 0x20: return "MBC6";
		case 0x22: return "MBC7+SENSOR+RUMBLE+RAM+BATTERY";
		case 0xFC: return "POCKET CAMERA";
		case 0xFD: return "BANDAI TAMA5";
		case 0xFE: return "HuC3";
		case 0xFF: return "HuC1+RAM+BATTERY";
	}
	return "Unknown";
}

/**
 * Returns ROM size
 * @param {Buffer} data 
 * @returns {String} ROM Size
 */
function romSize(data){
	var value = data[0x148];
	switch (value){
		case 0x00: return "32KB";
		case 0x01: return "64KB";
		case 0x02: return "256KB";
		case 0x03: return "512KB";
		case 0x04: return "1MB";
		case 0x05: return "2MB";
		case 0x06: return "4MB";
		case 0x07: return "8MB";
		case 0x52: return "1.1MB";
		case 0x53: return "1.2MB";
		case 0x54: return "1.5MB";
	}
	return "Unknown";
}

/**
 * Return RAM size
 * @param {Buffer} data 
 * @returns {String} RAM size
 */
function ramSize(data){
	var value = data[0x0149];
	switch (value){
		case 0x00: return "None";
		case 0x01: return "2KB";
		case 0x02: return "8KB";
		case 0x03: return "32KB";
		case 0x04: return "128KB";
		case 0x05: return "64KB";
	}
	return "Unknown";
}

/**
 * Returns ROM region info
 * @param {Buffer} data 
 * @returns {String}
 */
function region(data){
	var value = data[0x014A];
	if (value == 0x00){
		return "Japan";
	} else{
		return "Non-Japan";
	}
}

/**
 * Returns ROM version info
 * @param {Buffer} data 
 * @returns {Number} ROM version (usually 0)
 */
function version(data){
	return data[0x014C];
}

/**
 * Returns ROM header checksum
 * @param {Buffer} data 
 * @returns {Number} Header checksum
 */
function headerChecksum(data){
	return data[0x014D];
}

/**
 * Returns ROM checksum
 * @param {Buffer} data
 * @returns {Number} 
 */
function checksum(data){
	return parseInt(data[0x14F].toString() + data[0x014E].toString(), 16);
}

module.exports.recognize = recognize;
module.exports.title = title;
module.exports.cgb = cgb;
module.exports.oldLicenseeCode = oldLicenseeCode;
module.exports.newLicenseeCode = newLicenseeCode;
module.exports.licensee = licensee;
module.exports.sgb = sgb;
module.exports.cartridgeType = cartridgeType;
module.exports.romSize = romSize;
module.exports.ramSize = ramSize;
module.exports.region = region;
module.exports.version = version;
module.exports.headerChecksum = headerChecksum;
module.exports.checksum = checksum;