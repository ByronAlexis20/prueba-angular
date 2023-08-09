import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupDetalleComponent } from './group-detalle.component';

describe('GroupDetalleComponent', () => {
  let component: GroupDetalleComponent;
  let fixture: ComponentFixture<GroupDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupDetalleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
