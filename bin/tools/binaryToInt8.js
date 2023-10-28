module.exports = function(number){
    var convert = number.toString(2);
    var zeroes = "";
    for (var i = 0; i < 8 - convert.length; i++){
        zeroes += "0";
    }
    return zeroes + convert;
}