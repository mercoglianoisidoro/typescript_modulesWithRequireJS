//on going developpment
define(["require", "exports", "jquery"], function (require, exports, $) {
    "use strict";
    /**
     * object to send an synchronous call
     */
    //export interface ajaxCall {
    var ajaxCall = (function () {
        function ajaxCall(url) {
            //TODO: define type
            /**
             * objet populated after an error
             */
            this.errorData = {};
            //TODO: define type
            /**
             * set to true in case of error
             */
            this.thereIsError = false;
            /**
            * objet populated after an success call
            */
            this.successData = {};
            this.callData = {};
            var self = this;
            if (url) {
                this.setUrl(url);
            }
            this.callData.async = false;
            this.callData.error = function (jqXHR, textStatus, errorThrown) {
                self.errorData = {};
                self.thereIsError = true;
                self.errorData.jqXHR = jqXHR;
                self.errorData.textStatus = textStatus;
                self.errorData.errorThrown = errorThrown;
                console.error(jqXHR);
            };
            this.callData.success = function (data, textStatus, jqXHR) {
                //TODO: define type
                self.successData = {};
                self.successData.data = data;
                self.successData.textStatus = textStatus;
                self.successData.jqXHR = jqXHR;
            };
        }
        /*-----------setters----------- */
        ajaxCall.prototype.setUrl = function (url) {
            this.callData.url = url;
        };
        ajaxCall.prototype.setData = function (data) {
            this.callData.data = data;
        };
        ajaxCall.prototype.setMethod = function (method) {
            this.callData.method = method;
        };
        /*-----------getters and accesser----------- */
        ajaxCall.prototype.getSuccessData = function () {
            return $.extend(true, {}, this.successData);
        };
        ajaxCall.prototype.getErrorData = function () {
            return $.extend(true, {}, this.errorData);
        };
        ajaxCall.prototype.accessCallData = function () {
            return this.callData;
        };
        /**
         * execute callback
         * @throw Error
         */
        ajaxCall.prototype.execute = function () {
            //TODO: DI for $
            if (this.callData.url == undefined) {
                throw new Error("callData url absent");
            }
            var result = $.ajax(this.callData);
            if (this.thereIsError) {
                throw new Error(this.errorData.jqXHR.statusText);
            }
            else {
                return result.responseText;
            }
        };
        return ajaxCall;
    }());
    exports.ajaxCall = ajaxCall;
});
//
// //USAGE EXAMPLE
// try {
//     let urlTest = "http://localhost:3000/web/index.html";
//     let call = new ajaxCall(urlTest);
//     console.log('result=', call.execute());
// } catch (error) {
//     console.error('error during call', error);
// }
