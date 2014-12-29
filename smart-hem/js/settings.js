var appSettings = {
	'view-house': {
		'lock': {
			'id': 'lock',
			'value': 1,
			'type': 'switch'
		},
		'alarm': {
			'id': 'alarm',
			'value': 0,
			'type': 'switch'
		},
		'light': {
			'id': 'switch lights off',
			'value': 0,
			'type': 'switch'
		},
		'temperature': {
			'id': 'temperature',
			'type': 'slider',
			'suffix': '&deg;c',
			'value': 21,
			'start': 15,
			'end': 27
		},
		'cleaning': {
			'id': 'Cleaning robot',
			'value': 1,
			'type': 'switch'
		},
		'music': {
			'id': 'Music off',
			'value': 0,
			'type': 'switch'
		}
	},
	'view-livingroom': {
		'light': {
			'id': 'light dimmer',
			'value': 12,
			'type': 'slider',
			'start': 0,
			'end': 25
		},
		'fireplace': {
			'id': 'Fireplace intensity level',
			'value': 80,
			'type': 'slider',
			'start': 0,
			'end': 100
		},
		'wall-color': {
			'id': 'Cozy wall color',
			'value': 0,
			'color': '#f0f',
			'type': 'color-picker',
			'colors': [['#fff'], ['#f00'], ['#0f0'], ['#00f'], ['#000']],
			setVal: function () {
				if (this.value === 1){
					$('#spectrumPreview').css('display', 'block');
					$('#wall-color-style').empty().html(
						'.wall-color-style{outline:3px solid ' + this.color +
						';}#spectrumPreview:before{top:1px;bottom:1px;right:1px;left:1px;position:absolute;content:"";display:block;background:' + this.color + ';'
					);
					loadSpectrum(this);
				} else {
					$('#wall-color-style').empty();
					$('#spectrumPreview').css('display', 'none');
					$('.full-spectrum').css('display', 'none');
				}
			}
		}
	},
	'view-bedroom': {
		'light': {
			'id': 'light dimmer',
			'value': 0,
			'type': 'slider',
			'start': 0,
			'end': 25
		},
		'bedvibe': {
			'id': 'bed vibrations',
			'value': 1,
			'type': 'switch'
		}
	},
	'view-kitchen': {
		'light': {
			'id': 'light',
			'type': 'switch',
			'value': 1
		}
	},
	'view-wc': {
		'light': {
			'id': 'light',
			'type': 'switch',
			'value': 0
		},
		'heated-floor': {
			'id': 'heated floor',
			'type': 'slider',
			'value': 0,
			'start': 0,
			'end': 5
		}
	}
};