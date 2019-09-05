import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.sass']
})
export class TimerComponent implements OnInit {

  private numericTime: number = 0;
  private sub: Subscription;
  private timer: any = interval(1000);
  private stopped: boolean = true;
  private paused: boolean = false;
  private timePause = 0;

  constructor() { }

  ngOnInit() {
    this.numericTime = 0;
  }

  wait() {
    if (this.paused) {
      this.sub = this.timer.subscribe((n: number) => {
        this.numericTime = n + this.timePause;
      })
      this.paused = false;
    } else {
      this.sub.unsubscribe();
      this.timePause = this.numericTime + 1;
      this.paused = true;
    }
  }

  stop() {
    if (!this.stopped) {
      this.sub.unsubscribe();
      this.stopped = true;
    }
    else {
      this.numericTime = 0;
      this.sub = this.timer.subscribe((n: number) => {
        this.numericTime = n + 1;
      })
      this.stopped = false;
    }
  }

  reset() {
    this.numericTime = 0;
    this.sub.unsubscribe()
    this.stopped = true;
  }
}
