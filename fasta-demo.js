//- JavaScript source code

//- fasta-demo.js ~~
//                                                      ~~ (c) SRW, 29 Jul 2012

(function () {
    'use strict';

 // Pragmas

    /*jslint devel: true, indent: 4, maxlen: 80 */

 // Prerequisites

    if (Object.prototype.hasOwnProperty('Q') === false) {
        throw new Error('Method Q is missing.');
    }

 // Declarations

    var Q, avar, data, libs, ply, results, timeline, when;

 // Definitions

    Q = Object.prototype.Q;

    avar = Q.avar;

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

    ply = Q.ply;

    results = avar({val: []});

    timeline = avar({val: []});

    when = Q.when;

 // Demonstrations

    when(data, libs, results, timeline).areready = function (evt) {
     // This function starts the clock ...
        Q.box = 'fasta-demo';
        var remaining = data.length;
        ply(data).by(function (key, val) {
         // This function needs documentation.
            console.log('Launching ' + val + ' ...');
            timeline.val[key] = {
                start:  new Date(),
                end:    undefined
            };
            var job = Q.fasta(val);
            job.onerror = function (message) {
             // This function needs documentation.
                return evt.fail(message + '(' + val + ')');
            };
            job.onready = function (job_evt) {
             // This function needs documentation.
                timeline.val[key].end = new Date();
                results.val[key] = job.val;
                console.log('Success:', job.val);
                console.log('Elapsed time in seconds:',
                    (timeline.val[key].end - timeline.val[key].start) / 1000);
                remaining -= 1;
                if (remaining === 0) {
                    job_evt.exit();
                    return evt.exit();
                }
                return job_evt.exit();
            };
            return;
        });
        return;
    };

    results.onerror = timeline.onerror = function (message) {
     // This function needs documentation.
        console.error('Error:', message);
        return;
    };

    when(results, timeline).areready = function (evt) {
     // This function needs documentation.
        console.log('Results:', results.val);
        console.log('Timeline:', timeline.val);
        console.log(JSON.stringify({
            results: results.val,
            timeline: timeline.val
        }));
        return evt.exit();
    };

 // That's all, folks!

    return;

}());

//- vim:set syntax=javascript:
