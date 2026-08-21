export default function StatCard({ label, value, subtext, chart }) {
  return (
    <div className="wb-card flex flex-col items-center justify-center text-center min-h-[140px]">
      <div className="text-xs font-bold uppercase tracking-wider mb-1 opacity-70">{label}</div>
      <div className="text-3xl font-black mb-1">{value}</div>
      {subtext && <div className="text-xs font-bold opacity-60">{subtext}</div>}
      {chart && <div className="mt-2">{chart}</div>}
    </div>
  );
}