import {Injectable} from '@angular/core';
import {CanDeactivate} from '@angular/router';

import {Observable, of} from 'rxjs';
import {first} from 'rxjs/operators';
import { PendingChangesService } from '../data-service/pendingChanges.service ';
import { ComponentCanDeactivate } from '../classes/componentCanDeactivate';


@Injectable({
  providedIn: 'root'
})

export class PendingChangesGuard implements CanDeactivate<ComponentCanDeactivate> {
  constructor(private service: PendingChangesService) {
  }

  canDeactivate(component: ComponentCanDeactivate): Observable<boolean> {
    if (component.canDeactivate()) {
        this.service.closeConfirmation();
        return of(true);
    }

    this.service.openConfirmation();

    return this.service.confirmed$.pipe(
      first(v => v !== null)
    ) as Observable<boolean>;
  }

}