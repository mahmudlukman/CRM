import {
  Lightbulb,
  ListChecks,
  RefreshCw,
  Sparkles,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useGetPipelineInsightQuery } from "../../../redux/features/ai/aiApi";
import Card from "../../ui/Card";
import CardTitle from "../../ui/CardTitle";

const AiInsightsCard = () => {
  const {
    data: ai,
    isLoading: aiLoading,
    error,
    refetch,
  } = useGetPipelineInsightQuery();

  const aiError = error
    ? "Couldn't generate insights right now. Please try again."
    : "";

  return (
    <Card className="relative overflow-hidden border border-cyan-100/80 bg-gradient-to-br from-white via-cyan-50/20 to-blue-50/30 backdrop-blur-xl p-6 shadow-xl shadow-cyan-500/5 transition-all">
      {/* Background Decorative Glow */}
      <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />

      {/* Header Actions */}
      {ai && (
        <button
          className="absolute right-6 top-6 p-2 rounded-xl text-slate-400 hover:text-cyan-600 hover:bg-cyan-50/80 transition-all disabled:opacity-50 cursor-pointer"
          onClick={() => refetch()}
          disabled={aiLoading}
          aria-label="Regenerate insights"
          title="Regenerate insights"
        >
          <RefreshCw
            size={16}
            className={aiLoading ? "animate-spin text-cyan-600" : ""}
          />
        </button>
      )}

      <CardTitle
        icon={Sparkles}
        title="AI Sales Insights"
        subtitle="Powered by Gemini"
      />

      {/* Initial Empty / CTA State */}
      {!ai && !aiLoading && (
        <div className="mt-4 space-y-4">
          <p className="text-xs text-slate-600 leading-relaxed font-normal">
            Get an instant, data-driven read on your pipeline health and what to
            do next.
          </p>
          <button
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-semibold shadow-sm shadow-cyan-500/20 transition-all cursor-pointer"
            onClick={() => refetch()}
          >
            <Sparkles size={15} />
            <span>Analyze pipeline</span>
          </button>
        </div>
      )}

      {/* Loading State */}
      {aiLoading && (
        <div className="mt-6 flex flex-col items-center justify-center py-8 space-y-3 text-cyan-700 bg-cyan-50/40 border border-cyan-100/60 rounded-2xl">
          <Loader2 size={24} className="animate-spin text-cyan-600" />
          <span className="text-xs font-medium tracking-wide">
            Analyzing your pipeline…
          </span>
        </div>
      )}

      {/* Error State */}
      {aiError && (
        <div className="mt-4 flex items-center gap-2.5 p-3.5 rounded-xl bg-rose-50 border border-rose-200/80 text-rose-600 text-xs font-medium">
          <AlertCircle size={16} className="shrink-0" />
          <span>{aiError}</span>
        </div>
      )}

      {/* AI Analysis Output */}
      {ai && !aiLoading && (
        <div className="mt-5 space-y-5">
          {/* Health Score Gauge */}
          <div className="p-4 rounded-2xl bg-white/80 border border-slate-200/60 shadow-2xs space-y-2.5">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-600">Health Score</span>
              <span className="text-cyan-700 font-bold text-sm">
                {ai.healthScore}
                <span className="text-slate-400 font-normal text-xs">/100</span>
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden p-0.5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-500 ease-out"
                style={{
                  width: `${Math.min(Math.max(ai.healthScore, 0), 100)}%`,
                }}
              />
            </div>
          </div>

          {/* AI Executive Summary */}
          <p className="text-xs text-slate-700 leading-relaxed font-normal bg-white/40 p-3.5 rounded-xl border border-slate-100">
            {ai.summary}
          </p>

          {/* Observations List */}
          <div className="space-y-2.5">
            <h4 className="flex items-center gap-2 text-xs font-bold text-slate-800 tracking-tight">
              <Lightbulb size={15} className="text-amber-500" />
              <span>Observations</span>
            </h4>
            <ul className="space-y-1.5 pl-1">
              {ai.observations.map((item: string, i: number) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-xs text-slate-600 leading-relaxed"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Actionable Recommendations List */}
          <div className="space-y-2.5">
            <h4 className="flex items-center gap-2 text-xs font-bold text-slate-800 tracking-tight">
              <ListChecks size={15} className="text-cyan-600" />
              <span>Recommendations</span>
            </h4>
            <ul className="space-y-1.5 pl-1">
              {ai.recommendations.map((item: string, i: number) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-xs text-slate-600 leading-relaxed"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </Card>
  );
};

export default AiInsightsCard;
