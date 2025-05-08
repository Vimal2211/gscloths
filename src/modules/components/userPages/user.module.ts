import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { UerRoutingModule } from './user-routing.module';


@NgModule({

    imports: [
        CommonModule,
        UerRoutingModule,
        HomeComponent
    ]
})
export class UserModule { }
