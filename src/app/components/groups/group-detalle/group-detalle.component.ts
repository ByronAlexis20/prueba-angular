import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Group } from 'src/app/models/group.model';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-group-detalle',
  templateUrl: './group-detalle.component.html',
  styleUrls: ['./group-detalle.component.scss']
})
export class GroupDetalleComponent {
  group?: Group;
  constructor(
    private router: Router, private activedRoute:ActivatedRoute,
    private groupService: GroupService
  ) {
    this.activedRoute.paramMap.subscribe(params => {
      this.getGroup(Number(params.get("id")));
    })

  }
  getGroup(id: number) {
    this.groupService.getById(id).subscribe(
      ((el: Group)=>
        (this.group = el)
      )
    );
  }
  regresar(){
    this.router.navigate(['../'], { relativeTo: this.activedRoute });
  }
  presentarAlert() {
    alert("Este es un evento desde el componente hijo CategoriaComponent, presentado en el componente padre (GroupDetalleComponent).")
  }
}
