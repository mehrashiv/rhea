export function PublicMasthead() {
  return (
    <div className="masthead">
      <div className="brand">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="brand__mark" src="/lila-mark.svg" alt="" />
        <span className="brand__name">lila</span>
      </div>
      <p className="masthead__tagline">A quiet place for the all things fashion.</p>
    </div>
  );
}
