const TYPES = {
	"manufacturing": [[10,11,12],[13,14],[16,17],[19,20],[23],[24,25],[26,27],[28,29,30],[31,32]],
	"mining": [5,7,8],
	"transport": 49,
	"research": 72,
	"energetics": 35,
	"construction": 42,
	"agriculture": 1,
	"others": [49, 72, 35, 42, 1]
}
const FILTER_TYPES = {
	"all": [TYPES.manufacturing,TYPES.mining,TYPES.others],
	"manufacturing": TYPES.manufacturing,
	"mining": TYPES.mining,
	"others": TYPES.others,
	"taxonomi": [TYPES.manufacturing,TYPES.mining]
}
const FILTER_COLORS = {
	"all": ["#005bf7", "#4fc400", "#a11"],
	"manufacturing": ["#2a00ff","#ff8000","#F00","#d4db00","#FF80FB","#50b300","#00d9bf","#8a3704","#AA00FF"],
	"mining": ["#1a1","#11a","#a11"],
	"others": ["#11d","#ff8000","#a11","#1a1","#FF80FB"],
	"taxonomi": ["#3399FF","#FF3300","#000099","#990000"]
}

var containsAny = function(source,target){
	source = combine([source]);
	target = combine([target]);
	var result = source.filter(function(item){ return target.indexOf(item) > -1});
	return (result.length > 0);
}

function containsAll(needles, haystack){
	needles = combine([needles]);
	haystack = combine([haystack]);
	for(var i = 0 , len = needles.length; i < len; i++){
		if($.inArray(needles[i], haystack) == -1) return false;
	}
	return true;
}

function combine(arraysToCombine){
	return arraysToCombine.toString().split(",");
}

var filterTowns = {
	"all": function(monotowns){
		$.each(monotowns, function(k, city){
			if (city[5].length > 1){
				if(containsAll(city[5], TYPES.manufacturing)) city.push(FILTER_COLORS["all"][0]);
				else city.push("#000");
			} else {
				$.each(FILTER_TYPES['all'], function(i, ft){
					if(containsAny(city[5], ft)) {
						city.push(FILTER_COLORS['all'][i]);
						return false;
					}
				});
			}
		});
		return monotowns;
	},
	"mining": function(monotowns){
		var c = [];
		$.each(monotowns, function(i, city){
			if(containsAll(city[5], TYPES.mining)){
				if (city[5].length > 1){
					city.push("#000");
				} else {
					$.each(FILTER_TYPES['mining'], function(i, ft){
						if(containsAny(city[5], ft)) {
							city.push(FILTER_COLORS['mining'][i]);
							return false;
						}
					});
				}
				c.push(city);
			}
		});
		return c;
	},
	"manufacturing": function(monotowns){
		var c = [];
		$.each(monotowns, function(i, city){
			if(containsAll(city[5], TYPES.manufacturing)){
				if (city[5].length > 1){
					city.push("#000");
				} else {
					$.each(FILTER_TYPES['manufacturing'], function(i, ft){
						if(containsAny(city[5], ft)) {
							city.push(FILTER_COLORS['manufacturing'][i]);
							return false;
						}
					});
				}
				c.push(city);
			}
		});
		return c;
	},
	"others": function (monotowns) {
		var c = [];
		$.each(monotowns, function(i, city){
			if(!containsAny(city[5], [TYPES.mining, TYPES.manufacturing])){
				if (city[5].length > 1){
					city.push("#000");
				} else {
					$.each(FILTER_TYPES['others'], function(i, ft){
						if(containsAny(city[5], ft)) {
							city.push(FILTER_COLORS['others'][i]);
							return false;
						}
					});
				}
				c.push(city);
			}
			else if(city[5].length > 1 && !containsAll(city[5], TYPES.manufacturing)) {
				city.push("#000");
				c.push(city);
			}
		});
		return c;
	},
	"taxonomi": function (monotowns) {
		var c = []
		$.each(monotowns, function(i, city){
			if(city[6] > 0 && (containsAll(city[5], TYPES.mining) || containsAll(city[5], TYPES.manufacturing))){
				city.push(FILTER_COLORS['taxonomi'][city[6]-1]);
				c.push(city);
			}
		});
		return c
	}
}
