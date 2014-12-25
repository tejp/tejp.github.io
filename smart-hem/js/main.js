function loadMain (i) {
	$('#view').empty();
	var divRow = $('<div />', { 'class': 'row view-main' });
	var divNav = $('<div />', { 'class': 'small-12 medium-7 column' });
	var divOpt = $('<div />', { 'class': 'small-12 medium-5 column' });
	var nav = loadNavigation(i);
	var opt = loadOptions(i);

	divRow.append(
		divNav.append(nav), divOpt.append(opt)
	).appendTo('#view');
}

function loadNavigation (i) {
	switch (i) {
		case 'view-house':
			return loadHouse();
			break;
		default:
			return loadDefault(i);
	}
}

function loadHouse () {
	var ssr = $('<div />', { 'class': 'static-size-ratio ssr-80'});
	var ssrC = $('<div />', { 'class': 'ssr-content'});
	var house = $('<div />', { 'class': 'view-house'});
	var houseFill = ['wc', 'bedroom', 'kitchen', 'balcony', 'livingroom'];
	$.each(houseFill, function (i, o) {
		var room = $('<div />', { 'class': 'center-child house-' + o });

		if(o !== 'balcony'){
			room.click(function(){ loadMain('view-' + o); });
		}
		room.append(o).appendTo(house);
	});

	return ssr.append(ssrC.append(house));
}

function loadDefault (i) {
	var ssr = $('<div />', { 'class': 'static-size-ratio ssr-80'});
	var ssrC = $('<div />', { 'class': 'ssr-content center-child'});
	var room = $('<div />', { 'class': 'center-child room-' + i.substr(5) });

	return ssr.append(ssrC.append(room.append(i.substr(5))));
}

function loadOptions (j) {
	var ul = $('<ul />', { 'class': 'no-bullet options-list'});

	$.each(settings[j], function(i, o){
		var li = $('<li />', { 'class': 'options-list-item' });
		var div = $('<div />', { 'class': 'switch tiny' });
		var input = $('<input />', {
			'type': 'checkbox',
			'id': i,
			'checked': o.value === 1 }).click(function () {
				settings[j][this.id]["value"] = 
				+(this.checked);
			});
		var label = $('<label />', { 'for': i });
		li.append(i, div.append(input, label)).appendTo(ul);
	});
	return ul;
}