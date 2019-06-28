console.log('Hello Playfair');

$(document).ready(onReady);

function onReady() {
  getAllMovies();
  $('#add-movie').on('click', handleAddMovie);
}

function handleAddMovie(event){
  console.log('in handleAddMovie');
  event.preventDefault();

  // Get info from input fields
  let name = $('#in-name').val();
  let movie = $('#in-movie').val();

  $.ajax({
    method: 'POST',
    url: '/movies',
    data: {
      name: name,
      movie: movie
    }
  })
  .then( function (response) {
    // POST (add movie) was good so...
    // 1) Clear out input fields on form 
    $('#in-name').val('');
    $('#in-movie').val('');

    // 2) GET all my movies again, so the new one shows on the page
    getAllMovies();
  })
  .catch( function (error) {
    console.log(`Something bad happen...`);
    alert('Something bad happened. Try again later.');
  })
}



// This will add all our movies to the DOM 
function renderMovies(movieList) {
  $('#movies').empty();
  for ( let item of movieList ) {
    $('#movies').append(`
      <tr>
        <td>${item.name}</td>
        <td>${item.movie}</td>
      </tr>
    `);
  }
}

function getAllMovies() {
  // ajax is asynchronous $.ajax return a Promise
  // that Promise says that when the server responds
  // we should call the function in the `then`
  $.ajax({
    method: 'GET',
    url: '/movies'
  })
  .then( function (response){
    console.log(`Got some movies!!!`, response);
    renderMovies(response);
  })
  .catch( function(error) {
    console.log(`Something bad happen...`);
    alert('Something bad happened. Try again later.');
  })
}