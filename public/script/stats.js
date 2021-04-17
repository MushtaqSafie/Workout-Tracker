function generatePalette() {
  const arr = [
    '#003f5c',
    '#2f4b7c',
    '#665191',
    '#a05195',
    '#d45087',
    '#f95d6a',
    '#ff7c43',
    'ffa600',
    '#003f5c',
    '#2f4b7c',
    '#665191',
    '#a05195',
    '#d45087',
    '#f95d6a',
    '#ff7c43',
    'ffa600',
  ];

  return arr;
}

function populateChart(data) {
  let durations = data.map(({ totalDuration }) => totalDuration);
  let pounds = calculateTotalWeight(data);
  let workouts = workoutNames(data);
  const colors = generatePalette();

  let line = document.querySelector('#canvas').getContext('2d');
  let bar = document.querySelector('#canvas2').getContext('2d');
  let pie = document.querySelector('#canvas3').getContext('2d');
  let pie2 = document.querySelector('#canvas4').getContext('2d');

  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const labels = data.map(({ day }) => {
    const date = new Date(day);
    return daysOfWeek[date.getDay()];
  });

  let lineChart = new Chart(line, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Workout Duration In Minutes',
          backgroundColor: 'red',
          borderColor: 'red',
          data: durations,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      title: {
        display: true,
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
            },
          },
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
            },
          },
        ],
      },
    },
  });

  let barChart = new Chart(bar, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Pounds',
          data: pounds,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: 'Pounds Lifted',
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });

  let pieChart = new Chart(pie, {
    type: 'pie',
    data: {
      labels: workouts,
      datasets: [
        {
          label: 'Exercises Performed',
          backgroundColor: colors,
          data: durations,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: 'Exercises Performed',
      },
    },
  });

  let donutChart = new Chart(pie2, {
    type: 'doughnut',
    data: {
      labels: workouts,
      datasets: [
        {
          label: 'Exercises Performed',
          backgroundColor: colors,
          data: pounds,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: 'Exercises Performed',
      },
    },
  });
}

function calculateTotalWeight(data) {
  let totals = [];

  data.forEach((workout) => {
    const workoutTotal = workout.exercises.reduce((total, { type, weight }) => {
      if (type === 'resistance') {
        return total + weight;
      } else {
        return total;
      }
    }, 0);

    totals.push(workoutTotal);
  });

  return totals;
}

function workoutNames(data) {
  let workouts = [];

  data.forEach((workout) => {
    workout.exercises.forEach((exercise) => {
      workouts.push(exercise.name);
    });
  });

  // return de-duplicated array with JavaScript `Set` object
  return [...new Set(workouts)];
}

const dataRange =  document.getElementById("range-value");
let dataRangeValue = dataRange.value;
// console.log(dataRange.value);

if (dataRange) {
  dataRange.addEventListener("change", handleDataRangeChange);
}

function handleDataRangeChange(event) {
  dataRangeValue = event.target.value;
  location.reload(); 
}


// get all workout data from back-end
API.getWorkoutsInRange(dataRangeValue).then(populateChart);




// render workout history html cards
const historyDiv = document.getElementById("historyList");
console.log(historyDiv);
historyDiv.innerHTML = '<h1>helo</h1>';

function renderHTML(data) {
  // console.log(data);
  // console.log(historyDiv);
//   let x = `            <div class="card-header">
//   <h2>Workouts of 2021-03-29 <span class="badge badge-secondary">24min</span></h2>
// </div>`
  // for (i = 0; i < data.length; i++) {

  // }
  let HTML = "";
  data.forEach(workout => {
    HTML += `
    <div class="row">
    <div class="col-md-12">
      <div class="card bg-light mb-3">
        <div class="card-header">
          <h2>Workouts of ${workout.day} <span class="badge badge-secondary">${workout.totalDuration}min</span></h2>
        </div>
        <div class="card-body">
    `
    // Resistance Table
    HTML += `
    <table class="table table-striped">
    <thead class="thead-dark">
      <tr>
        <th scope="col">Resistance</th>
        <th scope="col">Duration</th>
        <th scope="col">Weight</th>
        <th scope="col">Reps</th>
        <th scope="col">Sets</th>
      </tr>
    </thead>
    <tbody>
    `

    workout.exercises.forEach(exercise => {
      // console.log(exercise);
      if (exercise.type == "resistance") {
        // Resistance Table
        HTML += `
          <tr>
            <th scope="row">resistance: ${exercise.name}</th>
            <td>${exercise.duration}</td>
            <td>${exercise.weight}</td>
            <td>${exercise.reps}</td>
            <td>${exercise.sets}</td>
          </tr>

    
        `
      } 
    });

    HTML += `
    </tbody>
    </table><br>
    <table class="table table-striped">
    <thead class="thead-dark">
      <tr>
        <th scope="col">Cardio</th>
        <th scope="col">Duration</th>
        <th scope="col">Distance</th>
      </tr>
    </thead>
    <tbody>
    `
    workout.exercises.forEach(exercise => {
      // console.log(exercise);
      if (exercise.type == "cardio") {
        // Cardio table
        HTML += `
            <tr>
              <th scope="row">Cardio: ${exercise.name}</th>
              <td>25</td>
              <td>10</td>
            </tr>
        `
      }
    });

    HTML += `
    </tbody>
    </table><br>
    </div>
    </div>
    </div>
    </div>
    </div>
    `
  });


  historyDiv.innerHTML = HTML;

}

// get all workout data from back-end
API.getWorkoutsInRange(dataRangeValue).then(renderHTML);