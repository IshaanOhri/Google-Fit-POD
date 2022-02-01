/*
 * @Author: Ishaan Ohri
 * @Date: 2022-01-31 22:45:53
 * @Last Modified by: Ishaan Ohri
 * @Last Modified time: 2022-01-31 22:59:12
 * @Description: Function to calculate dates for graph axis labels and start and end milliseconds for Google API
 */
const calculateDates = () => {
  var currentDate = new Date();
  currentDate.setUTCHours(0, 0, 0, 0);

  // Millisecond for 12 AM today
  // endTime = currentDate - 5:30 hrs + 1 day
  const endTime = currentDate - 19800000 + 86400000;

  // Millisecond for 12 AM 7 days ago
  const startTime = endTime - 86400000 * 7;

  // Empty array for dates
  var dates = [];

  // Loop to add date of past 7 days into `dates` variable
  for (var i = 6; i >= 0; i--) {
    var pastDate = new Date(currentDate);
    pastDate.setDate(pastDate.getDate() - i);

    // Split date into day, month, year....
    var splitDate = String(pastDate).split(" ");

    // Add date to dates array
    dates.push(
      `${splitDate[0]}, ${splitDate[1]} ${splitDate[2]} ${splitDate[3]} `
    );
  }

  // Add `dates` variable into session storage
  sessionStorage.setItem("dates", JSON.stringify(dates));

  // return `startTime`, `endTime` and `dates`
  return { startTime, endTime, dates };
};

export { calculateDates };
