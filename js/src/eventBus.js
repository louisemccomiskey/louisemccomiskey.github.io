'use strict';

// Loading dependencies.
import Backbone from 'backbone';

const eventBus = Object.assign({}, {
    eventKeys: {

        WINDOW_RESIZE: 'app.windowResize',
        WINDOW_SCROLL: 'app.windowScroll',
        UPDATE_NAV_ACTIVE_STATE: 'app.updateNav'
    }
}, Backbone.Events);

export default eventBus;
