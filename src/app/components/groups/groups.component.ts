import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Group } from 'src/app/models/group.model';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  isLoading?: boolean;
  displayedColumns:string[] = ['name','description', 'type', 'category','acciones'];
  dataSource: MatTableDataSource<Group> = new MatTableDataSource<Group>();
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  constructor(
    private router: Router, private activedRoute:ActivatedRoute,
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
        this.dataSource.paginator = this.paginator;
      }
    );
  }
  view(o:Group){
    this.router.navigate([o.groupId], { relativeTo: this.activedRoute });
  }
}
