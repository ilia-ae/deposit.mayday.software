import { SiteKitConfig, SITE_KIT_SCHEMA_VERSION } from '@ilia-ae/site-kit';

/**
 * deposit.mayday.software — configuration for @ilia-ae/site-kit.
 *
 * The site's chrome comes from the shared kit, like mayday.software:
 *   - ik-nav topbar (links below; deposit's own lang/theme services and the PWA install button
 *     are projected into [slot=actions]);
 *   - ik-footer: brand + Proof / Source / Legal columns, © year → /qr, © glyph → /authorship,
 *     MIT license, the stack as badges, the family of our sites as logo chips, verify shield +
 *     GitHub/website icons;
 *   - ik-contact-qr powers /qr, ik-status-page the 404, ik-license /license,
 *     ik-authorship-validator /authorship (deposit's own /verify checks deposits, not authorship).
 *   - No cookie banner: the site sets no cookies and has no analytics (its privacy policy, §3).
 *
 * Design: deposit's tokens.scss already defines the kit's custom properties (amber --brand,
 * --bg, --text, --font-brand…) for light and html.app-dark, loaded after the kit's token set,
 * so the kit takes deposit's look. i18n stays on ngx-translate (LanguageService); kit components
 * get [lang], and the text here is { en, ru }, 1:1 with public/i18n/{en,ru}.json.
 */

const GITHUB = 'https://github.com/ilia-ae/deposit.mayday.software';
const SITE = 'https://deposit.mayday.software';

/** deposit's download glyph (currentColor) — the nav/footer mark and the QR centre emblem. */
const GLYPH =
    '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<path d="M7 10 L12 15 L17 10" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>' +
    '<path d="M12 4 L12 14" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>' +
    '<path d="M5 19 L19 19" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>' +
    '</svg>';

/** Badge icons for the technologies the kit has no icon for (currentColor, 24×24). */
const svg = (body: string) =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;
const ICON = {
    clock: svg('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
    stamp: svg('<path d="M9 3h6v5l-1 3h-4l-1-3z"/><path d="M5 14h14v3H5z"/><path d="M4 21h16"/>'),
    key: svg('<circle cx="8" cy="15" r="4"/><path d="m10.8 12.2 7.7-7.7M16 7l2 2M14 9l1.5 1.5"/>'),
    hash: svg('<path d="M5 9h14M5 15h14M10 4 8 20M16 4l-2 16"/>'),
    prime: svg('<path d="M12 3 4 7v10l8 4 8-4V7z"/><path d="M12 12 4 7M12 12l8-5M12 12v9"/>'),
};

export const DEPOSIT_CONFIG: SiteKitConfig = {
    schemaVersion: SITE_KIT_SCHEMA_VERSION,
    brand: {
        name: 'deposit',
        monogram: 'D',
        url: SITE,
        glyph: GLYPH,
        tagline: {
            en: 'Open source · Files stay in your browser · Forever verifiable',
            ru: 'Открытый код · Файлы не покидают браузер · Проверяется навсегда',
        },
    },
    languages: ['en', 'ru'],
    defaultLang: 'en',
    copyright: { holder: 'mayday.software', startYear: 2026 },
    license: 'mit',
    // the year → /qr (contact card); the © glyph and the verify shield → /authorship
    deploy: { target: 'cloudflare', routes: { qr: '/qr', verify: '/authorship' } },

    nav: [
        { label: { en: 'Deposit files', ru: 'Депонировать' }, url: '/' },
        { label: { en: 'How it works', ru: 'Как это работает' }, url: '/how' },
        { label: { en: 'Verify a deposit', ru: 'Проверить депозит' }, url: '/verify' },
    ],

    // What deposit is made of and anchors into — each one is in its code or package-lock.json.
    technologies: [
        { kind: 'angular', version: '21' },
        { kind: 'typescript', version: '5.9' },
        { kind: 'tailwind', version: '4.2' },
        { name: 'PrimeNG', url: 'https://primeng.org', color: '#10b981', version: '21', icon: ICON.prime },
        { kind: 'cloudflare', url: 'https://workers.cloudflare.com' }, // Workers: the /api proxy + static assets
        { kind: 'bitcoin' },
        { name: 'OpenTimestamps', url: 'https://opentimestamps.org', color: '#1a73e8', icon: ICON.clock },
        { kind: 'ethereum', name: 'Base L2', url: 'https://base.org', color: '#0052ff' },
        { name: 'RFC 3161', url: 'https://datatracker.ietf.org/doc/html/rfc3161', color: '#64748b', icon: ICON.stamp },
        { name: 'OpenPGP.js', url: 'https://openpgpjs.org', color: '#e04e39', version: '6.3', icon: ICON.key },
        { name: 'Streebog', url: 'https://datatracker.ietf.org/doc/html/rfc6986', color: '#d52b1e', icon: ICON.hash },
    ],

    footer: {
        // "our projects": the ILIA family as real-logo chips (deposit itself is left out)
        projects: true,
        subtitle: { en: 'by mayday.software', ru: 'от mayday.software' },
        disclaimer: {
            en: 'All hashing and signing runs locally in your browser. We do not store or transmit your files. Open-source.',
            ru: 'Хеширование и подпись выполняются локально в браузере. Мы не храним и не передаём ваши файлы. Открытый код.',
        },
        columns: [
            {
                title: { en: 'Proof', ru: 'Доказательство' },
                links: [
                    { label: 'OpenTimestamps', url: 'https://opentimestamps.org' },
                    { label: 'Bitcoin', url: 'https://bitcoin.org' },
                    { label: 'CITATION.cff', url: 'https://citation-file-format.github.io' },
                    { label: 'RFC 3161', url: 'https://datatracker.ietf.org/doc/html/rfc3161' },
                ],
            },
            {
                title: { en: 'Source', ru: 'Исходный код' },
                links: [
                    { label: 'GitHub', url: GITHUB },
                    { label: 'Angular', url: 'https://angular.dev' },
                    { label: 'TypeScript', url: 'https://www.typescriptlang.org' },
                ],
            },
            {
                title: { en: 'Legal', ru: 'Правовое' },
                links: [
                    { label: { en: 'Privacy policy', ru: 'Политика конфиденциальности' }, url: '/privacy' },
                    { label: { en: 'Terms of service', ru: 'Пользовательское соглашение' }, url: '/terms' },
                    {
                        label: { en: 'Berne Convention', ru: 'Бернская конвенция' },
                        url: 'https://www.wipo.int/treaties/en/ip/berne/',
                    },
                    { label: 'eIDAS 910/2014', url: 'https://eur-lex.europa.eu/eli/reg/2014/910/oj' },
                ],
            },
        ],
    },

    // footer icon row: GitHub + the author's site (ru → ilia.ae, en → ilia.ae/en/)
    social: [
        { kind: 'github', url: GITHUB },
        { kind: 'website', url: 'https://ilia.ae', pathByLang: { en: '/en/' } },
    ],

    contact: {
        shareLayout: 'inline',
        qr: {
            data: SITE,
            corners: 'solid',
            lede: {
                en: 'Prove you created your files first. Hash in browser + anchor in Bitcoin and RFC 3161 = proof valid forever.',
                ru: 'Докажите, что файлы созданы вами первыми. Хеш в браузере + якорь в Bitcoin и RFC 3161 = доказательство навсегда.',
            },
            caption: {
                en: 'Scan to anchor authorship of your files in Bitcoin in 2 minutes. Free, no account, files never leave your browser.',
                ru: 'Отсканируйте, чтобы закрепить авторство файлов в Bitcoin за 2 минуты. Бесплатно, без аккаунта, файлы не покидают браузер.',
            },
        },
        share: ['native', 'copy', 'email', 'linkedin', 'facebook', 'whatsapp', 'telegram', 'x', 'vk'],
        quickLinks: [
            { label: { en: 'Open site', ru: 'Открыть сайт' }, url: SITE },
            { label: { en: 'How it works', ru: 'Как это работает' }, url: `${SITE}/how` },
            { label: { en: 'Verify', ru: 'Проверить' }, url: `${SITE}/verify` },
            { label: 'GitHub', url: GITHUB, external: true },
        ],
    },
};
