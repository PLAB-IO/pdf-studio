import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelOptionsComponent } from './panel-options.component';

describe('PanelOptionsComponent', () => {
  let component: PanelOptionsComponent;
  let fixture: ComponentFixture<PanelOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
