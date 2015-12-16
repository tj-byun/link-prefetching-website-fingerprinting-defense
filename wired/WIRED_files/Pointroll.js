/*global MALPaths,MAL,MALChangeset,prActivity,pr_trk,prup,PRPID,prTrackActivity*/
var MALRMVPointroll = function() {

	var geoPath = {
		us: 'us',
		cafr: 'ca-fr',
		caen: 'ca',
		de: 'de',
		fr: 'fr',
		jp: 'jp',
		au: 'au',
		uk: 'uk',
		kr: 'kr'
	};

	var geoCid = {
		us: 'us',
		au: 'au',
		jp: 'jp',
		cafr: 'ca',
		caen: 'ca',
		uk: 'uk',
		de: 'de',
		fr: 'fr',
		kr: 'kr'
	};

	MAL.define('rmv', new MAL.RMVProxy({

		videoPercentage: 0,
		cached: false,
		staticReason: false,
		clickedForSound: false,

		paths: {
			images: window.MALPaths ? MALPaths.images : './images/',
			videos: window.MALPaths ? MALPaths.videos : './videos/',
			scripts: window.MALPaths ? MALPaths.scripts : './'
		},

		bwNames: [
			[0, '0-0.5m'],
			[512, '0.5-1m'],
			[1000, '1-2m'],
			[2000, '2-3m'],
			[3000, '3-4m'],
			[4000, '4-5m'],
			[5000, '5-6m'],
			[6000, '6-7m'],
			[7000, '7-8m'],
			[8000, '8-9m'],
			[9000, '9-10m'],
			[10000, '10m']
		],

		getBandwidthString: function() {
			var self = this;

			return this.bwNames.reduce(function(p, c) {
				return (self.bandwidth >= c[0]) ? c[1] : p;
			}, this.bwNames[0][1]);
		},

		setDeviceSize: function(size) {
			var deviceIDPool = MAL.placement.RMV.pointroll.deviceIDPool;
			if (MAL.isUndefined(deviceIDPool[size])) {
				MAL.Util.log("RMV: Set device size [" + size + "] does not exist in pool");
			} else {
				this.creativeSize = size;
			}
		},

		getPrID: function(eventName) {
			var eventIDs = MAL.placement.RMV.pointroll.baseEventIDs;
			var deviceIDPool = MAL.placement.RMV.pointroll.deviceIDPool;

			if (MAL.isUndefined(eventIDs[eventName])) {
				MAL.Util.log("RMV: Event [" + eventName + "] does not exist");
			}
			if (MAL.isUndefined(this.creativeSize)) {
				return eventIDs[eventName];
			}
			return deviceIDPool[this.creativeSize] + eventIDs[eventName];
		},

		isRMVReady: function() {
			this.isMock = MAL.isUndefined(window.MALChangeset);
			return (this.isMock) ? true : (window.prsw && window.prgo);
		},

		filePathProxy: function(filepath, filename) {
			if (window.MALChangeset) {
				filename = filename.split('/').join('__');
			}
			// every file request goes through this method, this is where you would add additional filepath logic
			return filepath + filename;
		},

		//default event handler
		defaultEventHandler: function(eventKey, args) {
			MAL.Util.log('RMV Event: ' + eventKey + ' id:' + this.getPrID(eventKey));
			this.reportActivity(this.getPrID(eventKey));
		},

		reportActivity: function(activity) {
			if (this.isMock || MAL.isUndefined(prActivity)) {
				return MAL.log('Mock call -> prActivity(' + activity + ')');
			}
			prActivity(activity);
		},

		// Adding this here, because some sites serve desktop site in mobile.
		checkSize: function() {
			var size;
			switch (MAL.Environment.device) {
				case 'iphone':
					size = 'mobile';
					break;
				case 'ipad':
					size = 'tablet';
					break;
				default:
					size = 'desktop';
			}
			return size;
		},

		events: {

			onInit: {
				unique: true,
				handler: function(object) {

					var size = this.checkSize();

					if (typeof object !== 'undefined' && typeof object === 'object') {
						if (object.size) {
							size = object.size;
						}
					}
					this.setDeviceSize(size);
					MAL.Util.log('RMV: Init: ' + this.getPrID('init') + ' ' + size);
					this.reportActivity(this.getPrID('init'));
				}
			},

			onImagesLoaded: function() {
				MAL.Util.log('RMV: Images Loaded - ' + this.getPrID('images-loaded'));
				this.reportActivity(this.getPrID('images-loaded'));
			},

			onVideoLoaded: function() {
				MAL.Util.log('RMV: Video Loaded - ' + this.getPrID('video-loaded'));
				this.reportActivity(this.getPrID('video-loaded'));
			},

			onTargetAway: function() {
				MAL.Util.log('RMV: Target Away - ' + this.getPrID('target-away'));
				this.reportActivity(this.getPrID('target-away'));
			},

			onCollapse: function() {
				MAL.Util.log('RMV: Collapse - ' + this.getPrID('collapse'));
				this.reportActivity(this.getPrID('collapse'));
			},

			onExpand: function() {
				MAL.Util.log('RMV: Expand - ' + this.getPrID('expand'));
				this.reportActivity(this.getPrID('expand'));
			},

			onHidden: {
				unique: true,
				handler: function(object) {
					if (this.resolvedExperience) return;
					MAL.Util.log('RMV: Hidden: ' + this.getPrID('hidden'));
					this.reportActivity(this.getPrID('hidden'));
				}
			},

			onStatic: function (obj) {
				if (this.resolvedExperience) return;
				var eventName = (obj.reason) ? 'static-' + obj.reason : 'timeout';
				MAL.Util.log('RMV: Static On ' + eventName + ' - ' + this.getPrID(eventName));
				this.reportActivity(this.getPrID(eventName));
				if (eventName === 'static-browser-size' || eventName === 'static-loaded-in-landscape') {
					this.resolvedExperience = true;
				}
			},

			onAnimationEnd: function() {
				MAL.Util.log('RMV: Animation End - ' + this.getPrID('animation-end'));
				this.reportActivity(this.getPrID('animation-end'));
			},

			onCapped: function() {
				this.resolvedExperience = true;
				MAL.Util.log('RMV: Frequency Capped - ' + this.getPrID('frequency-cap'));
				this.reportActivity(this.getPrID('frequency-cap'));
			},

			onClose: function() {
				MAL.Util.log('RMV: Close - ' + this.getPrID('close'));
				this.reportActivity(this.getPrID('close'));
			},

			onAnimationStart: function() {
				this.resolvedExperience = true;

				MAL.Util.log('RMV: Animation Start - ' + this.getPrID('animation-start'));
				this.reportActivity(this.getPrID('animation-start'));
			},

			onEdgebrowser: function() {
				MAL.Util.log('RMV: Edge Browser - ' + this.getPrID('edgebrowser'));
				this.reportActivity(this.getPrID('edgebrowser'));
			},

			onClickthrough: function(o) {
				this.bandWidth = this.bandWidth || 0;
				if (o) {
					o.bandwidth += 400;
					this.bandwidth = Math.floor(o.bandwidth);
				}
				/*MAL.log('bandwidth', this.bandwidth);
				MAL.log('bandwidth string:', this.getBandwidthString());*/
				MAL.Util.log('RMV: Clickthrough: ' + this.getPrID('clickthrough'));
				this.reportActivity(this.getPrID('clickthrough'));
				var url;
				url = this.composeURL(MAL.isStatic ? MAL.placement.RMV.pointroll.staticUrl : MAL.placement.RMV.pointroll.baseUrl, {
					geoPath: geoPath[MAL.placement.geo],
					geoCid: geoCid[MAL.placement.geo],
					siteCode: MAL.placement.siteCode,
					bandWidth: this.getBandwidthString()
				});
				/*
				if (this.device === 'mobile' && MAL.Environment.osVersion >= 8) {
					url = MAL.placement.RMV.pointroll.mobileUrl;
				} else {
					url = this.composeURL(MAL.placement.RMV.pointroll.baseUrl, {
						geoPath: geoPath[MAL.placement.geo],
						geoCid: geoCid[MAL.placement.geo],
						siteCode: MAL.placement.siteCode,
						bandWidth: this.getBandwidthString()
					});
				}
				*/
				window.open(url, '_blank');
			}
		},

		/**
		 *	Safely create url using a readable template w/ a object based on keys. atributes wrapped in double {{ }} curly braces.
		 *	//TODO move into MAL.util or RMVProxy?
		 *	composeURL('http://apple.com/{{attributeA}}/ipad/?s-{{attributeB}}', {attributeA : 'foo', attributeB : 'bar'});
		 *	outputs: http://apple.com/foo/ipad/?s-bar
		 *	@param {String} url
		 *	@param {Object} meta
		 *	@return {String} renderedUrl
		 */
		composeURL: function(baseUrl, obj) {
			return baseUrl.replace(/(\{\{[A-Za-z]+\}\})/g, function(slug) {
				// TYPO IN ERROR CHECK
				if (!obj[slug.replace('{{', '').replace('}}', '')] && geoPath[MAL.geo.geo] !== '') {
					MAL.error('URL Template `{' + slug + '}` missing `' + slug + '` property in passed object');
				}
				return obj[slug.replace('{{', '').replace('}}', '')];
			});
		}
	}));

	if (MAL.isUndefined(window.MALChangeset)) {
		MAL.rmv.paths = {
			images: 'images/',
			videos: 'videos/',
			scripts: '/'
		};
	} else {
		MAL.rmv.paths = {
			images: '//speed-s.pointroll.com/clients/apple/marcom/2014/cherryblossom/r' + MALChangeset + '/',
			videos: '//speed-s.pointroll.com/clients/apple/marcom/2014/cherryblossom/r' + MALChangeset + '/',
			scripts: '//speed-s.pointroll.com/clients/apple/marcom/2014/cherryblossom/r' + MALChangeset + '/'
		};
	}
};

var MALRMV = MALRMVPointroll;
