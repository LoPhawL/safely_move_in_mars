import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FormGroup, FormControl, ReactiveFormsModule, Validators, FormArray} from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ui';

  robotsConfigurationForm = new FormGroup({
    gridSizeX: new FormControl('', [Validators.required, Validators.min(1), Validators.max(50)]),
    gridSizeY: new FormControl('', [Validators.required, Validators.min(1), Validators.max(50)]),

    robotConfiguration: new FormArray([
      this.getNewRobotConfiguration()
    ])
  })
  disableAllInputs: boolean = false;

  private getNewRobotConfiguration() {

    return new FormGroup({
        robotPositionX: new FormControl('', [Validators.required, Validators.min(0)]),
        robotPositionY: new FormControl('', [Validators.required, Validators.min(0)]),
        robotOrientation: new FormControl('', [Validators.required]),
        robotInstructions: new FormControl('', [Validators.required, Validators.maxLength(99)]), //maxsize, 
      })
  }
  loadDefaultValues() {

    this.robotsConfigurationForm.reset();

    this.robotsConfigurationForm.controls.gridSizeX.patchValue('5');
    this.robotsConfigurationForm.controls.gridSizeY.patchValue('3');

    const robotConfigArray = this.robotsConfigurationForm.controls.robotConfiguration;
    robotConfigArray.clear();

    while (robotConfigArray.length < 3) {

      robotConfigArray.push(
        this.getNewRobotConfiguration()
      );
    }
    
    robotConfigArray.patchValue([
      {
        robotPositionX: '1',
        robotPositionY: '1',
        robotOrientation: 'E',
        robotInstructions: 'RFRFRFRF'
      },
      {
        robotPositionX: '3',
        robotPositionY: '2',
        robotOrientation: 'N',
        robotInstructions: 'FRRFLLFFRRFLL'
      },
      {
        robotPositionX: '0',
        robotPositionY: '3',
        robotOrientation: 'W',
        robotInstructions: 'LLFFFLFLFL'
      },
    ]);

  }

  addRobot() {

    this.robotsConfigurationForm.controls.robotConfiguration.push(
      new FormGroup({
        robotPositionX: new FormControl('', [Validators.required]),
        robotPositionY: new FormControl('', [Validators.required]),
        robotOrientation: new FormControl('', [Validators.required]),
        robotInstructions: new FormControl('', [Validators.required, Validators.maxLength(99)]), //maxsize, 
      })
    );
  };

  removeRobot(inn: number) {

    this.robotsConfigurationForm.controls.robotConfiguration.removeAt(inn);
  }

  onCompute($event: Event) {
      $event.preventDefault();
      
      this.disableAllInputs = true;
      this.robotsConfigurationForm.disable();

      const formValues = this.robotsConfigurationForm.value;
      
      const gridDimensions: [number, number] = [Number(formValues.gridSizeX), Number(formValues.gridSizeY)]
      const robotSettings: any = [];

      for(let robConf of formValues.robotConfiguration!) {

        robotSettings.push({
          initialPosition: {
            coordinate: [Number(robConf.robotPositionX), Number(robConf.robotPositionY)],
            orientation: robConf.robotOrientation?.toUpperCase()
          },
          movementInstructions: robConf.robotInstructions?.toUpperCase()
        });
      }

      window.electron_backbone.sendMessage({
          gridDimensions,
          robotSettings
      });
  }
}
