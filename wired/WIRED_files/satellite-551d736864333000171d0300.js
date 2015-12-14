_satellite.pushAsyncScript(function(event, target, $variables){
  (function(window) {
    if (window.sniffAdBlock !== undefined) {
        return;
    }

    var SniffAdBlock = function(options) {
        if (options !== undefined) {
            this.setOption(options);
        }

        var self = this;
        var eventCallback = function() {
            setTimeout(function() {
                if (self._options.checkOnLoad === true) {
                    if (self._var.bait === null) {
                        self._creatBait();
                    }
                    setTimeout(function() {
                        self.check();
                    }, 1);
                }
            }, 1);
        };
        if (window.addEventListener) {
            window.addEventListener('load', eventCallback, false);
        } else {
            window.attachEvent('onload', eventCallback);
        }
    };
    SniffAdBlock.prototype._options = {
        checkOnLoad: true,
        resetOnEnd: true,
        loopCheckTime: 50,
        loopMaxNumber: 5,
        baitClass: 'pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links',
        baitStyle: 'width: 1px !important; height: 1px !important; position: absolute !important; left: -10000px !important; top: -1000px !important;'
    };
    SniffAdBlock.prototype._var = {
        version: '3.0.1',
        bait: null,
        checking: false,
        loop: null,
        loopNumber: 0,
        event: {
            detected: [],
            notDetected: []
        }
    };
    SniffAdBlock.prototype._bait = null;

    SniffAdBlock.prototype.setOption = function(options, value) {
        if (value !== undefined) {
            var key = options;
            options = {};
            options[key] = value;
        }
        for (option in options) {
            this._options[option] = options[option];
        }
        return this;
    };

    SniffAdBlock.prototype._creatBait = function() {
        var bait = document.createElement('div');
        bait.setAttribute('class', this._options.baitClass);
        bait.setAttribute('style', this._options.baitStyle);
        this._var.bait = window.document.body.appendChild(bait);

        this._var.bait.offsetParent;
        this._var.bait.offsetHeight;
        this._var.bait.offsetLeft;
        this._var.bait.offsetTop;
        this._var.bait.offsetWidth;
        this._var.bait.clientHeight;
        this._var.bait.clientWidth;
    };
    SniffAdBlock.prototype._destroyBait = function() {
        window.document.body.removeChild(this._var.bait);
        this._var.bait = null;
    };

    SniffAdBlock.prototype.check = function(loop) {
        if (loop === undefined) {
            loop = true;
        }

        if (this._var.checking === true) {
            return false;
        }
        this._var.checking = true;

        if (this._var.bait === null) {
            this._creatBait();
        }

        var self = this;
        this._var.loopNumber = 0;
        if (loop === true) {
            this._var.loop = setInterval(function() {
                self._checkBait(loop);
            }, this._options.loopCheckTime);
        }
        this._checkBait(loop);

        return true;
    };
    SniffAdBlock.prototype._checkBait = function(loop) {
        var detected = false;

        if (this._var.bait === null) {
            this._creatBait();
        }

        if (window.document.body.getAttribute('abp') !== null || this._var.bait.offsetParent === null || this._var.bait.offsetHeight == 0 || this._var.bait.offsetLeft == 0 || this._var.bait.offsetTop == 0 || this._var.bait.offsetWidth == 0 || this._var.bait.clientHeight == 0 || this._var.bait.clientWidth == 0) {
            detected = true;
        }
        if (window.getComputedStyle !== undefined) {
            var baitTemp = window.getComputedStyle(this._var.bait, null);
            if (baitTemp.getPropertyValue('display') == 'none' || baitTemp.getPropertyValue('visibility') == 'hidden') {
                detected = true;
            }
        }

        if (loop === true) {
            this._var.loopNumber++;
            if (this._var.loopNumber >= this._options.loopMaxNumber) {
                clearInterval(this._var.loop);
                this._var.loop = null;
                this._var.loopNumber = 0;
            }
        }

        if (detected === true) {
            if (loop === true) {
                this._var.checking = false;
            }
            this._destroyBait();
            this.emitEvent(true);
        } else if (this._var.loop === null || loop === false) {
            if (loop === true) {
                this._var.checking = false;
            }
            this._destroyBait();
            this.emitEvent(false);
        }
    };

    SniffAdBlock.prototype.emitEvent = function(detected) {
        var fns = this._var.event[(detected === true ? 'detected' : 'notDetected')];
        for (i in fns) {
            fns[i]();
        }
        if (this._options.resetOnEnd === true) {
            this.clearEvent();
        }
        return this;
    };
    SniffAdBlock.prototype.clearEvent = function() {
        this._var.event.detected = [];
        this._var.event.notDetected = [];
    };

    SniffAdBlock.prototype.on = function(detected, fn) {
        this._var.event[(detected === true ? 'detected' : 'notDetected')].push(fn);
        return this;
    };
    SniffAdBlock.prototype.onDetected = function(fn) {
        return this.on(true, fn);
    };
    SniffAdBlock.prototype.onNotDetected = function(fn) {
        return this.on(false, fn);
    };

    window.sniffAdBlock = new SniffAdBlock();
  
  
// Cookie setter and getter functions
// We only want to count daily unique ad blocks
// Taken from www.w3schools.com/js/js_cookies.asp
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

// Setup the tracking function to submit a GET request (i.e. fire the image pixel)
// Taken from cn.dart.js (author: Rob Sethi), with some modifications
function trackETF(blocked,new_visit){

	    if (blocked) {
	    	if (new_visit){
		    _blocked = 'blocked';
	    	} else{
	    	    _blocked = 'blocked_pageview';
	    	}
	    } else {
	    	if (new_visit){
		    _blocked = 'not_blocked';
	    	} else {
	    	    _blocked = 'not_blocked_pageview';
	    	}
	    }
	    
	    if (/iPhone|iPad/i.test(navigator.userAgent)){
	    	_blocked = _blocked+'/iOS'
	    }

            var track, buildParams;
	    
	    // Fire the event with the event params
            track = function(){
                jQuery.ajax({
                    type       : "GET",
                    url         : '//event.condenastdigital.com/images/event.gif?' + buildParams(),
                    cache       : false
                });
            };

	    // Function to build the parameters of the gif URL
            buildParams = function(){
                var params, markers;
                    
		    params = {
                        "e0_id"     : document.location.host + '/' + _blocked,
                        "e0_ec"     : "adblock",
                        "e0_env"    : "dart",
                        "e0_sc"     : document.location.host.split('.')[1].substring(0,3),
                        "e0_tit"    : browserCheck(),
                        "e0_url"    : document.location.href
                    };

                    function browserCheck(){
                        var N= navigator.appName, ua= navigator.userAgent, tem;
                        var M= ua.match(/(opera|chrome|safari|firefox|msie|trident)\/?\s*(\.?\d+(\.\d+)*)/i);

                        if(M && (tem= ua.match(/version\/([\.\d]+)/i))!= null) {M[2]=tem[1];}
                        M= M? [M[1], M[2]]: [N, navigator.appVersion,'-?'];
                        return M.toString()
                    };


                return jQuery.param(params);
            };
	
	    //console.log(buildParams);

            track();

};

var new_visit;
// Set a BlockerSniffer cookie to ensure that we only count 1 detection event per user per day 
if (getCookie("BlockerSniffer_"+document.location.host.split('.')[1]) != 1) {
    setCookie("BlockerSniffer_"+document.location.host.split('.')[1],1,1);
    new_visit = true;
} else {
    new_visit = false;
}

// Apply SniffAdBlocker (must include SniffAdBlocker.js (https://github.com/veeracs/SniffAdBlock)
// Adapted from http://wiki.conde-dev.com/pages/viewpage.action?pageId=20188075
if (!sniffAdBlock) {    //  if the sniffer is blocked by AdBlock
    console.log('Adblocker detected');
    setCookie("AdHt",1,365);
    if (typeof _satellite != "undefined") {
      _satellite.track('adBlock'); 
    }
    if (new_visit){
            trackETF(true,true);
            trackETF(true,false);
        } else {
            trackETF(true,false);
        }
} else {
    console.log('checking for ad blockers...');
    sniffAdBlock.onDetected(function() {
        console.log('Adblocker detected');
        setCookie("AdHt",1,365);
        if (typeof _satellite != "undefined") {
      	    _satellite.track('adBlock'); 
    	}
        if (new_visit){
            console.log('new visit');
            trackETF(true,true);
            trackETF(true,false);
        } else {
            trackETF(true,false);
        }
    });
  	sniffAdBlock.onNotDetected(function() {
        console.log("Adblocker not detected");
        if (getCookie("AdCv") == "" && getCookie("AdHt")==1){
            window.optimizely = window.optimizely || [];
            window.optimizely.push(["trackEvent", "blockerConversion"]);
            setCookie("AdCv",1,365);
        }
	if (new_visit){
            trackETF(false,true);
            trackETF(false,false);
        } else {
            trackETF(false,false);
        }
    });
}
 
//  Optionally, invoke a manual check if the onDetected callback never fires
setTimeout(function() {
    sniffAdBlock.check();
}, 10);
  
  
  
  
  
  
  
})(window);
});
