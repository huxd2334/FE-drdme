export const compareService = {
  diffVisits: (leftVisit, rightVisit) => {
    // mock diff result
    return {
      leftVisit,
      rightVisit,
      drChange: Math.random() > 0.5 ? "Progressed" : "Stable",
      dmeChange: Math.random() > 0.5 ? "New DME" : "No change",
      summary: "So sánh giả lập giữa 2 lần khám.",
    };
  },
};
