#!/usr/bin/env node

// Requiring modules
var argv = require('yargs')
	.usage('Usage: rominfo [options]')
	.example('rominfo -f tetris.gb', 'analyze given file')
	.alias('f', 'file')
	.nargs('f', 1)
	.string('f')
	.describe('f', 'File to analyze')
	.demandOption(['f'])
	.help('h')
	.alias('h', 'help')
	.argv; //Command line argument parsing
var recognize = require('./bin/recognize.js'); //Recognize ROM
var fs = require('fs');

var file = fs.readFileSync(argv.file);
var res = recognize(file);

if (res == "GBC") {
	var gbc = require('./bin/gameboy.js');
	console.log("Console: GameBoy Color");
	console.log("Game: " + gbc.title(file));
	console.log("Licensee: " + gbc.licensee(file));
	console.log("SGB Support: " + gbc.sgb(file));
	console.log("Cartridge type: " + gbc.cartridgeType(file));
	console.log("ROM size: " + gbc.romSize(file));
	console.log("RAM size: " + gbc.ramSize(file));
	console.log("Region: " + gbc.region(file));
	console.log("Version: " + gbc.version(file));
	console.log("Header checksum: " + gbc.headerChecksum(file));
	console.log("Checksum: " + gbc.checksum(file));
} else if (res == "GB"){
	var gb = require('./bin/gameboy.js');
	console.log("Console: GameBoy");
	console.log("Game: " + gb.title(file));
	console.log("GBC Support: " + gb.cgb(file));
	console.log("Licensee: " + gb.licensee(file));
	console.log("SGB Support: " + gb.sgb(file));
	console.log("Cartridge type: " + gb.cartridgeType(file));
	console.log("ROM size: " + gb.romSize(file));
	console.log("RAM size: " + gb.ramSize(file));
	console.log("Region: " + gb.region(file));
	console.log("Version: " + gb.version(file));
	console.log("Header checksum: " + gb.headerChecksum(file));
	console.log("Checksum: " + gb.checksum(file));
} else if (res == "GBA"){
	var gba = require('./bin/gameboyadvance.js');
	console.log("Console: GameBoy Advance");
	console.log("Title: " + gba.title(file));
	console.log("Maker code: " + gba.maker(file));
	console.log("Game info: " + gba.info(file));
	console.log("Region: " + gba.region(file));
} else {
	console.log("Console: Unknown");
}