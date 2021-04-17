
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

  console.log(HTML);

  historyDiv.innerHTML = HTML;

}

// get all workout data from back-end
API.getWorkoutsInRange().then(renderHTML);