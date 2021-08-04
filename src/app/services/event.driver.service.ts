import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ActionEvent } from '../state/product.state';

@Injectable({
  providedIn: 'root'
})
export class EventDriverService {

  sourceEventSubject: Subject<ActionEvent> =
    new Subject<ActionEvent>();

  sourceEventSubjectObservable = this.sourceEventSubject.asObservable();

  // 
  //TODO utilise de subject un pour les methodes de selection (get et search ) et un pour les methodes save edit
  publishEvent($event: ActionEvent) {
    this.sourceEventSubject.next($event);
  }


}
