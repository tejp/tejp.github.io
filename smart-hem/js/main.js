function navigateMain (page) {
	loadMain(page); $(document).foundation('reflow'); }

function loadMain (page) {
	$('#view').empty();
	var divRow = $('<div />', { 'class': 'row view-main' });
	var divNav = $('<div />', { 'class': 'small-12 medium-7 column' });
	var divOpt = $('<div />', { 'class': 'small-12 medium-5 column' });
	var nav = loadNavigation(page);
	var opt = loadOptions(page);

	divRow.append(
		divNav.append(nav), divOpt.append(opt)
	).appendTo('#view');
}

function loadNavigation (page) {
	switch (page) {
	case 'view-house':
		return loadHouse();
		break;
	default:
		var ssr = $('<div />', { 'class': 'static-size-ratio ssr-80'});
		var ssrC = $('<div />', { 'class': 'ssr-content center-child'});
		var room = $('<div />', { 'class': 'center-child room-' + page.substr(5) });
		return ssr.append(ssrC.append(room.append(page.substr(5))));
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
			room.click(function(){ navigateMain('view-' + o); });
		}
		room.append(o).appendTo(house);
	});

	return ssr.append(ssrC.append(house));
}

function loadOptions (page) {
	var ul = $('<ul />', { 'class': 'no-bullet options-list'});

	$.each(appSettings[page], function(i, o){
		var li = $('<li />', { 'class': 'options-list-item' });
		li.append(i);

		switch (o.type) {
		case 'switch':
			var div = $('<div />', { 'class': 'switch tiny' });
			var input = $('<input />', {
				'type': 'checkbox',
				'id': i,
				'checked': o.value === 1 
			}).click(function () {
				o.value = +(this.checked);
			});
			var label = $('<label />', { 'for': i });
			li.append(div.append(input, label)).appendTo(ul);
			break;
		case 'slider':
			var div = $('<div />', {
				'id': 'slider-' + i,
				'class': 'range-slider',
				'data-slider': o.value,
				'data-options': 'start: ' + o.start + '; end: ' + o.end + 
					'; display_selector: #' + i + ';'
			}).on('change.fndtn.slider', function(){
				o.value = $(this).attr('data-slider');
			});
			var span1 = $('<span />', {
				'class': 'range-slider-handle',
				'role': 'slider',
				'tabindex': '0'
			});
			var span2 = $('<span />', { 'class': 'range-slider-active-segment' });
			var span3 = $('<span />', { 'id': i });
			var input = $('<input>', { 'type': 'hidden' });
			li.append(' ', span3, '&deg;c', div.append(span1, span2, input)).appendTo(ul);
			break;
		}
	});
	return ul;
}

