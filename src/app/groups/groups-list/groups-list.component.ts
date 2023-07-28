import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from "rxjs";
import { GroupsService } from 'src/app/services/groups.service';
import { GroupsDetailsComponent } from '../groups-details/groups-details.component';
import { GroupsI } from 'src/app/interfaces/group.interface';

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.css']
})
export class GroupsListComponent {
  protected onDestroy = new Subject<void>();
  groups: GroupsI[] = [];
  groupsFormArray: FormGroup[];

  constructor(
    private groupsService: GroupsService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.groupsFormArray = [];
  }

  ngOnInit(): void {
    this.getAllGroups();
  }

  getAllGroups(): void {
    this.groupsService
      .getAllGroups()
      .pipe(takeUntil(this.onDestroy))
      .subscribe({
        next: (res: any) => {
          this.groups = res.result
          this.groupsFormArray = this.groups.map(groupItem => {
            return this.fb.group({
              merchantId: [groupItem?.merchantId],
              serieId: [groupItem?.serieId],
              versionId: [groupItem?.versionId],
              templateId: [groupItem?.templateId],
              associationType: [groupItem?.associationType],
              associatedGroupId: [groupItem?.associatedGroupId],
              status: [groupItem?.status],
              position: [groupItem?.position],
              type: [groupItem?.type],
              isPaid: [groupItem?.isPaid],
              isPartner: [groupItem?.isPartner],
              hasApproval: [groupItem?.hasApproval],
              hasPartner: [groupItem?.hasPartner],
              hasPolls: [groupItem?.hasPolls],
              name: [groupItem?.name],
              description: [groupItem?.description],
              slug: [groupItem?.slug],
              groupId: [groupItem?.groupId],
              imageUrl: [groupItem?.imageUrl],
              category: [groupItem?.category],
              serie: [groupItem?.serie],
            });
          });
        },
      })
  }
  
  showDialog( item: any) {
    let dialogRef = this.dialog.open( GroupsDetailsComponent, {
        width: '1000px', height: '800px', data: item });
    dialogRef.afterClosed().subscribe(result => {
          console.log('dialog cerrado');
    });
  }
}
