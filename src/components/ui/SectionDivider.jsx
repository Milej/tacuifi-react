export default function SectionDivider({
  from = "#fbfaf7",
  to = "#ffffff",
  height = 56, // px
}) {
  return (
    <div
      aria-hidden="true"
      className="w-full"
      style={{
        height,
        background: `linear-gradient(to bottom, ${from}, ${to})`,
      }}
    />
  );
}