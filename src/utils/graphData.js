/*
 * @Author: Ishaan Ohri
 * @Date: 2022-01-31 23:02:11
 * @Last Modified by: Ishaan Ohri
 * @Last Modified time: 2022-01-31 23:12:02
 * @Description: Functions to arrange data for different matrix in the form required for graphs
 */

// Function to arrange data in required form with full date label
const createGraphDataFull = (dataName) => {
  // Get data from session storage by `dataName`
  const data = JSON.parse(sessionStorage.getItem(dataName));

  // Get date labels from session storage
  const dates = JSON.parse(sessionStorage.getItem("dates"));

  // Empty array for graph data
  let graphData = [];

  // Loop to add data into `graphData` for past 7 days
  for (var i = 0; i < 7; i++) {
    // Create temporary object with two fields `name` and `data`
    // `name` => label for axis
    // `data` => data to be plotted on graph
    var tempObject = {
      name: dates[i],
      data: data[i],
    };

    // Add temporary object into `graphData`
    graphData.push(tempObject);
  }

  return graphData;
};

// Function to arrange data in required form with only initial 2 characters for date label
const createGraphData = (dataName) => {
  // Get data from session storage by `dataName`
  const data = JSON.parse(sessionStorage.getItem(dataName));

  // Get date labels from session storage
  const dates = JSON.parse(sessionStorage.getItem("dates"));

  // Empty array for graph data
  let graphData = [];

  // Loop to add data into `graphData` for past 7 days
  for (var i = 0; i < 7; i++) {
    // Create temporary object with two fields `name` and `data`
    // `name` => label for axis. Slice first 2 characters
    // `data` => data to be plotted on graph
    var tempObject = {
      name: dates[i].substring(0, 2),
      data: data[i],
    };

    // Add temporary object into `graphData`
    graphData.push(tempObject);
  }
  return graphData;
};

export { createGraphData, createGraphDataFull };
