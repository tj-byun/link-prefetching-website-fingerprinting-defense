_satellite.pushAsyncScript(function(event, target, $variables){
  	<!-- Lightning Bolt Begins -->
	    var lb_rn = new String(Math.random()); var lb_rns = lb_rn.substring(2, 12);
	    var boltProtocol = ('https:' == document.location.protocol) ? 'https://' : 'http://';
	    try {
	        var newScript = document.createElement('script');
	        var scriptElement = document.getElementsByTagName('script')[0];
	        newScript.type = 'text/javascript';
	        newScript.id = 'lightning_bolt_' + lb_rns;
	        newScript.src = boltProtocol + 'b3.mookie1.com/2/LB/' + lb_rns + '@x96?';
	        scriptElement.parentNode.insertBefore(newScript, scriptElement);
	        scriptElement = null; newScript = null;
	    } catch (e) { }
	<!-- Lightning Bolt Ends -->					   
				
});
