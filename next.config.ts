import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    // Package/gallery photos ship as local files under /public/images.
    // No remote patterns are configured on purpose — see README for how
    // to add a remote image host (e.g. a CMS or bucket) later.
  },
};

export default withNextIntl(nextConfig);
