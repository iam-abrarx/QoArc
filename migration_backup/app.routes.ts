import {Routes} from '@angular/router';
import {Home} from './home';
import {Services} from './services';
import {Lab} from './lab';
import {About} from './about';
import {Contact} from './contact';
import {Portfolio} from './portfolio';
import {Admin} from './admin';

export const routes: Routes = [
  {path: '', component: Home},
  {path: 'services', component: Services},
  {path: 'lab', component: Lab},
  {path: 'portfolio', component: Portfolio},
  {path: 'about', component: About},
  {path: 'contact', component: Contact},
  {path: 'admin', component: Admin},
  {path: '**', redirectTo: ''},
];
