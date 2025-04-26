import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-popup',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './deletepopup.component.html',
  styleUrls: ['./deletepopup.component.scss']
})
export class DeletePopupComponent {
  constructor(
    public dialogRef: MatDialogRef<DeletePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string },
    private toast: ToastrService,
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
