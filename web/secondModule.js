define(["require", "exports", "./helloworld"], function (require, exports, helloworld) {
    "use strict";
    console.debug("second module loaded");
    console.log(helloworld.start('#secondModule'));
});
