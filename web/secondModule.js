/**
author : Isidoro Mercogliano
*/
define(["require", "exports", "./helloworld"], function (require, exports, helloworld) {
    "use strict";
    /// <reference path="../typings/index.d.ts" />
    console.debug("second module loaded");
    console.log(helloworld.start('#secondModule'));
});
