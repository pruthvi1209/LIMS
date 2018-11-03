import {  NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { UserProfileComponent } from './userProfile/userProfile.component';
import { AdminLoginComponent } from './auth/adminLogin/adminLogin.component';

const routes: Routes = [
    {path: '', component: WelcomeComponent},
    {path: 'userProfile', component: UserProfileComponent},
    {path: 'adminProfile', component: AdminLoginComponent},

];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule{}