_satellite.pushAsyncScript(function(event, target, $variables){
  (function(){

  'use strict';

  var sites = { // all sites and site placement details
      'www.allure.com'   : {
        slot        : '.entry-content #entry-more > p',
      },
      'arstechnica.com'        : {
        slot        : '#teads-container',
        obSlot : '.ob-img-wrap'
      },
      'www.bonappetit.com'   : {
        slot        : '.body-container .body > p, .prep-steps-container .keywords > p',
        obSlot : '.ob-dynamic-rec-link'
      },
      'www.brides.com'       : {
        slot        : '.entry-content > p',
      },
      'www.details.com'      : {
        slot        : 'entry-content #entry-more > p, .content-container .article-text > p, .hentry .entry-content > p, .caption .caption-text > p, .col .body-text .article-paragraph',
      },
      'www.epicurious.com'    : {
        slot        : '.article-container .article-body > p',
        obSlot : '.ob-dynamic-rec-link'
      },
      'www.glamour.com'       : {
        slot        : '.article .article-text > p, .g-article-container .g-article-body > p',
        obSlot : '.ob-dynamic-rec-link'
      },
      'www.golfdigest.com'    :{
        slot        : '.article-text p, .body .text > p, .entry-content > p, .body-text > p',
        obSlot : '.ob-dynamic-rec-link'
      },
      'www.gq.com'            : {
        slot        : '.article-column .body-text > p',
        obSlot : '.ob-dynamic-rec-link'
      },
      'ap-stag-v2.gq.com'            : {
        slot        : '.article-column .body-text > p',
      },
      'www.newyorker.com'     : {
        slot        : '[itemprop="articleBody"] > p',
      },
      'www.self.com'          : {
        slot        : '[itemprop="articleBody"] > p',
        obSlot : '.ob-dynamic-rec-link'
      },
      'www.teenvogue.com'     : {
        slot        : '.content .content > p',
        obSlot : '.ob-dynamic-rec-link'
      },
      'www.vanityfair.com'    : {
        slot        : '.article-main .content > p',
        obSlot : '.ob-dynamic-rec-link'
      },
      'qa.vogue.com'    : {
        slot        : '.ad--wrapper',
      },
      'www.architecturaldigest.com'    : {
        slot        : '.cn_blogpost .body > p, .body.dc > p, .cn_text .body > p, .text .content > p',
        obSlot : '.ob-dynamic-rec-link'
      },
      'www.wired.com'    : {
        slot        : '.content > p',
        obSlot : '[data-js="around-the-web"] > li > a'
      },
      'www.wmagazine.com'    : {
        slot        : '[itemprop="articleBody"] p',
        obSlot : '.ob-dynamic-rec-link'
      },
      'www.cntraveler.com'    : {
        slot        : '.main-content .article-body > p',
        obSlot : '.ob-dynamic-rec-link'
      }
}

var this_site = window.top.location.hostname;
var this_slot = sites[this_site].slot;
var numSlots = window.top.document.querySelectorAll(this_slot).length;
var this_obSlot = sites[this_site].obSlot;


  

  function getSiteCode() {
    var arr = [
      ['allure.com', 'allure'],
      ['architecturaldigest.com', 'architectural-digest'],
      ['arstechnica.com', 'ars-technica'],
      ['bonappetit.com', 'bon-appetit'],
      ['brides.com', 'brides'],
      ['cntraveler.com', 'conde-nast-traveler'],
      ['details.com', 'details'],
      ['epicurious.com', 'epicurious'],
      ['glamour.com', 'glamour'],
      ['golfdigest.com', 'golf-digest'],
      ['gq.com', 'gq'],
      ['newyorker.com', 'the-new-yorker'],
      ['self.com', 'self'],
      ['style.com', 'style'],
      ['teenvogue.com', 'teen-vogue'],
      ['thescene.com', 'the-scene'],
      ['vanityfair.com', 'vanity-fair'],
      ['vogue.com', 'vogue'],
      ['wired.com', 'wired'],
      ['wmagazine.com', 'w-magazine'],
      ['localhost', 'LOC'],
      ['.', 'FIX'],
      ['', 'FILE']
    ].filter(siteFind);
    return arr[0][1];
  }

  /**
   * ## filterSite
   * Used to filter the site array to a single matching site.
   *
   *@returns {Boolean} Do we have a match?
  */
  function siteFind(i) {
    var str = i[0];
    return document.location.hostname.indexOf(str) !== -1;
  }

  function loadScript(url, callback)
  {
      // Adding the script tag to the head as suggested before
      var head = document.getElementsByTagName('head')[0];
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = url;

      // Then bind the event to the callback function.
      // There are several events for cross browser compatibility.
      script.onreadystatechange = callback;
      script.onload = callback;

      // Fire the loading
      head.appendChild(script);
  }

  var SparrowLoader=function(t,e){function n(t,e){var n,a,o;a=!1,n=document.createElement("script"),n.type="text/javascript",n.src=t,n.onload=n.onreadystatechange=function(){a||this.readyState&&"complete"!=this.readyState||(a=!0,e?e():!0)},o=document.getElementsByTagName("script")[0],o.parentNode.insertBefore(n,o)}return n("//pixel.condenastdigital.com/config/"+t+".config.js",function(){n("//pixel.condenastdigital.com/sparrow.min.js",function(){e&&e()})}),!0};

  var eventCode = function() {

  
    var sparrowTag = document.createElement("script");
    sparrowTag.async = true;
    sparrowTag.type = "text/javascript";
    sparrowTag.src = "http://pixel.condenastdigital.com/sparrow.min.js";

    //document.body.appendChild(sparrowTag);

    var CustomSparrow = new Sparrow({
      "develop": true,
      "title": getSiteCode(),
      "origin": getSiteCode(),
      "events": []
    });

    
    
    
    // recursively digs into an object path to validate it's
    // defined state and type over time
    function whenPathReady(opts){
      var errMsg;
      var path = opts.path;
      var parts = opts.path.split('.');
      // to keep track of when to stop
      var pollTryCount = 1;
      var pollTimeCount = 0;
      // there must be a base object
      var base = (opts.obj) ? opts.obj : window;

      // required options check
      if (!opts.poll) {
        throw new Error('[ checkIfReady ] the \'poll\' is required but not defined');
      }
      if (!opts.poll.every) {
        throw new Error('[ checkIfReady ] the \'poll.every\' is required but not defined');
      }
      if (!opts.onPathReady || typeof opts.onPathReady !== 'function') {
        throw new Error('[ checkIfReady ] the \'onPathReady\' option is required but not defined or not a function');
      }
      if (!opts.onPathDeserted || typeof opts.onPathDeserted !== 'function') {
        throw new Error('[ checkIfReady ] the \'onPathDeserted\' option is required but not defined or not a function');
      }
      if (!opts.onFailure || typeof opts.onFailure !== 'function') {
        throw new Error('[ checkIfReady ] the \'onFailure\' option is required but not defined or not a function');
      }

      // checkIfReady
      // validates a paths defined state and type
      function checkIfReady(){
        var cursor = base;
        var depth = 0;
        var maxDepth = parts.length-1;

        // dig
        // recursively checks an object path
        // untill it fails or verifies entire path
        function dig(){
          // get cursor into the right depth
          cursor = cursor[parts[depth]];
          
          // bad, cursor is not defined at this depth
          if (typeof cursor === 'undefined') {
            // give up?
            
            // by time
            if (opts.poll.untill && pollTimeCount >= opts.poll.untill) {
              opts.onPathDeserted('polling time limit has been reached');
              return;
            }

            // by tries
            if (opts.poll.limit && pollTryCount >= opts.poll.limit) {
              opts.onPathDeserted('polling try limit has been reached');
              return;
            }

            // update polling state
            pollTryCount++;
            pollTimeCount += opts.poll.every;

            // try again later
            setTimeout(function(){
              checkIfReady(path);
            }, opts.poll.every);
            return;
          }

          // good, cursor its valid upto this depth

          // are we done?
          if (depth >= maxDepth) {
            // maybe...

            // do we need type check?
            if (opts.type && typeof cursor !== opts.type) {
              // we have a problem
              errMsg = '[ checkIfReady ] path is not type \'' + opts.type + '\'';
              opts.onFailure(errMsg);
              return;
            }

            // ok, its all good, let them know!
            opts.onPathReady(cursor);
            return;
          }

          // not done, onward!
          // go deeper
          depth++;
          dig();
        }

        // start digging
        dig();
      }

      // start ready check
      checkIfReady();
    }

    var traffic_source_name,section_name,page_url;
    


    // testing
    whenPathReady({
      poll: {
        every: 100, // how often?
        //limit: 1, // limit by poll count
        untill: 5000 // limit by time, or...
      },
      path: 'window.CN.dart.getAdLog', // full path into object
      type: 'function', // optional, type check for end of path
      onPathReady: function(value){
        // do your thing
        //_satellite.track('adLibLoaded');
        //console.log('ad lib has loaded');
        var template = CN.dart.getAdLog().dfpParams.cttp;
        CustomSparrow.track('adStats','adLibLoaded', {"template": template,"numSlots": numSlots});
        
        

        function getAds(){
          var template = CN.dart.getAdLog().dfpParams.cttp
          var pageAdCalls = CN.dart.getAdLog().pageAdCalls;
          for (var x in pageAdCalls){
            if (pageAdCalls[x] == "Ad not called for this placement") {
              continue;
            }
            if ((pageAdCalls[x].adEmpty == true) || (pageAdCalls[x].adSize[0] == 1)) {
              CustomSparrow.track('adStats','adImpressionUnfilled',{
                "adSlot": x,
                "template": template
              });
            } else if ((pageAdCalls[x].adEmpty == false) && (pageAdCalls[x].adSize[0] != 1)) {
              CustomSparrow.track('adStats','adImpressionFilled',{
                "adSlot": x,
                "template": template
              });
            }
          }

          var teadsContainer = window.top.document.getElementsByClassName("tt-wrapper inread").length;

          var classname = window.top.document.querySelectorAll(this_obSlot);
          var inLine = false;
          var obClick = function() {
              if (teadsContainer>0){
                inLine = true;
              }
              CustomSparrow.track('adStats','obClick', {"template": template,"inLine": inLine});
          }

          for(var i=0;i<classname.length;i++){
              classname[i].addEventListener('click', obClick, false);
              //console.log('added');
          }
          /*
          if (CN.dart.getAdLog().pageAdCalls.adSponsorContent300x30_frame || CN.dart.getAdLog().pageAdCalls.adSponsorContent300x60_frame) {
            CustomSparrow.track('adStats','sponsor300x60',{});
          }
          */
        }
        setTimeout(function(){getAds()},5000);
        
        
      },
      onPathDeserted: function(reason){
        //console.log('deserted');
        // we tried...
        //console.log('Its all over!', reason);
      },
      onFailure: function(reason){
        // something is not right
        //console.log('NooOoOOoo! we have failed!', reason);
      }
    });
  
  }
  /*
  var configUrl = "http://pixel.condenastdigital.com/config/"+getSiteCode()+".config.js";
  loadScript(configUrl,
    loadScript("http://pixel.condenastdigital.com/sparrow.min.js",eventCode)
    );
  */
  SparrowLoader(getSiteCode(),eventCode);


})()

});
