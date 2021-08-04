import { Component, OnInit } from '@angular/core';
import { EventDriverService } from 'src/app/services/event.driver.service';
import { ActionEvent } from 'src/app/state/product.state';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  counter: number = 0;
  constructor(private eventDrivenService: EventDriverService) { }

  ngOnInit(): void {
    this.eventDrivenService.sourceEventSubjectObservable.subscribe(
      (actionEvent: ActionEvent) => {
        this.counter++;
      }
    )
  }

}
