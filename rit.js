//- JavaScript source code

//- rit.js ~~
//                                                      ~~ (c) SRW, 15 May 2012

(function () {
    'use strict';

 // Pragmas

    /*jslint browser: true, devel: true, indent: 4, maxlen: 80 */

 // Prerequisites

    if (Object.prototype.hasOwnProperty('Q') === false) {
        throw new Error('Method Q is missing.');
    }

 // Declarations

    var Q, avar, rit;

 // Definitions

    Q = Object.prototype.Q;

    avar = Q.avar;

    rit = function rit() {
     // This function slows down the polling mechanism by blocking execution. I
     // will tweak Q Machine soon that it doesn't require external hacks, but
     // it's Friday, so this will have to work for right now. This entire
     // "ritardando" function is only a temporary measure, though -- it will be
     // removed as soon as possible.
        var tic, x;
        tic = Date.now();
        x = avar();
        x.onerror = function (message) {
         // This function needs documentation.
            console.log('Error:', message);
            setTimeout(rit, 0);
            return;
        };
        x.onready = function (evt) {
         // This function needs documentation.
            var delta = 0;
            while (delta < 1000) {
                delta = Date.now() - tic;
            }
            setTimeout(rit, 0);
            return evt.exit();
        };
        return;
    };

 // Demonstrations

    //rit();

 // That's all, folks!

    return;

}());

//- vim:set syntax=javascript:
