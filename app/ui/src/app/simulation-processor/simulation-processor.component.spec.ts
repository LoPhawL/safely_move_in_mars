import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulationProcessor } from './simulation-processor.component';

describe('SimulationProcessor', () => {
  let component: SimulationProcessor;
  let fixture: ComponentFixture<SimulationProcessor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimulationProcessor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimulationProcessor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
