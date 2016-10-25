/// <reference path="../typings/index.d.ts" />
/// <reference path="../src/ajaxCall.ts"/>
var assert = require('assert');
// declare var call:ajaxCall;
var requirejs_loader = require('requirejs');
var util = require('util');
//mock to have jquery and the html document
requirejs_loader.define("jquery", [], function () {
    //  return {jQueryStub: true};
    var jsdom = require('jsdom').jsdom;
    var document = jsdom('<html><body id = "test">initialVal</body></html>', {});
    var window = document.defaultView;
    var $ = require('jquery')(window);
    $.whoami = function () {
        return 'jquey mock';
    };
    return $;
});
//requirejs_loader config
requirejs_loader.config({
    baseUrl: __dirname + '/../',
    paths: {
        "ajaxCall": "dist/ajaxCall",
    }
});
//console.debug it is used in the modules
console.debug = console.log;
// describe('test jquery mock', function() {
//     it('test asynchronous loading', function(done) { //require is asynchronous => done() to be used
//         requirejs_loader(["jquery"], function($) {
//             done();
//         });
//     });
//     it('test jquey load', function(done) { //require is asynchronous => done() to be used
//         requirejs_loader(["jquery"], function($) {
//             assert.equal(typeof $, 'function');
//             assert.equal($.whoami(), 'jquey mock');
//             done();
//         });
//     });
// });
describe('ajaxCall', function () {
    it('test asynchronous loading', function (done) {
        requirejs_loader(["jquery"], function ($) {
            done();
        });
    });
    it('test jquey load', function (done) {
        requirejs_loader(["jquery"], function ($) {
            assert.equal(typeof $, 'function');
            assert.equal($.whoami(), 'jquey mock');
            done();
        });
    });
    it('test with web page', function (done) {
        requirejs_loader(["ajaxCall"], function (ajaxCall) {
            //be cerefoul you need "Access-Control-Allow-Origin" header
            var urlTest = "http://www.mercoglianoisidoro.com/api/saved_data/json";
            var call = new ajaxCall(urlTest);
            var result = call.executeSync();
            assert.equal(typeof result, 'string');
            done();
        });
    });
    it('test SyntaxError', function (done) {
        requirejs_loader(["ajaxCall"], function (ajaxCall) {
            var temp = console.error;
            console.error = function () { };
            var result = null;
            try {
                //be cerefoul you need "Access-Control-Allow-Origin" header
                var urlTest = "not_exist";
                var call = new ajaxCall(urlTest);
                var result = call.executeSync();
            }
            catch (error) {
                // console.log(error.message)
                assert.equal(error.message, 'SyntaxError');
                done();
            }
            console.error = temp;
        });
    });
    it('test error', function (done) {
        requirejs_loader(["ajaxCall"], function (ajaxCall) {
            var temp = console.error;
            console.error = function () { };
            var result = null;
            try {
                //be cerefoul you need "Access-Control-Allow-Origin" header
                var urlTest = "http://www.notexist123123123wwsx.com";
                var call = new ajaxCall(urlTest);
                var result = call.executeSync();
            }
            catch (error) {
                // console.log(error.message)
                assert.equal(error.message, 'error');
                done();
            }
            console.error = temp;
        });
    });
});
