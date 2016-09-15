/**
author : Isidoro Mercogliano
*/

//to export data (not recommended)
declare var window:any;
import helloworld = require("./helloworld");
console.debug("second module loaded")
console.log(helloworld.start('#secondModule'));
