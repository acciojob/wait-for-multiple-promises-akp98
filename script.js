// Function to create a promise that resolves after a random time between 1 and 3 seconds
function createRandomPromise(promiseName) {
  const timeTaken = (Math.random() * 2 + 1).toFixed(3); // Random time between 1 and 3 seconds
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ name: promiseName, time: timeTaken });
    }, timeTaken * 1000); // Wait for timeTaken seconds
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

  // Wait for all promises to resolve using Promise.all
  Promise.all([promise1, promise2, promise3])
    .then(results => {
      // Remove the loading text once promises are resolved
      loadingText.remove();

      // Calculate total time taken for all promises
      const totalTime = results.reduce((sum, result) => sum + parseFloat(result.time), 0).toFixed(3);

      // Create new rows for each resolved promise and append them to the table
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

// Call the function to start handling the promises and table
handlePromises();
