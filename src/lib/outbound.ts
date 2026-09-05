const outboundDefaults = {
  utm_source: 'oopbuytop',
  utm_medium: 'referral',
  utm_campaign: 'oopbuy_spreadsheet',
};

/**
 * Adds stable attribution to a voluntary outbound click. The destination stays
 * unchanged; parameters simply let destination-side analytics group referrals
 * by the OopbuyTop page element that sent the visitor.
 */
export function trackedOutboundUrl(destination: string, placement: string) {
  const url = new URL(destination);

  for (const [name, value] of Object.entries(outboundDefaults)) {
    url.searchParams.set(name, value);
  }
  url.searchParams.set('utm_content', placement);

  return url.toString();
}

export const outboundTracking = outboundDefaults;
