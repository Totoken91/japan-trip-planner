// Japan Trip Planner — données du voyage
// 27 mai → 17 juin 2026 · Tokyo → Kawaguchiko → Matsumoto → Nagano → Kanazawa → Kyoto

export const TRIP = {
  startDate: '2026-05-27',
  endDate: '2026-06-17',
  travelers: 2,
  currency: 'JPY',
  // taux indicatif pour affichage en €
  jpyToEur: 0.006,
};

// Villes du voyage (avec coordonnées GPS réelles + segment d'itinéraire)
export const CITIES = {
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
export const ITINERARY = [
  { city: 'tokyo', from: '2026-05-27', to: '2026-06-04', nights: 8 },
  { city: 'kawaguchiko', from: '2026-06-04', to: '2026-06-06', nights: 2 },
  { city: 'matsumoto', from: '2026-06-06', to: '2026-06-08', nights: 2 },
  { city: 'nagano', from: '2026-06-08', to: '2026-06-11', nights: 3 },
  { city: 'kanazawa', from: '2026-06-11', to: '2026-06-13', nights: 2 },
  { city: 'kyoto', from: '2026-06-13', to: '2026-06-17', nights: 4 },
];

// Catégories de projets — emoji, label FR/JP, couleur
export const CATEGORIES = {
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
export const PROJECTS = [
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
    notes:'⚠ RÉSERVATION le 10 du mois précédent à 10:00 JST (3h du mat à Paris) via Lawson Ticket — site requiert un téléphone JP. Pour visite début/mi-juin = ouverture des billets le 10 mai. Alternative pour étrangers : passer par JTB / agences agréées (markup mais quota international garanti, à booker plusieurs mois avant). Sinon : revente épuisée en quelques minutes.',
    coords:[35.6963, 139.5704] },

  { id:'p018', city:'tokyo', cat:'hotel', name:'Hôtel Tokyo (Shinjuku/Shibuya) — TBD', nameJp:'東京ホテル',
    priority:'MUST', status:'TODO', budget:120000, hours:'check-in 15:00', booking:true,
    scheduledDate:'2026-05-27',
    notes:'Check-in 27 mai → check-out 4 juin (8 nuits, ~¥15k/nuit pour 2). Préférer Shinjuku/Shibuya/Shin-Okubo pour Yamanote + accès aéroport. Suggestions :\n• Hotel Gracery Shinjuku (immeuble Godzilla, Kabukicho, ~$155/nuit)\n• JR Kyushu Hotel Blossom Shinjuku (1min station, prix raisonnable)\n• Sotetsu Fresa Inn Higashi Shinjuku (Kabukicho, petit-déj inclus)\n• Best Hotel (Shin-Okubo, value)\nAlternatives moins chères : Ueno, Akihabara, Gotanda (sur Yamanote).',
    coords:[35.6938, 139.7036] },

  { id:'p019', city:'tokyo', cat:'temple', name:'Suga Shrine — escalier Your Name', nameJp:'須賀神社',
    priority:'MUST', status:'TODO', budget:0, hours:'24/7',
    notes:'L\'escalier rouge iconique de la scène finale de Kimi no Na wa ("Are you the one I\'ve been searching for?"). Petit shrine très ordinaire à Yotsuya, célèbre uniquement pour ces marches. ~10 min à pied de Yotsuya-Sanchome (ligne Marunouchi) ou Yotsuya Station. Tôt le matin = pas de fans en photo. La visite tient en 15 min.',
    coords:[35.6855, 139.7297], booking:false },

  // ============= KAWAGUCHIKO =============
  { id:'p020', city:'kawaguchiko', cat:'photo', name:'Chureito Pagoda', nameJp:'忠霊塔',
    priority:'MUST', status:'TODO', budget:0, hours:'24/7',
    notes:'Pagode + Mont Fuji = LA photo. Tôt le matin (lever du soleil) pour le ciel clair.',
    coords:[35.5159, 138.7795], booking:false },

  { id:'p021', city:'kawaguchiko', cat:'nature', name:'Lake Kawaguchi — tour du lac', nameJp:'河口湖',
    priority:'MUST', status:'TODO', budget:1500, hours:'09:00–17:00',
    notes:'Vélo électrique autour du lac (~2h). Téléphérique du Mont Tenjō côté nord.',
    coords:[35.5117, 138.7669], booking:false },

  { id:'p022', city:'kawaguchiko', cat:'hotel', name:'Ryokan Kawaguchiko — vue Fuji + onsen', nameJp:'河口湖旅館',
    priority:'MUST', status:'TODO', budget:80000, hours:'check-in 15:00', booking:true,
    scheduledDate:'2026-06-04',
    notes:'Check-in 4 juin → check-out 6 juin (2 nuits, le poste budget le plus important du voyage). Cible : ryokan + kaiseki + rotenburo (bain extérieur) avec vue Fuji. Suggestions :\n• Shuhokaku Kogetsu — bord du lac, rotenburo bambou avec vue directe Fuji, kaiseki en chambre\n• Hotel Asafuji — bain panoramique lac + Fuji, 40% des hôtes prennent le kaiseki\n• Fuji Onsen Yumedono (5★) — bain privé extérieur dans chaque chambre\n• Kasuitei Ooya — onsen + kaiseki, bon rapport prestige/prix\n⚠ Saison des pluies débute autour du 7 juin → vue Fuji aléatoire, prévoir une matinée flexible pour saisir une éclaircie.',
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

  { id:'p032', city:'matsumoto', cat:'hotel', name:'Hôtel Matsumoto — TBD', nameJp:'松本ホテル',
    priority:'MUST', status:'TODO', budget:30000, hours:'check-in 15:00', booking:true,
    scheduledDate:'2026-06-06',
    notes:'Check-in 6 juin → check-out 8 juin (2 nuits). Suggestions :\n• Dormy Inn Matsumoto (onsen naturel + ramen offert le soir, 10min à pied du château) — option confort/onsen\n• Richmond Hotel Matsumoto (4★ proche château)\n• Tabino Hotel lit Matsumoto (5min station, very bien noté)\nRéserver 2-3 mois avant — Matsumoto est court mais demandé en saison.',
    coords:[36.2330, 137.9720] },

  { id:'p033', city:'matsumoto', cat:'nature', name:'Lac Suwa + Tateishi Park — vue Your Name', nameJp:'諏訪湖・立石公園',
    priority:'MUST', status:'TODO', budget:0, hours:'24/7', booking:false,
    scheduledDate:'2026-06-06',
    notes:'Escale ~3-4h sur le trajet Kawaguchiko → Matsumoto. Le lac Suwa = inspiration directe d\'Itomori dans Kimi no Na wa (Makoto Shinkai est de Nagano).\n\nPlan : descendre à Kami-Suwa (上諏訪駅), monter à Tateishi Park (立石公園) — la colline qui surplombe le lac, citée comme LE viewpoint du film. ~30-40 min à pied uphill depuis la gare (ou taxi ~¥1500 si on est cassé). Vue panoramique sur l\'ensemble du lac. Gratuit, ouvert 24/7.\n\nIdéal d\'arriver pour le coucher de soleil (le "kataware-doki" iconique). Redescendre à pied (15-20 min downhill) puis Azusa direction Matsumoto.\n\n⚠ Plan B : si on rate le dernier Azusa du soir (vers 21h), pas mal de ryokans à Kami-Suwa Onsen (sources thermales en bord de lac) — on dort sur place et on rejoint Matsumoto le lendemain matin (50 min de train). Ça se réserve sur place le jour même hors weekend.',
    coords:[36.0470, 138.1144] },

  { id:'p034', city:'matsumoto', cat:'transport', name:'Resort View Furusato — train scénique Alpes', nameJp:'リゾートビューふるさと',
    priority:'MUST', status:'TODO', budget:5000, hours:'~2h aller', booking:true,
    scheduledDate:'2026-06-07',
    notes:'Train touristique JR sur l\'Oito Line, Matsumoto → Minami-Otari (passe par Hakuba). Baies vitrées XL, sièges design, traverse les Alpes du Nord. Vibe vidéo relax YouTube garanti.\n⚠ Ne circule QUE certains jours (weekends + jours fériés selon saison) → vérifier le calendrier JR East 2026 plusieurs mois avant. RÉSERVER siège (places limitées).\nFormat conseillé : Matsumoto → Hakuba (~50 min) le matin, balade/déj à Hakuba, retour l\'après-midi. Aller-retour complet jusqu\'à Minami-Otari = ~5h.',
    coords:[36.2398, 137.9710] },

  { id:'p035', city:'matsumoto', cat:'photo', name:'Hida-Furukawa — gare Your Name', nameJp:'飛騨古川駅',
    priority:'MAYBE', status:'TODO', budget:0, hours:'24/7', booking:false,
    notes:'La gare et l\'arrêt de bus de la scène de recherche dans Kimi no Na wa (quand Taki cherche Mitsuha). Gare ordinaire, la visite tient en 30 min mais l\'émotion est là.\n⚠ DÉTOUR conséquent depuis Matsumoto :\n  Matsumoto → Takayama bus express (~2h30, scénique à travers les Alpes)\n  → Takayama → Hida-Furukawa JR Takayama Line (~15 min)\nAller-retour journée tendu mais possible. Idéal si on accepte d\'ajouter 1 nuit à Takayama (vieux quartier sake/bois sympa). Sinon, on laisse en MAYBE.',
    coords:[36.2342, 137.1845] },

  // ============= NAGANO =============
  { id:'p040', city:'nagano', cat:'nature', name:'Jigokudani — singes des neiges', nameJp:'地獄谷野猿公苑',
    priority:'MUST', status:'TODO', budget:800, hours:'08:30–17:00 (été)',
    notes:'⚠ En juin : les macaques sont là toute l\'année MAIS très peu (voire pas) dans l\'onsen — l\'eau ~40°C est trop chaude vs l\'air. La photo iconique = décembre→mars. En juin on les voit autour des bassins, parfois un seul qui se baigne par jour pluvieux. Marche ~30min depuis le parking (chemin forestier, peut être boueux en saison des pluies). Bus depuis Yudanaka.',
    coords:[36.7327, 138.4634], booking:false },

  { id:'p041', city:'nagano', cat:'temple', name:'Zenkō-ji', nameJp:'善光寺',
    priority:'MUST', status:'TODO', budget:600, hours:'04:30–16:30',
    notes:'Un des temples les plus importants du Japon. Cérémonie matinale (Oasaji) à l\'aube.',
    coords:[36.6618, 138.1872], booking:false },

  { id:'p042', city:'nagano', cat:'hotel', name:'Ryokan Yudanaka/Shibu Onsen', nameJp:'渋温泉旅館',
    priority:'MUST', status:'TODO', budget:60000, hours:'check-in 15:00', booking:true,
    scheduledDate:'2026-06-08',
    notes:'Check-in 8 juin → check-out 11 juin (3 nuits). Shibu Onsen = village thermal millénaire, 9 bains publics à faire en yukata. Suggestions :\n• Kanaguya — 200 ans d\'histoire, bois + galeries, inspiration de Spirited Away (le plus iconique)\n• Korakukan Jigokudani — à 100m du parc des singes, bains intérieur + extérieur (pour l\'expérience reculée)\n• Suminoyu Ryokan — accès aux 9 bains publics + navette Jigokudani\n• Masuya — 140 ans, 4 chambres avec rotenburo privé, à Yudanaka\n⚠ Singes en juin = très peu probable dans l\'onsen (eau trop chaude). Le village/yukata onsen reste génial.',
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
    notes:'Marché aux poissons de Kanazawa. Crabes des neiges hors saison en juin (saison nov→mars), mais oursin/crevette d\'Hokuriku au top.',
    coords:[36.5712, 136.6580], booking:false },

  { id:'p053', city:'kanazawa', cat:'hotel', name:'Hôtel Kanazawa — TBD', nameJp:'金沢ホテル',
    priority:'MUST', status:'TODO', budget:35000, hours:'check-in 15:00', booking:true,
    scheduledDate:'2026-06-11',
    notes:'Check-in 11 juin → check-out 13 juin (2 nuits). Suggestions :\n• Maki No Oto Boutique Hotel — machiya restaurée en plein Higashi Chaya, design Zen (le plus immersif)\n• Kanazawa Hakuchoro Hotel Sanraku — entre Kenroku-en, shopping street et Higashi Chaya, onsen sur place\n• Mitsui Garden Hotel Kanazawa — 4★ central proche Kenroku-en\n• Yamanoo Ryokan — chaque chambre avec onsen privé en cyprès (Higashi Chaya)\nMachiya en chaya = ~¥25-45k/pers avec 2 repas. Réserver 3-6 mois avant.',
    coords:[36.5731, 136.6664] },

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

  { id:'p067', city:'kyoto', cat:'hotel', name:'Machiya / Ryokan Kyoto (Higashiyama/Gion)', nameJp:'町家',
    priority:'MUST', status:'TODO', budget:60000, hours:'check-in 15:00', booking:true,
    scheduledDate:'2026-06-13',
    notes:'Check-in 13 juin → check-out 17 juin (4 nuits). Privilégier une machiya restaurée à Higashiyama/Gion. Suggestions :\n• Ishibekoji Muan (5★, 3 chambres seulement, ruelles silencieuses de Gion, bain privé)\n• Indigo House Gion (machiya restaurée à pied de Gion + Higashiyama sud)\n• Chiyonoya (machiya 120 ans, près de Shirakawa river, calme)\n• Yoshi-Ima / 吉今 (familial, bâtiment de 1747)\n• Koto Inn (petite machiya, accès Higashiyama nord+sud)\nRéserver 3-6 mois avant — machiya = stock très limité.',
    coords:[35.0036, 135.7758] },

  // ============= TRANSPORTS =============
  { id:'t001', city:'tokyo', cat:'transport', name:'Shinkansen Tokyo → Kawaguchiko (bus)', nameJp:'高速バス',
    priority:'MUST', status:'TODO', budget:2000, hours:'~2h',
    notes:'⚠ Pas de shinkansen direct. Bus express Shinjuku → Kawaguchiko ~2h, ¥2000. Ou train via Otsuki.',
    coords:[35.6938, 139.7036], booking:true },

  { id:'t002', city:'kawaguchiko', cat:'transport', name:'Kawaguchiko → Matsumoto (via Suwa)', nameJp:'河口湖→松本',
    priority:'MUST', status:'TODO', budget:5500, hours:'~5h avec escale Suwa',
    notes:'Pas de liaison directe, donc autant en profiter pour caser le Lac Suwa (p033) en escale.\nRoute recommandée :\n1. Bus express Kawaguchiko → Otsuki (~50 min, ¥1500)\n2. JR Azusa Limited Express Otsuki → Kami-Suwa (~1h, ¥3000) — descendre ici\n3. Pause Lac Suwa ~3h\n4. Azusa Kami-Suwa → Matsumoto (~50 min, ¥1500)\nAlternative directe (sans Suwa) : retour Tokyo (Shinjuku) + Azusa Shinjuku → Matsumoto (~2h45 direct, plus simple mais moins joli).',
    coords:[35.5117, 138.7669], booking:true },

  { id:'t003', city:'matsumoto', cat:'transport', name:'Matsumoto → Nagano', nameJp:'松本→長野',
    priority:'MUST', status:'TODO', budget:2500, hours:'~50min',
    notes:'Limited Express Shinano. Très simple.',
    coords:[36.2381, 137.9719], booking:true },

  { id:'t004', city:'nagano', cat:'transport', name:'Nagano → Kanazawa (Hokuriku Shinkansen)', nameJp:'北陸新幹線',
    priority:'MUST', status:'TODO', budget:9000, hours:'~1h10',
    notes:'Hokuriku Shinkansen Kagayaki/Hakutaka. Direct.',
    coords:[36.6485, 138.1949], booking:true },

  { id:'t005', city:'kanazawa', cat:'transport', name:'Kanazawa → Kyoto (Shinkansen + Thunderbird)', nameJp:'北陸新幹線+サンダーバード',
    priority:'MUST', status:'TODO', budget:7800, hours:'~2h10',
    notes:'⚠ Depuis le 16/03/2024, plus de Thunderbird direct Kanazawa↔Kyoto. Étapes :\n1. Hokuriku Shinkansen Kanazawa → Tsuruga (~50 min)\n2. Transfert Tsuruga (très court, tout est sur le même quai — courir si retard)\n3. Limited Express Thunderbird Tsuruga → Kyoto (~50 min)\nRéserver siège pour les 2 segments (~¥7800 total).',
    coords:[36.5613, 136.6562], booking:true },

  { id:'t006', city:'kyoto', cat:'transport', name:'Kyoto → Tokyo (retour vol)', nameJp:'のぞみ',
    priority:'MUST', status:'TODO', budget:14000, hours:'~2h15',
    notes:'Shinkansen Nozomi vers Tokyo / Haneda Airport Express. Réserver siège.',
    coords:[35.0116, 135.7681], booking:true },

  // ============= INFOS SAISON =============
  { id:'i001', city:'tokyo', cat:'festival', name:'⚠ Saison des pluies (tsuyu)', nameJp:'梅雨',
    priority:'MUST', status:'TODO', budget:0, hours:'~7 juin → mi-juillet',
    scheduledDate:'2026-06-07',
    notes:'La saison des pluies 梅雨 démarre vers le 7 juin sur Kanto/Kansai. Attendez-vous à des averses (rarement journée entière), forte humidité, ciel gris. Côté positif : floraison des hortensias 紫陽花 et iris à Tokyo (Hakusan, Hase-dera Kamakura) et à Kyoto (Mimuroto-ji, Sanzen-in). Prévoir : parapluie pliant + veste légère imperméable, semelles antidérapantes pour Fushimi Inari/Arashiyama. Plan B indoor par jour d\'orage : musées (TeamLab, Ghibli, Edo-Tokyo), arcades, dépachika. ⚠ Vue Mont Fuji aléatoire en juin.',
    coords:[35.6762, 139.6503], booking:false },

  { id:'i002', city:'tokyo', cat:'nature', name:'Hortensias (ajisai) — spots juin', nameJp:'紫陽花',
    priority:'NICE', status:'TODO', budget:500, hours:'pic mi-juin',
    notes:'Saison des hortensias en plein dans nos dates. Spots :\n• Hakusan-jinja (Tokyo, gratuit)\n• Hase-dera Kamakura (~1h depuis Tokyo, ~¥500)\n• Meigetsu-in Kamakura (le "Ajisai-dera")\n• Mimuroto-ji (sud de Kyoto, 50 espèces, ~¥1000)\n• Sanzen-in à Ohara (Kyoto nord)',
    coords:[35.7222, 139.7522], booking:false },
];
