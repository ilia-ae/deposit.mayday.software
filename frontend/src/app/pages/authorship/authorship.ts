import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthorshipValidator } from '@ilia-ae/site-kit';
import { LanguageService } from '@/app/shared/services/language.service';

/**
 * /authorship — who made this site, and when: @ilia-ae/site-kit's ik-authorship-validator. The
 * footer's © glyph and verify shield link here (deploy.routes.verify). It loads the published
 * attestation (public/authorship/) and checks, in the browser, WHO (the detached SSH signature, a hardware key)
 * and WHEN (the OpenTimestamps proof). Not /verify: that page verifies a user's deposit.
 */
@Component({
    selector: 'app-authorship',
    standalone: true,
    imports: [AuthorshipValidator],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `<ik-authorship-validator [lang]="lang.currentLang()" [proof]="proof" [homeHref]="'/'" />`,
})
export class AuthorshipPage {
    protected readonly lang = inject(LanguageService);

    protected readonly proof = {
        manifest: '/authorship/CITATION.cff',
        key: '/authorship/signing-key.pub',
        signature: '/authorship/CITATION.cff.sig',
        proofs: ['/authorship/CITATION.cff.ots'],
    };
}
