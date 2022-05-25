import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementSvgComponent } from './element-svg.component';

describe('ElementSvgComponent', () => {
  let component: ElementSvgComponent;
  let fixture: ComponentFixture<ElementSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElementSvgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
