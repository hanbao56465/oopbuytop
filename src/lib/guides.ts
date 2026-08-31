type GuideSection = { heading: string; paragraphs: string[] };
type Guide = { title: string; group: string; description: string; intro: string; steps: string[]; sections: GuideSection[] };
type GuideDetails = { title: string; group: string; description: string; intro: string; focus: string; evidence: string; boundary: string; next: string; steps: string[] };

const makeGuide = (guide: GuideDetails): Guide => ({
  title: guide.title, group: guide.group, description: guide.description, intro: guide.intro,
  sections: [
    { heading: 'The decision this guide helps with', paragraphs: [guide.focus, 'Use the page to make one decision at a time. A product card can start research, but the currently selected option and live listing are the details that apply to an order.'] },
    { heading: 'What counts as useful evidence', paragraphs: [guide.evidence, 'Keep a small note of the exact option, the source page and the date you checked it. That makes it easier to notice when a listing, price or image set has changed.'] },
    { heading: 'What this check cannot prove', paragraphs: [guide.boundary, 'If a detail is not shown or stated clearly, leave it as unknown. That is more useful than turning a familiar title, cover image or a community comment into a promise.'] },
    { heading: 'Keep the next step current', paragraphs: [guide.next, 'Use the official service you choose for account, payment, shipping and support actions. Save the live order or parcel reference that applies to your own decision rather than relying on an old screenshot.'] }
  ],
  steps: guide.steps
});

export const guides: Record<string, Guide> = {
  'oopbuy-beginner-checklist': makeGuide({
    title: 'Oopbuy Beginner Checklist', group: 'Getting started', description: 'A first-order research checklist for comparing current product details.', intro: 'A first order is easier to evaluate when product research, warehouse review and parcel choices are kept as separate decisions.',
    focus: 'Start with one category and a short shortlist of comparable items. Record the specific colour, size or configuration you mean to compare before you open any price, image or discussion thread.',
    evidence: 'For a first shortlist, useful evidence is the current selected option, its measurements or specifications, the image set, and any visible QC photo count. Compare those fields across a few similar candidates rather than collecting dozens of links.',
    boundary: 'A discovery page cannot confirm stock, final price, fit, seller performance, shipping time or parcel outcome. Those details can change and may depend on the exact option or destination.',
    next: 'Move in order: category, live listing, selected option, warehouse evidence where available, then the current parcel screen.',
    steps: ['Choose one focused category or product type.', 'Write down the exact option under consideration.', 'Compare current measurements, specifications and images.', 'Keep missing information marked as unknown.', 'Review warehouse photos against the recorded option when available.', 'Use the live order or parcel screen before payment or shipping.']
  }),
  'dead-links-and-current-listings': makeGuide({
    title: 'What to Do When a Product Link Is Dead', group: 'Getting started', description: 'How to restart research when a saved listing is no longer available.', intro: 'A dead product link is not a reason to trust an old screenshot or to assume a similar card is the same item.',
    focus: 'Treat the missing link as a fresh comparison task. Search the relevant current category, then compare the new candidate against the old note only where the live option clearly matches.',
    evidence: 'Useful replacement evidence includes the seller or shop context, selected variant, size chart or specifications, current photos and current price of that exact option. A matching title alone is weak evidence.',
    boundary: 'A similar image, brand label or displayed low price cannot establish that the seller, batch, materials, included components or availability are unchanged.',
    next: 'Replace the old link only after you have recorded what is genuinely the same and what needs a new decision.',
    steps: ['Keep the old note instead of guessing from memory.', 'Open a current category or search result.', 'Compare the exact replacement option, not only the title.', 'Recheck measurements, images and included components.', 'Record any unresolved difference.', 'Use the new live listing for the next action.']
  }),
  'oopbuy-price-research': makeGuide({
    title: 'How to Compare Oopbuy Spreadsheet Prices', group: 'Getting started', description: 'Compare product price context without treating a saved card as a quote.', intro: 'Price research becomes reliable only when every compared figure refers to the same current product option and quantity.',
    focus: 'Compare like with like: the exact variant, size or configuration, quantity, seller page and date checked. A lower visible figure is not useful if it belongs to a different option.',
    evidence: 'Record the displayed product price, selected option, any visible option change, and the listing timestamp or date you checked it. Keep product research separate from parcel, shipping and service fees.',
    boundary: 'A catalog snapshot or search card is not a checkout quote. It cannot confirm future prices, discounts, stock, exchange rate effects, shipping cost or total parcel cost.',
    next: 'Once the product option is clear, check the live page again immediately before placing an order or making a parcel decision.',
    steps: ['Choose two or three truly comparable options.', 'Match variant, quantity and unit before reading price.', 'Record the date and visible price context.', 'Separate product cost from parcel costs.', 'Flag unclear option pricing as unresolved.', 'Confirm the live option before acting.']
  }),
  'oopbuy-product-comparison': makeGuide({
    title: 'How to Compare Product Listings', group: 'QC & checks', description: 'A structured comparison for variants, images, measurements and QC availability.', intro: 'A small, documented comparison is more useful than a long list of listings that have never been checked side by side.',
    focus: 'Set the comparison criteria before opening cards: exact option, measurements or specifications, image coverage, visible QC availability, price context and one practical requirement such as fit or capacity.',
    evidence: 'Use the current live listing for the selected variant, seller chart or specification table, visible images, and warehouse images when they exist. Record only what each source actually shows.',
    boundary: 'Images and QC availability can show visible details; they cannot prove authenticity, material composition, performance, comfort, durability, final stock or delivery outcome.',
    next: 'Choose a candidate only when its practical requirements are supported by the current listing; otherwise leave it on the shortlist as uncertain.',
    steps: ['Set comparison fields before browsing.', 'Compare only the exact selected options.', 'Use measurements or specifications as the primary check.', 'Review images for visible differences.', 'Note QC availability without treating it as a quality grade.', 'Open the current listing before finalising the choice.']
  }),
  'oopbuy-spreadsheet-safety': makeGuide({
    title: 'Oopbuy Spreadsheet Safety Checklist', group: 'QC & checks', description: 'Keep discovery research separate from account, payment and support actions.', intro: 'A spreadsheet can help organize discovery, but it is not an account page, a payment flow or a guarantee about any seller or order.',
    focus: 'Use catalog and guide pages to ask better research questions, then perform account, payment, delivery and support actions only in the appropriate official service.',
    evidence: 'The strongest safety check is the current destination, the exact selected option, the official account or order reference, and the written terms that apply to the action you are about to take.',
    boundary: 'No guide can verify a seller, payment security, customs treatment, parcel outcome, support result or delivery time for a particular order.',
    next: 'If the next action involves money, personal information, account access or shipping, stop using the discovery note and verify the current official screen directly.',
    steps: ['Use the site for research, not account actions.', 'Confirm the current destination before entering information.', 'Keep a record of the selected live option.', 'Read current service terms for payment or shipping decisions.', 'Use official order references for support.', 'Do not treat third-party content as a guarantee.']
  }),
  'oopbuy-warehouse-checks': makeGuide({
    title: 'Warehouse Checks Before Shipping', group: 'Shipping', description: 'Review each received item against its selected option before parcel planning.', intro: 'Warehouse review is the link between product research and parcel planning, so each item should be checked against the exact option you recorded.',
    focus: 'Review one item at a time: match the visible colour, size label, configuration and included pieces with the live option or order record before it becomes part of a parcel decision.',
    evidence: 'Useful warehouse evidence is a clear photo of the label or option, multiple visible angles, included components and a comparison with the original selected listing. Note which requested detail is actually visible.',
    boundary: 'Warehouse images cannot prove fit, material composition, performance, authenticity, durability, weight accuracy, customs treatment or a shipping outcome.',
    next: 'After item review, use the current parcel screen for destination-specific service, restrictions, charges and timing information.',
    steps: ['Open the original selected option or order record.', 'Check item identity, visible size and colour.', 'Compare key visible construction details.', 'Check included components where shown.', 'Record any unresolved issue before parcel planning.', 'Use the current parcel screen for shipping choices.']
  })
};
