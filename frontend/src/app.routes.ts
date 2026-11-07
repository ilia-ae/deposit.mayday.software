import { Routes } from '@angular/router';
import { PublicLayout } from '@/app/layout/components/public-layout';

export const appRoutes: Routes = [
    { path: 'qr', loadComponent: () => import('@/app/pages/qr/qr').then((c) => c.QrPage) },
    {
        path: '',
        component: PublicLayout,
        children: [
            { path: '', loadComponent: () => import('@/app/pages/home/home').then((c) => c.HomePage) },
            { path: 'how', loadComponent: () => import('@/app/pages/how/how').then((c) => c.HowPage) },
            { path: 'verify', loadComponent: () => import('@/app/pages/verify/verify').then((c) => c.VerifyPage) },
            { path: 'privacy', data: { kind: 'privacy' }, loadComponent: () => import('@/app/pages/legal/legal').then((c) => c.LegalPage) },
            { path: 'terms', data: { kind: 'terms' }, loadComponent: () => import('@/app/pages/legal/legal').then((c) => c.LegalPage) },
            { path: 'license', loadComponent: () => import('@/app/pages/license/license').then((c) => c.LicensePage) },
            { path: 'authorship', loadComponent: () => import('@/app/pages/authorship/authorship').then((c) => c.AuthorshipPage) }
        ]
    },
    // top level, not under the layout: a nested '**' would swallow sibling top-level routes
    { path: '**', loadComponent: () => import('@/app/pages/not-found/not-found').then((c) => c.NotFoundPage) }
];
