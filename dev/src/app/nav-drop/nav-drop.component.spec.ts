import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavDropComponent } from './nav-drop.component';

describe('NavDropComponent', () => {
  let component: NavDropComponent;
  let fixture: ComponentFixture<NavDropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavDropComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
