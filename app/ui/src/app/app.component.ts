import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InfoModalComponentComponent } from "./info-modal-component/info-modal-component.component";
import { SimulationProcessor } from "./simulation-processor/simulation-processor.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, InfoModalComponentComponent, SimulationProcessor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ui';

  

  constructor() {}
}
