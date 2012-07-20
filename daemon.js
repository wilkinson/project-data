//- JavaScript source code

//- daemon.js ~~
//                                                      ~~ (c) SRW, 15 May 2012
//                                                  ~~ last updated 20 Jul 2012

(function (global) {
    'use strict';

 // Pragmas

    /*jslint devel: true, indent: 4, maxlen: 80 */

 // Prerequisites

    if (Object.prototype.hasOwnProperty('Q') === false) {
        throw new Error('Method Q is missing.');
    }

    if (global.location.protocol === 'file:') {
        console.error('The `volunteer` function uses AJAX => HTTP required.');
        return;
    }

 // Declarations

    var Q, box, revive;

 // Definitions

    Q = Object.prototype.Q;

    box = global.location.search.slice(1);

    revive = function () {
     // This function needs documentation.
        Q.box = box;
        var x = Q.volunteer();
        x.onerror = function (message) {
         // This function needs documentation.
            if (message !== 'Nothing to do ...') {
                console.error(message);
            }
            global.setTimeout(revive, 1000);
            return;
        };
        x.onready = function (evt) {
         // This function needs documentation.
            global.setTimeout(revive, 1000);
            return evt.exit();
        };
        x = null;
        return;
    };

 // Invocations

    revive();

 // That's all, folks!

    return;

}(Function.prototype.call.call(function (that) {
    'use strict';
 // See the bottom of "quanah.js" for documentation.
    /*jslint indent: 4, maxlen: 80 */
    /*global global: true */
    if (this === null) {
        return (typeof global === 'object') ? global : that;
    }
    return (typeof this.global === 'object') ? this.global : this;
}, null, this)));

//- vim:set syntax=javascript:
