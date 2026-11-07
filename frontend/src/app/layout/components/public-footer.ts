import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Footer, VerifyBadge } from '@ilia-ae/site-kit';
import { LanguageService } from '@/app/shared/services/language.service';

/**
 * Public footer — @ilia-ae/site-kit's ik-footer, driven by DEPOSIT_CONFIG: brand + Proof / Source /
 * Legal columns, © glyph → /authorship, year → /qr, MIT license, tech badges. Under the brand
 * text (footer.extras: 'brand'): the verify shield (slot=extra) and our other sites. GitHub is in the
 * Source column and ilia.ae is the first site chip, so no separate social icons. Follows the active
 * language via [lang].
 */
@Component({
    selector: 'app-public-footer',
    standalone: true,
    imports: [Footer, VerifyBadge],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <ik-footer [lang]="lang.currentLang()">
            <ik-verify-badge slot="extra" [iconOnly]="true" [lang]="lang.currentLang()" />
        </ik-footer>
    `,
})
export class PublicFooter {
    readonly lang = inject(LanguageService);
}
