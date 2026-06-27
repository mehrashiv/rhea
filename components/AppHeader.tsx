export type Tab = "feed" | "mine";

export function AppHeader({
  greetingName,
  onSignOut,
  tab,
  onTabChange,
}: {
  greetingName: string;
  onSignOut: () => void;
  tab: Tab;
  onTabChange: (tab: Tab) => void;
}) {
  return (
    <header className="app-header">
      <div className="app-header__bar">
        <div className="brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="brand__mark" src="/lila-mark.svg" alt="" />
          <span className="brand__name">lila</span>
        </div>
        <div className="app-header__actions">
          <span className="app-header__greeting">Hi, {greetingName}</span>
          <button type="button" onClick={onSignOut} className="btn btn--ghost">
            Sign out
          </button>
        </div>
      </div>
      <div className="app-header__tabs-row">
        <div className="tabs">
          <button
            type="button"
            onClick={() => onTabChange("feed")}
            className={`tab ${tab === "feed" ? "tab--active" : ""}`}
          >
            Feed
          </button>
          <button
            type="button"
            onClick={() => onTabChange("mine")}
            className={`tab ${tab === "mine" ? "tab--active" : ""}`}
          >
            My Photos
          </button>
        </div>
      </div>
    </header>
  );
}
