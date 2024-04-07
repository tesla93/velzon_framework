import { Injectable } from '@angular/core';


@Injectable()
export class AppSessionService {
    _userId: number | undefined;
    

    get userId(): number {
        return this._userId ? this._userId : 0;
    }

    init(): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            resolve(true);
        });
    }

}
