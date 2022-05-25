import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementTitleComponent } from './element-title.component';

describe('ElementTitleComponent', () => {
  let component: ElementTitleComponent;
  let fixture: ComponentFixture<ElementTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElementTitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
