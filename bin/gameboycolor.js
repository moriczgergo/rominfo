/**
 * Recognize if data is a GameBoy Color rom.
 * @param {Buffer} data 
 */
function recognize(data){
	if (require('./gameboy.js').recognize(data)) {
		if (data[0x0143] == 0xC0) {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
}

module.exports.recognize = recognize;