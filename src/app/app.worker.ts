/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  // data is an ArrayBuffer transferred from the main thread
  const heavyData = new Float64Array(data);

  // Simulate heavy processing (e.g., geospatial calculations with PostGIS-like data)
  for (let i = 0; i < heavyData.length; i++) {
    heavyData[i] = Math.sqrt(heavyData[i]) * Math.random();
  }

  // Transfer the memory BACK to the main thread
  // The second argument [heavyData.buffer] is the "transfer list"
  postMessage(heavyData.buffer, [heavyData.buffer]);
});