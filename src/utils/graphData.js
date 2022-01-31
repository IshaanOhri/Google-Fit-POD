const createGraphData = (dataName) => {
  const data = JSON.parse(sessionStorage.getItem(dataName));
  const dates = JSON.parse(sessionStorage.getItem("dates"));

  let graphData = [];

  for (var i = 0; i < 7; i++) {
    var tempObject = {
      name: dates[i],
      data: data[i],
    };

    graphData.push(tempObject);
  }

  return graphData;
};

export { createGraphData };
