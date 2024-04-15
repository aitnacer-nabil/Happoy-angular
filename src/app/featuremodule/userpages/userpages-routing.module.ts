import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserpagesComponent } from './userpages.component';
import {AuthGuard} from "../../auth.guard";

const routes: Routes = [
  { path: '', component: UserpagesComponent,children:[
    {
    path: 'add-listing',
    loadChildren: () =>
      import('./add-listing/add-listing.module').then(
        (m) => m.AddListingModule
      ),
      canActivate: [AuthGuard]
  },

  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'messages',
    loadChildren: () =>
      import('./messages/messages.module').then((m) => m.MessagesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'my-listing',
    loadChildren: () =>
      import('./my-listing/my-listing.module').then((m) => m.MyListingModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfileModule),
    canActivate: [AuthGuard]
  }

  ], canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserpagesRoutingModule {}
