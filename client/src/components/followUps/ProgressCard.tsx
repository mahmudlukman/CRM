interface ProgressCardProps {
  completed: number;
  total: number;
  percentDone: number;
}

const ProgressCard = ({ completed, total, percentDone }: ProgressCardProps) => {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 p-5 backdrop-blur-xl shadow-xl shadow-slate-900/5 transition-all">
      {/* Header Info */}
      <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-2.5">
        <span className="text-slate-500">
          <b className="text-slate-900 font-bold">{completed}</b> of{" "}
          <b className="text-slate-900 font-bold">{total}</b> tasks done
        </span>
        <b className="text-cyan-700 font-extrabold text-sm">{percentDone}%</b>
      </div>

      {/* Progress Track & Fill */}
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100 p-0.5 border border-slate-200/50">
        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-500 ease-out shadow-xs shadow-cyan-500/30"
          style={{ width: `${percentDone}%` }}
        />
      </div>
    </section>
  );
};

export default ProgressCard;
