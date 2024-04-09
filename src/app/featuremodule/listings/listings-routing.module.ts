import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListingsComponent } from './listings.component';

const routes: Routes = [
  { path: '', component: ListingsComponent,children:[
  {
    path: 'listing-list-sidebar',
    loadChildren: () =>
      import('./listing-list-sidebar/listing-list-sidebar.module').then(
        (m) => m.ListingListSidebarModule
      ),
  }
  ] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListingsRoutingModule {}
