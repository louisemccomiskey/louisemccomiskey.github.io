/**
 * Primary Footer Component
 *
 * @author Louise McComiskey
 */

'use strict';
// --------------------------
// Loading dependencies
// --------------------------

import _ from 'underscore';
import BaseView from 'baseView';
import eventBus from 'eventBus';
import config from 'config';
import utils from 'utils';
import {props} from 'decorators';

@props({
    events:     {
        'click .js-btn-backtotop'   : 'goToSection'
    }
})
export default class FooterComponent extends BaseView{
    constructor(o) {
        super(o);
    
        this.SCROLL_TIME = 1000;
        this.render();
    }
    
    render() {
        return this;
    }

    dispose() {
        super.dispose();
    }
}
