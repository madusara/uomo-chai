import React from "react";

export default function Pagination1({ progress = 39, current = 39, total = 100 }) {
  const safeTotal = Number(total) > 0 ? Number(total) : 100;
  const safeCurrent = Math.min(Math.max(Number(current) || 0, 0), safeTotal);
  const safeProgress = Math.min(
    Math.max(Number(progress) || (safeCurrent / safeTotal) * 100, 0),
    100
  );

  return (
    <div
      className="progress progress_uomo mb-3 ms-auto me-auto"
      style={{ width: "300px" }}
    >
      <div
        className="progress-bar"
        role="progressbar"
        style={{ width: `${safeProgress}%` }}
        aria-valuenow={safeCurrent}
        aria-valuemin="0"
        aria-valuemax={safeTotal}
      ></div>
    </div>
  );
}
