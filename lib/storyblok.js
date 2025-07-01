import Page from "@/components/Page";
import Feature from "@/components/Feature";
import Grid from "@/components/Grid";
import Teaser from "@/components/Teaser";
import Image from "@/components/Image";
import TeaserHeader from "@/components/TeaserHeader";

import { apiPlugin, storyblokInit } from "@storyblok/react/rsc";

export const getStoryblokApi = storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_DELIVERY_API_ACCESS_TOKEN,
  use: [apiPlugin],
  components: {
  	page: Page,
  	feature: Feature,
  	grid: Grid,
  	teaser: Teaser,
	teaserHeader: TeaserHeader,
	image: Image
  },
  apiOptions: {
    region: "eu",
  },
});
