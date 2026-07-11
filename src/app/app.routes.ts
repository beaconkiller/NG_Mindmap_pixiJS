import { Routes } from '@angular/router';
import { PMainComponent } from './comps/p-main/p-main.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/exp', // Redirects base URL to '/home'
        pathMatch: 'full' // Ensures the entire path is matched
    },
    {
        path: 'exp',
        component: PMainComponent,
    },

];
