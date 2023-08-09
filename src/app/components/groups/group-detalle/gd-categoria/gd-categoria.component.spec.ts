import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GdCategoriaComponent } from './gd-categoria.component';

describe('GdCategoriaComponent', () => {
  let component: GdCategoriaComponent;
  let fixture: ComponentFixture<GdCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GdCategoriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GdCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
