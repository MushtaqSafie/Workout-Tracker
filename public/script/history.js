
// render workout history html cards
const historyDiv = document.getElementById("historyList");
// console.log(historyDiv);
historyDiv.innerHTML = '<h1>There no workout record excited yet!</h1>';

function dateConverter(date) {
  const newDate = new Date(date);
  const yyyy = newDate.getFullYear();
  const mm = newDate.getMonth()+1;
  const dd = newDate.getDate();
  const result = `${yyyy}-${mm}-${dd}`;
  return result
}


function renderHTML(data) {
  data = data.reverse();

  let HTML = "";
  data.forEach(workout => {
    if (!workout.exercises.length == 0) {
      console.log(workout);
      const newDate = dateConverter(workout.day);
      HTML += `
      <div class="row">
      <div class="col-md-12">
      <div class="card bg-light mb-3">
      <div class="card-header">
      <h2>Workout ${newDate} <span class="badge badge-secondary">${workout.totalDuration}min</span></h2>
      </div>
      <div class="card-body">`

      // Resistance Table
      HTML += `
      <table class="table table-striped"><tbody>`

      workout.exercises.forEach(exercise => {
        // console.log(exercise);
        if (exercise.type == "resistance") {
          // Resistance Table
          HTML += `
            <tr>
              <th scope="row">Resistance: ${exercise.name}</th>
              <td>Duration: ${exercise.duration}</td>
              <td>Weight: ${exercise.weight}</td>
              <td>Reps: ${exercise.reps}</td>
              <td>Sets: ${exercise.sets}</td>
            </tr>`
        } 
      });

      HTML += `
      </tbody>
      </table><br>
      <table class="table table-striped"><tbody>`
      workout.exercises.forEach(exercise => {
        // console.log(exercise);
        if (exercise.type == "cardio") {
          // Cardio table
          HTML += `
          <tr>
            <th scope="row">Cardio: ${exercise.name}</th>
            <td>Duration: ${exercise.duration}</td>
            <td>Distance: ${exercise.distance}</td>
          </tr>`
        }
      });

      HTML += `</tbody></table><br></div></div></div></div></div>`
    }
  });
  historyDiv.innerHTML = HTML;
}

// get all workout data from back-end
API.getAllWorkout().then(renderHTML);