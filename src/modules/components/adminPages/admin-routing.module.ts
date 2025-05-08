import { RouterModule, Routes } from "@angular/router";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { NgModule } from "@angular/core";
import { UsermanagementComponent } from "./usermanagement/usermanagement.component";

export const routes: Routes = [
    { path: '', component: AdminDashboardComponent },
    { path: 'user', component: UsermanagementComponent }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AdminRoutingModule { }