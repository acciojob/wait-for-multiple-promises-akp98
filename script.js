// Function to simulate a promise that resolves after a random time (between 1 and 3 seconds)
function createRandomPromise(promiseName) {
  const timeTaken = Math.random() * 2 + 1; // Random time between 1 and 3 seconds

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: promiseName, time: timeTaken.toFixed(3) }); // Resolve with the time taken (rounded to 3 decimal places)
    }, timeTaken * 1000);
  });
}

// Function to handle the table and promises
function handlePromises() {
  const tableBody = document.querySelector('#promiseTable tbody');
  const loadingText = document.getElementById('loadingText');
  
  // Create 3 promises
  const promise1 = createRandomPromise('Promise 1');
  const promise2 = createRandomPromise('Promise 2');
  const promise3 = createRandomPromise('Promise 3');

  // Wait for all promises to resolve
  Promise.all([promise1, promise2, promise3])
    .then(results => {
      // Remove the loading text once promises are resolved
      loadingText.remove();

      // Total time taken for all promises to resolve
      const totalTime = results.reduce((sum, result) => sum + parseFloat(result.time), 0).toFixed(3);

      // Create new rows for the table with the promise results
      results.forEach(result => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${result.name}</td><td>${result.time}</td>`;
        tableBody.appendChild(row);
      });

      // Add the total row to the table
      const totalRow = document.createElement('tr');
      totalRow.innerHTML = `<td>Total</td><td>${totalTime}</td>`;
      tableBody.appendChild(totalRow);
    })
    .catch(error => {
      console.error('Error resolving promises:', error);
    });
}

// Call the function to start the promise handling
handlePromises();
