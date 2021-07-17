const wrapper = document.querySelector(".wrapper"),
    musicImg = wrapper.querySelector(".img-area img"),
    musicName = wrapper.querySelector(".song-details .name"),
    musicArtist = wrapper.querySelector(".song-details .artist"),
    playPauseBtn = wrapper.querySelector(".play-pause"),
    prevBtn = wrapper.querySelector("#prev"),
    nextBtn = wrapper.querySelector("#next"),
    mainAudio = wrapper.querySelector("#main-audio"),
    progressArea = wrapper.querySelector(".progress-area"),
    progressBar = progressArea.querySelector(".progress-bar"),
    musicList = wrapper.querySelector(".music-list"),
    showMoreBtn = wrapper.querySelector("#more-music"),
    hideMusicBtn = musicList.querySelector("#close");

let musicIndex = Math.floor(Math.random() * allMusic.length + 1);

window.addEventListener("load", () => {
    loadMusic(musicIndex);
    playingNow();
});

//load music function
function loadMusic(indexNumb) {
    musicName.innerText = allMusic[indexNumb - 1].name;
    musicArtist.innerText = allMusic[indexNumb - 1].artist;
    musicImg.src = `images/${allMusic[indexNumb - 1].img}.jpg`;
    mainAudio.src = `songs/${allMusic[indexNumb - 1].src}.mp3`;
}

function playMusic() {
    wrapper.classList.add("paused");
    playPauseBtn.querySelector("i").innerText = "pause";
    mainAudio.play();
}

function pauseMusic() {
    wrapper.classList.remove("paused");
    playPauseBtn.querySelector("i").innerText = "play_arrow";
    mainAudio.pause();
}

function nextMusic() {
    musicIndex++;
    musicIndex > allMusic.length ? (musicIndex = 1) : (musicIndex = musicIndex);
    loadMusic(musicIndex);
    playMusic();
    playingNow();
}

function prevMusic() {
    musicIndex--;
    musicIndex < 1 ? (musicIndex = allMusic.length) : (musicIndex = musicIndex);
    loadMusic(musicIndex);
    playMusic();
    playingNow();
}

playPauseBtn.addEventListener("click", () => {
    const isMusicPaused = wrapper.classList.contains("paused");
    isMusicPaused ? pauseMusic() : playMusic();
    playingNow();
});

nextBtn.addEventListener("click", function () {
    nextMusic();
});

prevBtn.addEventListener("click", function () {
    prevMusic();
});

//update progress bar acording to music current time
mainAudio.addEventListener("timeupdate", function (e) {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;

    let musicCurrentTime = wrapper.querySelector(".current");
    musicDuration = wrapper.querySelector(".duration");

    mainAudio.addEventListener("loadeddata", () => {
        //update song duration
        let audioDuration = mainAudio.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);
        if (totalSec < 10) {
            totalSec = `0${totalSec}`;
        }
        musicDuration.innerText = `${totalMin}:${totalSec}`;

        //update playing song current time
    });
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if (currentSec < 10) {
        currentSec = `0${currentSec}`;
    }

    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

//udating the the playing song current time according to the progress bar
progressArea.addEventListener("click", (e) => {
    let progressWidthval = progressArea.clientWidth; //getting with of progress bar
    let clickedOffSet = e.offsetX; //getting offset x value
    let songDuration = mainAudio.duration; //getting song total  duration

    mainAudio.currentTime = (clickedOffSet / progressWidthval) * songDuration;
    playMusic();
});

//repeat, shuffle song

const repeatBtn = wrapper.querySelector("#repeat-plist");
repeatBtn.addEventListener("click", () => {
    //first we get the innerText  of the icon then we'll change accordingly
    let getText = repeatBtn.innerText; //getting innerText icon
    switch (getText) {
        case "repeat":
            repeatBtn.innerText = "repeat_one";
            repeatBtn.setAttribute("title", "Song looped");
            break;
        case "repeat_one":
            repeatBtn.innerText = "shuffle";
            repeatBtn.setAttribute("title", "Playback Shuffle");
            break;
        case "shuffle":
            repeatBtn.innerText = "repeat";
            repeatBtn.setAttribute("title", "Playlist looped");
            playingNow();
            break;
    }
});

//after the song end
mainAudio.addEventListener("ended", () => {
    //we will do according to the Icons means if the use set icon to loop song then  we'll repeat
    //the futher song and will do futher accordingly

    let getText = repeatBtn.innerText; //getting innerText icon
    switch (getText) {
        case "repeat":
            nextMusic();
            break;
        case "repeat_one":
            mainAudio.currentTime = 0;
            loadMusic(musicIndex);
            playMusic();
            break;
        case "shuffle":
            //generating random index between  the max range of array length
            let randIndex = Math.floor(Math.random() * allMusic.length + 1);
            do {
                randIndex = Math.floor(Math.random() * allMusic.length + 1);
            } while (musicIndex == randIndex); //this loop  run until the next random  number won't be the same of current music index
            musicIndex = randIndex; //passing randomIndex to musicIndex so the random song will  play
            loadMusic(musicIndex); //callong load music function
            playMusic();
            break;
    }
});

showMoreBtn.addEventListener("click", function () {
    musicList.classList.toggle("show");
});

hideMusicBtn.addEventListener("click", function () {
    showMoreBtn.click();
});

const ulTag = wrapper.querySelector("ul");
//lets's create li acordding to the  array length

for (let i = 0; i < allMusic.length; i++) {
    //passing the song from the array list
    let liTag = `
    <li li-index="${i + 1}">
      <div class="row">
        <span>${allMusic[i].artist}</span>
        <p>${allMusic[i].name}</p>
      </div>
      <audio class='${allMusic[i].src}' src="songs/${
        allMusic[i].src
    }.mp3"></audio>
      <span id="${allMusic[i].src}" class="audio-duration">3:40</span>
    </li>`;

    ulTag.insertAdjacentHTML("beforeend", liTag);

    let liAudioTagDuration = ulTag.querySelector(`#${allMusic[i].src}`);
    let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`);

    liAudioTag.addEventListener("loadeddata", () => {
        //update song duration
        let audioDuration = liAudioTag.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);
        if (totalSec < 10) {
            totalSec = `0${totalSec}`;
        }
        liAudioTagDuration.innerText = `${totalMin}:${totalSec}`;
        liAudioTagDuration.setAttribute(
            "t-duration",
            `${totalMin}:${totalSec}`
        );
    });
}

//lets work on particular song's on click
const alliLiTags = ulTag.querySelectorAll("li");

function playingNow() {
    for (let j = 0; j < alliLiTags.length; j++) {
        // alliLiTags[j].setAttribute("onclick", "clicked(this)")
        let audioTag = alliLiTags[j].querySelector(".audio-duration");
        if (alliLiTags[j].classList.contains("playing")) {
            alliLiTags[j].classList.remove("playing");
            audioTag.innerText = "";
            //passing the audio duration value
            let adDuration = audioTag.getAttribute("t-duration");
            audioTag.innerText = adDuration;
        }
        if (alliLiTags[j].getAttribute("li-index") == musicIndex) {
            alliLiTags[j].classList.add("playing");
            audioTag.innerText = "Playing";
        }
        alliLiTags[j].setAttribute("onclick", "clicked(this)");
    }
}

//playing songs onclick
function clicked(element) {
    let getLiIndex = element.getAttribute("li-index");
    musicIndex = getLiIndex;

    loadMusic(musicIndex);
    playMusic();
    playingNow();
}
