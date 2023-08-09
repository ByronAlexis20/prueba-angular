import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IrSesionComponent } from './ir-sesion.component';

describe('IrSesionComponent', () => {
  let component: IrSesionComponent;
  let fixture: ComponentFixture<IrSesionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IrSesionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IrSesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
