import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LanguageService } from '@/app/shared/services/language.service';
import { ThemeService } from '@/app/shared/services/theme.service';

/** Root: language and theme start here, so every route (the layout, /qr, /authorship, the 404) has them. */
@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule],
    template: `<router-outlet></router-outlet>`
})
export class AppComponent {
    constructor() {
        inject(LanguageService).init();
        inject(ThemeService).init();
    }
}
