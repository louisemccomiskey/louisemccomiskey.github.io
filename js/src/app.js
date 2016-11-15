/**
 * App Start
 *
 * @author Louise McComiskey
 */
'use strict';


// --------------------------
// Loading dependencies
// --------------------------

import _ from 'underscore';
import Backbone from 'backbone';
import FastDOM from 'fastdom';

import eventBus from 'eventBus';
import utils from 'utils';
import config from 'config';

import NavigationComponent from './components/navigation.js';
import FooterComponent from './components/footer.js';
import HomePageView from './HomePageView.js';


export default class App {
    constructor() {
        
        config.documentWidth = document.documentElement.clientWidth;
        config.documentHeight = document.documentElement.clientHeight;

        this.setUpGlobalEventListeners();

        /*
        * Create Components
        */
        let globalNavigation = new NavigationComponent({
            el: document.querySelector('.js-gbl-nav')
        });
        
        let homePageView = new HomePageView({
            el: document.querySelector('.js-pg-home')
        });
        
        let globalFooter = new FooterComponent({
            el: document.querySelector('.js-pg-footer')
        });
    }
    
    setUpGlobalEventListeners() {
        
        function updateMeasurements() {
            config.documentWidth = document.documentElement.clientWidth;
            config.documentHeight = document.documentElement.clientHeight;
        }
        
        /*
        * Global onScroll event Handler, triggers the eventBus.eventKeys.WINDOW_SCROLL so all views can use.
        */ 
        window.addEventListener('scroll', utils.throttle(function() {
            
            updateMeasurements();
            config.scrollY = window.scrollY;
            
            eventBus.trigger(eventBus.eventKeys.WINDOW_SCROLL);
            
        }, 1000 / 10, { trailing: true }));
        
        /*
        * Global onScroll event Handler, triggers the eventBus.eventKeys.WINDOW_SCROLL so all views can use.
        */ 
        window.addEventListener('resize', utils.throttle(function() {
            
            updateMeasurements();
            eventBus.trigger(eventBus.eventKeys.WINDOW_RESIZE);
            
        }, 1000 / 10, { trailing: true }));
    }
}