/**
 * Recognize console of ROM in data.
 * @param {Buffer} data 
 */
function recognize(data){
	if (require('./gameboycolor.js').recognize(data) == true){
		return "GBC";
	}
	if (require('./gameboy.js').recognize(data) == true){
		return "GB";
	}
	if (require('./gameboyadvance.js').recognize(data) == true){
		return "GBA";
	}
	return null;
}

module.exports = recognize;