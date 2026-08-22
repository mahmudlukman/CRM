interface ProgressCardProps {
  completed: number;
  total: number;
  percentDone: number;
}

const ProgressCard = ({ completed, total, percentDone }: ProgressCardProps) => {
  return (
    <section className="card progress-card">
      <div className="progress-head">
        <span>
          {completed} of {total} tasks done
        </span>
        <b>{percentDone}%</b>
      </div>
      <div className="progress-bar">
        <i style={{ width: `${percentDone}%` }} />
      </div>
    </section>
  );
};

export default ProgressCard;
