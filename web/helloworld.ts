/**
author : Isidoro Mercogliano
*/


/// <reference path="../typings/index.d.ts" />

//to export data (not recommended)
declare var window:any;

import $ = require("jquery");
console.debug("helloworld loaded")

export function start(selector : string){
  $(selector).html('HELLO WORLD');
};

start('#test');
