import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './core/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { LoggedInGuard } from './guards/logged-in.guard';
import { AdminRoutingModule } from './core/admin/admin-routing.module';
import { AdminGuard } from './guards/admin.guard';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: 'layout', component: AppLayoutComponent,canActivate:[LoggedInGuard],
                children: [
                    { path: 'user', loadChildren: () => import('./core/user/user.module').then(m => m.UserModule), },
                    { path: 'admin', loadChildren: () => import('./core/admin/admin.module').then(m => m.AdminModule), canActivate:[AdminGuard] },
                    { path: 'dashboard', loadChildren: () => import('./core/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'uikit', loadChildren: () => import('./core/components/uikit/uikit.module').then(m => m.UIkitModule) },
                    { path: 'utilities', loadChildren: () => import('./core/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
                    { path: 'documentation', loadChildren: () => import('./core/components/documentation/documentation.module').then(m => m.DocumentationModule) },
                    { path: 'blocks', loadChildren: () => import('./core/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
                    { path: 'pages', loadChildren: () => import('./core/components/pages/pages.module').then(m => m.PagesModule) }
                ]
            },
            { path: 'auth', loadChildren: () => import('./core/components/auth/auth.module').then(m => m.AuthModule) },
            { path: '', loadChildren: () => import('./core/general/landing/landing.module').then(m => m.LandingModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: 'general', loadChildren: () => import('./core/general/general.module').then(m => m.GeneralModule) },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
