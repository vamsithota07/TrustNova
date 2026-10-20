/** Play a paused tween the first time `el` comes into view (or at once if the visitor has already scrolled past it).
 *  Uses IntersectionObserver rather than pre-measured scroll positions, so content further down the page still reveals
 *  correctly after images and fonts change the page's height. Returns a cleanup function. */
export function revealWhenVisible(el: Element, play: () => void, bottomMargin = "-12%"): () => void {
  let done = false;
  const start = () => { if (!done) { done = true; play(); io.disconnect(); } };
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) if (e.isIntersecting || e.boundingClientRect.bottom < 0) start();
    },
    { rootMargin: `0px 0px ${bottomMargin} 0px` },
  );
  io.observe(el);
  return () => io.disconnect();
}
