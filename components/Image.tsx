import { storyblokEditable } from "@storyblok/react/rsc";
 
export default function Teaser({ blok }) {
  console.log("image", blok);
  return (
    <div className="image" data-cy="image" {...storyblokEditable(blok)}>
      {blok.alt.toString().length > 0 && <img src={blok.src.url} alt={blok.alt} /> }
      {!blok.alt && <img src={blok.src.url} />}
    </div>
  );
}