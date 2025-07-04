import { storyblokEditable } from '@storyblok/react/rsc';

export default function TeaserHeader({ blok }) {

return (
	<div className="teaser" data-cy="teaser" {...storyblokEditable(blok)}>
		<h1>{blok.headline}</h1>
	</div>
);
}
