import { Routes } from '@angular/router';
import { HomeComponent } from '../components/userPages/home/home.component';
import { CategoryComponent } from '../components/adminPages/category/category.component';
import { LoginComponent } from '../components/authentication/login/login.component';
import { ResetpasswordComponent } from '../components/authentication/resetpassword/resetpassword.component';
import { UsermanagementComponent } from '../components/adminPages/usermanagement/usermanagement/usermanagement.component';

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
