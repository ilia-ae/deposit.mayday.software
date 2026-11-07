import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IkLicense } from '@ilia-ae/site-kit';
import { UiSection } from '@/app/ui/ui-section';

/** /license — the MIT License (config.license, text from the kit's licence bank, years filled); the footer links here. */
@Component({
    selector: 'app-license',
    standalone: true,
    imports: [IkLicense, UiSection],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `<ui-section><ik-license /></ui-section>`,
})
export class LicensePage {}
