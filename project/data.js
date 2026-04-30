// Données des groupes d'idoles + événements
//
// ⚠️ NOTE IMPORTANTE :
// - KENI BOYS est un groupe FICTIF inventé pour la démo.
// - Les autres groupes sont RÉELS et leurs dates sont issues de sources publiques
//   (sites officiels, Billboard, Songkick, etc.) — vérifiées en avril 2026.
// - Les dates marquées { unverified: true } sont spéculatives / pas encore annoncées
//   officiellement à la date de cette compilation. Affichées en pointillés dans l'UI.

window.IDOL_GROUPS = [
  {
    id: 'keni-boys',
    name: 'KENI BOYS',
    nameJp: 'ケニーボーイズ',
    type: 'BOYS',
    color: '#ff3ea5',
    color2: '#ffd400',
    debut: 2024,
    members: 7,
    fans: '勇者隊 (Yusha-tai)',
    bio: 'Groupe FICTIF inventé pour la démo. Énergie magical-boy, chorés absurdes et batailles de polochons en finale.',
    bioFr: '⚠️ Groupe FICTIF (démo). Magical-boy chaos.',
    tags: ['BOYS', 'CHAOS', 'NEW', 'FICTIF'],
    featured: true,
    fictional: true,
  },
  {
    id: 'babymetal',
    name: 'BABYMETAL',
    nameJp: 'ベビーメタル',
    type: 'METAL',
    color: '#1f2937',
    color2: '#fef2f2',
    debut: 2010,
    members: 3,
    fans: 'Kitsune',
    bio: 'Kawaii metal. Trio iconique, scène internationale.',
    bioFr: 'Kawaii metal. Trio iconique mondial.',
    tags: ['METAL', 'GLOBAL'],
  },
  {
    id: 'xg',
    name: 'XG',
    nameJp: 'エックスジー',
    type: 'GIRLS',
    color: '#0ea5e9',
    color2: '#e0f2fe',
    debut: 2022,
    members: 7,
    fans: 'ALPHAZ',
    bio: 'Septet HIPHOP/R&B, label XGALX. World Tour "The Core" en 2026.',
    bioFr: 'Septet hip-hop/R&B. World Tour "The Core" 2026.',
    tags: ['GIRLS', 'GLOBAL', 'HIPHOP'],
  },
  {
    id: 'atarashii-gakko',
    name: 'ATARASHII GAKKO!',
    nameJp: '新しい学校のリーダーズ',
    type: 'GIRLS',
    color: '#10b981',
    color2: '#d1fae5',
    debut: 2015,
    members: 4,
    fans: 'Seishun',
    bio: 'Uniformes scolaires, danse libre, seishun energy. Pas de date JP solo annoncée pour 2026 — surtout des festivals à l\'étranger (Lollapalooza Berlin 18-19 juil 2026).',
    bioFr: 'Uniformes, seishun. 2026 = principalement étranger.',
    tags: ['GIRLS', 'INDIE', 'COOL'],
  },
  {
    id: 'nogizaka46',
    name: 'Nogizaka46',
    nameJp: '乃木坂46',
    type: 'GIRLS',
    color: '#a855f7',
    color2: '#fce7f3',
    debut: 2011,
    members: 36,
    fans: 'Nogi-fans',
    bio: 'Groupe phare Sakamichi Series. Élégance et formations massives.',
    bioFr: 'Phare Sakamichi. Élégance.',
    tags: ['GIRLS', 'MAJOR'],
  },
  {
    id: 'sakurazaka46',
    name: 'Sakurazaka46',
    nameJp: '櫻坂46',
    type: 'GIRLS',
    color: '#ec4899',
    color2: '#fbcfe8',
    debut: 2020,
    members: 27,
    fans: 'Buddies',
    bio: 'Successeur de Keyakizaka46. Choré puissante, esthétique cool.',
    bioFr: 'Successeur Keyakizaka46. Chorés puissantes.',
    tags: ['GIRLS', 'COOL'],
  },
  {
    id: 'hinatazaka46',
    name: 'Hinatazaka46',
    nameJp: '日向坂46',
    type: 'GIRLS',
    color: '#fbbf24',
    color2: '#fef3c7',
    debut: 2019,
    members: 22,
    fans: 'Ohisama',
    bio: 'Le soleil du groupe Sakamichi. Pop joyeuse.',
    bioFr: 'Pop joyeuse et solaire.',
    tags: ['GIRLS', 'POP'],
  },
  {
    id: 'akb48',
    name: 'AKB48',
    nameJp: 'AKB48',
    type: 'GIRLS',
    color: '#ef4444',
    color2: '#fecaca',
    debut: 2005,
    members: 78,
    fans: 'AKB Fans',
    bio: 'Groupe légendaire d\'Akihabara. Théâtre permanent.',
    bioFr: 'Légendes d\'Akihabara avec théâtre permanent.',
    tags: ['GIRLS', 'LEGEND'],
  },
  {
    id: 'equal-love',
    name: '=LOVE',
    nameJp: 'イコールラブ',
    type: 'GIRLS',
    color: '#06b6d4',
    color2: '#cffafe',
    debut: 2017,
    members: 12,
    fans: '=LOVERS',
    bio: 'Produit par Rino Sashihara. Pop sucrée.',
    bioFr: 'Produit par Sashihara. Pop sucrée.',
    tags: ['GIRLS', 'INDIE'],
  },
  {
    id: 'momoiro',
    name: 'Momoiro Clover Z',
    nameJp: 'ももいろクローバーZ',
    type: 'GIRLS',
    color: '#f97316',
    color2: '#ffedd5',
    debut: 2008,
    members: 4,
    fans: 'Mononofu',
    bio: 'Pionnières du chaos kawaii. Stade et pyrotechnie.',
    bioFr: 'Pionnières du chaos kawaii.',
    tags: ['GIRLS', 'LEGEND', 'CHAOS'],
  },
];

// Villes
window.CITIES = {
  tokyo: { name: 'Tokyo', nameJp: '東京', region: 'Kanto' },
  osaka: { name: 'Osaka', nameJp: '大阪', region: 'Kansai' },
  kyoto: { name: 'Kyoto', nameJp: '京都', region: 'Kansai' },
  nagoya: { name: 'Nagoya', nameJp: '名古屋', region: 'Chubu' },
  yokohama: { name: 'Yokohama', nameJp: '横浜', region: 'Kanto' },
  fukuoka: { name: 'Fukuoka', nameJp: '福岡', region: 'Kyushu' },
  sapporo: { name: 'Sapporo', nameJp: '札幌', region: 'Hokkaido' },
  sendai: { name: 'Sendai', nameJp: '仙台', region: 'Tohoku' },
  hiroshima: { name: 'Hiroshima', nameJp: '広島', region: 'Chugoku' },
  okinawa: { name: 'Naha', nameJp: '那覇', region: 'Okinawa' },
  kobe: { name: 'Kobe', nameJp: '神戸', region: 'Kansai' },
  niigata: { name: 'Niigata', nameJp: '新潟', region: 'Chubu' },
  ibaraki: { name: 'Hitachi (Ibaraki)', nameJp: '茨城', region: 'Kanto' },
  chiba: { name: 'Chiba', nameJp: '千葉', region: 'Kanto' },
};

// Lieux concrets
window.VENUES = {
  // Tokyo / Kanto
  'tokyo-dome': { city: 'tokyo', name: 'Tokyo Dome', nameJp: '東京ドーム', cap: 55000 },
  'budokan': { city: 'tokyo', name: 'Nippon Budokan', nameJp: '日本武道館', cap: 14000 },
  'saitama-arena': { city: 'tokyo', name: 'Saitama Super Arena', nameJp: 'さいたまスーパーアリーナ', cap: 37000 },
  'akb-theater': { city: 'tokyo', name: 'AKB48 Theater', nameJp: 'AKB48劇場', cap: 250 },
  'shibuya-o-east': { city: 'tokyo', name: 'Spotify O-EAST', nameJp: 'スポティファイ オーイースト', cap: 1300 },
  'zepp-shinjuku': { city: 'tokyo', name: 'Zepp Shinjuku', nameJp: 'Zepp新宿', cap: 1500 },
  'zepp-haneda': { city: 'tokyo', name: 'Zepp Haneda', nameJp: 'Zepp羽田', cap: 1700 },
  'tokyo-garden-th': { city: 'tokyo', name: 'Tokyo Garden Theater', nameJp: '東京ガーデンシアター', cap: 8000 },
  'yokohama-arena': { city: 'yokohama', name: 'Yokohama Arena', nameJp: '横浜アリーナ', cap: 17000 },
  'k-arena-yokohama': { city: 'yokohama', name: 'K-Arena Yokohama', nameJp: 'Kアリーナ横浜', cap: 20000 },
  'hitachi-park': { city: 'ibaraki', name: 'Hitachi Seaside Park', nameJp: '国営ひたち海浜公園', cap: 50000 },
  'zozo-marine': { city: 'chiba', name: 'ZOZO Marine Stadium', nameJp: 'ZOZOマリンスタジアム', cap: 30000 },
  // Kansai
  'osaka-jo-hall': { city: 'osaka', name: 'Osaka-Jo Hall', nameJp: '大阪城ホール', cap: 16000 },
  'kyocera-dome': { city: 'osaka', name: 'Kyocera Dome', nameJp: '京セラドーム大阪', cap: 55000 },
  'zepp-namba': { city: 'osaka', name: 'Zepp Namba', nameJp: 'Zepp Namba', cap: 2200 },
  'expo70-park': { city: 'osaka', name: 'EXPO\'70 Park', nameJp: '万博記念公園', cap: 80000 },
  'kobe-world': { city: 'kobe', name: 'Kobe World Hall', nameJp: '神戸ワールド記念ホール', cap: 8000 },
  'kyoto-kaikan': { city: 'kyoto', name: 'Rohm Theatre', nameJp: 'ロームシアター京都', cap: 2000 },
  // Chubu
  'ig-arena': { city: 'nagoya', name: 'IG Arena', nameJp: 'IGアリーナ', cap: 17000 },
  'nagoya-dome': { city: 'nagoya', name: 'Vantelin Dome', nameJp: 'バンテリンドーム', cap: 40000 },
  'niigata-toki': { city: 'niigata', name: 'Toki Messe', nameJp: '朱鷺メッセ', cap: 10000 },
  // Sud
  'fukuoka-paypay': { city: 'fukuoka', name: 'PayPay Dome', nameJp: 'PayPayドーム', cap: 40000 },
  'sapporo-dome': { city: 'sapporo', name: 'Sapporo Dome', nameJp: '札幌ドーム', cap: 41000 },
  'sendai-sunplaza': { city: 'sendai', name: 'Sendai Sun Plaza', nameJp: '仙台サンプラザ', cap: 2700 },
  'hiroshima-green': { city: 'hiroshima', name: 'Hiroshima Green Arena', nameJp: '広島グリーンアリーナ', cap: 10000 },
  'okinawa-civic': { city: 'okinawa', name: 'Okinawa Civic Hall', nameJp: '那覇市民会館', cap: 1700 },
};

const D = (y, m, d, h = 19, min = 0) => new Date(y, m - 1, d, h, min).toISOString();

window.EVENTS = [
  // ════════════════════════════════════════════════════════════
  // KENI BOYS — FICTIF (clairement marqué)
  // ════════════════════════════════════════════════════════════
  { id: 'k01', group: 'keni-boys', venue: 'shibuya-o-east', date: D(2026, 5, 2, 18, 30), kind: 'LIVE', title: 'YUSHA TOUR — TOKYO', priceFrom: 7800, status: 'OPEN', sold: 0.42, fictional: true, source: 'FICTIF' },
  { id: 'k02', group: 'keni-boys', venue: 'zepp-namba', date: D(2026, 5, 9, 18, 0), kind: 'LIVE', title: 'YUSHA TOUR — OSAKA', priceFrom: 7800, status: 'OPEN', sold: 0.78, fictional: true, source: 'FICTIF' },
  { id: 'k03', group: 'keni-boys', venue: 'fukuoka-paypay', date: D(2026, 5, 16, 18, 0), kind: 'LIVE', title: 'YUSHA TOUR — KYUSHU FINAL', priceFrom: 8800, status: 'LOTTERY', sold: 0.95, fictional: true, source: 'FICTIF' },
  { id: 'k04', group: 'keni-boys', venue: 'akb-theater', date: D(2026, 5, 5, 14, 0), kind: 'FANMEET', title: '七人の握手会', priceFrom: 3500, status: 'OPEN', sold: 0.6, fictional: true, source: 'FICTIF' },
  { id: 'k05', group: 'keni-boys', venue: 'budokan', date: D(2026, 6, 12, 19, 0), kind: 'LIVE', title: 'BUDOKAN 1ST NIGHT', priceFrom: 9800, status: 'LOTTERY', sold: 1.0, fictional: true, source: 'FICTIF' },
  { id: 'k06', group: 'keni-boys', venue: 'budokan', date: D(2026, 6, 13, 18, 0), kind: 'LIVE', title: 'BUDOKAN 2ND NIGHT', priceFrom: 9800, status: 'LOTTERY', sold: 1.0, fictional: true, source: 'FICTIF' },

  // ════════════════════════════════════════════════════════════
  // BABYMETAL — sources : babymetal.com (officiel) + Live Nation
  // ════════════════════════════════════════════════════════════
  { id: 'bm01', group: 'babymetal', venue: 'saitama-arena', date: D(2026, 1, 10, 18, 0), kind: 'LIVE', title: 'LEGEND METAL FORTH — Day 1', priceFrom: 12000, status: 'PAST', sold: 1.0, source: 'babymetal.com' },
  { id: 'bm02', group: 'babymetal', venue: 'saitama-arena', date: D(2026, 1, 11, 17, 0), kind: 'LIVE', title: 'LEGEND METAL FORTH — Day 2', priceFrom: 12000, status: 'PAST', sold: 1.0, source: 'babymetal.com' },
  { id: 'bm03', group: 'babymetal', venue: 'zepp-haneda', date: D(2026, 3, 30, 19, 0), kind: 'LIVE', title: 'WORLD TOUR 2026 IN JAPAN', priceFrom: 12000, status: 'LOTTERY', sold: 1.0, source: 'babymetal.com' },
  { id: 'bm04', group: 'babymetal', venue: 'hitachi-park', date: D(2026, 8, 9, 14, 0), kind: 'FESTIVAL', title: 'LuckyFes\'26', priceFrom: 0, status: 'INFO', sold: null, source: 'babymetal.com' },
  { id: 'bm05', group: 'babymetal', venue: 'expo70-park', date: D(2026, 8, 14, 14, 0), kind: 'FESTIVAL', title: 'SUMMER SONIC 2026 OSAKA', priceFrom: 0, status: 'INFO', sold: null, source: 'babymetal.com' },
  { id: 'bm06', group: 'babymetal', venue: 'zozo-marine', date: D(2026, 8, 16, 14, 0), kind: 'FESTIVAL', title: 'SUMMER SONIC 2026 CHIBA', priceFrom: 0, status: 'INFO', sold: null, source: 'babymetal.com' },

  // ════════════════════════════════════════════════════════════
  // XG — sources : Billboard + livenation officiel
  // ════════════════════════════════════════════════════════════
  { id: 'xg01', group: 'xg', venue: 'k-arena-yokohama', date: D(2026, 2, 6, 18, 0), kind: 'LIVE', title: 'THE CORE — Yokohama Day 1', priceFrom: 11000, status: 'PAST', sold: 1.0, source: 'Billboard' },
  { id: 'xg02', group: 'xg', venue: 'k-arena-yokohama', date: D(2026, 2, 7, 18, 0), kind: 'LIVE', title: 'THE CORE — Yokohama Day 2', priceFrom: 11000, status: 'PAST', sold: 1.0, source: 'Billboard' },
  { id: 'xg03', group: 'xg', venue: 'k-arena-yokohama', date: D(2026, 2, 8, 17, 0), kind: 'LIVE', title: 'THE CORE — Yokohama Day 3', priceFrom: 11000, status: 'PAST', sold: 1.0, source: 'Billboard' },
  { id: 'xg04', group: 'xg', venue: 'osaka-jo-hall', date: D(2026, 2, 17, 19, 0), kind: 'LIVE', title: 'THE CORE — Osaka Day 1', priceFrom: 11000, status: 'PAST', sold: 1.0, source: 'Billboard' },
  { id: 'xg05', group: 'xg', venue: 'osaka-jo-hall', date: D(2026, 2, 18, 19, 0), kind: 'LIVE', title: 'THE CORE — Osaka Day 2', priceFrom: 11000, status: 'PAST', sold: 1.0, source: 'Billboard' },
  { id: 'xg06', group: 'xg', venue: 'ig-arena', date: D(2026, 2, 21, 18, 0), kind: 'LIVE', title: 'THE CORE — Nagoya Day 1', priceFrom: 11000, status: 'PAST', sold: 1.0, source: 'Billboard' },
  { id: 'xg07', group: 'xg', venue: 'ig-arena', date: D(2026, 2, 22, 17, 0), kind: 'LIVE', title: 'THE CORE — Nagoya Day 2', priceFrom: 11000, status: 'PAST', sold: 1.0, source: 'Billboard' },

  // ════════════════════════════════════════════════════════════
  // ATARASHII GAKKO! — pas de date JP solo annoncée pour 2026.
  // L'event ci-dessous est à l'étranger (Lollapalooza Berlin) — listé pour info.
  // ════════════════════════════════════════════════════════════
  { id: 'ag01', group: 'atarashii-gakko', venue: null, date: D(2026, 7, 18, 11, 0), kind: 'OVERSEAS', title: 'Lollapalooza Berlin (HORS JAPON)', priceFrom: 0, status: 'INFO', sold: null, source: 'Ticketmaster', overseas: 'Berlin, Germany' },

  // ════════════════════════════════════════════════════════════
  // Les autres groupes (Nogizaka46, Sakurazaka46, Hinatazaka46, AKB48,
  // =LOVE, Momoiro Clover Z) : dates non confirmées publiquement à
  // la date de cette compilation. Marquées { unverified: true }.
  // ════════════════════════════════════════════════════════════
  { id: 'n01', group: 'nogizaka46', venue: 'tokyo-dome', date: D(2026, 5, 8, 18, 0), kind: 'LIVE', title: '15周年 Anniversary (à confirmer)', priceFrom: 9500, status: 'TBA', sold: null, unverified: true, source: '⚠️ NON VÉRIFIÉ' },
  { id: 'n02', group: 'nogizaka46', venue: 'osaka-jo-hall', date: D(2026, 6, 20, 18, 0), kind: 'LIVE', title: 'Spring Tour Osaka (à confirmer)', priceFrom: 8800, status: 'TBA', sold: null, unverified: true, source: '⚠️ NON VÉRIFIÉ' },

  { id: 's01', group: 'sakurazaka46', venue: 'saitama-arena', date: D(2026, 5, 22, 18, 30), kind: 'LIVE', title: 'Tour FINAL (à confirmer)', priceFrom: 8500, status: 'TBA', sold: null, unverified: true, source: '⚠️ NON VÉRIFIÉ' },

  { id: 'h01', group: 'hinatazaka46', venue: 'tokyo-dome', date: D(2026, 6, 27, 18, 0), kind: 'LIVE', title: 'HAPPY DAYS Tokyo Dome (à confirmer)', priceFrom: 9000, status: 'TBA', sold: null, unverified: true, source: '⚠️ NON VÉRIFIÉ' },

  { id: 'a01', group: 'akb48', venue: 'akb-theater', date: D(2026, 5, 1, 13, 0), kind: 'THEATER', title: 'Theater Daily Show', priceFrom: 3300, status: 'OPEN', sold: 0.9, source: 'AKB48 Theater (récurrent)' },
  { id: 'a02', group: 'akb48', venue: 'akb-theater', date: D(2026, 5, 1, 18, 30), kind: 'THEATER', title: 'Theater Night Show', priceFrom: 3300, status: 'OPEN', sold: 0.9, source: 'AKB48 Theater (récurrent)' },

  { id: 'l01', group: 'equal-love', venue: 'zepp-shinjuku', date: D(2026, 5, 11, 19, 0), kind: 'LIVE', title: '=LOVE Spring Tour TOKYO (à confirmer)', priceFrom: 6800, status: 'TBA', sold: null, unverified: true, source: '⚠️ NON VÉRIFIÉ' },

  { id: 'm01', group: 'momoiro', venue: 'sapporo-dome', date: D(2026, 7, 19, 17, 0), kind: 'LIVE', title: 'MOMOCLO HARU NO ICHI (à confirmer)', priceFrom: 9800, status: 'TBA', sold: null, unverified: true, source: '⚠️ NON VÉRIFIÉ' },
];
