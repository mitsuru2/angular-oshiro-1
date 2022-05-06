import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShiromusumeListComponent } from './shiromusume-list/shiromusume-list.component';
import { ShiromusumeNewComponent } from './shiromusume-new/shiromusume-new.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'shiromusume-list', component: ShiromusumeListComponent },
  { path: 'shiromusume-new', component: ShiromusumeNewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
