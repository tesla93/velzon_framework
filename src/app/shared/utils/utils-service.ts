import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnumValues } from 'enum-values';

@Injectable({
    providedIn: 'root'
})
export class UtilsService {

    constructor(private http: HttpClient) { }

    setCookieValue(key: string, value: string | null, expireDate: string | null, path: string, domain: string | undefined = undefined) {
        let cookieValue = encodeURIComponent(key) + '=';

        if (value) {
            cookieValue = cookieValue + encodeURIComponent(value);
        }

        if (expireDate) {
            cookieValue = cookieValue + "; expires=" + expireDate.toString();
        }

        if (path) {
            cookieValue = cookieValue + "; path=/"; //+ path;
        }

        if (domain) {
            cookieValue = cookieValue + "; domain=" + domain;
        }

        if (typeof document !== "undefined")
            document.cookie = cookieValue;
    }

    getCookieValue(key: string): string | null {
        let equalities;
        if (typeof document !== "undefined") {
            equalities = document.cookie.split('; ')

            const currentCookies = equalities.filter(s => s.split('=')[0] === key);
            if (currentCookies && currentCookies.length !== 0) {
                const splitted = currentCookies[currentCookies.length - 1].split('=');
                if (splitted.length != 2) {
                    return null;
                }
                if (decodeURIComponent(splitted[0]) === key) {
                    return decodeURIComponent(splitted[1] || '');
                }
            }           
        }

        return null;
    }


    deleteCookie(key: string, path?: string): void {
        let cookieValue = encodeURIComponent(key) + '=';

        // cookieValue = cookieValue + "; expires=" + (new Date(new Date().getTime() - 86400000)).toUTCString();
        cookieValue = cookieValue + '; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        const equalities = document.cookie.split('; ')
        const currentCookies = equalities.filter(s => s.split('=')[0] === key);


        if (path) {
            cookieValue = cookieValue + "; path=/"; //+ path;
        }
        if (typeof document !== "undefined") {
            if (currentCookies && currentCookies.length > 0) {
                currentCookies.forEach(() => {
                    document.cookie = cookieValue;

                });
            }
        }
    }

    setToken(tokenCookieName: string, authToken: string | null, expireDate: string | null, appPath: string, domain: string | undefined) {
        this.setCookieValue(tokenCookieName, authToken, expireDate, appPath, domain);
    }

    getDomain(url: string) {
        const domainRegex = /(https?:){0,1}\/\/((?:[\w\d-]+\.)+[\w\d]{2,})/i;
        const matches = domainRegex.exec(url);
        return (matches && matches[2]) ? matches[2] : '';
    }


    stringEnumToIdName(EnumArray: any) {
        const idName: any[] = [];
        const namesAndValues = EnumValues.getNamesAndValues(EnumArray);
        namesAndValues.forEach(function (nameValObj) {
            idName.push({ id: nameValObj.value, name: nameValObj.name });
        }, this);

        return idName;
    }

    trimCharacter(input: string, character: string): string {
        const regex = new RegExp(`^${character}+|${character}+$`, 'g');
        return input.replace(regex, '');
    }

    stringEnumToIdText(EnumArray: any) {
        const idName: any[] = [];
        const namesAndValues = EnumValues.getNamesAndValues(EnumArray);
        namesAndValues.forEach(function (nameValObj) {
            idName.push({ id: nameValObj.value, text: nameValObj.name });
        }, this);

        return idName;
    }

    stringEnumToKeyValue(stringEnum: any) {
        const keyValue = [];
        const keys = Object.keys(stringEnum).filter((value) => {
            return value;
        });

        for (const k of keys) {
            keyValue.push({ key: k, value: stringEnum[k] });
        }
        return keyValue;
    }
    

    public _getErrorMessagesForControl(control: any): string[] {
        return Object.keys(control.errors as object)?.map(errorKeyItem => {
            switch (errorKeyItem) {
                case "required": return "GENERAL.EDIT.REQUIREDMSG";
                case "pattern": return "GENERAL.EDIT.PATTERNMSG";
                case "min": return "GENERAL.EDIT.MINMSG";
                case "max": return "GENERAL.EDIT.MAXMSG";
                case "email": return "GENERAL.EDIT.EMAILMSG";
                case "notMatch": return "CREATEUSERSCREEN.CONFIRMPASSWORDREQUIRED";
                default: return "";
            }
        });
    }

    readJsonFromAsset(lang: string) {
        const url = `assets/json/phrases-list-${lang}.json`
        return this.http.get(url)
   }
   fileToBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
      
          reader.onload = () => {
            // 'result' property contains the Base64 data
            if (typeof reader.result === 'string') {
              resolve(reader.result);
            } else {
              reject(new Error('Failed to read the file as Base64.'));
            }
          };
      
          reader.onerror = () => {
            reject(new Error('Error occurred while reading the file.'));
          };
      
          // Read the file as Data URL
          reader.readAsDataURL(file);
        });
      }  
    
    

}

