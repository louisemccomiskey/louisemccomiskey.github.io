'use strict';

// Loading dependencies.
import Backbone from 'backbone';
import config from 'config';
import Tweenable from 'shifty';

/**
 *  Constructor for the Utility class.
 */
function Utils() {
}

/**
 *  Returns a function, that, when invoked, will only be triggered at most once
 *  during a given window of time. Normally, the throttled function will run as
 *  much as it can, without ever going more than once per wait duration; but if
 *  you’d like to disable the execution on the leading edge, pass
 *  { leading: false }. To disable execution on the trailing edge, ditto.
 *
 *  @param object func - Method to execute.
 *  @param number wait - Desired wait time in millseconds.
 *  @return function
 */
Utils.prototype.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;

    if (!options) options = {};

    var later = function() {
        previous = options.leading === false ? 0 : new Date().getTime();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
    };

    return function() {
        var now = new Date().getTime();
        if (!previous && options.leading === false) previous = now;
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;

        if (remaining <= 0 || remaining > wait) {
            clearTimeout(timeout);
            timeout = null;
            previous = now;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }

        return result;
    };
};

Utils.prototype.tweenTo = function(position, SCROLL_TIME){
    var position = position - config.NAV_HEIGHT;
      
    var t = new Tweenable();
    t.tween({ 
      from: { 
        y: window.scrollY || ((window.pageYOffset || document.body.scrollTop) - (document.body.clientTop || 0)) 
      },
      to: { y: position },
      duration: SCROLL_TIME,
      easing: 'easeInOutQuart',
      step: function(p) {
        window.scrollTo(0, p.y);
      }
    });
}


module.exports = new Utils();
