// Japan Trip Planner — données du voyage
// 27 mai → 17 juin 2026 · Tokyo → Mont Fuji → Nagano → Kyoto

window.TRIP = {
  startDate: '2026-05-27',
  endDate: '2026-06-17',
  travelers: 2,
  currency: 'JPY',
  // taux indicatif pour affichage en €
  jpyToEur: 0.006,
};

// Villes du voyage (avec coordonnées GPS réelles + segment d'itinéraire)
window.CITIES = {
  tokyo: {
    name: 'Tokyo',
    nameJp: '東京',
    coords: [35.6762, 139.6503],
    segment: 1,
    suggestedDays: '27 mai → 4 juin',
    color: '#ff3ea5',
    color2: '#ffd9ec',
    desc: 'Mégalopole, néons, Shibuya/Shinjuku/Akihabara/Harajuku.',
    sticker: '🗼',
  },
  kawaguchiko: {
    name: 'Kawaguchiko',
    nameJp: '河口湖',
    coords: [35.4978, 138.7536],
    segment: 2,
    suggestedDays: '4 → 6 juin',
    color: '#22d3ee',
    color2: '#cffafe',
    desc: 'Lac au pied du Mont Fuji. Onsen, vues, ryokan.',
    sticker: '🗻',
  },
  matsumoto: {
    name: 'Matsumoto',
    nameJp: '松本',
    coords: [36.2381, 137.9719],
    segment: 3,
    suggestedDays: '6 → 8 juin',
    color: '#a855f7',
    color2: '#f3e8ff',
    desc: 'Porte des Alpes japonaises. Château noir.',
    sticker: '🏯',
  },
  nagano: {
    name: 'Nagano',
    nameJp: '長野',
    coords: [36.6485, 138.1949],
    segment: 4,
    suggestedDays: '8 → 11 juin',
    color: '#10b981',
    color2: '#d1fae5',
    desc: 'Zenkō-ji, snow monkeys (Jigokudani), nature.',
    sticker: '🐒',
  },
  kanazawa: {
    name: 'Kanazawa',
    nameJp: '金沢',
    coords: [36.5613, 136.6562],
    segment: 5,
    suggestedDays: '11 → 13 juin',
    color: '#f59e0b',
    color2: '#fef3c7',
    desc: 'Kenroku-en, quartier samouraï, geisha.',
    sticker: '🌸',
  },
  kyoto: {
    name: 'Kyoto',
    nameJp: '京都',
    coords: [35.0116, 135.7681],
    segment: 6,
    suggestedDays: '13 → 17 juin',
    color: '#ef4444',
    color2: '#fee2e2',
    desc: 'Temples, geisha, bambous d\'Arashiyama, Fushimi Inari.',
    sticker: '⛩',
  },
};

// Itinéraire avec dates précises (modifiables)
window.ITINERARY = [
  { city: 'tokyo', from: '2026-05-27', to: '2026-06-04', nights: 8 },
  { city: 'kawaguchiko', from: '2026-06-04', to: '2026-06-06', nights: 2 },
  { city: 'matsumoto', from: '2026-06-06', to: '2026-06-08', nights: 2 },
  { city: 'nagano', from: '2026-06-08', to: '2026-06-11', nights: 3 },
  { city: 'kanazawa', from: '2026-06-11', to: '2026-06-13', nights: 2 },
  { city: 'kyoto', from: '2026-06-13', to: '2026-06-17', nights: 4 },
];

// Catégories de projets — emoji, label FR/JP, couleur
window.CATEGORIES = {
  resto:     { fr: 'Resto / café',  jp: 'グルメ',     emoji: '🍜', color: '#ff7a3c' },
  temple:    { fr: 'Temple / sanctuaire', jp: '神社仏閣', emoji: '⛩', color: '#ef4444' },
  shopping:  { fr: 'Shopping',      jp: '買い物',     emoji: '🛍', color: '#ff3ea5' },
  arcade:    { fr: 'Arcade / jeux', jp: 'ゲーセン',   emoji: '🎮', color: '#22d3ee' },
  pachinko:  { fr: 'Pachinko',      jp: 'パチンコ',   emoji: '🎰', color: '#fbbf24' },
  bar:       { fr: 'Bar / nightlife', jp: '居酒屋',   emoji: '🍶', color: '#a855f7' },
  concert:   { fr: 'Concert / live',jp: 'ライブ',     emoji: '🎤', color: '#ec4899' },
  hotel:     { fr: 'Hébergement',   jp: '宿泊',       emoji: '🏨', color: '#0ea5e9' },
  photo:     { fr: 'Spot photo',    jp: '撮影スポット', emoji: '📷', color: '#84cc16' },
  nature:    { fr: 'Nature / parc', jp: '自然',       emoji: '🌳', color: '#10b981' },
  transport: { fr: 'Transport',     jp: '交通',       emoji: '🚄', color: '#6b7280' },
  festival:  { fr: 'Festival',      jp: '祭り',       emoji: '🎌', color: '#fff200' },
  museum:    { fr: 'Musée / culture', jp: '博物館',   emoji: '🏛', color: '#8b5cf6' },
};

// Projets de voyage — 2 par catégorie principale en seed
// Coordonnées GPS approx pour la map détaillée par ville
window.PROJECTS = [
  // ============= TOKYO =============
  { id:'p001', city:'tokyo', cat:'shopping', name:'Shibuya Crossing + Mag\'s Park', nameJp:'渋谷スクランブル交差点',
    priority:'MUST', status:'TODO', budget:1000, hours:'24/7',
    notes:'Le carrefour le plus célèbre du monde. Vue d\'en haut depuis Mag\'s Park (rooftop) ou Shibuya Sky.',
    gmaps:'https://maps.app.goo.gl/Shibuya', coords:[35.6595, 139.7004], booking:false },

  { id:'p002', city:'tokyo', cat:'shopping', name:'Don Quijote Mega Donki Shibuya', nameJp:'ドン・キホーテ',
    priority:'MUST', status:'TODO', budget:5000, hours:'24/7',
    notes:'Discount store iconique, cadeaux/snacks/cosmétiques. Ouvert 24/7.',
    coords:[35.6595, 139.7004], booking:false },

  { id:'p003', city:'tokyo', cat:'arcade', name:'Akihabara — GiGO + Super Potato', nameJp:'秋葉原',
    priority:'MUST', status:'TODO', budget:3000, hours:'10:00–23:30',
    notes:'GiGO (ex-SEGA) pour les UFO catchers, Super Potato pour les jeux rétro.',
    coords:[35.7022, 139.7741], booking:false },

  { id:'p004', city:'tokyo', cat:'arcade', name:'Round1 Stadium Ikebukuro', nameJp:'ラウンドワン',
    priority:'NICE', status:'TODO', budget:2500, hours:'10:00–06:00',
    notes:'Karaoké, bowling, arcade, sports — multi-floor entertainment center.',
    coords:[35.7295, 139.7109], booking:false },

  { id:'p005', city:'tokyo', cat:'pachinko', name:'Maruhan Pachinko Tower Shibuya', nameJp:'マルハン渋谷',
    priority:'NICE', status:'TODO', budget:3000, hours:'10:00–22:45',
    notes:'Découverte pachinko (bruyant +++). Pas obligatoire de jouer pour visiter.',
    coords:[35.6587, 139.7016], booking:false },

  { id:'p006', city:'tokyo', cat:'temple', name:'Sensō-ji + Asakusa', nameJp:'浅草寺',
    priority:'MUST', status:'TODO', budget:0, hours:'06:00–17:00',
    notes:'Temple le plus ancien de Tokyo. Nakamise-dori pour les snacks. Tôt le matin = moins de monde.',
    coords:[35.7148, 139.7967], booking:false },

  { id:'p007', city:'tokyo', cat:'temple', name:'Meiji Jingu', nameJp:'明治神宮',
    priority:'MUST', status:'TODO', budget:0, hours:'05:00–18:30',
    notes:'Sanctuaire dans la forêt à côté de Harajuku. Mariages traditionnels le weekend.',
    coords:[35.6764, 139.6993], booking:false },

  { id:'p008', city:'tokyo', cat:'resto', name:'Ichiran Ramen Shibuya', nameJp:'一蘭',
    priority:'NICE', status:'TODO', budget:1200, hours:'24/7',
    notes:'Tonkotsu ramen iconique. Cabines individuelles. Touristique mais bon.',
    coords:[35.6603, 139.6996], booking:false },

  { id:'p009', city:'tokyo', cat:'resto', name:'Tsukiji Outer Market — petit-déj', nameJp:'築地場外市場',
    priority:'MUST', status:'TODO', budget:3000, hours:'05:00–14:00',
    notes:'Sushi, tamagoyaki, oursins. Y aller à 7-8h. Le marché interne a déménagé à Toyosu.',
    coords:[35.6655, 139.7707], booking:false },

  { id:'p010', city:'tokyo', cat:'resto', name:'Omoide Yokocho — yakitori', nameJp:'思い出横丁',
    priority:'MUST', status:'TODO', budget:4000, hours:'17:00–00:00',
    notes:'Ruelle yakitori près de Shinjuku. Ambiance Showa, fumée partout.',
    coords:[35.6924, 139.6985], booking:false },

  { id:'p011', city:'tokyo', cat:'bar', name:'Golden Gai', nameJp:'ゴールデン街',
    priority:'MUST', status:'TODO', budget:5000, hours:'19:00–05:00',
    notes:'200 micro-bars (5-8 places). Certains refusent les touristes — checker l\'enseigne. Charge ~¥1000.',
    coords:[35.6938, 139.7036], booking:false },

  { id:'p012', city:'tokyo', cat:'bar', name:'SG Club (cocktails)', nameJp:'SGクラブ',
    priority:'NICE', status:'TODO', budget:6000, hours:'19:00–02:00',
    notes:'Cocktails primés, ambiance speakeasy à Shibuya.',
    coords:[35.6612, 139.7071], booking:false },

  { id:'p013', city:'tokyo', cat:'photo', name:'Shibuya Sky', nameJp:'渋谷スカイ',
    priority:'MUST', status:'TODO', budget:2500, hours:'10:00–22:30', booking:true,
    notes:'Plateforme à ciel ouvert au sommet de Shibuya Scramble Square. RÉSERVER en ligne (créneau coucher de soleil).',
    coords:[35.6585, 139.7019] },

  { id:'p014', city:'tokyo', cat:'photo', name:'TeamLab Borderless Azabudai', nameJp:'チームラボ',
    priority:'MUST', status:'TODO', budget:3800, hours:'10:00–21:00', booking:true,
    notes:'Musée numérique immersif. RÉSERVER plusieurs jours à l\'avance.',
    coords:[35.6601, 139.7407] },

  { id:'p015', city:'tokyo', cat:'shopping', name:'Harajuku Takeshita Dori', nameJp:'竹下通り',
    priority:'MUST', status:'TODO', budget:5000, hours:'10:00–20:00',
    notes:'Crêpes, friperies kawaii, mode jeune. Marion crepes / Santa Monica Crepes.',
    coords:[35.6711, 139.7048], booking:false },

  { id:'p016', city:'tokyo', cat:'concert', name:'Concert TBA — checker billetterie', nameJp:'ライブ',
    priority:'MAYBE', status:'TODO', budget:8000, hours:'19:00',
    notes:'Voir Tokyo Dome / Saitama Super Arena / Zepp pour les dates pendant le séjour. Rappel : la majorité des places passent par loterie 2-3 mois avant.',
    coords:[35.7056, 139.7519], booking:true },

  { id:'p017', city:'tokyo', cat:'museum', name:'Ghibli Museum Mitaka', nameJp:'三鷹の森ジブリ美術館',
    priority:'MUST', status:'TODO', budget:1000, hours:'10:00–18:00', booking:true,
    notes:'⚠ RÉSERVATION OBLIGATOIRE le 10 du mois précédent. Très difficile à avoir.',
    coords:[35.6963, 139.5704] },

  { id:'p018', city:'tokyo', cat:'hotel', name:'Hôtel Shinjuku — TBD', nameJp:'新宿ホテル',
    priority:'MUST', status:'TODO', budget:120000, hours:'check-in 15:00',
    notes:'Réservation à confirmer. Préférer Shinjuku/Shibuya pour transport facile. 8 nuits.',
    coords:[35.6938, 139.7036], booking:true },

  // ============= KAWAGUCHIKO =============
  { id:'p020', city:'kawaguchiko', cat:'photo', name:'Chureito Pagoda', nameJp:'忠霊塔',
    priority:'MUST', status:'TODO', budget:0, hours:'24/7',
    notes:'Pagode + Mont Fuji = LA photo. Tôt le matin (lever du soleil) pour le ciel clair.',
    coords:[35.5159, 138.7795], booking:false },

  { id:'p021', city:'kawaguchiko', cat:'nature', name:'Lake Kawaguchi — tour du lac', nameJp:'河口湖',
    priority:'MUST', status:'TODO', budget:1500, hours:'09:00–17:00',
    notes:'Vélo électrique autour du lac (~2h). Téléphérique du Mont Tenjō côté nord.',
    coords:[35.5117, 138.7669], booking:false },

  { id:'p022', city:'kawaguchiko', cat:'hotel', name:'Ryokan avec onsen + vue Fuji', nameJp:'富士山旅館',
    priority:'MUST', status:'TODO', budget:80000, hours:'check-in 15:00', booking:true,
    notes:'Le must = ryokan kaiseki + rotenburo (bain extérieur) avec vue Fuji. Réserver 2-3 mois avant.',
    coords:[35.5117, 138.7669] },

  { id:'p023', city:'kawaguchiko', cat:'resto', name:'Hoto Fudo (nouilles plates)', nameJp:'ほうとう不動',
    priority:'NICE', status:'TODO', budget:1500, hours:'11:00–19:00',
    notes:'Spécialité Yamanashi : nouilles épaisses dans bouillon miso. Architecture ovoïde fascinante.',
    coords:[35.5052, 138.7654], booking:false },

  // ============= MATSUMOTO =============
  { id:'p030', city:'matsumoto', cat:'temple', name:'Château de Matsumoto', nameJp:'松本城',
    priority:'MUST', status:'TODO', budget:700, hours:'08:30–17:00',
    notes:'Château noir d\'origine (rare au Japon). Reflets sur les douves.',
    coords:[36.2384, 137.9690], booking:false },

  { id:'p031', city:'matsumoto', cat:'resto', name:'Soba à Matsumoto', nameJp:'信州そば',
    priority:'NICE', status:'TODO', budget:1500, hours:'11:00–14:30',
    notes:'Nagano = pays du soba. Tester chez Kobayashi ou Nomugi.',
    coords:[36.2381, 137.9719], booking:false },

  // ============= NAGANO =============
  { id:'p040', city:'nagano', cat:'nature', name:'Jigokudani — singes des neiges', nameJp:'地獄谷野猿公苑',
    priority:'MUST', status:'TODO', budget:800, hours:'09:00–16:00',
    notes:'Macaques dans les onsen (en hiver mieux). Marche 30min depuis le parking. Bus depuis Yudanaka.',
    coords:[36.7327, 138.4634], booking:false },

  { id:'p041', city:'nagano', cat:'temple', name:'Zenkō-ji', nameJp:'善光寺',
    priority:'MUST', status:'TODO', budget:600, hours:'04:30–16:30',
    notes:'Un des temples les plus importants du Japon. Cérémonie matinale (Oasaji) à l\'aube.',
    coords:[36.6618, 138.1872], booking:false },

  { id:'p042', city:'nagano', cat:'hotel', name:'Onsen ryokan Yudanaka/Shibu', nameJp:'渋温泉旅館',
    priority:'NICE', status:'TODO', budget:60000, hours:'check-in 15:00', booking:true,
    notes:'Shibu Onsen = village thermal traditionnel, 9 bains publics avec yukata.',
    coords:[36.7427, 138.4234] },

  // ============= KANAZAWA =============
  { id:'p050', city:'kanazawa', cat:'nature', name:'Kenroku-en', nameJp:'兼六園',
    priority:'MUST', status:'TODO', budget:320, hours:'07:00–18:00',
    notes:'Un des 3 plus beaux jardins du Japon. Arriver à l\'ouverture.',
    coords:[36.5622, 136.6624], booking:false },

  { id:'p051', city:'kanazawa', cat:'temple', name:'Higashi Chaya — quartier geisha', nameJp:'ひがし茶屋街',
    priority:'MUST', status:'TODO', budget:0, hours:'24/7',
    notes:'Vieux quartier de maisons de thé. Rues piétonnes le matin = parfait pour photos.',
    coords:[36.5731, 136.6664], booking:false },

  { id:'p052', city:'kanazawa', cat:'resto', name:'Omicho Market — sushi/kaisen-don', nameJp:'近江町市場',
    priority:'MUST', status:'TODO', budget:3500, hours:'09:00–17:00',
    notes:'Marché aux poissons de Kanazawa. Crabes des neiges en saison.',
    coords:[36.5712, 136.6580], booking:false },

  // ============= KYOTO =============
  { id:'p060', city:'kyoto', cat:'temple', name:'Fushimi Inari Taisha', nameJp:'伏見稲荷大社',
    priority:'MUST', status:'TODO', budget:0, hours:'24/7',
    notes:'10 000 torii rouges. Y aller à 6h ou 19h pour éviter la foule. Compter 2-3h pour le sommet.',
    coords:[34.9671, 135.7727], booking:false },

  { id:'p061', city:'kyoto', cat:'temple', name:'Kinkaku-ji (Pavillon d\'or)', nameJp:'金閣寺',
    priority:'MUST', status:'TODO', budget:500, hours:'09:00–17:00',
    notes:'Pavillon doré sur étang. 30min sur place suffisent.',
    coords:[35.0394, 135.7292], booking:false },

  { id:'p062', city:'kyoto', cat:'temple', name:'Kiyomizu-dera', nameJp:'清水寺',
    priority:'MUST', status:'TODO', budget:500, hours:'06:00–18:00',
    notes:'Terrasse sur pilotis. Quartier Higashiyama autour = ruelles traditionnelles.',
    coords:[34.9949, 135.7851], booking:false },

  { id:'p063', city:'kyoto', cat:'nature', name:'Arashiyama — Bambouseraie + Tenryū-ji', nameJp:'嵐山竹林',
    priority:'MUST', status:'TODO', budget:500, hours:'24/7',
    notes:'Bambouseraie tôt le matin (7h). Tenryū-ji ouvre à 8h30. Pont Togetsukyō, singes du Mt Iwatayama.',
    coords:[35.0170, 135.6717], booking:false },

  { id:'p064', city:'kyoto', cat:'temple', name:'Gion — quartier geisha', nameJp:'祇園',
    priority:'MUST', status:'TODO', budget:0, hours:'24/7',
    notes:'Hanamikoji-dori au crépuscule. Respecter les geiko (pas de photos sans permission).',
    coords:[35.0036, 135.7758], booking:false },

  { id:'p065', city:'kyoto', cat:'resto', name:'Nishiki Market', nameJp:'錦市場',
    priority:'MUST', status:'TODO', budget:2500, hours:'09:00–18:00',
    notes:'"La cuisine de Kyoto". Tester yuba, mochi, tako tamago.',
    coords:[35.0050, 135.7641], booking:false },

  { id:'p066', city:'kyoto', cat:'resto', name:'Kaiseki dinner — TBD', nameJp:'懐石料理',
    priority:'NICE', status:'TODO', budget:15000, hours:'18:00–21:00', booking:true,
    notes:'Au moins 1 kaiseki à Kyoto. Réserver. Roan Kikunoi, Giro Giro Hitoshina (plus accessible)…',
    coords:[35.0036, 135.7758] },

  { id:'p067', city:'kyoto', cat:'hotel', name:'Machiya ou ryokan Kyoto', nameJp:'町家',
    priority:'MUST', status:'TODO', budget:60000, hours:'check-in 15:00', booking:true,
    notes:'Privilégier une machiya (maison traditionnelle) ou ryokan dans Higashiyama/Gion. 4 nuits.',
    coords:[35.0036, 135.7758] },

  // ============= TRANSPORTS =============
  { id:'t001', city:'tokyo', cat:'transport', name:'Shinkansen Tokyo → Kawaguchiko (bus)', nameJp:'高速バス',
    priority:'MUST', status:'TODO', budget:2000, hours:'~2h',
    notes:'⚠ Pas de shinkansen direct. Bus express Shinjuku → Kawaguchiko ~2h, ¥2000. Ou train via Otsuki.',
    coords:[35.6938, 139.7036], booking:true },

  { id:'t002', city:'kawaguchiko', cat:'transport', name:'Kawaguchiko → Matsumoto', nameJp:'松本',
    priority:'MUST', status:'TODO', budget:5000, hours:'~3h30',
    notes:'Bus + train. Pas le plus simple. Alternative : retour Tokyo + Azusa Express vers Matsumoto.',
    coords:[35.5117, 138.7669], booking:true },

  { id:'t003', city:'matsumoto', cat:'transport', name:'Matsumoto → Nagano', nameJp:'松本→長野',
    priority:'MUST', status:'TODO', budget:2500, hours:'~50min',
    notes:'Limited Express Shinano. Très simple.',
    coords:[36.2381, 137.9719], booking:true },

  { id:'t004', city:'nagano', cat:'transport', name:'Nagano → Kanazawa (Hokuriku Shinkansen)', nameJp:'北陸新幹線',
    priority:'MUST', status:'TODO', budget:9000, hours:'~1h10',
    notes:'Hokuriku Shinkansen Kagayaki/Hakutaka. Direct.',
    coords:[36.6485, 138.1949], booking:true },

  { id:'t005', city:'kanazawa', cat:'transport', name:'Kanazawa → Kyoto (Thunderbird)', nameJp:'サンダーバード',
    priority:'MUST', status:'TODO', budget:7000, hours:'~2h15',
    notes:'Limited Express Thunderbird. ⚠ Depuis 2024, changement à Tsuruga (~10 min).',
    coords:[36.5613, 136.6562], booking:true },

  { id:'t006', city:'kyoto', cat:'transport', name:'Kyoto → Tokyo (retour vol)', nameJp:'のぞみ',
    priority:'MUST', status:'TODO', budget:14000, hours:'~2h15',
    notes:'Shinkansen Nozomi vers Tokyo / Haneda Airport Express. Réserver siège.',
    coords:[35.0116, 135.7681], booking:true },
];
