const calculateDates = () => {
  var currentDate = new Date();
  currentDate.setUTCHours(0, 0, 0, 0);
  const endTime = currentDate - 19800000 + 86400000;

  const startTime = endTime - 86400000 * 7;

  var dates = [];

  for (var i = 6; i >= 0; i--) {
    var pastDate = new Date(currentDate);
    pastDate.setDate(pastDate.getDate() - i);
    var splitDate = String(pastDate).split(" ");
    dates.push(
      `${splitDate[0]}, ${splitDate[1]} ${splitDate[2]} ${splitDate[3]} `
    );
  }

  sessionStorage.setItem("dates", JSON.stringify(dates));
  return { startTime, endTime, dates };
};

export { calculateDates };
