import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../../services/user/user.service';
import { SharedCommonModule } from '../../../../app/apimodule/api.module';
import { CommonTableComponent } from '../../../../shared/components/common-table/common-table.component';
import { CommonButtonComponent } from '../../../../shared/components/common-button/common-button.component';
import { error } from 'node:console';

@Component({
  selector: 'app-usermanagement',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, SharedCommonModule, CommonTableComponent, CommonButtonComponent],
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.scss']
})
export class UsermanagementComponent {

  // Common Table Variable Declration

  usersList: any[] = [];
  showForm = false;
  mode: 'add' | 'edit' | 'view' = 'add';
  currentUserId: string | null = null;
  userForm: FormGroup;

  userColumns = [
    { field: 'Name', header: 'name' },
    { field: 'Email', header: 'email' },
    { field: 'Phone', header: 'phoneNumber' },
    { field: 'Role', header: 'role' }
  ];
  userFlag: string = 'View';

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      role: ['user', Validators.required],
      isBlocked: [false]
    });
  }
  displayedUsers: any[] = [];

  ngOnInit(): void {
    this.loadUsers();
  }

  ngAfterViewInit(): void {

  }

  applyFilter(event: Event): void {

  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((res: any) => {
      this.usersList = res.result;
    }, (error) => {
      console.log('error: ', error);

    })
  }

  editOption(event: { row: any, type: string; }) {
    const editTableDatas = event.row
    switch (event.type) {
      case "Edit":
        this.mode = 'edit';
        this.currentUserId = editTableDatas._id;
        this.userForm.patchValue(editTableDatas);
        this.showForm = true;
        this.userForm.get('password')?.setValue('');
        this.userForm.enable();
        break;
      case "View":
        this.mode = 'view';
        this.userForm.patchValue(editTableDatas);
        this.showForm = true;
        this.userForm.disable();
        break;
      case "Delete":
        if (confirm('Are you sure you want to delete this user?')) {
          this.userService.deleteUser(editTableDatas._id).subscribe(() => this.loadUsers());
        }
        break;
    }

  }
  onAdd(): void {
    this.mode = 'add';
    this.userForm.reset({ role: 'user', isBlocked: false });
    this.showForm = true;
    this.userForm.enable();
  }

  onCancel(mode: string): void {
    if (mode === "cancel") {
      this.showForm = false;
      this.userForm.reset();
      this.userForm.enable();
      this.loadUsers();
      return;
    }
  }

  onSubmit(): void {
    console.log('save');
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    };
    const user = this.userForm.value;

    if (this.mode === 'add') {
      this.userService.addUser(user).subscribe(() => {
        this.loadUsers();
        // this.onCancel('cancel');
      });
    } else if (this.mode === 'edit' && this.currentUserId) {
      this.userService.updateUser(this.currentUserId, user).subscribe(() => {
        this.loadUsers();
        // this.onCancel();
      });
    }
  }
}
