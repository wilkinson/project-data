//- JavaScript source code

//- fasta-demo.js ~~
//                                                      ~~ (c) SRW, 15 May 2012

(function () {
    'use strict';

 // Pragmas

    /*jslint devel: true, indent: 4, maxlen: 80 */

 // Prerequisites

    if (Object.prototype.hasOwnProperty('Q') === false) {
        throw new Error('Method Q is missing.');
    }

 // Declarations

    var Q, data, libs, when;

 // Definitions

    Q = Object.prototype.Q;

    data = [
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
        'http://q.cgr.googlecode.com/hg/Pneumo/NC_014251.fna.js',
        'http://q.cgr.googlecode.com/hg/Pneumo/NC_014494.fna.js',
        'http://q.cgr.googlecode.com/hg/Pneumo/NC_014498.fna.js'
    ];

    libs = Q.lib('http://q.cgr.googlecode.com/hg/fasta.js');

    when = Q.when;

 // Demonstrations

    when(data, libs).areready = function (evt) {
     // This function needs documentation.
        Q.box = 'fasta-demo';
        data.forEach(function (url) {
         // This function needs documentation.
            console.log('Launching ' + url + ' ...');
            var job = Q.fasta(url);
            job.onerror = function (message) {
             // This function needs documentation.
                console.error('Error:', {message: message, url: url});
                return;
            };
            job.onready = function (evt) {
             // This function needs documentation.
                console.log('Results:', job.val);
                return evt.exit();
            };
            return;
        });
        return evt.exit();
    };

 // That's all, folks!

    return;

}());

//- vim:set syntax=javascript:
