import {
storyblokEditable,
StoryblokServerComponent,
} from '@storyblok/react/rsc';

export default function Page({ blok }) {
  console.log("Page component rendered, blok:", {...(blok)});
return (
	<main {...storyblokEditable(blok)}>
		{blok.body.map((nestedBlok) => (
			<StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
		))}
	</main>
);
}
