
const music = document.querySelector("audio");
const img = document.querySelector("img");
const artist = document.getElementById("artist");
const play = document.getElementById("play");
const title = document.getElementById("title");
const prev = document.getElementById("previous");
const next = document.getElementById("next");
const volumeBar = document.getElementById('volume_control');
let currentTimeDisplay = document.getElementById('current-time');
let songDurationDisplay = document.getElementById('song-duration');
let progressBar = document.getElementById('progress-bar');
let musicIsPlaying = false;

const musicList = [
    {
        title: "Shanti",
        artist: "Miland Gaba",
        music: 'music/Shanti.mp3',
        img: 'images/Shanti.jpeg',

    },
    {
        title: "Kahani Suno",
        artist: "Rajan Modanwal",
        music: 'music/Kahani Suno.mp3',
        img: 'images/Kahani Suno.jpeg',
    },
    {
        title: "Soch Liya",
        artist: "Arijit Singh",
        music: 'music/Soch Liya.mp3',
        img: 'images/Soch Liya.jpeg',
    }
]

// console.log(musicList[0]);

 // Progress bar update 
// step 1- creating funtion to load music data

function loadMusic(musicList) {
    title.textContent = musicList.title;
    artist.textContent = musicList.artist;
    img.src = musicList.img;
    music.src = musicList.music;
}

//   loadMusic(musicList[1]);

function playMusic() {
musicIsPlaying = true;
music.play();
play.classList.replace('bx-play' , 'bx-pause');
}

function pauseMusic() {
musicIsPlaying = false;
play.classList.replace('bx-pause' , 'bx-play');
music.pause();
}


const playPause = () => {
musicIsPlaying ? pauseMusic() : playMusic()
};

play.addEventListener('click', playPause)


let musicIndex = 0;

const nextSong = () => {
music.currentTime = 0;
musicIndex = (musicIndex + 1) % musicList.length
loadMusic(musicList[musicIndex])
music.play();
// console.log(musicIndex);
}

next.addEventListener('click', nextSong);

const prevSong = () => {
music.currentTime = 0; 
musicIndex = (musicIndex - 1 + musicList.length) % musicList.length
loadMusic(musicList[musicIndex])
music.play();
// console.log(musicIndex);
}

prev.addEventListener('click', prevSong)

// next song on end -
music.addEventListener('onended', () => {
musicIsPlaying = false;
console.log('music ended');

nextSong
})


function volumeControl() {
music.volume = volumeBar.value / 100;
}

console.log(music);


music.addEventListener('timeupdate', (e) => {
// destructuring current time and duration from music
const { currentTime, duration } = e.srcElement;
// console.log(currentTime, 'current time'); 


// currentTime update 
let current_minute = Math.floor( currentTime / 60);
let current_second = Math.floor( currentTime % 60 );
// console.log(current_minute, 'minute')
// console.log(current_second, 'sec')

if (current_second < 10) {
current_second = `0${current_second}`
}

currentTimeDisplay.textContent = `${current_minute}:${current_second}`

//duration update

let duration_minute = Math.floor( duration / 60 );
let duration_second = Math.floor( duration % 60 );

if (duration) {songDurationDisplay.textContent = `${duration_minute}:${duration_second}`}
})

// Progress bar update 

music.onload = function () {
music.duration = progressBar.max ;
music.currentTime = progressBar.value;
}

if (music.play) {
setInterval(() => {
progressBar.value = music.currentTime;
}, 1000)
}

function musicDurationControl() {
music.currentTime = progressBar.value;
}



