


var bFunc = function(){return this};
var b = {name: "b", fun : bFunc};

console.log(b.fun());