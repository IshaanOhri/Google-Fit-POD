const calculateDates = () => {
  var currentDate = new Date();
  currentDate.setUTCHours(0, 0, 0, 0);
  const endTime = currentDate - 19800000 + 86400000;

  const dayNumber = new Date().getDay();

  const startTime = endTime - 86400000 * dayNumber;

  var dates = [];

  for (var i = dayNumber - 1; i >= 0; i--) {
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
