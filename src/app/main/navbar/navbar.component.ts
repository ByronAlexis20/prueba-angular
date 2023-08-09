import { Component, OnInit, Input, TemplateRef, OnDestroy, ViewChild, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { interval, forkJoin, Subscription } from 'rxjs';
import { GeneralService } from 'src/app/services/general.service';
import { NotificacionUsuario } from 'src/app/models/notificacionUsuario.model';
import { VariablesGlobales } from 'src/app/models/variablesGlobales.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalsComponent } from 'src/app/components/modals/modals.component';
import { Router } from '@angular/router';
import { InfoUsuarioService } from 'src/app/services/infoUsuario.service';

import { MdlTratamientoDatosPersonalesComponent } from 'src/app/components/modals/mdl-tratamiento-datos-personales/mdl-tratamiento-datos-personales.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit, OnDestroy{
  @ViewChild(MdlTratamientoDatosPersonalesComponent) mdlTratamientoDatosPersonalesComponent: MdlTratamientoDatosPersonalesComponent;
  isLoading : boolean = false;
  sub?:any;
  @Output() emitOpenModalTransparencia: EventEmitter<void> = new EventEmitter<void>();
  @Input() show:boolean= true;
  modalRef?: BsModalRef;
  numPantalla;
  user_nombre?:string;
  fotoPerfil?: string;
  notificacionSelected: any;
  numPantallaSubscribe?: Subscription;
  
  @ViewChild('childModal',{static:true}) childModal? :ModalsComponent;
  constructor(
    private infoUsuario: InfoUsuarioService, private router : Router, private modalService: BsModalService,
    private _builder: FormBuilder,private generalService:GeneralService) { }
  ngOnDestroy(): void {
    if(this.sub)
      this.sub.unsubscribe();
  }
  get confirmadoPrivado(){
    return this.infoUsuario.confirmadoPrivado;
  }
  get infoNumPantalla(){
    return this.infoUsuario.numPantalla;
  }
  ngOnInit() {
    this.user_nombre = atob(sessionStorage.getItem('nombres') || '');
    this.fotoPerfil = atob(sessionStorage.getItem('url') || '');
    this.numPantalla = this.infoUsuario.numPantalla; 
  }
  openModalTratamiento(){
    this.emitOpenModalTransparencia.emit();
  }
  get observaciones(){
    return VariablesGlobales.observaciones;
  }
  get numNotificaciones(){
    return VariablesGlobales.notifyCount;
  }
  get numCarrito(){
    return VariablesGlobales.carritoCount;
  }
  get notificaciones(){
    return VariablesGlobales.notifyList;
  }
  get estadoUsuario(){
    return VariablesGlobales.estadoUsuario;
  }
  goToRegistroUsuario(){
    this.router.navigate(['/home/miCuenta/registroUsuario']);
  }
  getNotificaciones(){
    const calls = [];
    calls.push(this.generalService.useService(NotificacionUsuario.getCountAll()));
    calls.push(this.generalService.useService(NotificacionUsuario.getAll()));
    forkJoin(calls).subscribe((responses:any[]) => {
      VariablesGlobales.notifyCount = 0;
      VariablesGlobales.notifyList = [];
      VariablesGlobales.notifyCount = responses[0].datos[0].n_notificaciones;
      VariablesGlobales.notifyList = responses[1].datos.map((t:any)=>{
        return new NotificacionUsuario(t);
      });
    })
  }
  marcarLeidoNotificacion(id?:number){
    this.generalService.useServiceWithBackend(NotificacionUsuario.updateById(id || -1)).subscribe(
      (data:any)=>{
        if(VariablesGlobales.isOk(data)){
          this.getNotificaciones();
        }
      }
    );
  }
  eliminarNotificacion(id?:number){
    this.modalRef!.hide();
    this.generalService.useServiceWithBackend(NotificacionUsuario.deleteById(id)).subscribe(
      (data:any)=>{
        if(VariablesGlobales.isOk(data)){
          this.getNotificaciones();
        }
      }
    );
  }
  openNotification(notify:any, template: TemplateRef<any>){
    this.notificacionSelected = notify;
    this.marcarLeidoNotificacion(this.notificacionSelected.notificacionusuario_id);
    this.openModal(template);
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.modalRef.setClass('modal-sm');
  }
  logout(){
    sessionStorage.clear();
    this.modalRef!.hide();
    this.router.navigate(['/login']);
  }
}