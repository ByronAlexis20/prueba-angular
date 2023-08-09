import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Group } from 'src/app/models/group.model';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  isLoading?: boolean;
  displayedColumns:string[] = [];
  displayedColumnsAux:string[] = [];
  dataSource: MatTableDataSource<Group> = new MatTableDataSource<Group>();
  constructor(
    private groupService: GroupService
  ) {

  }
  ngOnInit(): void {
    this.getAllGroup();
  }
  getAllGroup() {
    this.isLoading = true;
    this.groupService.getAll().subscribe(
      (r: Group[])=>{
        this.isLoading = false;
        this.dataSource.data = r;
        this.displayedColumnsAux.push(...Object.keys(r[0]));
        this.displayedColumns.push(...this.displayedColumnsAux,'acciones')
      }
    );
  }
  view(o:Group){
    console.log(o);
  }
}
