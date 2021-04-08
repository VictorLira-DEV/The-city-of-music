document.querySelector('.btn-starter').addEventListener('click', goRandom);
document.querySelector('.popUp button').addEventListener('click', removeModal);

const btnAbout = document.querySelector('#about-music').addEventListener('click', displayModal)
const audio = document.querySelector('div audio')
const images = document.querySelector('.images')
const popUpPicture = document.querySelector('.popUp-image');
const artist = document.querySelector('#artist')
const songName = document.querySelector('#song-name')
const release = document.querySelector('#release')

let picture = document.createElement('img');

function goRandom() {
    const displayAboutButton = document.querySelector('#about-music');
    const currentPlay = document.querySelector('.current-play');
    const currentName = document.querySelector('#currentName');
    const currentSong = document.querySelector('#currentSong');
    const img = document.querySelector('.images img');
    const randomMusic = Math.floor(Math.random() * 6 + 1);
    displayAboutButton.classList.remove('hide');
    currentPlay.classList.remove('hide')
    
    artist.innerHTML = ''
    songName.innerHTML = ''
    release.innerHTML = ''

    audio.setAttribute('src', `./audio/${randomMusic}.mp3`)
    img.setAttribute('src', `./imagens/${randomMusic}.png`)
    img.setAttribute('width', '100%')
    img.setAttribute('height', '100%')
    images.appendChild(img)

    picture.setAttribute('src', `./imagens/${randomMusic}.png`)
    picture.setAttribute('width', '100%')
    picture.setAttribute('height', '100%')
    popUpPicture.appendChild(picture)

    const musicas = [
        {},
        {
            name: ' A7x  ',
            song: 'Afterlife', 
            year: 2007
        },
        {
            name: ' A7x ',
            song: 'The stage', 
            year: 2016
        },
        {
            name: '30 s.t.m',
            song: 'Hurricane', 
            year: 2009
        },
        {
            name: '30 S.T.M',
            song: 'Up in the air', 
            year: 2013 
        },
        {
            name: 'Eminem',
            song: 'Godzilla', 
            year: 2020
        },
         {
            name: 'Eminem',
            song: '8mile', 
            year: 2003
        },
    ]

    currentName.innerHTML = musicas[randomMusic].name
    currentSong.innerHTML = musicas[randomMusic].song

    artist.innerHTML += ` ${musicas[randomMusic].name}`
    songName.innerHTML += ` ${musicas[randomMusic].song}`
    release.innerHTML += ` ${musicas[randomMusic].year}`

};  

function displayModal() {
    const overlay = document.querySelector('.overlay');
    const popUp = document.querySelector('.popUp');
    overlay.classList.add('active')
    popUp.classList.add('active')
};

function removeModal() {
    const overlay = document.querySelector('.overlay');
    const popUp = document.querySelector('.popUp');
    overlay.classList.remove('active')
    popUp.classList.remove('active')
}

//dark mode
const checkbox = document.querySelector('.checkbox');
checkbox.addEventListener('change', () => {
    document.body.classList.toggle('dark')
    document.body.querySelector('.container').classList.toggle('dark')
    document.body.querySelector('.popUp').classList.toggle('dark')
})
