//- JavaScript source code

//- markup.js ~~
//                                                      ~~ (c) SRW, 20 Jul 2012

(function () {
    'use strict';
 // This function needs documentation.
    /*jslint browser: true, indent: 4, maxlen: 80 */
    var i, n, temp, x;
    x = document.getElementsByTagName('pre');
    n = x.length;
    for (i = 0; i < n; i += 1) {
        temp = '    ' + x[i].innerHTML.trim().split('\n  ').join('\n');
        x[i].innerHTML = temp;
    }
    return;
}());

//- vim:set syntax=javascript:
