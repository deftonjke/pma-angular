import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { ExpCheckGuard } from './core/guards/exp-check.guard';
import { NotAuthGuard } from './core/guards/not-auth.guard';
import { NotFoundPageComponent } from './core/pages/not-found-page/not-found-page.component';
import { SearchResultsPageComponent } from './core/pages/search-results-page/search-results-page/search-results-page.component';
import { WelcomePageComponent } from './core/pages/welcome-page/welcome-page.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./boards/boards.module').then(m => m.BoardsModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'welcome',
    component: WelcomePageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    canActivate: [NotAuthGuard, ExpCheckGuard],
  },
  {
    path: 'search-results',
    component: SearchResultsPageComponent,
    canActivate: [NotAuthGuard, ExpCheckGuard],
  },
  {
    path: '404',
    component: NotFoundPageComponent,
  },
  {
    path: '**',
    redirectTo: '404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
