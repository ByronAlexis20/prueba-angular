import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-gd-categoria',
  templateUrl: './gd-categoria.component.html',
  styleUrls: ['./gd-categoria.component.scss']
})
export class GdCategoriaComponent {
  @Input() category!:any;
  @Output() emmitMensaje = new EventEmitter<void>();
  presentarMensaje() {
    this.emmitMensaje.emit();
  }
}
