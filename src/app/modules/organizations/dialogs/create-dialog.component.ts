import { Component, OnInit, Inject, Input, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Organization } from '@shared/models/Organization';
import { User } from '@shared/models/User';
import { InvitationService } from '@app/http/invites.service';
import { OrganizationService } from '@app/http/organizations.service';
import { GenericResponse } from '@shared/models/GenericResponse';
import { ToastService } from '@app/services/toast.service';
import { LoggerUtils } from '@shared/utils/logger.utils';

export interface AlertFeedback {
  visible: boolean;
  classes?: string;
  title?: string;
  message?: string;
}

@Component({
  selector: 'app-create-organization-dialog',
  templateUrl: './create-dialog.component.html',
})
export class CreateDialogComponent implements OnInit {

  public currentUser: User;

  @ViewChild('emailInput', { static: false })
  public emailInput: ElementRef;

  public alertFeedback: AlertFeedback = { visible: false };

  public organization: Organization = new Organization();

  constructor(
    public organizationService: OrganizationService,
    public toastService: ToastService,
    public dialogRef: MatDialogRef<CreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


  public validateCNPJ() {
    const cnpj = this.organization.cnpj;
    return cnpj !== null && typeof cnpj !== 'undefined' && cnpj.length > 0;
  }

  public create() {
    this.organization.active = true;
    // new Promise<any>((resolve, reject) => {
    //   this.organizationService.create(this.organization).subscribe((response: GenericResponse<Organization>) => {
    //       resolve(response);
    //   });
    // }).then((response: GenericResponse<Organization>) => {
    //   this.toastService.show('Organização criada com sucesso!', 'success');
    //   this.dialogRef.close();
    // });
    if (this.currentUser.type === User.Type.ACCOUNTANT) {
      this.organization.organizationId = this.currentUser.organization.id;
    }
    this.organizationService.create(this.organization).subscribe(response => {
      this.toastService.show('Organização criada com sucesso!', 'success');
      this.dialogRef.close();
    });
  }

  public close() {
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.close();
  }


  ngOnInit() {
    this.currentUser = User.fromLocalStorage();
  }

}
