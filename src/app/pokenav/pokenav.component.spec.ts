import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokenavComponent } from './pokenav.component';

describe('PokenavComponent', () => {
  let component: PokenavComponent;
  let fixture: ComponentFixture<PokenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
