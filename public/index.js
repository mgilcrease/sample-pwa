import "./assets/styles/reset.css";
import "./assets/styles/app.css";
import "./assets/images/favicon.ico";
import $ from "./assets/lib/jquery.min.js";

// Yeah, yeah. I know. It's jquery. Still a damn useful library for some things. Get over it whippersnappers!
// Register service worker for caching/updating ui assets
$(document).ready( () => {

	// Load service worker for caching/loading of assets
	if ('serviceWorker' in navigator)
		navigator.serviceWorker.register('/service-worker.js');

	// Yes, yes, I know all about querySelector. This is still
	// nicer, imho
	$("#ajax-loader").hide();
	$("#app-container").attr("style", "visibility: visible;");

});
