(function() {
  var config = {
    scriptPath: '/embedjs/5660d89aff2afb7c1e00003f/557b2f1a61646d7f71010000.js',
    playerBaseUrl: '//player.cnevids.com',
    embedPath: '/embed/5660d89aff2afb7c1e00003f/557b2f1a61646d7f71010000'
  };

  var embedLoader = {

    // Check for Head Parent
    //
    // Performs a check to ensure the script tag is located within
    // the source page's document body and not within its head.

    checkForHeadParent: function(element) {
      var elementParent, headFound;

      headFound = false;
      elementParent = element.parentNode;

      while (elementParent.tagName.toUpperCase() !== 'HTML') {
        headFound = elementParent.tagName.toUpperCase() === 'HEAD';
        if (headFound) { break; }
        elementParent = elementParent.parentNode;
      }

      if (headFound) {
        throw 'EmbedLoaderError: Script tag found in head. Tag must be in doucment body.';
      }
      return headFound;
    },

    // Find and Insert

    findAndInsert: function(embedCode, iframePayload) {
      var iframe, queries, scriptTag;

      scriptTag = this.findMyself();
      this.checkForHeadParent(scriptTag);
      scriptTag.parentNode.insertBefore(embedCode, scriptTag.nextSibling);

      embedCode.className += ' cne-player-container'
      embedCode.className = embedCode.className.trim();

      queries = config.scriptPath.split('?')[1];

      if ( typeof queries !== 'undefined' ) {
        queriesArray = queries.split('&');

        for (var i = 0, len = queriesArray.length; i < len; i++) {
          splitQuery = queriesArray[i].split('=');
          splitQuery[0] = splitQuery[0].replace(/-([\da-z])/gi, function(match, letter) {
            return (letter).toUpperCase();
          });
          embedCode.dataset[splitQuery[0]] = splitQuery[1];
        }
      }

      iframe = embedCode.getElementsByTagName('iframe')[0];

      try {
        // Try writing the iframe payload directly from the string...
        var doc = iframe.contentDocument;
        doc.open();
        doc.write(iframePayload);
        doc.close();
      } catch(e) {
        // ... otherwise, we have no choice but to hit the server again.
        // This method is used in IE9/10.
        iframe.src = config.playerBaseUrl + config.embedPath
      }
    },

    // Find Myself
    //
    // Locates <script> tag in embed source document.

    findMyself: function() {
      var me = null;
      var scripts = document.getElementsByTagName('script');

      for (var i = 0, len = scripts.length; i < len; ++i) {
        var currentScript, currentScriptClasses, src;

        currentScript = scripts[i];
        currentScriptClasses = ' ' + currentScript.className + ' ';
        src = currentScript.getAttribute('src');

        if (src !== null && src.indexOf(config.scriptPath) !== -1 &&
            currentScriptClasses.indexOf(' cne-dirty ') === -1) {

          currentScript.className += ' cne-dirty';
          me = currentScript;
          break;
        }
      }
      if (!me) { throw 'EmbedLoaderError: Script tag not found.'; }

      return me;
    },

    // Get Guid
    //
    // Although will eventually be loaded onto the page
    // in _cne.util, we do not have access to it here.
    // http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript

    getGuid: function() {
      var guidValue;

      function s4() {
        var guidSection = Math.floor((1 + Math.random()) * 0x10000);
        return guidSection.toString(16).substring(1);
      }

      guidValue = s4() + s4() + '-' + s4() + '-' + s4();
      guidValue += '-' + s4() + '-' + s4() + s4() + s4();

      return guidValue;
    },

    // Insert Embed

    insertEmbed: function() {
      var embedCode, embedCodeHolder, guid,
          iframePayload, srcReferrer, srcReferrerGuid;

      guid = this.getGuid();
      embedCode = "<div style=\"position:relative;padding-bottom:56.25%;height:0;box-sizing:content-box;\">\n  <iframe style=\"position:absolute;top:0;left:0;width:1px !important;height:1px !important;min-width:100%;min-height:100%;\" frameBorder=\"0\" allowfullscreen webkitallowfullscreen mozallowfullscreen msallowfullscreen allowtransparency=\"true\" scrolling=\"no\"><\/iframe>\n<\/div>\n";
      iframePayload = "<!DOCTYPE html>\n<html>\n<head>\n  <script>\n//<![CDATA[\n\n    var cneEmbedSettings= {\n      useRefererForHost: \'false\',\n      useSourceReferrer: \'true\'\n    };\n\n    // Embed Loader uses the following line to string\n    // replace source referrer and also replace the guid.\n\n    cneEmbedSettings.sourceReferrer = cneEmbedSettings.guid = \'\';\n\n    // If the guid was not replaced, want to see if the\n    // partial was passed in the iframe container id.\n\n    if (cneEmbedSettings.guid === \'\') {\n      cneEmbedSettings.guid = \'\';\n    }\n\n//]]>\n<\/script>\n  <script src=\"//dnkzzz1hlto79.cloudfront.net/assets/embed-7b7e0321c435b31a948f243add8947fd.js\"><\/script>\n  <link rel=\"stylesheet\" media=\"screen\" href=\"//dnkzzz1hlto79.cloudfront.net/assets/embed-4482ce4b7bb5b38f569185e4d02c7187.css\" />\n\n\n\n  <link rel=\"alternate\"\n        type=\"application/json+oembed\"\n        href=\"http://player.cnevids.com/services/oembed?url=%2F%2Fplayer.cnevids.com%2Fembed%2F557b2f1a61646d7f71010000%2Fvideo%2F5660d89aff2afb7c1e00003f.js\"\n        title=\"CNE oEmbed Profile\" />\n<\/head>\n<body>\n  <script type=\"text/javascript\">\n    function onPlayerReady(player) {\n\n      player.on(\'cne:companion_rendered\', function() {\n        $(window).trigger(\'companion_rendered\')\n      })\n\n      // Set variables for playlist bar\n      _cne.has_rail = \'\';\n\n      var omnitureLoadTries = 0;\n      omniturePageBottom = setInterval(function() {\n        if (omnitureLoadTries > 20) return;\n        if (typeof _satellite !== \'undefined\') {\n          _satellite.pageBottom();\n          clearInterval(omniturePageBottom);\n        } else {\n          omnitureLoadTries++;\n        }\n      }, 100);\n    }\n\n    (function() {\n      var params = {\n        videoId: \'5660d89aff2afb7c1e00003f\',\n        \n        \n        \n        playerId: \'557b2f1a61646d7f71010000\',\n        target: \'myplayer\',\n        companion: \'mycompanion\',\n        rail: \'myrail\',\n        autoplay: false,\n        muted: 0,\n        isScriptEmbed: true,\n        onReady: \'onPlayerReady\',\n        host: cneEmbedSettings.host,\n        sourceUrl: cneEmbedSettings.useRefererForHost === \'true\' ? document.referrer : window.location.href,\n        sourceReferrer: cneEmbedSettings.sourceReferrer,\n        useSourceReferrer: cneEmbedSettings.useSourceReferrer\n      };\n\n      var url = \'http://player.cnevids.com/player/loader.js?\';\n      for (var key in params) { url += key + \'=\' + escape(params[key]) + \'&\'; }\n\n      var s = document.createElement(\'script\');\n      s.type = \'text/javascript\';\n      s.src = url.slice(0, -1);\n\n      var x = document.getElementsByTagName(\"script\")[0];\n      x.parentNode.insertBefore(s, x);\n    })();\n  <\/script>\n  <div class=\"embed-container\">\n    <div id=\"myplayer\"><\/div>\n    <div id=\"myrail\" ><\/div>\n    <div id=\"mycompanion\" style=\"width: 100%; text-align: center; display: none; margin-top: 10px;\"><\/div>\n  <\/div>\n<\/body>\n<\/html>\n";

      // This is not the best way of passing vars into the
      // iframe payload but since we cannot manipulate the iframe
      // contentWindow in ie9 and 10. we use this hack for now.

      srcReferrer = "cneEmbedSettings.sourceReferrer = cneEmbedSettings.guid = '';";
      srcReferrerGuid = "cneEmbedSettings.sourceReferrer = '" + document.referrer;
      srcReferrerGuid += "';cneEmbedSettings.guid ='" + guid + "';";

      iframePayload = iframePayload.replace(srcReferrer, srcReferrerGuid);

      embedCodeHolder = document.createElement('div');
      embedCodeHolder.innerHTML = embedCode;
      embedCode = embedCodeHolder.firstChild;
      embedCode.id = guid;

      // Script tags being inserted by jQuery.html() or .append()
      // will be evaluated before being inserted into the DOM. If
      // we don't find the script tag in the body, delay execution
      // of findMyself until jQuery has re-inserted the script tag.

      try {
        this.findAndInsert(embedCode, iframePayload);
      } catch(e) {
        setTimeout(function() {
          this.findAndInsert(embedCode, iframePayload);
        }.bind(this), 0);
      }
    },
  };

  if (document.addEventListener) {

    // 'interactive' is necessary if a page is still loading all
    // resources (ads will definitely factor into this)
    var validStates = ['complete', 'loaded', 'interactive'];
    var isReady = document.body && validStates.indexOf(document.readyState) > -1;

    if (isReady) {
      embedLoader.insertEmbed();
    } else {
      document.addEventListener('DOMContentLoaded', function() {
        embedLoader.insertEmbed();
      });
    }
  } else {

    // allow embed scripts to work for IE8
    document.attachEvent('onreadystatechange', function() {
      embedLoader.insertEmbed();
    });
  }
})();
