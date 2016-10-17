var assert = require('assert');
var requirejs = require('requirejs');
var util = require('util');

//mock to have jquery and the html document
requirejs.define("jquery", [], function() {
    //  return {jQueryStub: true};
    var jsdom = require('jsdom').jsdom;
    var document = jsdom('<html><body id = "test">initialVal</body></html>', {});
    var window = document.defaultView;
    var $ = require('jquery')(window);
    $.whoami = function() {
        return 'jquey mock';
    };
    return $;
});

//requirejs config
requirejs.config({
    baseUrl: __dirname + '/../',
    paths: {
        "helloworld": "web/helloworld"
    }
});

//console.debug it is used in the modules
console.debug = console.log;


describe('test jquery mock', function() {
    it('test asynchronous loading', function(done) { //require is asynchronous => done() to be used
        requirejs(["jquery"], function($) {
            done();
        });
    });
    it('test jquey load', function(done) { //require is asynchronous => done() to be used
        requirejs(["jquery"], function($) {
            assert.equal(typeof $, 'function');
            assert.equal($.whoami(), 'jquey mock');
            done();
        });
    });
});


describe('test helloworld', function() {
    it('test inivial value of the html element', function(done) { //require is asynchronous => done() to be used
        requirejs(["jquery"], function($) {
            var initialValue = $('#test').html();
            assert.equal(initialValue, 'initialVal');
            done();
        });
    });
    it('html elemenet changed', function(done) { //require is asynchronous => done() to be used
      requirejs(["helloworld"], function(helloworld) {
          done();
      });
    });
    it('test if html element has been changed', function(done) { //require is asynchronous => done() to be used
        requirejs(["jquery"], function($) {
            var initialValue = $('#test').html();
            assert.equal($('#test').html(), 'HELLO WORLD');
            done();
        });
    });
});
