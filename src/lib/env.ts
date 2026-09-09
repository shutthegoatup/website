import { site } from "~/lib/site";

/**
 * The deploy workflow passes the domain it is publishing to. Anything that is
 * not the production domain — a preview environment, a local build, someone's
 * branch — is treated as not for public consumption and told so in robots.txt
 * and a sitewide noindex.
 *
 * Fails closed on purpose: an unset variable means noindex, so a preview can
 * never be indexed by omission. Production sets it explicitly.
 */
export const isProduction = import.meta.env.PUBLIC_SITE_DOMAIN === site.domain;
