import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CommonTableComponent } from '../../../../shared/components/common-table/common-table.component';
import { ProductService } from '../../../services/productService/product.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonButtonComponent } from '../../../../shared/components/common-button/common-button.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, CommonTableComponent, FormsModule, ReactiveFormsModule,CommonButtonComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  productData: any = [];
  productColumns: any = [
    { field: 'Category', header: 'category' },
    { field: 'ProductName', header: 'productName' },
    { field: 'ProductDescription', header: 'productDescription' },
    { field: 'Colors', header: 'colors' },
    { field: 'Gender', header: 'gender' },
    { field: 'Images', header: 'images' },
    { field: 'Gallery', header: 'gallery' },
    // { field: 'inStockName', header: 'inStock' },
    // { field: 'isFeatured', header: 'isFeatured' },
    { field: 'Price', header: 'price' },
    // { field: 'rating', header: 'rating' },
    { field: 'Sizes', header: 'sizes' },
    // { field: 'slug', header: 'slug' },
    { field: 'Stock', header: 'stock' },
    { field: 'Tags', header: 'tags' },
    // { field: 'discountPrice', header: 'discountPrice' },
  ]
  mode: 'add' | 'edit' | 'view' = 'add';
  showForm = false;
  userFlag: string = 'View';
  userForm: FormGroup;

  constructor(
    private product: ProductService,
    private fb: FormBuilder,
  ) {
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

  ngOnInit(): void {
    this.productList();
  }

  productList() {
    this.product.getProductlist().subscribe((res) => {
      if (res.success === true || res.code === 200) {
        this.productData = res.result
      }

    })
  }
  applyFilter(event: Event): void {

  }
  editOption(event: { row: any, type: string; }) {
  }
  onAdd(): void {
    this.mode = 'add';
  }

  onCancel(mode: string): void {
    if (mode === "cancel") {

    }
  }

  onSubmit(): void {
  }
}
