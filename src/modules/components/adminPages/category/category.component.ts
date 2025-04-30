import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Category, CategoryService } from '../../../services/category/category.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeletePopupComponent } from './deletepopup/deletepopup.component';
import { ToastrService } from 'ngx-toastr';
import { SharedCommonModule } from '../../../../app/apimodule/api.module';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedCommonModule, HttpClientModule, MatDialogModule, DeletePopupComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {
  categories: Category[] = [];
  categoryForm!: FormGroup;
  isEditMode = false;
  showForm = false;
  currentCategoryId: number | null = null;
  catData: any = [
    { id: 1, categoryName: 'Shirt', categoryDescription: 'Cotton Shirt' },
    { id: 1, categoryName: 'T-Shirt', categoryDescription: 'Casual t-shirts' },
    { id: 1, categoryName: 'Jeans', categoryDescription: 'Denim jeans' },
    { id: 1, categoryName: 'Jeans', categoryDescription: 'Denim jeans' },
  ];

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private toast: ToastrService,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadCategories();
  }

  // Initialize Reactive Form
  initForm(): void {
    this.categoryForm = this.fb.group({
      categoryName: ['', Validators.required],
      categoryDescription: ['']
    });
  }

  // Load all categories
  loadCategories(): void {
    // this.categories = this.catData;
    this.categoryService.getCategoriesMasterList().subscribe((data: any) => {
      this.categories = data.result;
    });
  }

  // Open panel for new category
  onAdd(): void {
    this.isEditMode = false;
    this.currentCategoryId = null;
    this.categoryForm.reset();
    this.showForm = true;
  }

  // Open panel with existing category data
  onEdit(category: Category): void {
    this.isEditMode = true;
    this.currentCategoryId = category.id!;
    this.categoryForm.patchValue({
      categoryName: category.categoryName,
      categoryDescription: category.categoryDescription
    });
    this.showForm = true;
  }

  // Save new or updated category
  onSubmit(): void {
    if (this.categoryForm.invalid) return;
    const categoryData: Category = this.categoryForm.value;
    if (this.isEditMode && this.currentCategoryId !== null) {
      this.categoryService.updateCategoryMaster(this.currentCategoryId, categoryData)
        .subscribe((res:any) => {
          if (res.code == 200) {
            this.loadCategories();
            this.onCancel();
            this.toast.success(res.message);
          }
          if (res.code == 202){
            this.toast.success(res.message);
          }          
        });
    } else {
      this.categoryService.postCategoryMaster(categoryData)
        .subscribe((res:any) => {
          if (res.code == 200) {
            this.loadCategories();
            this.onCancel();
            this.toast.success(res.message);
          }
          if (res.code == 202){
            this.toast.success(res.message);
          }   
        });
    }
  }

  // Delete category by ID
  onDelete(id: any): void {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.deleteCategoryMaster(id._id).subscribe((res: any) => {
        if (res.code == 200) {
          this.loadCategories();
          this.toast.success(res.message)
        }
      });
    }

    // const dialogRef = this.dialog.open(DeletePopupComponent, {
    //   width: '400px',  // Popup width
    //   data: {
    //     title: 'Delete Category',
    //     message: `Are you sure you want to delete "${id.categoryName}"?`
    //   },
    //   disableClose: true,      // Optional: prevent clicking outside to close
    //   panelClass: 'custom-dialog-container', // Optional: for custom styling
    //   enterAnimationDuration: '300ms',
    //   exitAnimationDuration: '200ms',
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     this.categoryService.deleteCategoryMaster(id._id).subscribe((res:any) => {
    //       if (res.success == true) {
    //          this.loadCategories();
    //          this.toast.success('Deleted Successfully..!!')
    //}
    //     });
    //   }
    // });
  }

  // Close the panel
  onCancel(): void {
    this.showForm = false;
    this.categoryForm.reset();
    this.isEditMode = false;
    this.currentCategoryId = null;
  }
}
