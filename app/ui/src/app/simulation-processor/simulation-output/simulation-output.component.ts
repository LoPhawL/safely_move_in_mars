import { Component, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-simulation-output',
  imports: [],
  templateUrl: './simulation-output.component.html',
  styleUrl: './simulation-output.component.css'
})
export class SimulationOutputComponent {

  @Input()
  public resultOutput: string[] = [];

  @Output()
  public resetOutput = new Subject<null>();

  reset() {

    this.resetOutput.next(null);
  }
}
