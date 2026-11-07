import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IkThemeMode, LangSwitcher, LocalizedString, ContactQr, ThemeToggle } from '@ilia-ae/site-kit';
import { LanguageService } from '@/app/shared/services/language.service';
import { ThemeService } from '@/app/shared/services/theme.service';

/**
 * /qr — the full-screen business card: @ilia-ae/site-kit's ik-contact-qr (QR with the deposit
 * glyph, share grid, quick links), driven by DEPOSIT_CONFIG.contact. Outside the public layout;
 * language and theme are deposit's services, their kit switchers projected into [slot=actions].
 */
@Component({
    selector: 'app-qr',
    standalone: true,
    imports: [ContactQr, LangSwitcher, ThemeToggle],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <ik-contact-qr [lang]="lang.currentLang()" [eyebrow]="eyebrow">
            <ik-lang-switcher slot="actions" [compact]="true" [current]="lang.currentLang()" (langChange)="lang.use($event)" />
            <ik-theme-toggle slot="actions" [compact]="true" (themeChange)="onTheme($event)" />
        </ik-contact-qr>
    `,
    styles: [
        `
            :host {
                display: flex;
                flex-direction: column;
                justify-content: center;
                min-height: 100dvh;
                background: var(--bg);
            }
            ik-contact-qr {
                display: block;
                width: 100%;
            }
        `,
    ],
})
export class QrPage {
    readonly lang = inject(LanguageService);
    readonly theme = inject(ThemeService);

    readonly eyebrow: LocalizedString = { en: 'Card', ru: 'Визитка' };

    onTheme(mode: IkThemeMode): void {
        this.theme.setMode(mode);
    }
}
