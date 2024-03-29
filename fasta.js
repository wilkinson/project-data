//- JavaScript source code

//- fasta.js ~~
//                                                      ~~ (c) SRW, 15 May 2012
//                                                  ~~ last updated 18 Oct 2012

(function (global) {
    'use strict';

 // Pragmas

    /*jslint indent: 4, maxlen: 80 */

 // Prerequisites

    if (global.hasOwnProperty('QM') === false) {
        throw new Error('QMachine is not loaded.');
    }

 // Declarations

    var QM, avar;

 // Definitions

    QM = global.QM;

    avar = QM.avar;

 // Out-of-scope definitions

 /*
    global.fasta = function (obj) {
     // This function runs when data are loaded using JSONP. As such, it can
     // be a really nasty problem to figure out where the data are coming from
     // so that I can deliver them back to QMachine for further computation.
     // I had solved this previously by using `Q.capture` and `Q.retrieve`
     // commands, but that's a pretty convoluted way to do things ...
        // ...
        return;
    };
 */

    global.fasta = QM.capture;

    Q.fasta = function (url) {
     // This function needs documentation.
        var y = avar({val: {input: url, output: undefined}});
        y.onready = function (evt) {
         // This function (should) run remotely ...
            /*global jmat: false, usm: false */
            var y, Q, avar, data, libs, results, when;
            y = this;
            Q = Object.prototype.Q;
            avar = Q.avar;
            data = Q.retrieve(function (val) {
             // This function needs documentation.
                var name = y.val.input.match(/NC_[0-9]{6}\.fna/)[0];
                return ((val !== null)                  &&
                        (val !== undefined)             &&
                        (val.hasOwnProperty('name'))    &&
                        (val.name === name));
            });
            libs = avar({
                val: [
                    'http://jmat.googlecode.com/git/jmat.js',
                    'http://usm.github.com/usm.js',
                    'http://q.cgr.googlecode.com/hg/fasta.js',
                    y.val.input
                ]
            });
            results = avar();
            when = Q.when;
            data.onerror = libs.onerror = results.onerror = function (msg) {
             // This function needs documentation.
                return evt.fail(msg);
            };
            libs.onready = function (evt) {
             // This function shows how to load external dependencies in a
             // sequential manner, which is really important when resources
             // are not necessarily designed for use with QMachine.
                var temp;
                if (libs.val.length > 0) {
                    temp = Q.lib(libs.val.shift());
                    temp.onerror = function (message) {
                     // This function needs documentation.
                        return evt.fail(message);
                    };
                    temp.onready = function (temp_evt) {
                     // This function needs documentation.
                        temp_evt.exit();
                        return evt.stay('Loading next external resource ...');
                    };
                    return;
                }
                return evt.exit();
            };
            when(data, libs, results).areready = function (evt) {
             // This function needs documentation.
                /*jslint newcap: true */
                var uBac = new usm();
                jmat.disp('Indexing genome ...');
                uBac.encodeLong(data.val.body, 'ACGT');
                jmat.disp('Aligning new sequence to indexed genome ...');
                results.val = uBac.align('TCCACAGCATGCGTGACGATGACACG');
                jmat.disp('Done!');
                return evt.exit();
            };
            results.onready = function (result_evt) {
             // This function copies the final results into `y` so they can
             // be returned to the invoking machine :-)
                y.val.output = results.val;
                result_evt.exit();
                return evt.exit();
            };
            return;
        };
        return y;
    };

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
