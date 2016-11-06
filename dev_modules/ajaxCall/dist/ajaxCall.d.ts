/// <reference path="../typings/index.d.ts" />
/**
 * object to send an synchronous call
 */
declare class ajaxCall {
    /**
     * data object consumed by $ajax
     */
    private callData;
    /**
     * objet populated after an error
     */
    private errorData;
    /**
     * set to true in case of error
     */
    private thereIsError;
    /**
    * objet populated after an success call
    */
    private successData;
    constructor(url: string);
    setUrl(url: string): this;
    setData(data: Object): this;
    setDataDoSend(data: Object): this;
    setMethod(method: string): this;
    getSuccessData(): Object;
    getErrorData(): Object;
    accessCallData(): Object;
    /**
     * execute callback
     * @throw Error
     */
    executeSync(): string;
    /**
     * execute callback
     * @throw Error
     */
    executeASync(): JQueryXHR;
}
export = ajaxCall;
