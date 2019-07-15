import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MariaLegendComponent } from './maria-legend.component';

describe('MariaLegendComponent', () => {
  let component: MariaLegendComponent;
  let fixture: ComponentFixture<MariaLegendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MariaLegendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MariaLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
