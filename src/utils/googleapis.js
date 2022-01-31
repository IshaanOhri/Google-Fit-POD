const getStepCount = async (
  token,
  startTimeMillis,
  endTimeMillis,
  durationMillis
) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    aggregateBy: [
      {
        dataTypeName: "com.google.step_count.delta",
      },
    ],
    bucketByTime: {
      durationMillis: durationMillis,
    },
    startTimeMillis: startTimeMillis,
    endTimeMillis: endTimeMillis,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const fetchReq = await fetch(
      "https://fitness.googleapis.com/fitness/v1/users/me/dataset:aggregate",
      requestOptions
    );
    const fetchReqRes = await fetchReq.json();

    var values = [];

    const bucket = fetchReqRes.bucket;

    bucket.forEach((day) => {
      try {
        const value = day.dataset[0].point[0].value[0].intVal;
        if (value !== undefined) values.push(value);
        else values.push(0);
      } catch (error) {
        values.push(0);
      }
    });

    sessionStorage.setItem("steps", JSON.stringify(values));

    return values;
  } catch (e) {
    console.log(`Steps Error ${e}`);
  }
};

const getDistance = async (
  token,
  startTimeMillis,
  endTimeMillis,
  durationMillis
) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    aggregateBy: [
      {
        dataTypeName: "com.google.distance.delta",
      },
    ],
    bucketByTime: {
      durationMillis: durationMillis,
    },
    startTimeMillis: startTimeMillis,
    endTimeMillis: endTimeMillis,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const fetchReq = await fetch(
      "https://fitness.googleapis.com/fitness/v1/users/me/dataset:aggregate",
      requestOptions
    );
    const fetchReqRes = await fetchReq.json();

    var values = [];

    const bucket = fetchReqRes.bucket;

    bucket.forEach((day) => {
      try {
        const value = day.dataset[0].point[0].value[0].fpVal;
        if (value !== undefined) values.push((value / 1000).toPrecision(2));
        else values.push(0);
      } catch (error) {
        values.push(0);
      }
    });

    sessionStorage.setItem("distance", JSON.stringify(values));

    return values;
  } catch (e) {
    console.log(`Distance Error ${e}`);
  }
};

const getActiveMinutes = async (
  token,
  startTimeMillis,
  endTimeMillis,
  durationMillis
) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    aggregateBy: [
      {
        dataTypeName: "com.google.active_minutes",
      },
    ],
    bucketByTime: {
      durationMillis: durationMillis,
    },
    startTimeMillis: startTimeMillis,
    endTimeMillis: endTimeMillis,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const fetchReq = await fetch(
      "https://fitness.googleapis.com/fitness/v1/users/me/dataset:aggregate",
      requestOptions
    );
    const fetchReqRes = await fetchReq.json();

    var values = [];

    const bucket = fetchReqRes.bucket;

    bucket.forEach((day) => {
      try {
        const value = day.dataset[0].point[0].value[0].intVal;
        if (value !== undefined) values.push(value);
        else values.push(0);
      } catch (error) {
        values.push(0);
      }
    });

    sessionStorage.setItem("activeMinutes", JSON.stringify(values));

    return values;
  } catch (e) {
    console.log(`Active Minutes Error ${e}`);
  }
};

const getCaloriesExpended = async (
  token,
  startTimeMillis,
  endTimeMillis,
  durationMillis
) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    aggregateBy: [
      {
        dataTypeName: "com.google.calories.expended",
      },
    ],
    bucketByTime: {
      durationMillis: durationMillis,
    },
    startTimeMillis: startTimeMillis,
    endTimeMillis: endTimeMillis,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const fetchReq = await fetch(
      "https://fitness.googleapis.com/fitness/v1/users/me/dataset:aggregate",
      requestOptions
    );
    const fetchReqRes = await fetchReq.json();

    var values = [];

    const bucket = fetchReqRes.bucket;

    bucket.forEach((day) => {
      try {
        const value = day.dataset[0].point[0].value[0].fpVal;
        if (value !== undefined) values.push(Math.ceil(value));
        else values.push(0);
      } catch (error) {
        values.push(0);
      }
    });

    sessionStorage.setItem("caloriesExpended", JSON.stringify(values));

    return values;
  } catch (e) {
    console.log(`Calories Expended Error ${e}`);
  }
};

const getHeartMinutes = async (
  token,
  startTimeMillis,
  endTimeMillis,
  durationMillis
) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    aggregateBy: [
      {
        dataTypeName: "com.google.heart_minutes",
      },
    ],
    bucketByTime: {
      durationMillis: durationMillis,
    },
    startTimeMillis: startTimeMillis,
    endTimeMillis: endTimeMillis,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const fetchReq = await fetch(
      "https://fitness.googleapis.com/fitness/v1/users/me/dataset:aggregate",
      requestOptions
    );
    const fetchReqRes = await fetchReq.json();

    var values = [];

    const bucket = fetchReqRes.bucket;

    bucket.forEach((day) => {
      try {
        const value = day.dataset[0].point[0].value[1].intVal;
        if (value !== undefined) values.push(value);
        else values.push(0);
      } catch (error) {
        values.push(0);
      }
    });

    sessionStorage.setItem("heartMinutes", JSON.stringify(values));

    return values;
  } catch (e) {
    console.log(`Heart Minutes Error ${e}`);
  }
};

const getSleepSegment = async (
  token,
  startTimeMillis,
  endTimeMillis,
  durationMillis
) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    aggregateBy: [
      {
        dataTypeName: "com.google.sleep.segment",
      },
    ],
    bucketByTime: {
      durationMillis: durationMillis,
    },
    startTimeMillis: startTimeMillis,
    endTimeMillis: endTimeMillis,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const fetchReq = await fetch(
      "https://fitness.googleapis.com/fitness/v1/users/me/dataset:aggregate",
      requestOptions
    );
    const fetchReqRes = await fetchReq.json();

    var values = [];

    const bucket = fetchReqRes.bucket;

    bucket.forEach((day) => {
      try {
        const value = day.dataset[0].point[0].value[1].intVal;
        if (value !== undefined) values.push(value);
        else values.push(0);
      } catch (error) {
        values.push(0);
      }
    });

    sessionStorage.setItem("sleepSegment", JSON.stringify(values));

    return values;
  } catch (e) {
    console.log(`Sleep Segment Error ${e}`);
  }
};

const getSpeed = async (
  token,
  startTimeMillis,
  endTimeMillis,
  durationMillis
) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    aggregateBy: [
      {
        dataTypeName: "com.google.speed",
      },
    ],
    bucketByTime: {
      durationMillis: durationMillis,
    },
    startTimeMillis: startTimeMillis,
    endTimeMillis: endTimeMillis,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const fetchReq = await fetch(
      "https://fitness.googleapis.com/fitness/v1/users/me/dataset:aggregate",
      requestOptions
    );
    const fetchReqRes = await fetchReq.json();

    var values = [];

    const bucket = fetchReqRes.bucket;

    bucket.forEach((day) => {
      try {
        const value = day.dataset[0].point[0].value;

        var speed = 0,
          count = 0;

        value.forEach((each) => {
          count += 1;
          speed += each.fpVal;
        });

        values.push((speed / count).toPrecision(2));
      } catch (error) {
        values.push(0);
      }
    });

    sessionStorage.setItem("speed", JSON.stringify(values));

    return values;
  } catch (e) {
    console.log(`Speed Error ${e}`);
  }
};

export {
  getStepCount,
  getDistance,
  getActiveMinutes,
  getCaloriesExpended,
  getHeartMinutes,
  getSleepSegment,
  getSpeed,
};
