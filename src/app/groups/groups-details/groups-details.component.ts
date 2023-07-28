import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from "rxjs";
import { GroupsI } from 'src/app/interfaces/group.interface';

@Component({
  selector: 'app-groups-details',
  templateUrl: './groups-details.component.html',
  styleUrls: ['./groups-details.component.css']
})
export class GroupsDetailsComponent {
  protected onDestroy = new Subject<void>();
  group?: GroupsI;
  constructor(
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<GroupsDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) { 
    this.group = this.data.value;
  }

  ngOnInit(): void {
    
  }

  exitDialog(){
    this.dialogRef.close();
  }
}
