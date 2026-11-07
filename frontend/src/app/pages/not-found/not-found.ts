import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { StatusPage } from '@ilia-ae/site-kit';
import { LanguageService } from '@/app/shared/services/language.service';

/**
 * 404 — @ilia-ae/site-kit's ik-status-page. wrangler.toml keeps
 * not_found_handling = "single-page-application", so an unknown URL serves index.html and the
 * `**` route renders this page in-app (client routes keep working; no static 404.html).
 */
@Component({
    selector: 'app-not-found',
    standalone: true,
    imports: [StatusPage],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `<ik-status-page [code]="404" [lang]="lang.currentLang()" [languages]="[lang.currentLang()]" />`,
})
export class NotFoundPage {
    protected readonly lang = inject(LanguageService);
}
