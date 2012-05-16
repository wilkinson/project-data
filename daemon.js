//- JavaScript source code

//- daemon.js ~~
//                                                      ~~ (c) SRW, 15 May 2012

(function (global) {
    'use strict';

 // Pragmas

    /*jslint devel: true, indent: 4, maxlen: 80 */

 // Prerequisites

    if (Object.prototype.hasOwnProperty('Q') === false) {
        throw new Error('Method Q is missing.');
    }

    if (typeof global.setTimeout !== 'function') {
        return;
    }

 // Declarations

    var Q, revive;

 // Definitions

    Q = Object.prototype.Q;

    revive = function () {
     // This function needs documentation.
        Q.box = 'fasta-demo';
        var x = Q.volunteer();
        x.onerror = function (message) {
         // This function needs documentation.
            console.error(message);
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
