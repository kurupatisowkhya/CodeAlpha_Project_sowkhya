// Select all the elements in the HTML page
// Function to handle user input from the search bar
function handleSearch() {
  let searchTerm = document.getElementById('search_input').value;
  let apiKey = 'YOUR_GOOGLE_API_KEY';
  let searchEngineId = 'YOUR_SEARCH_ENGINE_ID';
  let url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${searchTerm}`;

  // Make a request to Google Custom Search API
  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Extract search results from the response
      let results = data.items;
      displaySearchResults(results);
    })
    .catch(error => console.error('Error fetching data:', error));
}

// Function to display search results to the user
function displaySearchResults(results) {
  let searchResultsContainer = document.getElementById('search_results');
  searchResultsContainer.innerHTML = ''; // Clear previous results

  results.forEach(result => {
    let resultLink = document.createElement('a');
    resultLink.href = result.link;
    resultLink.textContent = result.title;
    resultLink.target = '_blank'; // Open link in a new tab
    searchResultsContainer.appendChild(resultLink);
    searchResultsContainer.appendChild(document.createElement('br'));
  });
}

// and assign them to a variable
let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

// Specify globally used values
let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create the audio element for the player
let curr_track = document.createElement('audio');

// Define the list of tracks that have to be played
let track_list = [
{
	name: "Night Owl",
	artist: "Broke For Free",
	image: "https://images.pexels.com/photos/2264753/pexels-photo-2264753.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
  path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/WFMU/Broke_For_Free/Directionless_EP/Broke_For_Free_-_01_-_Night_Owl.mp3"
  },
{
	name: "Enthusiast",
	artist: "Tours",
	image: "https://images.pexels.com/photos/3100835/pexels-photo-3100835.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
  path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Tours/Enthusiast/Tours_-_01_-_Enthusiast.mp3"
          
},
{
	name: "Shipping Lanes",
	artist: "Chad Crouch",
	image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
  path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Chad_Crouch/Arps/Chad_Crouch_-_Shipping_Lanes.mp3",
},
{
	name: "Shipping Lanes",
	artist: "Chad Crouch",
	image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
  path: "https://podcasts.google.com/feed/aHR0cHM6Ly93d3cuc2Vuc29uZ3NtcDMuY29tL2NhdGVnb3J5L3RlbHVndS1tcDMtc29uZ3MtZG93bmxvYWQvZmVlZC8/episode/aHR0cHM6Ly9zZW5zb25nc21wMy5saXZlLz9wPTYwNzEw?sa=X&ved=0CAQQkfYCahcKEwiQh5-Bn9OEAxUAAAAAHQAAAAAQAQ",
},
];




function loadTrack(track_index) {
  // Clear the previous seek timer
  clearInterval(updateTimer);
  resetValues();
  
  // Load a new track
  curr_track.src = track_list[track_index].path;
  curr_track.load();
  
  // Update details of the track
  track_art.style.backgroundImage = 
    "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent = 
    "PLAYING " + (track_index + 1) + " OF " + track_list.length;
  
  // Set an interval of 1000 milliseconds
  // for updating the seek slider
  updateTimer = setInterval(seekUpdate, 1000);
  
  // Move to the next track if the current finishes playing
  // using the 'ended' event
  curr_track.addEventListener("ended", nextTrack);
  
  // Apply a random background color
  random_bg_color();
  }
  
  function random_bg_color() {
  // Get a random number between 64 to 256
  // (for getting lighter colors)
  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;
  
  // Construct a color with the given values
  let bgColor = "rgb(" + red + ", " + green + ", " + blue + ")";
  
  // Set the background to the new color
  document.body.style.background = bgColor;
  }
  
  // Function to reset all values to their default
  function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
  }

  

  function playpauseTrack() {
    // Switch between playing and pausing
    // depending on the current state
    if (!isPlaying) playTrack();
    else pauseTrack();
    }
    
    function playTrack() {
    // Play the loaded track
    curr_track.play();
    isPlaying = true;
    
    // Replace icon with the pause icon
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
    }
    
    function pauseTrack() {
    // Pause the loaded track
    curr_track.pause();
    isPlaying = false;
    
    // Replace icon with the play icon
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
    }
    
    function nextTrack() {
    // Go back to the first track if the
    // current one is the last in the track list
    if (track_index < track_list.length - 1)
      track_index += 1;
    else track_index = 0;
    
    // Load and play the new track
    loadTrack(track_index);
    playTrack();
    }
    
    function prevTrack() {
    // Go back to the last track if the
    // current one is the first in the track list
    if (track_index > 0)
      track_index -= 1;
    else track_index = track_list.length - 1;
    
    // Load and play the new track
    loadTrack(track_index);
    playTrack();
    }

    
    function seekTo() {
      // Calculate the seek position by the
      // percentage of the seek slider 
      // and get the relative duration to the track
      seekto = curr_track.duration * (seek_slider.value / 100);
      
      // Set the current track position to the calculated seek position
      curr_track.currentTime = seekto;
      }
      
      function setVolume() {
      // Set the volume according to the
      // percentage of the volume slider set
      curr_track.volume = volume_slider.value / 100;
      }
      
      function seekUpdate() {
      let seekPosition = 0;
      
      // Check if the current track duration is a legible number
      if (!isNaN(curr_track.duration)) {
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;
      
        // Calculate the time left and the total duration
        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
      
        // Add a zero to the single digit time values
        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
      
        // Display the updated duration
        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
      }
      }

      
      // Load the first track in the tracklist
loadTrack(track_index);
