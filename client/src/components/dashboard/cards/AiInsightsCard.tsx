import { Lightbulb, ListChecks, RefreshCw, Sparkles } from "lucide-react";
import { useGetPipelineInsightMutation } from "../../../redux/features/ai/aiApi";
import Card from "../../ui/Card";
import CardTitle from "../../ui/CardTitle";

const AiInsightsCard = () => {
  const [getPipelineInsight, { data: ai, isLoading: aiLoading, error }] =
    useGetPipelineInsightMutation();

  const aiError = error
    ? "Couldn't generate insights right now. Please try again."
    : "";

  return (
    <Card className={`ai-card ${ai ? "has-result" : ""}`}>
      {ai && (
        <button
          className="icon-btn refresh"
          onClick={() => getPipelineInsight()}
          disabled={aiLoading}
          aria-label="Regenerate"
        >
          <RefreshCw size={16} className={aiLoading ? "animate-spin" : ""} />
        </button>
      )}
      <CardTitle
        icon={Sparkles}
        title="AI Sales Insights"
        subtitle="Powered by Gemini"
      />

      {!ai && !aiLoading && (
        <>
          <p>
            Get an instant, data-driven read on your pipeline health and what to
            do next.
          </p>
          <button
            className="primary-button small"
            onClick={() => getPipelineInsight()}
          >
            <Sparkles size={16} /> Analyze pipeline
          </button>
        </>
      )}

      {aiLoading && (
        <div className="ai-loading">
          <span className="spinner dark" />
          Analyzing your pipeline…
        </div>
      )}

      {aiError && <p className="modal-error">{aiError}</p>}

      {ai && !aiLoading && (
        <div className="ai-result">
          <div className="health-score-row">
            <span>Health Score</span>
            <b>{ai.healthScore}/100</b>
          </div>
          <div className="health-bar">
            <i style={{ width: `${ai.healthScore}%` }} />
          </div>
          <p className="ai-summary">{ai.summary}</p>
          <div className="ai-section">
            <h4>
              <Lightbulb size={16} /> Observations
            </h4>
            <ul>
              {ai.observations.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="ai-section">
            <h4>
              <ListChecks size={16} /> Recommendations
            </h4>
            <ul>
              {ai.recommendations.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </Card>
  );
};

export default AiInsightsCard;
