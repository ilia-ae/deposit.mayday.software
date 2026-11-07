import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PublicTopbar } from './public-topbar';
import { PublicFooter } from './public-footer';
import { PwaIndicators } from './pwa-indicators';

@Component({
    selector: 'app-public-layout',
    standalone: true,
    imports: [RouterOutlet, TranslateModule, PublicTopbar, PublicFooter, PwaIndicators],
    template: `
        <div class="shell">
            <a class="skip-link" href="#main-content">{{ 'a11y.skipLink' | translate }}</a>

            <app-public-topbar />

            <main id="main-content" role="main" [attr.aria-label]="'a11y.mainContent' | translate">
                <router-outlet />
            </main>

            <app-public-footer />

            <app-pwa-indicators />
        </div>
    `,
    styles: [`
        .shell {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }
        main {
            flex: 1;
            display: flex;
            flex-direction: column;
            padding-top: 56px;
        }
    `]
})
export class PublicLayout {}
