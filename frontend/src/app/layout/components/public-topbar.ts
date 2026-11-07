import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IkThemeMode, LangSwitcher, Nav, ThemeToggle } from '@ilia-ae/site-kit';
import { LanguageService } from '@/app/shared/services/language.service';
import { ThemeService } from '@/app/shared/services/theme.service';
import { PwaService } from '@/app/shared/services/pwa.service';

/**
 * Public topbar — @ilia-ae/site-kit's ik-nav. Links come from DEPOSIT_CONFIG.nav (desktop row +
 * numbered mobile overlay). Language and theme stay deposit's own state (LanguageService /
 * ThemeService): the kit's controlled switchers are projected into [slot=actions] and bridged to
 * them. The PWA install button (PwaService) is projected too, shown only when installable.
 */
@Component({
    selector: 'app-public-topbar',
    standalone: true,
    imports: [TranslateModule, Nav, LangSwitcher, ThemeToggle],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <ik-nav [lang]="lang.currentLang()">
            <ik-lang-switcher slot="actions" [compact]="true" [current]="lang.currentLang()" (langChange)="lang.use($event)" />
            <ik-theme-toggle slot="actions" [compact]="true" (themeChange)="onTheme($event)" />
            @if (pwa.canInstall()) {
                <button
                    slot="actions"
                    type="button"
                    class="install-btn"
                    (click)="installApp()"
                    [attr.aria-label]="'pwa.install' | translate"
                    [title]="'pwa.install' | translate"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                </button>
            }
        </ik-nav>
    `,
    styles: [
        `
            :host {
                display: block;
            }
            .install-btn {
                display: inline-grid;
                place-items: center;
                width: 32px;
                height: 32px;
                border: 1px solid transparent;
                border-radius: var(--r-sm, 8px);
                background: none;
                color: var(--text-mute);
                cursor: pointer;
                transition:
                    background var(--dur-fast, 150ms) var(--ease-out, ease),
                    color var(--dur-fast, 150ms) var(--ease-out, ease),
                    border-color var(--dur-fast, 150ms) var(--ease-out, ease);
            }
            .install-btn:hover {
                background: var(--bg-mute);
                color: var(--brand);
                border-color: var(--border-strong);
            }
        `,
    ],
})
export class PublicTopbar {
    readonly lang = inject(LanguageService);
    readonly theme = inject(ThemeService);
    readonly pwa = inject(PwaService);

    /** Keep ThemeService (the app-wide theme owner) in sync with the kit toggle. */
    onTheme(mode: IkThemeMode): void {
        this.theme.setMode(mode);
    }

    async installApp(): Promise<void> {
        await this.pwa.install();
    }
}
