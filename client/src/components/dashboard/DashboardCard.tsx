import type { DashboardCardProps } from "../../@types";

const DashboardCard = ({ children, className = "" }: DashboardCardProps) => {
  return <section className={`card ${className}`}>{children}</section>;
};

export default DashboardCard;
