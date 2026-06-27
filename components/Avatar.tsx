export function Avatar({ name, src }: { name: string; src?: string | null }) {
  const initial = (name.trim()[0] || "·").toUpperCase();

  return (
    <div className="avatar">
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" />
      ) : (
        initial
      )}
    </div>
  );
}
