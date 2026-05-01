// Okinawa (FUTUR) — section cachée du planner
// Voyage prévisionnel, dates TBD. Cible : avril ou octobre-novembre (hors saison des pluies).

const META = {
  id: 'okinawaFuture',
  label: 'Okinawa (FUTUR)',
  startDate: '2027-04-05',  // placeholder, à ajuster
  endDate: '2027-04-15',
  travelers: 2,
  currency: 'JPY',
  jpyToEur: 0.006,
  hidden: true,
  mapFocus: 'okinawa',
};

const CITIES = {
  naha: {
    name: 'Naha',
    nameJp: '那覇',
    coords: [26.2124, 127.6792],
    segment: 1,
    suggestedDays: '5 → 7 avril',
    color: '#22d3ee',
    color2: '#cffafe',
    desc: 'Capitale, Shuri-jo, Kokusai-dori, port pour Kerama.',
    sticker: '🏯',
  },
  onna: {
    name: 'Onna',
    nameJp: '恩納',
    coords: [26.4986, 127.8536],
    segment: 2,
    suggestedDays: '7 → 9 avril',
    color: '#ff7a3c',
    color2: '#ffe8d4',
    desc: 'Côte ouest, plages, hôtels resort, Cape Manzamo.',
    sticker: '🏖',
  },
  motobu: {
    name: 'Motobu',
    nameJp: '本部',
    coords: [26.6519, 127.8847],
    segment: 3,
    suggestedDays: '9 → 10 avril',
    color: '#4ade80',
    color2: '#d1fae5',
    desc: 'Péninsule nord, Churaumi Aquarium, Bise village.',
    sticker: '🐟',
  },
  ishigaki: {
    name: 'Ishigaki',
    nameJp: '石垣',
    coords: [24.3448, 124.1572],
    segment: 4,
    suggestedDays: '10 → 13 avril',
    color: '#ff3ea5',
    color2: '#ffd9ec',
    desc: 'Yaeyama, Kabira Bay, hub pour Iriomote/Taketomi.',
    sticker: '🏝',
  },
  miyako: {
    name: 'Miyako',
    nameJp: '宮古',
    coords: [24.7951, 125.2811],
    segment: 5,
    suggestedDays: '13 → 15 avril',
    color: '#c084fc',
    color2: '#ede9fe',
    desc: 'Plages turquoise, Maehama, Irabu Bridge.',
    sticker: '🌊',
  },
};

const ITINERARY = [
  { city: 'naha',     from: '2027-04-05', to: '2027-04-07', nights: 2 },
  { city: 'onna',     from: '2027-04-07', to: '2027-04-09', nights: 2 },
  { city: 'motobu',   from: '2027-04-09', to: '2027-04-10', nights: 1 },
  { city: 'ishigaki', from: '2027-04-10', to: '2027-04-13', nights: 3 },
  { city: 'miyako',   from: '2027-04-13', to: '2027-04-15', nights: 2 },
];

const PROJECTS = [
  // ============= NAHA =============
  { id:'ok101', city:'naha', cat:'temple', name:'Shuri-jo (Château royal Ryukyu)', nameJp:'首里城',
    priority:'MUST', status:'TODO', budget:400, hours:'08:30–19:30',
    notes:'Ancien siège du royaume Ryukyu (1429-1879). ⚠ Le donjon principal a brûlé en oct 2019, reconstruction prévue jusqu\'en 2026. Visite des parties annexes, expositions sur la dynastie Sho. Site UNESCO.',
    coords:[26.2173, 127.7194], booking:false },

  { id:'ok102', city:'naha', cat:'shopping', name:'Kokusai-dori', nameJp:'国際通り',
    priority:'MUST', status:'TODO', budget:3000, hours:'10:00–22:00',
    notes:'Avenue principale de Naha, 1.6 km de boutiques, restos, izakayas. Spécialités Ryukyu (chinsuko, beni-imo, awamori). Plus touristique mais bonne intro à Naha.',
    coords:[26.2143, 127.6890], booking:false },

  { id:'ok103', city:'naha', cat:'shopping', name:'Tsuboya — quartier potier', nameJp:'壺屋やちむん通り',
    priority:'NICE', status:'TODO', budget:2000, hours:'10:00–18:00',
    notes:'Vieux quartier des potiers (yachimun) depuis 1682. Ateliers visitables, galeries de céramique Ryukyu (shisa, vaisselle traditionnelle).',
    coords:[26.2155, 127.6920], booking:false },

  { id:'ok104', city:'naha', cat:'resto', name:'Soki soba (nouilles aux côtes de porc)', nameJp:'ソーキそば',
    priority:'MUST', status:'TODO', budget:1200, hours:'11:00–14:00',
    notes:'LE plat emblématique d\'Okinawa : nouilles épaisses dans bouillon clair + côtes de porc fondantes. Tester chez Yabusoba (depuis 1902) ou Kishimoto Shokudo.',
    coords:[26.2143, 127.6890], booking:false },

  { id:'ok105', city:'naha', cat:'resto', name:'Awamori — dégustation distillerie', nameJp:'泡盛',
    priority:'NICE', status:'TODO', budget:1500, hours:'10:00–17:00',
    notes:'Alcool local Okinawa (riz long indica, 25-43°). Distillerie Zuisen à Naha (Shuri) propose visites + dégustation. Plus vieil alcool distillé du Japon.',
    coords:[26.2173, 127.7194], booking:false },

  { id:'ok106', city:'naha', cat:'hotel', name:'Hôtel Naha — TBD', nameJp:'那覇ホテル',
    priority:'MUST', status:'TODO', budget:30000, hours:'check-in 15:00', booking:true,
    scheduledDate:'2027-04-05',
    notes:'Check-in 5 avril → check-out 7 avril (2 nuits). Suggestions :\n• Hyakuna Garan (luxe, vue mer Pacifique, 30 min sud de Naha)\n• Hotel JAL City Naha (central, sur Kokusai-dori)\n• Hotel Aqua Citta Naha (rooftop pool, near Tomari port)\nÉviter Tomari Port pour partir en ferry Kerama.',
    coords:[26.2124, 127.6792] },

  // ============= ONNA =============
  { id:'ok110', city:'onna', cat:'photo', name:'Cape Manzamo', nameJp:'万座毛',
    priority:'MUST', status:'TODO', budget:100, hours:'08:00–19:00',
    notes:'Falaise iconique en forme de tête d\'éléphant. Vue mer turquoise. Coucher de soleil = parfait. Centre d\'accueil 2020 récent.',
    coords:[26.5074, 127.8497], booking:false },

  { id:'ok111', city:'onna', cat:'nature', name:'Maeda Cape + Blue Cave snorkel', nameJp:'真栄田岬・青の洞窟',
    priority:'MUST', status:'TODO', budget:6000, hours:'09:00–17:00', booking:true,
    notes:'Grotte sous-marine éclairée en bleu fluo par la réfraction. Snorkel/diving avec guide obligatoire (~¥6000/pers). Réserver. Niveau débutant OK.',
    coords:[26.4396, 127.7716] },

  { id:'ok112', city:'onna', cat:'hotel', name:'Resort Onna — TBD', nameJp:'恩納リゾート',
    priority:'MUST', status:'TODO', budget:60000, hours:'check-in 15:00', booking:true,
    scheduledDate:'2027-04-07',
    notes:'Check-in 7 avril → check-out 9 avril (2 nuits, le poste hôtel le + cher du voyage). Suggestions :\n• Halekulani Okinawa (5★, plage privée)\n• Hoshinoya Okinawa (luxe japonais minimaliste)\n• Hyatt Regency Seragaki Island (modern, sur île privée)\n• ANA InterContinental Manza Beach',
    coords:[26.4986, 127.8536] },

  // ============= MOTOBU =============
  { id:'ok120', city:'motobu', cat:'museum', name:'Churaumi Aquarium', nameJp:'美ら海水族館',
    priority:'MUST', status:'TODO', budget:2180, hours:'08:30–18:30',
    notes:'Un des plus grands aquariums au monde. Bassin Kuroshio = 7500 m³, requins-baleines, raies manta géantes. 3-4h sur place. Combiner avec Bise.',
    coords:[26.6943, 127.8779], booking:false },

  { id:'ok121', city:'motobu', cat:'photo', name:'Bise Fukugi — village banyans', nameJp:'備瀬のフクギ並木',
    priority:'MUST', status:'TODO', budget:0, hours:'24/7',
    notes:'Village historique avec allées d\'arbres fukugi (2-300 ans) protégeant des typhons. Balade vélo ~1h, ambiance Studio Ghibli. Juste à côté de Churaumi.',
    coords:[26.6961, 127.8800], booking:false },

  { id:'ok122', city:'motobu', cat:'hotel', name:'Hôtel Motobu — TBD', nameJp:'本部ホテル',
    priority:'MUST', status:'TODO', budget:25000, hours:'check-in 15:00', booking:true,
    scheduledDate:'2027-04-09',
    notes:'Check-in 9 avril → check-out 10 avril (1 nuit). Court séjour pour faire Churaumi tranquille. Suggestions :\n• Hotel Orion Motobu Resort & Spa (front mer, vue Ie-jima)\n• Marine Piazza Okinawa (proche aquarium)',
    coords:[26.6519, 127.8847] },

  // ============= ISHIGAKI =============
  { id:'ok130', city:'ishigaki', cat:'photo', name:'Kabira Bay', nameJp:'川平湾',
    priority:'MUST', status:'TODO', budget:1200, hours:'09:00–17:00',
    notes:'LA baie iconique d\'Ishigaki, classée 3 étoiles Michelin Green. Eau turquoise + îlots verts. Baignade interdite, mais bateau à fond de verre (~¥1200, 30 min) très bien.',
    coords:[24.4549, 124.1457], booking:false },

  { id:'ok131', city:'ishigaki', cat:'nature', name:'Sukuji Beach — snorkel', nameJp:'底地ビーチ',
    priority:'MUST', status:'TODO', budget:0, hours:'08:00–18:00',
    notes:'Plage publique gratuite, eau translucide, poissons tropicaux dès 5m du bord. Ombre de pins, pas de bondées. Sable blanc.',
    coords:[24.4604, 124.1311], booking:false },

  { id:'ok132', city:'ishigaki', cat:'nature', name:'Iriomote — ferry + jungle day-trip', nameJp:'西表島',
    priority:'MUST', status:'TODO', budget:8000, hours:'1 journée', booking:true,
    notes:'Ferry depuis Ishigaki (~40 min, ¥4000 A/R). Île 90% jungle subtropicale, mangroves, chats sauvages Iriomote. Activités : kayak Pinaisara waterfall, randonnée. Réserver tour (option Yumigahama Beach).',
    coords:[24.3500, 123.8200] },

  { id:'ok133', city:'ishigaki', cat:'temple', name:'Taketomi — village Ryukyu traditionnel', nameJp:'竹富島',
    priority:'MUST', status:'TODO', budget:3000, hours:'1/2 journée',
    notes:'Petite île 5 km², ferry 10 min depuis Ishigaki. Village 100% intact (toits rouges, murs de corail, sable blanc dans les rues). Tour en char à bœuf (~¥1500/pers). Plage Kondoi top.',
    coords:[24.3306, 124.0883], booking:false },

  { id:'ok134', city:'ishigaki', cat:'resto', name:'Ishigaki beef yakiniku', nameJp:'石垣牛',
    priority:'NICE', status:'TODO', budget:5000, hours:'18:00–22:00',
    notes:'Bœuf wagyu local d\'Ishigaki, équivalent Kobe en moins cher. Yakiniku Yamamoto, Kitauchi-bokujo. Réserver le soir.',
    coords:[24.3448, 124.1572], booking:true },

  { id:'ok135', city:'ishigaki', cat:'hotel', name:'Hôtel Ishigaki — TBD', nameJp:'石垣ホテル',
    priority:'MUST', status:'TODO', budget:50000, hours:'check-in 15:00', booking:true,
    scheduledDate:'2027-04-10',
    notes:'Check-in 10 avril → check-out 13 avril (3 nuits). Suggestions :\n• Ishigaki Seaside Hotel\n• ANA InterContinental Ishigaki Resort (plage privée Maesato)\n• Beach Hotel Sunshine Ishigakijima\nProche du port = pratique pour ferries Iriomote/Taketomi.',
    coords:[24.3448, 124.1572] },

  // ============= MIYAKO =============
  { id:'ok140', city:'miyako', cat:'nature', name:'Yonaha Maehama Beach', nameJp:'与那覇前浜ビーチ',
    priority:'MUST', status:'TODO', budget:0, hours:'24/7',
    notes:'Régulièrement classée + belle plage du Japon. 7 km de sable blanc immaculé, eau cristalline, vue sur Kurima Island. Snorkel correct, paddle, kayak.',
    coords:[24.7308, 125.2675], booking:false },

  { id:'ok141', city:'miyako', cat:'photo', name:'Irabu Ohashi (pont turquoise)', nameJp:'伊良部大橋',
    priority:'MUST', status:'TODO', budget:0, hours:'24/7',
    notes:'Pont gratuit le plus long du Japon (3.5 km), inauguré 2015. Reliant Miyako à Irabu/Shimoji. Eau turquoise des deux côtés, photos drone illégales (parc), photos voiture OK.',
    coords:[24.8083, 125.2403], booking:false },

  { id:'ok142', city:'miyako', cat:'photo', name:'Sunayama Beach — arche naturelle', nameJp:'砂山ビーチ',
    priority:'NICE', status:'TODO', budget:0, hours:'24/7',
    notes:'Petite plage cachée derrière une dune (5 min de marche). Arche rocheuse iconique. Coucher de soleil top. Peu de monde.',
    coords:[24.8581, 125.2783], booking:false },

  { id:'ok143', city:'miyako', cat:'nature', name:'Higashi-Hennazaki Cape', nameJp:'東平安名崎',
    priority:'NICE', status:'TODO', budget:200, hours:'08:00–18:00',
    notes:'Cap à l\'extrême est de Miyako, 2 km de péninsule étroite balayée par le vent. Phare visitable. Vue 360° sur Pacifique + mer de Chine.',
    coords:[24.7236, 125.4731], booking:false },

  { id:'ok144', city:'miyako', cat:'hotel', name:'Hôtel Miyako — TBD', nameJp:'宮古ホテル',
    priority:'MUST', status:'TODO', budget:40000, hours:'check-in 15:00', booking:true,
    scheduledDate:'2027-04-13',
    notes:'Check-in 13 avril → check-out 15 avril (2 nuits). Suggestions :\n• Shigira Bayside Suite Allamanda (5★, suites avec piscine privée)\n• Hotel Breeze Bay Marina\n• Hilton Okinawa Miyako Island Resort (récent, 2023)',
    coords:[24.7951, 125.2811] },

  // ============= TRANSPORTS =============
  { id:'okt101', city:'naha', cat:'transport', name:'Vol Tokyo (Haneda) → Naha', nameJp:'東京→那覇',
    priority:'MUST', status:'TODO', budget:30000, hours:'~2h30', booking:true,
    notes:'~2h30 depuis Haneda. Compagnies : ANA/JAL (legacy ~¥40-60k A/R), Peach/Jetstar/Skymark (LCC ~¥20-30k A/R, bagages en sup). Réserver 2-3 mois avant pour LCC.',
    coords:[26.2056, 127.6500] },

  { id:'okt102', city:'naha', cat:'transport', name:'Voiture de location Okinawa main island', nameJp:'レンタカー',
    priority:'MUST', status:'TODO', budget:21000, hours:'4 jours', booking:true,
    notes:'INDISPENSABLE pour Onna + Motobu (transport public limité). ~¥5-7k/jour pour compact + assurance complète. Permis international obligatoire (à faire en France avant départ). Toyota Rent a Car / Times Car.',
    coords:[26.2056, 127.6500] },

  { id:'okt103', city:'ishigaki', cat:'transport', name:'Vol Naha → Ishigaki', nameJp:'那覇→石垣',
    priority:'MUST', status:'TODO', budget:12000, hours:'~1h', booking:true,
    notes:'~1h, ¥10-15k A/R selon période. JTA/RAC (filiale JAL) ou ANA. Réserver dès dates fixées. Alternative ferry très long (~20h).',
    coords:[24.3448, 124.1572] },

  { id:'okt104', city:'miyako', cat:'transport', name:'Vol Ishigaki → Miyako', nameJp:'石垣→宮古',
    priority:'MUST', status:'TODO', budget:8000, hours:'~30 min', booking:true,
    notes:'Vol direct ~30 min ou via Naha. RAC opère la ligne directe. ~¥8-10k A/R.',
    coords:[24.7951, 125.2811] },

  { id:'okt105', city:'miyako', cat:'transport', name:'Vol Miyako → Tokyo (retour)', nameJp:'宮古→東京',
    priority:'MUST', status:'TODO', budget:25000, hours:'~3h', booking:true,
    notes:'Vol direct Miyako (MMY) → Haneda/Narita ~3h. JTA/JAL principalement. ~¥25-35k. Possibilité d\'éviter retour par Naha.',
    coords:[24.7831, 125.2950] },

  // ============= INFOS SAISON =============
  { id:'oki101', city:'naha', cat:'festival', name:'⚠ Choisir la bonne saison', nameJp:'シーズン',
    priority:'MUST', status:'TODO', budget:0, hours:'planning',
    notes:'Okinawa = climat subtropical. Saisons à éviter / à viser :\n✅ Avril : eau 22°C, fleurs, peu de pluie, peu de touristes (avant GW). IDÉAL.\n✅ Octobre-novembre : eau 25°C, fin saison typhons, ciel clair.\n❌ Mai-juin : SAISON DES PLUIES (tsuyu), démarre + tôt qu\'à Honshu.\n❌ Juillet-août : pic typhons + foules + chaleur 33°C humide.\n❌ Mi-septembre-début octobre : typhons fréquents.',
    coords:[26.2124, 127.6792], booking:false },
];

export const OKINAWA_FUTURE = {
  meta: META,
  cities: CITIES,
  itinerary: ITINERARY,
  projects: PROJECTS,
};
