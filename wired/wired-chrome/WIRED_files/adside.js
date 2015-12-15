/**
 * PointRoll adside.js
 *
 * Created by Joe Brust
 * Last edited 3/21/15 r00
 */
function prAdConnection(debug, status_callback) {
	var _this = this;
	_this._ad_container = null;
	_this._ad_size = {};
	_this._ad_slot_index = null;
	_this._ad_slot_size = {}
	_this._ad_slot_size_returned = false;
	_this._ad_slot_size_return_interval = null;
	_this._break_points = null;
	_this._connection_check_timeout = null;
	_this._connection_made = false;
	_this._connection_timeout_delay = 2000;
	_this._debug_mode = debug;
	_this._id = null;
	_this._pub_page_info = {};
	_this._success_fired = false;

	_this.addPageListener = function(target, type, callback) {
		window.addEventListener('custom' + target + type, callback, false);

		_this.sendMessageToPub({
			'addListener': {
				'target': target,
				'type': type
			}
		});
	}

	_this.closeAd = function() {
		//prClose();

		window.setTimeout(function() {
			_this.sendMessageToPub({
				'remove': null
			});
		}, 200);
	}

	_this.connectionCheck = function() {
		clearTimeout(_this._connection_check_timeout);
		clearTimeout(_this.CreateConnectionLoop);

		if (!_this._connection_made) {
			if (typeof(status_callback) == 'function') {
				_this.log('connection to pub side file has timed out, firing fallback function');

				status_callback('failure');
			} else {
				_this.error('connection to pub side file has timed out and no fallback function has been defined');
			}
		}
	}

	_this.createConnection = function(el, breakpoints, id, index) {
		if(_this._connection_made) return;
		_this._ad_container = el;
		_this._break_points = breakpoints;
		_this._id = id;
		_this._ad_slot_index = index;

		window.addEventListener('message', _this.receiveMessageFromPub, false);

		_this.sendMessageToPub({
			'init': {
				'id': _this._id,
				'index': _this._ad_slot_index
			}
		});

		var _prf = document.getElementById('prf' + PRPID);
		_prf.style.width = '100%';
		_prf.style.height = '100%';
		_prf.style.position = 'fixed';
		_prf.style.top = '0px';
		_prf.style.left = '0px';

		_this.CreateConnectionLoop = setTimeout(_this._tryAgain.bind(_this), 100);
	}

	_this._tryAgain = function(){
		_this.sendMessageToPub({
			'init': {
				'id': _this._id,
				'index': _this._ad_slot_index
			}
		});

		_this.CreateConnectionLoop = setTimeout(_this._tryAgain.bind(_this), 100);
	};

	_this.dispatchCustomEvent = function(object) {
		var _event_name = object['name'];
		var _event_data = JSON.parse(object['event']);
		var _custom_event = document.createEvent('Event');
		//var _custom_event = new Event(_event_name);

		_custom_event.initEvent(_event_name, true, false);

		for (var key in _event_data) {
			_custom_event[key] = _event_data[key];
		}

		window.dispatchEvent(_custom_event);
	}

	_this.error = function(message) {
		if (_this._debug_mode) {
			console.log('prAdConnection error (' + _this._id + ') - ' + message);
		}
	}

	_this.fireNonImpression = function() {
		_this.error('fireNonImpression handler has not yet been overwritten by the creative');
	}

	_this.getAdSlotSize = function() {
		return _this._ad_slot_size;
	}

	_this.getPubPageInfo = function() {
		return _this._pub_page_info;
	}

	_this.init = function() {
		if (_this._debug_mode) {
			_this.sendMessageToPub({
				'debug': _this._debug_mode
			});
		}

		_this._connection_check_timeout = window.setTimeout(_this.connectionCheck, _this._connection_timeout_delay);
	}

	_this.isJSON = function(string) {
		if (typeof string === 'object') {
			return true;
		} else {
			return false;
		}
	}

	_this.log = function(message) {
		if (_this._debug_mode) {
			if (typeof message == 'string') {
				console.log('prAdConnection log (' + _this._id + ') - ' + message);
			} else {
				console.log(message);
			}
		}
	}

	_this.receiveMessageFromPub = function(event) {
		try {
			var _data = JSON.parse(event.data);
		} catch (error) {
			return;
		}

		for (var message in _data) {
			var _message = message;
			var _params = _data[message];

			if (/browserSizeUpdated/.test(_message) || /fireNonImpression/.test(_message) || /setAdSlotSize/.test(_message) || /updatePubPageInfo/.test(_message)) {
				_this.log('message received (' + _message + ')');
				_this.log(_params);
			} else {
				if (/dispatchCustomEvent/.test(_message)) {
					_this.log('message received (' + _message + ')');
				} else {
					return;
				}
			}

			_this._connection_made = true;
			clearTimeout(_this.CreateConnectionLoop);
			clearTimeout(_this._connection_check_timeout);

			if (!_this._success_fired) {
				_this._success_fired = true;

				if (typeof(status_callback) == 'function') {
					_this.log('connection to pub side file was successful, firing callback function');

					status_callback('success');
				} else {
					_this.error('connection to pub side file was successful but no callback function has been defined');
				}
			}

			switch (_message) {
				case 'browserSizeUpdated':
					_this.setBrowserSize(_params);
					break;
				case 'dispatchCustomEvent':
					_this.dispatchCustomEvent(_params);
					break;
				case 'fireNonImpression':
					_this.fireNonImpression();
					break;
				case 'setAdSlotSize':
					_this.setAdSlotSize(_params);
					break;
				case 'updatePubPageInfo':
					_this.updatePubPageInfo(_params);
					break;
				default:
					break;
			}
		}
	}

	_this.removePageListener = function(target, type, callback) {
		window.removeEventListener('custom' + target + type, callback, false);

		_this.sendMessageToPub({
			'removeListener': {
				'target': target,
				'type': type
			}
		});
	}

	_this.sendMessageToPub = function(message) {
		if (_this._connection_made || /debug/.test(JSON.stringify(message)) || /init/.test(JSON.stringify(message))) {
			if (_this.isJSON(message)) {
				var _formatted_message = {
					'id': prPlacementId,
					'messages': message
				};

				parent.postMessage(JSON.stringify(_formatted_message), '*');
			} else {
				_this.error('attempting to send non-JSON message to pub (' + message + ')');
			}
		} else {
			_this.error('attempting to send message to pub before initial connection has been made (' + JSON.stringify(message) + ')');
		}
	}

	_this.setAdSize = function(index, type) {
		if (_this._ad_size[type] != index) {
			_this._ad_size[type] = index;

			_this.updateAdSize(index, type);
		}
	}

	_this.setAdSlotSize = function(object) {
		_this._ad_slot_size['width'] = object['width'];
		_this._ad_slot_size['height'] = object['height'];

		_this._ad_slot_size_returned = true;
	}

	_this.setBrowserSize = function(object) {
		if (_this._break_points.width.length > 0) {
			for (var i = 0; i < _this._break_points.width.length; i++) {
				if (object['width'] <= _this._break_points.width[i]) {
					_this.setAdSize(i, 'width');

					break;
				} else {
					if (i == _this._break_points.width.length - 1) {
						_this.setAdSize(i + 1, 'width');

						break;
					}
				}
			}
		} else {
			_this.setAdSize(0, 'width');
		}

		if (_this._break_points.height.length > 0) {
			for (var i = 0; i < _this._break_points.height.length; i++) {
				if (object['height'] <= _this._break_points.height[i]) {
					_this.setAdSize(i, 'height');

					break;
				} else {
					if (i == _this._break_points.height.length - 1) {
						_this.setAdSize(i + 1, 'height');

						break;
					}
				}
			}
		} else {
			_this.setAdSize(0, 'height');
		}
	}

	_this.updateAdSize = function(size, type) {
		_this.error('updateAdSize handler has not yet been overwritten by the creative');
	}

	_this.updatePubPageInfo = function(object) {
		for (var key in object) {
			_this._pub_page_info[key] = object[key];
		}
	}

	_this.init();
}

if (!window.console) {
	var console = {
		log: function() {}
	}
}