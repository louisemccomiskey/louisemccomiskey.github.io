/**
 * BASEVIEW used by screens and some components.
 * 
 * Contains global methods that can be shared for e.g
 * animatePageIn() and animatePageOut(),
 * bindUIElements(), unbindUiElements() - borrowed from Marionette.
 * Super dispose() which calls backbones this.remove();
 *
 * @author Louise McComiskey
 */

'use strict';

// Loading dependencies.
import _ from 'underscore';
import Backbone from 'backbone';
import NativeView from 'backbone.nativeview';
import eventBus from 'eventBus';
import config from 'config';
import utils from 'utils';


/*
*  Base View of all Page views, each method can be accessed via the prototype chain or can be overridden.
*/
export default class BaseView extends Backbone.NativeView {

    constructor(o) {
        super(o);

        this.bodyElement = document.querySelector('body');
        this.SCROLL_TIME = config.SCROLL_TIME;
    }
    
    /*
        onClick of the back to top button bring user back to top of page.
    */
    goToSection(){
        event.preventDefault();
        
        var name = event.delegateTarget.hash.substr(1);
        utils.tweenTo(config.blockSectionData[name].position, this.SCROLL_TIME);
    }

    /**
     *  Takes an object of selector strings and names, converting them
     *  into actual DOM node references. Stores the original string map
     *  object for unbinding or if a view was to re-render.
     *
     *  Example usage within view object:
     *  ui: {
     *      playButton: '.js-play--btn'
     *  }
     */
    bindUIElements() {
      if (!this.ui) { return; }

      if (!this._uiBindings) {
        this._uiBindings = this.ui;
      }

      var bindings = _.result(this, '_uiBindings');

      this.ui = {};

      _.each(bindings, function(selector, key) {
        this.ui[key] = this.el.querySelector(selector);
      }, this);
    }

    /**
     *  Deletes any references to selectors from the `ui` object before
     *  restoring it back to the original string selectors.
     */
    unbindUIElements() {
      if (!this.ui || !this._uiBindings) { return; }

        // delete all of the existing ui bindings
        _.each(this.ui, function($el, name) {
          delete this.ui[name];
        }, this);

        // reset the ui element to the original bindings configuration
        this.ui = this._uiBindings;
        delete this._uiBindings;
    }

    /**
     *  Wrapper method that should be overriden in views requiring more
     *  specific teardown logic (such as having to unbind listeners,
     *  nullify objects or nullify cached selectors.
     */
    dispose() {
        this.unbindUIElements();
        this.remove();
    }
}
