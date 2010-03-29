    /**
    * @property Y
    * A single global instance of YUI
    */
    Y = YUI();
    /**
    * @property _cbs
    * @private
    * @type Array
    * A simple array of callbacks passed to Y.ready
    */
    Y._cbs = [];
    /**
    * @property _ready
    * @private
    * @type Boolean
    * Flag to determine if the callback from use has fired.
    */
    Y._ready = false;
    /**
    * @method _fireReady
    * @private
    * Fire all the stored callbacks from the .use callback.
    */

    Y._fireReady = function() {
        if (Y._cbs.length) {
            Y.each(Y._cbs, function(v, k) {
                if (v) {
                    v.call(Y, Y);
                    Y._cbs[k] = null;
                }
            });
            Y._cbs = [];
        }
    };

    /**
    * @method ready
    * Default listener for the .use callback.
    * @param {Function} fn The function to execute when the .use callback is fired
    */
    Y.ready = function(fn) {
        if (Y._ready) {
            fn.call(Y, Y);
        } else {
            Y._cbs.push(fn);
        }
    };

    /*
    * Here we use everything on the page and fire the .ready callbacks
    */
    Y.use('*', function(Y) {
        Y._ready = true;
        Y._fireReady();
    });
