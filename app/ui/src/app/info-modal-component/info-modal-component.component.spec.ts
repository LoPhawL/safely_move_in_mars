import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoModalComponentComponent } from './info-modal-component.component';

describe('InfoModalComponentComponent', () => {
  let component: InfoModalComponentComponent;
  let fixture: ComponentFixture<InfoModalComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoModalComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoModalComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
