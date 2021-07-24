export const historyOptions = {
    lineHeightAnnotation: {
      always: true,
      hover: false,
      lineWeight: 1.5,
    },
    legend: {
      labels: {
        fontSize: 18,
      }
    },
    animation: {
      duration: 2000,
      animateRotate: true,
    },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          type: "time",
          distribution: "linear",
        },
      ],
    },
  };