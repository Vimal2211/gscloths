import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../../../services/user/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SharedCommonModule } from '../../../../app/apimodule/api.module';

@Component({
  selector: 'app-usermanagement',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, SharedCommonModule],
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.scss']
})
export class UsermanagementComponent {
  usersList: any[] = [
    // {id:1,name:'Vimal',email:'vimal@gmail.com',phoneNumber:'9876543212',role:'admin'},
    // {id:2,name:'User',email:'user@gmail.com',phoneNumber:'9876543212',role:'user'},
    // {id:3,name:'Test',email:'vimal@gmail.com',phoneNumber:'9876543212',role:'admin'},
    // {id:4,name:'Rest',email:'user@gmail.com',phoneNumber:'9876543212',role:'user'},
    // {id:5,name:'Data',email:'vimal@gmail.com',phoneNumber:'9876543212',role:'admin'},
    // {id:6,name:'Class',email:'user@gmail.com',phoneNumber:'9876543212',role:'user'},
    // {id:7,name:'Demo',email:'vimal@gmail.com',phoneNumber:'9876543212',role:'admin'},
    // {id:8,name:'DmoUser',email:'user@gmail.com',phoneNumber:'9876543212',role:'user'},
  ];
  showForm = false;
  mode: 'add' | 'edit' | 'view' = 'add';
  currentUserId: string | null = null;
  userForm: FormGroup;

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

  displayedColumns: string[] = ['name', 'email', 'phoneNumber', 'role', 'actions'];
  dataSource!: MatTableDataSource<any>;
  pageSize = 5;
  displayedUsers: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.loadUsers();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.displayedUsers = this.dataSource.filteredData;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.displayedUsers = this.dataSource.filteredData;
  }

  // Method to handle page changes
  pageChanged(event: any) {
    this.pageSize = event.pageSize;
    this.dataSource.paginator!.pageIndex = event.pageIndex;
    this.dataSource._updateChangeSubscription(); // Update table data
  }

  loadUsers(): void {
    // this.userService.getUsers().subscribe(data => this.usersList = data);
    // this.dataSource = new MatTableDataSource(this.usersList);
    this.userService.getUsers().subscribe((res: any) => {
      this.usersList = res.result;
      this.dataSource = new MatTableDataSource(this.usersList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })

  }

  onAdd(): void {
    this.mode = 'add';
    this.userForm.reset({ role: 'user', isBlocked: false });
    this.showForm = true;
    this.userForm.enable();
  }

  onEdit(user: any): void {
    this.mode = 'edit';
    this.currentUserId = user._id;
    this.userForm.patchValue(user);
    this.showForm = true;
    this.userForm.get('password')?.setValue(''); // Clear password for edit
    this.userForm.enable();
  }

  onView(user: any): void {
    this.mode = 'view';
    this.userForm.patchValue(user);
    this.showForm = true;
    this.userForm.disable();
  }

  onDelete(id: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe(() => this.loadUsers());
    }
  }

  onCancel(): void {
    this.showForm = false;
    this.userForm.reset();
    this.userForm.enable();
    this.loadUsers();
  }

  onSubmit(): void {
    if (this.userForm.invalid) return;
    const user = this.userForm.value;

    if (this.mode === 'add') {
      this.userService.addUser(user).subscribe(() => {
        this.loadUsers();
        this.onCancel();
      });
    } else if (this.mode === 'edit' && this.currentUserId) {
      this.userService.updateUser(this.currentUserId, user).subscribe(() => {
        this.loadUsers();
        this.onCancel();
      });
    }
  }
}
