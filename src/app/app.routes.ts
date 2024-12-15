import { Routes } from '@angular/router';
import { ProductListComponent } from "./features/products/product-list/product-list.component";
import { ProductCreateComponent } from "./features/products/product-create/product-create.component";
import { ProductEditComponent } from "./features/products/product-edit/product-edit.component";

export const routes: Routes = [
  {
    path: '',
    title: 'Listado de productos',
    component: ProductListComponent,
  },
  {
    path: 'products',
    title: 'Listado de productos',
    component: ProductListComponent,
  },
  {
    path: 'products/create',
    title: 'Crear producto',
    component: ProductCreateComponent,
  },
  {
    path: 'products/:id',
    title: 'Editar producto',
    component: ProductEditComponent,
  },
];
