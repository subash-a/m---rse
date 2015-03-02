var MorseMachine = function() {
	var codemap = morsecode.code;
	var reversemap = {};
	Object.keys(codemap).map(function(k){reversemap[codemap[k]] = k});
	return {
	    "encode": function (string) {
		return string.split("").map(function(c){ return codemap[c.toUpperCase()] }).join("|");
	    },
	    "decode": function (data) {
		return data.split("|").map(function(m){ return reversemap[m.trim()] }).join(" ");
	    }
	}
};
    

var m = new MorseMachine();

var encodeString = function () {
    var data = this.value;
    var emsg = m.encode(data.trim());
    console.log(emsg);
    document.getElementById("morse-area").textContent = emsg;
};

var decodeString = function () {
    var data = this.value;
    var dmsg = m.decode(data.trim());
    console.log(dmsg);
    document.getElementById("text-area").textContent = dmsg;
};
