function navigateMain (page) {
	loadMain(page); $(document).foundation('reflow'); $(document).foundation(); }

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
	var house = $('<div />', { 'class': 'view-house clear-fix'});
	var houseFill = ['wc', 'bedroom', 'kitchen', 'balcony', 'livingroom'];
	$.each(houseFill, function (i, o) {
		var room = $('<div />', { 'class': 'left center-child house-' + o });

		if(o !== 'balcony'){
			room.attr('tabindex', '0').addClass('room-hover');
			room.click(function(){ navigateMain('view-' + o); });
		}
		room.append(o).appendTo(house);
	});

	return ssr.append(ssrC.append(house));
}

function loadOptions (page) {
	var ul = $('<div />', { 'class': 'options-list'});

	$.each(appSettings[page], function(i, o){
		var li = $('<div />', { 'class': 'options-list-item' });

		switch (o.type) {
		case 'switch':
			var div = $('<div />', { 'class': 'switch tiny right' });
			var text = $('<div />', {
				'class': 'options-list-item-text', 
				'style': 'display: inline-block;' }).text(i);
			var input = $('<input />', {
				'type': 'checkbox',
				'id': i,
				'checked': o.value === 1 
			}).click(function () {
				o.value = +(this.checked);
			});
			var label = $('<label />', { 'for': i, 'tabindex': '0' });
			li.append(text, div.append(input, label)).appendTo(ul);
			break;
		case 'slider':
			var divC = $('<div />', { 'style': 'overflow: hidden;' });
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
				'tabindex': '0' });
			var span2 = $('<span />', { 'class': 'range-slider-active-segment' });
			var input = $('<input>', { 'type': 'hidden' });
			var label = $('<div />', { 
				'class': 'center-child-vert left', 
				'style': 'height: 31px;'});
			var text = $('<div />', { 
				'class': 'options-list-item-text',
				'style': 'padding-right: 1rem;' });
			var value = $('<span />', { 'id': i });
			text.append(i, ' ', value)
			if (i === 'temperature') { text.append('&deg;c'); }
			li.append(label.append(text), divC.append(div.append(span1, span2, input))).appendTo(ul);
			break;
		case 'color-picker':
			var div = $('<div />', {
				'class': 'boobies'
			});
		}
	});
	return ul;
}

