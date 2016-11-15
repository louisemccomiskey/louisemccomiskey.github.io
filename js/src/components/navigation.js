/**
 * Primary Navigation Component
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
        'click .js-nav--projects'   : 'goToSection',
        'click .js-nav--experience'   : 'goToSection'
    },

    ui: {
    }
})
export default class NavigationComponent extends BaseView{
    constructor(o) {
        super(o);
        
        this.activeClass =          'is--active';
        this.navPageTopPosClass =   'is--at-page-top';
        this.navBtnprefix =         '.js-nav--';        
        
        this.blockSectionElems  = this.bodyElement.querySelectorAll('.js-block-elem');
        this.headerTitle        = this.bodyElement.querySelector('.js-header-title');
         
        this.SCROLL_TIME = 1000;
        
        //Event Listeners.
        this.listenTo(eventBus, eventBus.eventKeys.UPDATE_NAV_ACTIVE_STATE, this.updateActiveState);
        this.listenTo(eventBus, eventBus.eventKeys.WINDOW_RESIZE, this.setBlockSectionPositions);
        this.listenTo(eventBus, eventBus.eventKeys.WINDOW_SCROLL, this.setBlockSectionPositions);
        
        this.render();
    }
    
    render() {
        this.bindUIElements();
        this.setBlockSectionPositions();
        return this;
    }

    setBlockSectionPositions() {
        var self = this;
        var bodyRect = this.bodyElement.getBoundingClientRect();
        
        for(var i = 0; i < this.blockSectionElems.length; i++) {
            
            var name = self.blockSectionElems[i].getAttribute('data-anchor'),
                rect = self.blockSectionElems[i].getBoundingClientRect(),
                navLink = self.blockSectionElems[i].getAttribute('data-anchor');
                
                config.blockSectionData[name] = {
                    'position': Math.floor(rect.top - bodyRect.top),
                    'rect':rect,
                    'navLink': navLink
                }
        }
        
        this.updateNavVisibility();
        // update on scroll & resize
    }

    /*
    * On scroll Update Active State of nav items.
    */
    updateActiveState(){
        var self = this;
        
        for (var key in config.blockSectionData) {
            var section = config.blockSectionData[key];
       
            if(key === 'projects' || key === 'experience'){     
                var activeL = self.el.querySelector(self.navBtnprefix+section.navLink);
            
                if(section.active) {
                    activeL.classList.add(self.activeClass);
                } else {
                   activeL.classList.remove(self.activeClass);
                }     
            }
        }
    }
    
    updateNavVisibility(){
        var bottomPos = this.headerTitle.getBoundingClientRect().bottom;
        
        if(config.scrollY < bottomPos) {
            this.el.classList.add(this.navPageTopPosClass);
        } else {
            this.el.classList.remove(this.navPageTopPosClass);
        }
    }

    updateNav(){
        this.updateActiveState();
        this.updateNavVisibility();
    }

    dispose() {
        super.dispose();
    }
}