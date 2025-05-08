import { Routes } from '@angular/router';
import { LoginComponent } from '../modules/components/authentication/login/login.component';
import { ResetpasswordComponent } from '../modules/components/authentication/resetpassword/resetpassword.component';
import { RoleGuard } from '../shared/core/role.guard';
import { HomeComponent } from '../modules/components/userPages/home/home.component';

export const routes: Routes = [
    {
        path: '', component: HomeComponent
    },
    {
        path: 'admin',
        loadChildren: () => import('../modules/components/adminPages/admin.module').then(m => m.AdminModule),
        canActivate: [RoleGuard],
        data: { roles: ['admin'] }
    },
    {
        path: 'user',
        loadChildren: () => import('../modules/components/userPages/user.module').then(m => m.UserModule),
        canActivate: [RoleGuard],
        data: { roles: ['user'] }
    },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'reset-password/:token', component: ResetpasswordComponent
    },
];
