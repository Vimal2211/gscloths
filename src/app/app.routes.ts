import { Routes } from '@angular/router';
import { CategoryComponent } from '../modules/components/adminPages/category/category.component';
import { UsermanagementComponent } from '../modules/components/adminPages/usermanagement/usermanagement.component';
import { LoginComponent } from '../modules/components/authentication/login/login.component';
import { ResetpasswordComponent } from '../modules/components/authentication/resetpassword/resetpassword.component';
import { HomeComponent } from '../modules/components/userPages/home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: 'category', component: CategoryComponent
    },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'reset-password/:token', component: ResetpasswordComponent
    },

    {
        path: 'user', component: UsermanagementComponent
    },
];
