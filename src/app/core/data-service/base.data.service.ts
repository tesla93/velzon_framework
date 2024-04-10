import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { HttpResponsesHandlersFactory, IHttpResponsesHandler } from "./http-responses-handler";




export abstract class BaseDataService {
    protected constructor(
        protected http: HttpClient,
        protected handlersFactory: HttpResponsesHandlersFactory) { }

    public static handleRequestImpl<TResult>(
        request: Observable<TResult>,
        responseHandler?: IHttpResponsesHandler): Promise<TResult> {

        const promise = request.toPromise() as Promise<TResult>;
        if (responseHandler) {
            return promise.then((response: TResult) => {
                if (responseHandler.handleSuccess) {
                    responseHandler.handleSuccess();
                }
                return Promise.resolve(response);
            }).catch((errorResponse: HttpErrorResponse) => {
                if (responseHandler.handleError) {
                    responseHandler.handleError(errorResponse);
                }
                return Promise.reject(errorResponse);
            });
        } else {
            return promise;
        }
    }

    protected handleRequest<TResult>(
        request: Observable<TResult>,
        responseHandler?: IHttpResponsesHandler): Promise<TResult> {

        const promise = request.toPromise() as Promise<TResult>;

        // const promise = (request)

        if (responseHandler) {
            return promise.then((response: TResult) => {
                if (responseHandler.handleSuccess) {
                    responseHandler.handleSuccess();
                }
                return Promise.resolve(response);
            }).catch((errorResponse: HttpErrorResponse) => {
                if (responseHandler.handleError) {
                    responseHandler.handleError(errorResponse);
                }
                return Promise.reject(errorResponse);
            });
        } else {
            return promise;
        }


    }
    protected constructHttpParams(obj: any): HttpParams {
        let params = new HttpParams();
        const flattenBody = flatten(obj);

        Object.keys(flattenBody).forEach(prop => {
            params = params.set(prop, flattenBody[prop]);
        });

        return params;
    }

    createHttpParamsFromObject(obj: any): HttpParams {
        let params = new HttpParams();
        Object.keys(obj).forEach(key => {
          const value = obj[key];
          if (value !== null && value !== undefined) {
            if (Array.isArray(value)) {
              value.forEach((item, index) => {
                Object.keys(item).forEach(subKey => {
                  params = params.append(`${key}[${index}].${subKey}`, item[subKey]);
                });
              });
            } else if (typeof value === 'object') {
              Object.keys(value).forEach(subKey => {
                params = params.set(`${key}.${subKey}`, value[subKey]);
              });
            } else {
              params = params.set(key, value);
            }
          }
        });
        return params;
      }
}

export const flatten = (object: any) => {
    const o = Object.assign({}, ...function _flatten(objectBit, path = ""): any {
        return [].concat(
            ...Object.keys(objectBit).map(
                key => objectBit[key] && typeof objectBit[key] === "object" && !(objectBit[key] instanceof Date)
                    ? _flatten(
                        objectBit[key],
                        getPathKeyFromObject(objectBit, path, key)
                    )
                    : ({ [getPathKeyFromObject(objectBit, path, key)]: (objectBit[key] == null
                            ? ""
                            : (objectBit[key] instanceof Date
                                ? (objectBit[key] as Date).toUTCString()
                                : objectBit[key])) })
            )
        );
    }(object));
    return Object.assign({}, ...function _sliceFirst(obj) {
        return [].concat(...<[]>Object.keys(o).map(key => ({ [key.slice(1)]: o[key] })));
    }(o));
};

function getPathKeyFromObject(obj: object, path: string, key: string): string {
    return Array.isArray(obj) ? `${path}[${key}]` : `${path}.${key}`;
}