import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MariaLegendComponent } from './maria-legend.component';

describe('MariaLegendComponent', () => {
  let component: MariaLegendComponent;
  let fixture: ComponentFixture<MariaLegendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MariaLegendComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MariaLegendComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
