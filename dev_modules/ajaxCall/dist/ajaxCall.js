/// <reference path="../typings/index.d.ts" />
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
            this.callData.async = false; //default
            this.callData.error = function (jqXHR, textStatus, errorThrown) {
                self.errorData = {};
                self.thereIsError = true;
                self.errorData['jqXHR'] = jqXHR;
                self.errorData['textStatus'] = textStatus;
                self.errorData['errorThrown'] = errorThrown;
                console.error('ajaxCall error callback, jqXHR string = ', JSON.stringify(self.errorData));
                console.error('ajaxCall error callback, jqXHR = ', self.errorData);
            };
            this.callData.success = function (data, textStatus, jqXHR) {
                //TODO: define type
                self.successData = {};
                ajaxCall;
                self.successData['data'] = data;
                self.successData['textStatus'] = textStatus;
                self.successData['jqXHR'] = jqXHR;
            };
            return this;
        }
        /*-----------setters----------- */
        ajaxCall.prototype.setUrl = function (url) {
            this.callData.url = url;
            return this;
        };
        ajaxCall.prototype.setData = function (data) {
            this.callData.data = data;
            return this;
        };
        ajaxCall.prototype.setDataDoSend = function (data) {
            this.callData.data = data;
            return this;
        };
        ajaxCall.prototype.setMethod = function (method) {
            if (method !== 'POST' && method !== 'GET') {
                this.callData.method = 'GET';
            }
            else {
                this.callData.method = method;
            }
            return this;
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
        ajaxCall.prototype.executeSync = function () {
            //TODO: DI for $
            this.callData.async = false;
            if (this.callData.url == undefined) {
                throw new Error("callData url absent");
            }
            var result = $.ajax(this.callData);
            if (this.thereIsError) {
                var errorDetail = '';
                if (this.errorData['jqXHR'] && this.errorData['jqXHR'].statusText) {
                    errorDetail = this.errorData['jqXHR'].statusText;
                }
                else {
                    errorDetail = JSON.stringify(this.errorData);
                }
                throw new Error(errorDetail);
            }
            else {
                return result.responseText;
            }
        };
        return ajaxCall;
    }());
    return ajaxCall;
});
//
//USAGE EXAMPLE
// try {
//     let urlTest = "http://google.com";
//     let call = new ajaxCall(urlTest);
//     console.log('result=', call.executeSync());
// } catch (error) {
//     console.error('error during call', error);
// }
