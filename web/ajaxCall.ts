//on going developpment


//to export data (not recommended)
declare var window: any;

import $ = require("jquery");

/**
 * object to send an synchronous call
 */
//export interface ajaxCall {
export class ajaxCall { //Doesnt work

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
        this.callData.async = false;
        this.callData.error = function (jqXHR: JQueryXHR, textStatus: string, errorThrown: string) {
            self.errorData = {};
            self.thereIsError = true;
            self.errorData.jqXHR = jqXHR;
            self.errorData.textStatus = textStatus;
            self.errorData.errorThrown = errorThrown;
            console.error(jqXHR);
        }
        this.callData.success = function (data: any, textStatus: string, jqXHR: JQueryXHR) {

          //TODO: define type
            self.successData = {};
            self.successData.data = data;
            self.successData.textStatus = textStatus;
            self.successData.jqXHR = jqXHR;
        }

    }

    /*-----------setters----------- */
    setUrl(url: string) {
        this.callData.url = url;
    }

    setData(data: Object) {
        this.callData.data = data;
    }

    setMethod(method: string) {
        this.callData.method = method;
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
    execute() {
        //TODO: DI for $
        if (this.callData.url == undefined) {
            throw new Error("callData url absent");
        }

        let result = $.ajax(this.callData);

        if (this.thereIsError) {
            throw new Error(this.errorData.jqXHR.statusText);
        } else {
            return result.responseText;
        }
    }

}

//
// //USAGE EXAMPLE
// try {
//     let urlTest = "http://localhost:3000/web/index.html";
//     let call = new ajaxCall(urlTest);
//     console.log('result=', call.execute());
// } catch (error) {
//     console.error('error during call', error);
// }
