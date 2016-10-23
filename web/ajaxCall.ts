//on going developpment


//to export data (not recommended)
declare var window: any;

import $ = require("jquery");

/**
 * object to send an synchronous call
 */
//export interface ajaxCall {
class ajaxCall { //Doesnt work

    /**
     * data object consumed by $ajax
     */
    private callData: JQueryAjaxSettings;
    //TODO: define type

    /**
     * objet populated after an error
     */
    private errorData: Object = {};
    //TODO: define type


    /**
     * set to true in case of error
     */
    private thereIsError: boolean = false;


    /**
    * objet populated after an success call
    */
    private successData: Object = {};


    constructor(url: string) {

        this.callData = {};
        let self = this;
        if (url) {
            this.setUrl(url);
        }
        this.callData.async = false; //default
        this.callData.error = function(jqXHR: JQueryXHR, textStatus: string, errorThrown: string) {
            self.errorData = {};
            self.thereIsError = true;
            self.errorData['jqXHR'] = jqXHR;
            self.errorData['textStatus'] = textStatus;
            self.errorData['errorThrown'] = errorThrown;
            console.error('ajaxCall error callback, jqXHR string = ', JSON.stringify(self.errorData));
            console.error('ajaxCall error callback, jqXHR = ', self.errorData);

        }
        this.callData.success = function(data: any, textStatus: string, jqXHR: JQueryXHR) {

            //TODO: define type
            self.successData = {}; ajaxCall
            self.successData['data'] = data;
            self.successData['textStatus'] = textStatus;
            self.successData['jqXHR'] = jqXHR;
        }
        return this;

    }

    /*-----------setters----------- */
    setUrl(url: string) {
        this.callData.url = url;
        return this;
    }

    setData(data: Object) {
        this.callData.data = data;
        return this;
    }

    setDataDoSend(data: Object) {
        this.callData.data = data;
        return this;
    }

    setMethod(method: string) {

        if (method !== 'POST' && method !== 'GET') {
            this.callData.method = 'GET';
        } else {
            this.callData.method = method;
        }


        return this;
    }


    /*-----------getters and accesser----------- */
    getSuccessData(): Object {
        return $.extend(true, {}, this.successData);
    }

    getErrorData(): Object {
        return $.extend(true, {}, this.errorData);
    }

    accessCallData(): Object {
        return this.callData;
    }



    /**
     * execute callback
     * @throw Error
     */
    executeSync() {
        //TODO: DI for $

        this.callData.async = false;
        if (this.callData.url == undefined) {
            throw new Error("callData url absent");
        }
        let result = $.ajax(this.callData);
        if (this.thereIsError) {
            let errorDetail = '';
            if (this.errorData['jqXHR'] && this.errorData['jqXHR'].statusText) {
                errorDetail = this.errorData['jqXHR'].statusText;
            } else {
                errorDetail = JSON.stringify(this.errorData);
            }
            throw new Error(errorDetail);
        } else {
            return result.responseText;
        }
    }

}

export = ajaxCall; //to export a single object

//
//USAGE EXAMPLE
// try {
//     let urlTest = "http://google.com";
//     let call = new ajaxCall(urlTest);
//     console.log('result=', call.executeSync());
// } catch (error) {
//     console.error('error during call', error);
// }
