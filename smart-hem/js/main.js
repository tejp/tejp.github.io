function navigateMain (page) { loadMain(page); $(document).foundation(); }

function loadMain (page) {
	$('#view').empty();
	var divRow = $('<div />', { 'class': 'row view-main' });
	var divNav = $('<div />', { 'class': 'small-12 medium-7 column' });
	var divOpt = $('<div />', { 'class': 'small-12 medium-5 column' });
	divNav.append(loadNavigation(page));
	divOpt.append(loadOptions(page));
	divRow.append(divNav,divOpt).appendTo('#view');
	if (page === 'view-livingroom') {
		var o = appSettings[page]['wall-color'];
		o.setVal();
	}
}

function loadNavigation (page) {
	var o = page.substr(5);
	switch (page) {
	case 'view-house':
		return loadHouse();
		break;
	default:
		var ssr = $('<div />', { 'class': 'static-ratio-80'});
		var ssrC = $('<div />', { 'class': 'static-ratio-content center-child'});
		var room = $('<div />', { 'class': 'center-child room-' + o });
		if(o === 'livingroom'){
			var wall = $('<div />', {
				'class': 'wall-color-style',
				'style': 'position:absolute;' +
					'top:4px; left:4px; right:4px; bottom:4px;'
			});
			wall.appendTo(room);
		}
		return ssr.append(ssrC.append(room.append(o)));
	}
}

function loadHouse () {
	var ssr = $('<div />', { 'class': 'static-ratio-80'});
	var ssrC = $('<div />', { 'class': 'static-ratio-content'});
	var house = $('<div />', { 'class': 'view-house clear-fix'});
	var houseFill = ['wc', 'bedroom', 'kitchen', 'balcony', 'livingroom'];
	$.each(houseFill, function (i, o) {
		var room = $('<div />', { 'class': 'left center-child house-' + o });

		if(o !== 'balcony'){
			room.attr('tabindex', '0').addClass('nav-hover');
			room.click(function(){ navigateMain('view-' + o); });
		}
		if(o === 'livingroom'){
			var wall = $('<div />', {
				'class': 'wall-color-style',
				'style': 'position:absolute;' +
					'top:4px; left:4px; right:4px; bottom:4px;'
			});
			wall.appendTo(room);
		}
		room.append(o).appendTo(house);
	});

	return ssr.append(ssrC.append(house));
}

function loadOptions (page) {
	var ul = $('<div />', { 'class': 'options-list' });

	$.each(appSettings[page], function(i, o){
		var li;
		switch (o.type) {
		case 'switch':
			li = createSwitchOption(i, o);
			break;
		case 'slider':
			li = createSliderOption(i, o);
			break;
		case 'color-picker':
			li = createColorPickerOptions(i, o);
			break;
		}
		li.addClass('options-list-item clear-fix').appendTo(ul);
	});
	return ul;
}

function createSwitchOption (i, o) {
	var text = $('<div />', {
		'class': 'float-fix center-child-vert options-list-item-text',
		'style': 'height: 24px;'
	}).text(o.id);
	var div = $('<div />', { 'class': 'switch tiny right' });
	var input = $('<input />', {
		'type': 'checkbox',
		'id': i,
		'checked': o.value === 1 
	}).click(function () {
		o.value = +(this.checked);
	});
	var label = $('<label />', { 'for': i, 'tabindex': '0' });
	return $('<div />').append(div.append(input, label), text);
}

function createSliderOption (i, o) {
	var text = $('<div />', { 'class': 'options-list-item-text center-child-vert float-fix' 
	}).text(o.id + ':');
	var label = $('<div />', { 
		'id': 'slider-value-' + i,
		'class': 'options-list-item-text right',
		'style': 'text-align: right;' });
	var divSlider = $('<div />', {
		'id': 'slider-' + i,
		'class': 'range-slider',
		'data-slider': o.value,
		'data-options': 
			'start: ' + o.start + 
			'; end: ' + o.end
	}).on('change.fndtn.slider', function(){
		o.value = $(this).attr('data-slider');
		$('#slider-value-' + i).html(
			(o.value === '0' ? 'off' : o.value) + (o.suffix ? o.suffix:'') );
	});
	var span1 = $('<span />', {
		'class': 'range-slider-handle',
		'role': 'slider',
		'tabindex': '0' });
	var span2 = $('<span />', { 'class': 'range-slider-active-segment' });
	var input = $('<input>', { 'type': 'hidden' });
	divSlider.append(span1, span2, input);
	return $('<div />').append(label, text, divSlider);
}

function createColorPickerOptions (i, o) {
	var text = $('<div />', {
		'class': 'float-fix center-child-vert options-list-item-text',
		'style': 'height: 24px;'
	}).text(o.id);
	var div = $('<div />', { 'class': 'switch tiny right' });
	var input = $('<input />', {
		'type': 'checkbox',
		'id': i,
		'checked': o.value === 1 
	}).click(function () {
		o.value = +(this.checked);
		o.setVal();
	});
	var label = $('<label />', { 'for': i, 'tabindex': '0' });
	div.append(input, label);
	var spectrumButton = $('<div />', { 
		'class': 'left',
		'style': 'margin-right:.5rem; margin-top:.5rem;' });
	var spectrum = $('<input>', { 'type': 'hidden', 'id': 'spectrum' });
	var spectrumPreview = $('<div />', {
		'class': 'float-fix static-ratio-60',
		'id': 'spectrumPreview',
		'style': 'margin-top: .5rem; border:1px solid #CADCE3'});
	return $('<div />').append(div, text, spectrumButton.append(spectrum), spectrumPreview);
}

function loadSpectrum (o) {
	$('#spectrum').spectrum({ 
		color: o.color,
		className: "full-spectrum",
		change: function(color) {
			o.color = color.toHexString();
			o.setVal();
		}
	});
}
