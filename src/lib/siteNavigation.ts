import { client } from "./client";
import { getAstroMainPages, sortNavLinks, type SiteNavLink } from "./astroPageNavigation";
import { getArticleNavigation } from "./contentNavigation";
import { getEnabledPracticePageNavItems } from "./practicePagesNav";

/** Position du lien « Articles » dans le menu, entre les pages Astro et « Mes pratiques ». */
const ARTICLES_NAV_ORDER = 30;

const ARTICLES_NAV_LINK: SiteNavLink = {
  href: "/articles/",
  label: "Articles",
  order: ARTICLES_NAV_ORDER,
};

export type SiteNavigation = {
  /**
   * Menu principal trié : pages Astro exportant `pageNav` (Contact en dernier par convention),
   * plus le lien « Articles » quand au moins un article est visible.
   */
  main: SiteNavLink[];
  /** Pages pratique activées (menu « Mes pratiques »), triées. */
  practices: SiteNavLink[];
};

/** Navigation partagée par le header et le pied de page. */
export async function getSiteNavigation(): Promise<SiteNavigation> {
  const [astroPages, articles] = await Promise.all([getAstroMainPages(), getArticleNavigation()]);

  return {
    main: articles.length > 0 ? sortNavLinks([...astroPages, ARTICLES_NAV_LINK]) : astroPages,
    practices: getEnabledPracticePageNavItems(client),
  };
}
