import { SiteKitConfig, SITE_KIT_SCHEMA_VERSION } from '@ilia-ae/site-kit';

/**
 * deposit.mayday.software — configuration for @ilia-ae/site-kit.
 *
 * The site's chrome comes from the shared kit, like mayday.software:
 *   - ik-nav topbar (links below; deposit's own lang/theme services and the PWA install button
 *     are projected into [slot=actions]);
 *   - ik-footer: brand + Proof / Source / Legal columns, © year → /qr, © glyph → /authorship,
 *     MIT license panel, tech badges, verify shield + GitHub/website icons;
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

    technologies: [
        { kind: 'angular', version: '21' },
        { kind: 'typescript', version: '5.9' },
        { kind: 'cloudflare' },
        { kind: 'bitcoin' },
        { name: 'OTS', url: 'https://opentimestamps.org', color: '#1a73e8' },
    ],

    footer: {
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
