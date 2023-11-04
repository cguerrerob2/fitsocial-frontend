import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { TrainingComponent } from './components/training/training.component';
import { SearchtrainingComponent } from './components/searchtraining/searchtraining.component';
import { AccountDetailsComponent } from './components/account-details/account-details.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  // {path: '**', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'training', component: TrainingComponent},
  {path: 'searchtraining', component: SearchtrainingComponent},
  {path: 'profile', component: AccountDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
