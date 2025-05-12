import { RouterModule, Routes } from "@angular/router";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { NgModule } from "@angular/core";
import { SidenavComponent } from "./sidenav/sidenav.component";

export const routes: Routes = [
    {
        path: '', component: SidenavComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, 
            { path: 'dashboard', component: AdminDashboardComponent },
            {
                path: 'userss',
                loadComponent: () => import('./usermanagement/usermanagement.component').then(m => m.UsermanagementComponent)
              }
        ]
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }