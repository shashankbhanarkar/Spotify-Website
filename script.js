console.log("Welcome to Spotify");

// Initialize the Variables
let currentTime = 0; // To store the current playback time of the song
let songDuration = 0; // To store the duration of the current song
let songIndex = 0; // To keep track of the current song index
let audioElement = new Audio('songs/1.mp3'); // Create a new audio element
let masterPlay = document.getElementById('masterPlay'); // Main play/pause button
let MyProgressBar = document.getElementById('MyProgressBar'); // Progress bar for the song
let gif = document.getElementById('gif'); // Gif to show when the song is playing
let masterSongName = document.getElementById('masterSongName'); // Display the current song name
let songItem = Array.from(document.getElementsByClassName('songItem')); // Array of all song items in the list

// Array containing song details like name, file path, cover path, and duration
const songs = [
    { songName: "Let Me Love You", filePath: "songs/1.mp3", coverPath: "covers/1.jpg", duration: "3:45" },
    { songName: "Unstoppable", filePath: "songs/2.mp3", coverPath: "covers/2.jpg", duration: "4:10" },
    { songName: "Headlights", filePath: "songs/3.mp3", coverPath: "covers/3.jpg", duration: "3:20" },
    { songName: "Heat Waves", filePath: "songs/4.mp3", coverPath: "covers/4.jpg", duration: "4:00" },
    { songName: "Stay", filePath: "songs/5.mp3", coverPath: "covers/5.jpg", duration: "3:50" },
    { songName: "The Nights", filePath: "songs/6.mp3", coverPath: "covers/6.jpg", duration: "3:30" },
    { songName: "Im Faded", filePath: "songs/7.mp3", coverPath: "covers/7.jpg", duration: "4:20" },
    { songName: "Into Your Arms", filePath: "songs/8.mp3", coverPath: "covers/8.jpg", duration: "3:40" },
    { songName: "Love Nwantiti", filePath: "songs/9.mp3", coverPath: "covers/9.jpg", duration: "4:15" },
    { songName: "One Kiss X I Was Never There", filePath: "songs/10.mp3", coverPath: "covers/10.jpg", duration: "4:05" },
]

// Update song items with song details from the 'songs' array
songItem.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].coverPath; // Set the cover image
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName; // Set the song name
    let songDurationElement = element.getElementsByClassName('songDuration')[0];
    songDurationElement.innerHTML = songs[i].duration; // Display the duration of the song
    let playIcon = document.createElement('i'); // Create a play icon for each song
    playIcon.className = 'far fa-play-circle songItemPlay'; // Add classes for styling
    playIcon.id = i; // Set the id to the song index
    songDurationElement.after(playIcon); // Add the play icon after the duration
})

// Handle play/pause click for the main play button
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play(); // Play the audio
        masterPlay.classList.remove('fa-play-circle'); // Change play icon to pause
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1; // Show the gif
    } else {
        audioElement.pause(); // Pause the audio
        masterPlay.classList.remove('fa-pause-circle'); // Change pause icon to play
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0; // Hide the gif
    }
})

// Listen to time update events on the audio element
audioElement.addEventListener('timeupdate', () => {
    // Update the progress bar based on current time and duration
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    MyProgressBar.value = progress; // Update the progress bar value
})

// Change the current time of the song when the progress bar is changed
MyProgressBar.addEventListener('change', () => {
    audioElement.currentTime = MyProgressBar.value * audioElement.duration / 100;
})

// Function to reset all play icons to play state
const makeAllplay = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle'); // Remove pause icon
        element.classList.add('fa-play-circle'); // Add play icon
    })
}

// Handle play/pause for individual song items
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllplay(); // Reset all icons to play state
        songIndex = parseInt(e.target.id); // Get the song index from the clicked element
        if (audioElement.paused) {
            audioElement.src = `songs/${songIndex + 1}.mp3`; // Set the audio source to the selected song
            masterSongName.innerText = songs[songIndex].songName; // Update the master song name
            audioElement.currentTime = currentTime; // Seek to the stored time
            audioElement.play(); // Play the selected song
            e.target.classList.remove('fa-play-circle'); // Change play icon to pause
            e.target.classList.add('fa-pause-circle');
            masterPlay.classList.remove('fa-play-circle'); // Update main button to pause
            masterPlay.classList.add('fa-pause-circle');
            gif.style.opacity = 1; // Show the gif
        } else {
            currentTime = audioElement.currentTime; // Store the current time
            audioElement.pause(); // Pause the audio
            e.target.classList.remove('fa-pause-circle'); // Change pause icon to play
            e.target.classList.add('fa-play-circle');
            masterPlay.classList.remove('fa-pause-circle'); // Update main button to play
            masterPlay.classList.add('fa-play-circle');
            gif.style.opacity = 0; // Hide the gif
        }
    })
})

// Handle 'Next' button click event
document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 9) {
        songIndex = 0; // Loop back to the first song
    } else {
        songIndex += 1; // Move to the next song
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`; // Update audio source
    masterSongName.innerText = songs[songIndex].songName; // Update song name
    audioElement.currentTime = 0; // Reset the playback time
    audioElement.play(); // Play the next song
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

// Handle 'Previous' button click event
document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0; // Stay at the first song
    } else {
        songIndex -= 1; // Move to the previous song
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`; // Update audio source
    masterSongName.innerText = songs[songIndex].songName; // Update song name
    audioElement.currentTime = 0; // Reset the playback time
    audioElement.play(); // Play the previous song
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

// Handle the event when the song ends
audioElement.addEventListener('ended', () => {
    // Automatically play the next song
    if (songIndex >= 9) {
        songIndex = 0; // Loop back to the first song
    } else {
        songIndex += 1; // Move to the next song
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`; // Update audio source
    masterSongName.innerText = songs[songIndex].songName; // Update song name
    audioElement.currentTime = 0; // Reset the playback time
    audioElement.play(); // Play the next song
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1; // Show the gif
})
