import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Footer, SocialLinks, VerifyBadge } from '@ilia-ae/site-kit';
import { LanguageService } from '@/app/shared/services/language.service';

/**
 * Public footer — @ilia-ae/site-kit's ik-footer, driven by DEPOSIT_CONFIG: brand + Proof / Source /
 * Legal columns, © glyph → /authorship, year → /qr, MIT license panel, tech badges. The brand
 * column's icon row (slot=extra) is the verify shield + GitHub and the author's site. Follows the
 * active language via [lang].
 */
@Component({
    selector: 'app-public-footer',
    standalone: true,
    imports: [Footer, SocialLinks, VerifyBadge],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <ik-footer [lang]="lang.currentLang()">
            <ik-verify-badge slot="extra" [iconOnly]="true" [lang]="lang.currentLang()" />
            <ik-social-links slot="extra" [lang]="lang.currentLang()" />
        </ik-footer>
    `,
})
export class PublicFooter {
    readonly lang = inject(LanguageService);
}
