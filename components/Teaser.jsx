import { storyblokEditable } from "@storyblok/react/rsc";

export default function Teaser({ blok }) {

return (
	<div className="teaser">
		<h1>{blok.headline}</h1>
	</div>
);
}