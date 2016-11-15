/**
 * Application Start.
 *
 * @author Louise McComiskey
 */
'use strict';

// --------------------------
// Loading dependencies
// --------------------------

import "babel-polyfill";
import _ from 'underscore';
import Backbone from 'backbone';
import NativeAjax from 'backbone.nativeajax';
import utils from 'utils';
import config from 'config';


Backbone.ajax = NativeAjax;

import App from './app';

/**
 *  Kicks off the App as soon as onDOMContentLoaded is ready.
 */

function onDOMContentLoaded() {
	console.log('The DOM has now loaded');
    new App();
}


/*
*   Only start application logic once the DOM is ready.
*   using async on the main.min.js script element therefore the DOMContentLoaded could have already loaded before we start listening for it.
*   If this is the case listen for document.readyState and if it is finished fire onDOMContentLoaded().
*/
if(document.readyState === 'complete' || document.readyState === 'interactive' || document.readyState === 'loaded' ) {
    onDOMContentLoaded();
} else {
    document.addEventListener('DOMContentLoaded', onDOMContentLoaded);
}