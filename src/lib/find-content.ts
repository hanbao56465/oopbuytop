import { categoryName, qcCatalogProducts, type Product } from './catalog';

export type PriorityFindContent = {
  keyword: string;
  heading: string;
  intro: string;
  comparisonPoints: string[];
  faqs: { question: string; answer: string }[];
};

const priorityFindContent: Record<string, PriorityFindContent> = {
  'burberry-classic-check-belt-with-gold-b-buckle-840a90': {
    keyword: 'Burberry belt Oopbuy spreadsheet find',
    heading: 'How to compare this Burberry-style check belt listing',
    intro: 'This is a higher-evidence belt entry because the current snapshot includes several warehouse-photo references. Use those images to compare the ordered option, while treating the brand label and material description as listing information rather than independent verification.',
    comparisonPoints: ['Compare the wearable length and belt width with a belt that already fits.', 'Match the beige check pattern, buckle colour and hole layout to the selected option.', 'Confirm whether the live measurement includes the buckle before choosing a length.'],
    faqs: [
      { question: 'How should I size this Burberry belt find?', answer: 'Measure from the buckle end to the hole you use on a belt that fits, then compare that method with the current seller chart.' },
      { question: 'What can the belt QC photos confirm?', answer: 'They can help confirm visible pattern, buckle, colour and selected length details, but not material quality or authenticity.' },
    ],
  },
  'suede-loafers-in-beige-colorway-e119d9': {
    keyword: 'suede loafers Oopbuy spreadsheet find',
    heading: 'Fit checks for this beige suede loafer listing',
    intro: 'Loafer sizing depends on internal length, toe shape and the seller measurement method. Compare the selected option with a known pair before using the snapshot price as part of a shortlist.',
    comparisonPoints: ['Prioritise internal or insole length over a familiar regional size label.', 'Check the beige colour, sole profile, toe shape and visible stitching from both sides.', 'Confirm whether accessories or packaging shown in a cover image are included.'],
    faqs: [
      { question: 'Which measurement matters most for these loafers?', answer: 'Internal or insole length is usually the strongest starting point when it is measured consistently with footwear you own.' },
      { question: 'Can warehouse photos prove the suede material?', answer: 'No. They can show visible texture and colour, but cannot certify material composition, comfort or durability.' },
    ],
  },
  'nike-slide-sandals-black-42faa9': {
    keyword: 'black slides Oopbuy spreadsheet find',
    heading: 'How to check this black slide listing before ordering',
    intro: 'Slides can vary in footbed length, width and strap shape even when the size label looks familiar. Keep the live selected option attached to your comparison.',
    comparisonPoints: ['Compare footbed length and width with slides you already wear.', 'Check the black colour, strap shape and sole pattern against the order record.', 'Use the current option price because size or bundle choices can change the listing total.'],
    faqs: [
      { question: 'Should I use my normal shoe size for these slides?', answer: 'Not without checking. Compare the current footbed or internal-length guidance with a pair that fits.' },
      { question: 'What do slide QC photos not show?', answer: 'They cannot establish comfort, grip, material performance or long-term durability.' },
    ],
  },
  'venenum-32-75ml-perfume-dc5b30': {
    keyword: 'Venenum 32 Oopbuy spreadsheet perfume find',
    heading: 'Evidence checklist for this 75 ml Venenum 32 spreadsheet find',
    intro: 'This is the highest-QC perfume row in the current Oopbuy spreadsheet snapshot: 65 warehouse photos across multiple QC groups, with a measured reference parcel of about 427 g in a 20×12×7 cm box. Use that evidence to match packaging and option details—not to certify scent or authenticity.',
    comparisonPoints: [
      'Confirm the live option still states 75 ml and matches the bottle/cap shape in the matched QC set.',
      'Compare box markings and bottle silhouette across several QC angles before approving shipment.',
      'Treat the ~$30 snapshot price as product context only; perfume lines can be restricted by destination.',
      'Use the measured ~427 g parcel weight for haul planning, then recheck the live packed weight.',
    ],
    faqs: [
      { question: 'Why does this perfume find have so many QC photos?', answer: 'The catalogue snapshot reports 65 warehouse-photo references for this listing. A higher count means more angles to compare, not a quality grade or authenticity certificate.' },
      { question: 'What does the 427 g measurement include?', answer: 'It is a warehouse QC measurement of a representative parcel for this item and can include the item’s own packaging. It is not your final haul weight.' },
      { question: 'Can I assume perfume shipping is allowed?', answer: 'No. Fragrance rules are destination- and line-specific. Read the live checkout restrictions after QC review.' },
    ],
  },
  'saint-laurent-born-in-roma-the-gold-eau-de-parfum-3fe172': {
    keyword: 'YSL Born in Roma Gold Oopbuy spreadsheet find',
    heading: 'Bottle, EDP claim and parcel checks for this YSL spreadsheet find',
    intro: 'This Saint Laurent Born in Roma The Gold Oopbuy spreadsheet entry currently reports 18 QC photos and a measured reference parcel of about 487 g (19×14×11 cm). Confirm the eau de parfum claim and bottle presentation on the live option before comparing price or planning a restricted perfume shipment.',
    comparisonPoints: [
      'Match “eau de parfum” / The Gold naming on the selected live option, not only the card title.',
      'Review bottle, cap and packaging against the matched QC group before parcel building.',
      'Use the ~$48 snapshot only as product context; convert and add shipping separately.',
      'Compare the ~487 g measured parcel with other perfume finds when estimating a haul.',
    ],
    faqs: [
      { question: 'Does “Born in Roma The Gold” guarantee the same juice as retail?', answer: 'No. The title is catalogue metadata. Confirm the live option text and packaging; QC photos cannot verify scent or formula.' },
      { question: 'Is 487 g a typical perfume parcel?', answer: 'In this snapshot’s measured perfume set it sits toward the heavier end. Use it as a planning reference, then rely on your warehouse measurement.' },
      { question: 'What should I check in YSL perfume QC photos?', answer: 'Bottle shape, cap, label text where visible, box condition and whether the received option matches the ordered concentration/size.' },
    ],
  },
  'le-labo-another-13-perfume-100ml-badef0': {
    keyword: 'Le Labo Another 13 Oopbuy spreadsheet find',
    heading: '100 ml option and packaging checks for this Le Labo spreadsheet find',
    intro: 'This Le Labo Another 13 Oopbuy spreadsheet page currently has 16 QC photos and a measured reference parcel of about 420 g in an 18×12×10 cm box. Minimalist packaging makes option mismatches easier to miss—confirm the 100 ml claim and label details carefully.',
    comparisonPoints: [
      'Verify the live selected option still says 100 ml Another 13 before trusting the card.',
      'Compare kraft-box and bottle label details across QC angles; ask for a missing label shot if needed.',
      'Keep the ~$23 snapshot separate from shipping and destination fees.',
      'Dense perfume parcels often bill closer to actual weight than volume—use the measured 420 g as a planning input.',
    ],
    faqs: [
      { question: 'Can QC photos prove this is real Le Labo Another 13?', answer: 'No. They can show packaging and the ordered option only. They cannot verify scent, formula or authenticity.' },
      { question: 'Why does volume matter so much on this find?', answer: 'Fragrance listings often group sizes. A 100 ml card price or photo set may not match a smaller live option.' },
      { question: 'Where should I go after reviewing this find?', answer: 'Compare it on the perfume spreadsheet category, then read the perfume shipping and QC checklist before building a parcel.' },
    ],
  },
  'apple-airpods-pro-wireless-earbuds-b59559': {
    keyword: 'AirPods Pro Oopbuy spreadsheet find',
    heading: 'Configuration checks for this wireless earbud listing',
    intro: 'Electronics require a stricter comparison than appearance alone. Identify the exact advertised generation, connection type and included components before using the listing as a candidate.',
    comparisonPoints: ['Confirm the stated model or generation and whether noise cancellation is claimed.', 'Check visible case, charging connector, ear tips and included cable or accessories.', 'Treat battery, pairing, warranty and safety as unverified unless the live listing supplies reliable evidence.'],
    faqs: [
      { question: 'Can AirPods QC photos prove that the earbuds work?', answer: 'No. Photos cannot verify battery health, pairing, audio performance, firmware or safety.' },
      { question: 'What should I compare between similar earbud listings?', answer: 'Compare the exact model claim, connector, case, included accessories and current selected configuration.' },
    ],
  },
  'samsung-galaxy-s24-ultra-smartphone-5g-network-standard-version-black-bc45fa': {
    keyword: 'Samsung Galaxy S24 Ultra Oopbuy spreadsheet find',
    heading: 'Technical checks for this Galaxy S24 Ultra listing',
    intro: 'A smartphone title and exterior photo are not enough to establish specification or compatibility. Record the exact configuration claimed on the live page and keep unresolved technical details out of the decision.',
    comparisonPoints: ['Confirm storage, memory, network or region claims and the exact selected colour.', 'Check visible ports, buttons, screen condition and included charger or accessories.', 'Verify compatibility, warranty and device functionality independently before purchase.'],
    faqs: [
      { question: 'Can the warehouse images verify an S24 Ultra configuration?', answer: 'They can show visible exterior details, but cannot verify chipset, storage, network compatibility, battery health or authenticity.' },
      { question: 'Why is the exact selected option important?', answer: 'Phone listings can combine different storage, region and bundle options under one title and cover image.' },
    ],
  },
  'spider-hoodie-in-black-with-web-print-922ca7': {
    keyword: 'black Spider hoodie Oopbuy spreadsheet find',
    heading: 'Fit and print checks for this black spider-web hoodie',
    intro: 'Use garment measurements and the selected colourway to compare this hoodie. The warehouse images can help identify a visible order mismatch, but they do not predict fabric feel or fit.',
    comparisonPoints: ['Compare chest, length, shoulder and sleeve measurements with a hoodie you own.', 'Match the black colourway and web-print placement to the chosen live option.', 'Review cuffs, pocket, hood, drawstrings and visible seams across the QC set.'],
    faqs: [
      { question: 'How should I size this Spider hoodie listing?', answer: 'Compare the live garment measurements with a hoodie that fits the way you want; do not rely on the size label alone.' },
      { question: 'What can the hoodie QC photos confirm?', answer: 'They can help confirm colour, size tag and visible print placement, but not weight, comfort or final fit.' },
    ],
  },
  'nike-tech-fleece-windrunner-jacket-in-black-a94d54': {
    keyword: 'Nike Tech Fleece Oopbuy spreadsheet find',
    heading: 'Measurements to compare for this black hooded jacket',
    intro: 'Compare this listing as a garment rather than assuming a familiar product name guarantees the cut. The current size chart and selected option are more useful than the card title alone.',
    comparisonPoints: ['Compare chest, length, shoulder and sleeve measurements with a fitted jacket you own.', 'Check the selected black colour, panel layout, zip, hood and pocket details.', 'Confirm whether the live option is a jacket only or part of a set.'],
    faqs: [
      { question: 'Does this Nike Tech Fleece find include matching trousers?', answer: 'Do not assume so. Confirm the exact selected option and included pieces on the current listing.' },
      { question: 'Can QC photos confirm the fabric weight?', answer: 'No. They can show visible construction and option details, but not weight, warmth or comfort.' },
    ],
  },
  'the-north-face-nuptse-black-down-jacket-8b022a': {
    keyword: 'black Nuptse jacket Oopbuy spreadsheet find',
    heading: 'Outerwear checks for this black puffer jacket listing',
    intro: 'For a puffer jacket, measurements, visible panel construction and the stated filling information matter more than a familiar name. Verify each claim on the live option.',
    comparisonPoints: ['Allow room for intended layers when comparing chest and length measurements.', 'Review the black colour, baffle layout, zip, cuffs, hem and hood or collar details.', 'Do not infer warmth, filling or weather performance from warehouse images.'],
    faqs: [
      { question: 'How should I size this Nuptse-style jacket?', answer: 'Compare garment measurements with outerwear you use over similar layers, leaving the amount of room you prefer.' },
      { question: 'Can images prove that the jacket uses down filling?', answer: 'No. Photos cannot verify filling composition, warmth or weather protection.' },
    ],
  },
  'stussy-crown-logo-white-t-shirt-f0afd9': {
    keyword: 'Stussy crown T-shirt Oopbuy spreadsheet find',
    heading: 'Size and graphic checks for this white T-shirt listing',
    intro: 'T-shirt labels vary between listings, so compare the actual garment dimensions and selected graphic. Use warehouse photos for visible order matching only.',
    comparisonPoints: ['Compare chest, length and shoulder measurements with a T-shirt you wear.', 'Match the white colour, crown graphic scale and placement to the selected option.', 'Check collar, sleeve, hem and visible print edges in the warehouse set.'],
    faqs: [
      { question: 'Which measurements matter for this Stussy T-shirt find?', answer: 'Chest, body length and shoulder width are a stronger starting point than the size label.' },
      { question: 'Can a QC image prove print durability?', answer: 'No. It can show current visible placement and condition, not wash performance or longevity.' },
    ],
  },
  'fear-of-god-essentials-black-shorts-with-beige-drawstring-69d4b7': {
    keyword: 'Essentials black shorts Oopbuy spreadsheet find',
    heading: 'Waist and option checks for these black drawstring shorts',
    intro: 'Shorts with similar titles can differ in rise, inseam, material and drawstring colour. Keep the selected option and measurement chart together when comparing listings.',
    comparisonPoints: ['Compare waist range, rise, inseam and leg opening with shorts you own.', 'Confirm the black colour and beige drawstring shown in the selected option.', 'Review waistband, pockets, hems and visible logo or print placement.'],
    faqs: [
      { question: 'How should I choose a size for these Essentials shorts?', answer: 'Use the live waist, rise and inseam measurements and compare them with shorts that fit.' },
      { question: 'Do QC photos confirm stretch or comfort?', answer: 'No. They show visible construction and the ordered option, not stretch, fabric feel or fit.' },
    ],
  },
  'polo-ralph-lauren-cream-co-ord-set-e56ed0': {
    keyword: 'Polo Ralph Lauren co-ord Oopbuy spreadsheet find',
    heading: 'How to verify this cream co-ord set listing',
    intro: 'The key question for a co-ord is what the selected option actually includes. Confirm both pieces, their measurements and the cream colour before comparing price.',
    comparisonPoints: ['Confirm whether the selected option includes both the top and bottom.', 'Compare the measurement chart for each piece rather than applying one label to the set.', 'Check colour consistency, visible logos, closures and included components in QC images.'],
    faqs: [
      { question: 'Does the displayed price include the whole co-ord set?', answer: 'Not necessarily. Check the current selected option and included pieces on the live listing.' },
      { question: 'How should I size a two-piece set?', answer: 'Compare the measurements for the top and bottom separately with garments you own.' },
    ],
  },
  'apple-watch-series-8-with-white-sport-band-57ff8a': {
    keyword: 'Apple Watch Series 8 Oopbuy spreadsheet find',
    heading: 'Model and accessory checks for this smartwatch listing',
    intro: 'A watch exterior can look correct while important configuration details remain unknown. Verify the claimed model, case size, band and compatibility on the current page.',
    comparisonPoints: ['Confirm the stated series, case size, colour and selected band.', 'Check visible screen, buttons, case, charger and included accessories.', 'Treat activation, battery health, sensors, water resistance and compatibility as unverified.'],
    faqs: [
      { question: 'Can Apple Watch QC photos prove its functions work?', answer: 'No. Images cannot verify activation, battery health, sensors, connectivity or water resistance.' },
      { question: 'Which option details should I record?', answer: 'Record the claimed series, case size, case colour, band and included charger or accessories.' },
    ],
  },
  'dior-miss-dior-blooming-bouquet-perfume-a3199b': {
    keyword: 'Miss Dior Blooming Bouquet Oopbuy spreadsheet find',
    heading: 'Variant checks for this Miss Dior fragrance listing',
    intro: 'Similar fragrance titles can hide different bottle volumes, concentrations or gift-set options. Confirm the current selection and treat all visual brand information as seller-provided listing data.',
    comparisonPoints: ['Verify the exact volume, concentration and whether the option is a single bottle or set.', 'Compare visible bottle, bow, label, cap and packaging details across available images.', 'Check current destination and carrier restrictions for fragrance separately.'],
    faqs: [
      { question: 'Can the Miss Dior images verify scent or formula?', answer: 'No. Images cannot verify fragrance, formula, authenticity or performance.' },
      { question: 'Why can the live price differ from this page?', answer: 'The snapshot may describe an earlier or different variant, so confirm the exact current selected option.' },
    ],
  },
};

const activeCuratedProducts = qcCatalogProducts
  .filter((product) => Boolean(priorityFindContent[product.slug]))
  .sort((a, b) => b.qcPhotoCount - a.qcPhotoCount || a.title.localeCompare(b.title));

const selectedPriorityProducts: Product[] = [...activeCuratedProducts];
const selectedSlugs = new Set(selectedPriorityProducts.map((product) => product.slug));
const selectedCategories = new Set(selectedPriorityProducts.map((product) => product.category).filter(Boolean));
const rankedCandidates = [...qcCatalogProducts]
  .filter((product) => !selectedSlugs.has(product.slug))
  .sort((a, b) => b.qcPhotoCount - a.qcPhotoCount || Number(Boolean(b.brand && b.brand !== 'Other')) - Number(Boolean(a.brand && a.brand !== 'Other')) || a.title.localeCompare(b.title));

for (const product of rankedCandidates) {
  if (selectedPriorityProducts.length >= 15) break;
  if (product.category && !selectedCategories.has(product.category)) {
    selectedPriorityProducts.push(product);
    selectedSlugs.add(product.slug);
    selectedCategories.add(product.category);
  }
}
for (const product of rankedCandidates) {
  if (selectedPriorityProducts.length >= 15) break;
  if (!selectedSlugs.has(product.slug)) {
    selectedPriorityProducts.push(product);
    selectedSlugs.add(product.slug);
  }
}

export const priorityFindSlugs = selectedPriorityProducts.map((product) => product.slug);
export const priorityFindProducts = selectedPriorityProducts;

function generatedPriorityContent(product: Product): PriorityFindContent {
  const category = categoryName(product.category);
  const compactTitle = product.title.split(/\s+/).slice(0, 5).join(' ');
  const footwear = new Set(['shoes', 'sneakers', 'boots', 'loafers-flats', 'sandals-slippers']).has(product.category ?? '');
  const apparel = new Set(['hoodies-sweatshirts', 'jackets', 't-shirts', 'shirts-blouses', 'shorts', 'jeans', 'trousers-pants', 'tracksuits', 'sweaters-knits', 'parkas-down-jackets', 'coord-sets']).has(product.category ?? '');
  const fragrance = product.category === 'perfume';
  const electronics = new Set(['audio', 'wearables', 'electronics', 'phone-accessories']).has(product.category ?? '');

  if (footwear) return {
    keyword: `${compactTitle} Oopbuy spreadsheet find`,
    heading: `Fit checks for this ${category.toLowerCase()} listing`,
    intro: `${product.title} is included among the current higher-evidence footwear entries because the snapshot reports ${product.qcPhotoCount} warehouse-photo references. Use those images for visible order matching, not as proof of comfort, material or authenticity.`,
    comparisonPoints: ['Compare internal or insole length with footwear you already own.', 'Match the selected colourway, size and visible sole or fastening details.', 'Confirm the live option, current price and included accessories before ordering.'],
    faqs: [{ question: `How should I size the ${product.title} listing?`, answer: 'Use the current internal or insole-length guidance and compare it with footwear that fits; do not rely on the familiar size label alone.' }, { question: 'What can its warehouse photos confirm?', answer: 'They can help confirm visible size, colourway and construction details, but not comfort, performance, materials or authenticity.' }],
  };
  if (apparel) return {
    keyword: `${compactTitle} Oopbuy spreadsheet find`,
    heading: `Measurements to compare for this ${category.toLowerCase()} listing`,
    intro: `${product.title} is a focused apparel research page with ${product.qcPhotoCount} current warehouse-photo references. Compare the exact selected option and garment measurements instead of transferring a familiar size label.`,
    comparisonPoints: ['Compare chest or waist, length and other relevant garment measurements with an item you own.', 'Match the selected colour, print, closures and visible construction details.', 'Treat fabric feel, stretch, warmth and final fit as unknown until independently checked.'],
    faqs: [{ question: `How should I choose a size for ${product.title}?`, answer: 'Compare the current seller measurements with a similar garment you own and check how the listing says those measurements were taken.' }, { question: 'Do its QC photos guarantee the garment quality?', answer: 'No. They can show visible order details, but cannot guarantee fabric, comfort, durability, authenticity or fit.' }],
  };
  if (fragrance) return {
    keyword: `${compactTitle} Oopbuy spreadsheet find`,
    heading: 'Bottle, concentration and shipping checks for this fragrance listing',
    intro: `${product.title} is included because the current snapshot reports ${product.qcPhotoCount} warehouse-photo references. Confirm the exact bottle size, stated concentration and selected set before comparing price.`,
    comparisonPoints: ['Match the stated volume, concentration and selected bottle or set.', 'Review visible cap, label, packaging and included components from several angles.', 'Check current destination-specific fragrance shipping restrictions separately.'],
    faqs: [{ question: `Can images verify the ${product.title} fragrance?`, answer: 'No. Images can show visible packaging only; they cannot verify scent, formula, authenticity or performance.' }, { question: 'Is the snapshot price the delivered total?', answer: 'No. Confirm the selected live option, shipping services and destination costs separately.' }],
  };
  if (electronics) return {
    keyword: `${compactTitle} Oopbuy spreadsheet find`,
    heading: 'Configuration checks for this electronics listing',
    intro: `${product.title} has ${product.qcPhotoCount} current warehouse-photo references, but exterior images cannot prove technical specification or function. Record the exact model and selected configuration first.`,
    comparisonPoints: ['Confirm the stated model, configuration, connection type and selected bundle.', 'Check visible ports, controls, charger and included accessories.', 'Treat functionality, battery health, compatibility, safety and warranty as unverified.'],
    faqs: [{ question: `Can QC photos prove that ${product.title} works?`, answer: 'No. Photos cannot verify functionality, battery health, connectivity, compatibility or safety.' }, { question: 'What should I record from the live option?', answer: 'Record the exact model claim, configuration, colour and every included component before comparing listings.' }],
  };
  return {
    keyword: `${compactTitle} Oopbuy spreadsheet find`,
    heading: `How to compare this ${category.toLowerCase()} listing`,
    intro: `${product.title} is included among the 15 current focused entries because it has ${product.qcPhotoCount} warehouse-photo references and enough snapshot detail for a useful comparison page.`,
    comparisonPoints: ['Match the exact title, selected option and current image set.', 'Compare stated dimensions, colour and included components with your requirements.', 'Recheck current price, availability and destination conditions on the live listing.'],
    faqs: [{ question: `What should I verify for ${product.title}?`, answer: 'Verify the exact selected option, measurements or configuration, colour, included components and current price.' }, { question: 'Does a higher QC-photo count guarantee quality?', answer: 'No. It provides more visible reference angles, not a quality, authenticity or durability guarantee.' }],
  };
}

export function priorityFindFor(slug: string) {
  if (!selectedSlugs.has(slug)) return undefined;
  if (priorityFindContent[slug]) return priorityFindContent[slug];
  const product = selectedPriorityProducts.find((item) => item.slug === slug);
  return product ? generatedPriorityContent(product) : undefined;
}
