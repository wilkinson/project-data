//- JavaScript source code

//- fasta-demo.js ~~
//                                                      ~~ (c) SRW, 10 May 2012

(function () {
    'use strict';

 // Pragmas

    /*jslint indent: 4, maxlen: 80 */

 // Prerequisites

    if (Object.prototype.hasOwnProperty('Q') === false) {
        throw new Error('Method Q is missing.');
    }

 // Declarations

    var Q, avar, data, transform;

 // Definitions

    Q = Object.prototype.Q;

    avar = Q.avar;

    data = [
     /*
        'http://q.cgr.googlecode.com/hg/Pneumo/NC_003028.fna.js',
        'http://q.cgr.googlecode.com/hg/Pneumo/NC_003098.fna.js',
        'http://q.cgr.googlecode.com/hg/Pneumo/NC_008533.fna.js',
        'http://q.cgr.googlecode.com/hg/Pneumo/NC_010380.fna.js',
        'http://q.cgr.googlecode.com/hg/Pneumo/NC_010582.fna.js',
        'http://q.cgr.googlecode.com/hg/Pneumo/NC_011072.fna.js',
        'http://q.cgr.googlecode.com/hg/Pneumo/NC_011900.fna.js',
        'http://q.cgr.googlecode.com/hg/Pneumo/NC_012466.fna.js',
        'http://q.cgr.googlecode.com/hg/Pneumo/NC_012467.fna.js',
        'http://q.cgr.googlecode.com/hg/Pneumo/NC_012468.fna.js',
        'http://q.cgr.googlecode.com/hg/Pneumo/NC_012469.fna.js',
     */
        'http://q.cgr.googlecode.com/hg/Pneumo/NC_014251.fna.js',
     /*
        'http://q.cgr.googlecode.com/hg/Pneumo/NC_014494.fna.js',
     */
        'http://q.cgr.googlecode.com/hg/Pneumo/NC_014498.fna.js'
    ];

    transform = function (url) {
     // This function needs documentation.
        console.log('Launching ' + url + ' ...');
        var y = avar({val: url});
        y.onerror = function (message) {
         // This function needs documentation.
            console.error('Error:', message);
            return;
        };
        y.onready = function (evt) {
         // This function loads `fasta` from Google Code. The subtle part
         // here is that we don't want to load `fasta` on our machine --
         // we want to load it on a volunteer machine! Thus, we need to
         // write things carefully so that it can still be serialized, which
         // is why we even define `y` explicitly.
            /*jslint browser: true */
            /*global fasta: false */
            var s, y;
            y = this;
            if (typeof fasta === 'undefined') {
                s = document.createElement('script');
                s.onload = function () {
                 // This function "revives" Q Machine so it can try again :-)
                    y.revive();
                    return;
                };
                s.src = 'http://q.cgr.googlecode.com/hg/fasta.js';
                document.body.appendChild(s);
                s = null;
                return evt.stay('Loading "fasta.js" ...');
            }
         // Now, we want to delegate to `fasta`'s own `load` function.
         // Because the URL we stored in `y.val` points to JavaScript code
         // that contains embedded data, we only need to load the code in
         // order to run the desired computation. In order to capture the
         // answer when it's ready, we'll add a setter to `fasta` itself.
            Object.defineProperty(fasta, 'A', {
                configurable: true,
                set: function (x) {
                 // This function runs whenever an assignment to `fasta.A`
                 // occurs. Since this happens precisely once and happens to
                 // coincide with successful completion, we'll use it to
                 // return the desired result. Also, we'll remove the setter after
                 // it runs to enable the same worker to run additional jobs.
                    y.val = x;
                    delete fasta.A;
                    return evt.exit();
                }
            });
            fasta.load(y.val);
            return;
        };
        y.onready = function (evt) {
         // This function outputs results to the console of the invoking
         // machine. It cannot distribute for two reasons:
         //
         // -   it closes over the `url` variable,
         // -   it references `console`, which prevents serialization.
         //
            console.log('Results:', {input: url, output: y.val});
            return evt.exit();
        };
        return y;
    };

 // Invocations

    Q.box = 'sean';

    data.forEach(transform);

 // Stopgap solutions ...

    (function rit() {
     // This function slows down the polling mechanism by blocking execution. I will
     // tweak Q Machine soon that it doesn't require external hacks, but it's Friday,
     // so this will have to work for right now. This entire "ritardando" function
     // is only a temporary measure, though -- it will be removed as soon as possible.
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
    }());

 // That's all, folks!

    return;

}());

//- vim:set syntax=javascript:
