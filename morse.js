var MorseMachine = function() {
	var codemap = morsecode.code;
	var reversemap = {};
	Object.keys(codemap).map(function(k){
		reversemap[codemap[k].string] = k;
	});
	return {
	    "encode": function (string) {
		return string
		    .split("")
		    .map(function(c){ return codemap[c.toUpperCase()].string || c})
		    .join(" ");
	    },
	    "decode": function (data) {
		data = data.replace(/\s{7}/gi," | ");
		return data
		    .split(" ")
		    .map(function(m){ return reversemap[m.trim()] || m })
		    .join("")
		    .replace(/\|/gi," ");
	    }
	}
};

var m = new MorseMachine();

var encodeString = function () {
    var data = this.value;
    var emsg = m.encode(data.trim());
    console.log(emsg);
	createMorse(data);
    document.getElementById("morse-area").textContent = emsg;
};

var decodeString = function () {
    var data = this.value;
    var dmsg = m.decode(data.trim());
    console.log(dmsg);
	//createMorse();
    document.getElementById("text-area").textContent = dmsg;
};
