import { Component, OnInit, HostBinding, TemplateRef, Input, OnDestroy } from '@angular/core';
import { VariablesGlobales } from 'src/app/models/variablesGlobales.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { ImageSnippet } from 'src/app/models/imageSnippet.model';
import { GeneralService } from 'src/app/services/general.service';
import { ImagenDoc } from 'src/app/models/persona/imagenDoc.model';
import { MessageComponent } from 'src/app/util/messageError.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { formatDate } from '@angular/common';
import { environment } from 'src/environments/environment';
import { InfoUsuarioService } from 'src/app/services/infoUsuario.service';
import { Subscription } from 'rxjs';
declare var bootstrap: any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent extends MessageComponent implements OnInit, OnDestroy {
  modalRef?: BsModalRef;
  isFinanciera;
  currentApplicationVersion = environment.appVersion;
  @Input() userName?:string;
  @Input() userLastName?:string;
  @Input() userRazonSocial:string;
  @Input() userTipoPersona: number;
  fotoPerfil?:string;
  listMenu:any[] = [];
  classUploadPerfil:string = "fa-camera";
  user_nombre?: any;
  user_apellido?:any;
  numPantalla?:number;
  numPantallaSubscribe?: Subscription;
  constructor(
    public _snackBar:MatSnackBar,private generalService: GeneralService, private router: Router,
    private modalService: BsModalService, private infoUsuario: InfoUsuarioService) {
    super(_snackBar);
  }
  
  ngOnInit() {
    this.isFinanciera = Number(sessionStorage.getItem('inf6')) !== 0 && this.tipoPersona === 3;
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
    })
    this.onChanges();
    // Bootstrap tooltip initialization
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
    })
    this.user_nombre = atob(sessionStorage.getItem('nombres') || '')
    this.user_apellido = atob(sessionStorage.getItem('apellidos') || '')
    this.fotoPerfil = atob(sessionStorage.getItem('url') || '');
    this.getMenu();
  }
  onChanges(){
    this.numPantallaSubscribe = this.infoUsuario.numPantalla$.subscribe(
      val=>{
        this.numPantalla = val;
      }
    );
  }
  get observaciones(){
    return VariablesGlobales.observaciones;
  }
  get estado(){
    return VariablesGlobales.estadoUsuario;
  }
  get tipoPersona(){return VariablesGlobales.id_tipopersona}
  getMenu(){
    this.generalService.getServiceResource("m_i_fcv").subscribe(
      (data:any)=>{
        this.listMenu = data;
        if(this.isFinanciera){
          this.listMenu = this.listMenu.filter(m=>![3,4].includes(m.bloque_id));
        }else{
          this.listMenu = this.listMenu.filter(m=>![1,2].includes(m.bloque_id));
        }
      }
    );
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.modalRef.setClass('modal-md');
  }
  logout(){
    sessionStorage.clear();
    this.modalRef!.hide();
    this.router.navigate(['/login']);
  }
  toggle(index: number,menu:any) {
    if(menu.url==null){
      this.listMenu.filter(
        (menu, i) => i !== index && menu.active
      ).forEach(menu => menu.active = !menu.active);
      this.listMenu[index].active = !this.listMenu[index].active;
    }else{
      this.router.navigate([menu.url]);
    }
  }
  processFile(imageInput: any) {
    if(this.numPantalla! < 2 && this.tipoPersona === 1){
      this.openSnackBar({status:'ERROR',mensaje:'Para poder subir una foto de perfil debes tener una cuenta de inversión con nosotros.'});
    }else{
      const date:Date = new Date();
      this.classUploadPerfil = "fa-spinner fa-pulse"
      let file: File = imageInput.files[0];
      var blob = file.slice(0, file.size, file.type);
      file = new File([blob], 'cs_'+formatDate(date, 'yyyyMMdd_HHmmssSS', 'en-US')+'.'+file.name.split('.').pop(), {type: file.type});
      const reader = new FileReader();
      reader.addEventListener('load', (event: any) => {
        var selectedFile = new ImageSnippet(event.target.result, file);
        this.generalService.uploadImage(selectedFile.file).subscribe(
          (res:any) => {
            var img:any = {
              url:res.datos[0].url,
              nombre:'FOTO PERFIL',
              id_tipo:2
            }
            this.generalService.useServiceWithBackend(ImagenDoc.post(img)).subscribe(
              (data : any)=>{
                sessionStorage.setItem('url',btoa(img.url));
                this.fotoPerfil = img.url;
                this.classUploadPerfil = "fa-camera";
              }
            );
          }
        );
      });
      reader.readAsDataURL(file);
    }
  }
  ngOnDestroy(): void {
    this.numPantallaSubscribe?.unsubscribe();
  }
}