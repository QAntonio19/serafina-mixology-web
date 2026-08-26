import { BRAND } from '../lib/content';

/**
 * The signature at the foot of the page: the full lockup, name set edge
 * to edge with the descriptor under it. Clipped, because the tracking on
 * the last glyph would otherwise push the document wider than the
 * viewport.
 */
export default function Wordmark() {
  return (
    <section aria-hidden className="bg-invert px-4 pb-6 pt-2">
      <div className="overflow-hidden">
        <p
          className="brand reversed whitespace-nowrap text-center text-on-invert"
          style={{
            fontSize: 'clamp(2.5rem, 14.6vw, 13rem)',
            marginRight: '-0.11em',
          }}
        >
          {BRAND.name}
        </p>
      </div>
      <p
        className="brand-sub reversed mt-4 text-center text-on-invert/70"
        style={{ fontSize: 'clamp(0.6rem, 1.5vw, 1.05rem)', marginRight: '-0.3em' }}
      >
        {BRAND.sub}
      </p>
    </section>
  );
}
