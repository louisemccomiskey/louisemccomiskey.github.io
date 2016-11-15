/**
 * Home Page View
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
import Flickity from 'flickity';
import Gsap from 'gsap';


@props({  
    events:     {
        'click .js-btn-scrolldown' : 'goToSection'
    }
})
export default class HomePageView extends BaseView{
    constructor(o) {
        super(o);

        this.page_scroll_activation_offset = 0.5;
        
        this.activation_point = config.documentHeight * this.page_scroll_activation_offset;
        
        this.carouselComponents = [];
        
        this.pageNavSections = document.querySelectorAll('.js-nav-section');
        this.clientsSection = this.bodyElement.querySelector('.js-clients');
        this.carouselElements = this.bodyElement.querySelectorAll('.js-project_slider');

        //Event Listeners.
        this.listenTo(eventBus, eventBus.eventKeys.WINDOW_SCROLL, this.scrollingDetected);

        this.render();
    }

    render() {
        this.bindUIElements();
        this.initCarousels();
        this.calculateElementInView();

        return this;
    }
    
    initCarousels() {
        var self = this,
            i,
            j;
        
        for (i = 0; i < this.carouselElements.length; i++) {
    
            var carouselComponent = new Flickity( this.carouselElements[i], {
                cellAlign: 'left',
                contain: true,
                wrapAround: true,
                pageDots: true,
                pauseAutoPlayOnHover: true
            });
            
            self.carouselComponents.push(carouselComponent);  
        }
        
        setTimeout(() => { 
            var carouselButtons = self.el.querySelectorAll('.flickity-prev-next-button');

            for (j = 0; j < carouselButtons.length; j++) {
                carouselButtons[j].querySelector('svg').remove();
                carouselButtons[j].classList.add('icon-arrow');

                if(carouselButtons[j].classList.contains('next')){
                    carouselButtons[j].classList.add('icon-right');
                    carouselButtons[j].innerHTML =  '<svg viewBox="0 0 27 26">'+
                                                        '<rect class="button-bg" transform="translate(13.000000, 13.000000) rotate(45.000000) translate(-13.000000, -13.000000) " x="4" y="4" width="18" height="18"></rect>'+
                                                        '<polygon class="button-arrow" transform="translate(14.705000, 13.000000) rotate(-90.000000) translate(-14.705000, -13.000000) " points="10.115 9.295 14.705 13.875 19.295 9.295 20.705 10.705 14.705 16.705 8.705 10.705"></polygon>'+
                                                    '</svg>';
                }

                if(carouselButtons[j].classList.contains('previous')){
                    carouselButtons[j].classList.add('icon-left');
                    carouselButtons[j].innerHTML =  '<svg viewBox="0 0 26 26">'+
                                                        '<rect class="button-bg" transform="translate(13.000000, 12.727922) rotate(45.000000) translate(-13.000000, -12.727922) " x="4" y="3.72792206" width="18" height="18"></rect>'+
                                                        '<polygon class="button-arrow" transform="translate(10.977078, 13.000000) rotate(90.000000) translate(-10.977078, -13.000000) " points="6.38707794 9.295 10.9770779 13.875 15.5670779 9.295 16.9770779 10.705 10.9770779 16.705 4.97707794 10.705"></polygon>'+
                                                    '</svg>';
                }
                
                carouselButtons[j].classList.add('is--visible');
            }
        },0);
    }
    
    /*
        When scrolling is detected update the page navigatable sections top and bottom offsets.
        Determine which section is in current view and update the active state of the navigation
        to reflext this.
    */
    scrollingDetected() {
        this.calculateElementInView();
    }

    calculateElementInView() {
        var self = this;
        
        for (var key in config.blockSectionData) {
            var section = config.blockSectionData[key];

            var element_in_view = section.rect.top < self.activation_point && section.rect.bottom > self.activation_point;

            if(element_in_view ){
                
                section.active = true;
//                console.log(key, '++++++', section.active);
        
            } else {
                section.active = false;
//                console.info(key, '-------', section.active);  
            }
        }
        
        eventBus.trigger(eventBus.eventKeys.UPDATE_NAV_ACTIVE_STATE);
    }
    
    scrollDownClicked(){
      utils.smoothScroll(this.clientsSection);
    }

    dispose() {
        super.dispose();
    }
}
