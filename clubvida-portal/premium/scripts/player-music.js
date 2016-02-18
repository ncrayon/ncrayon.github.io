var holding = false;
var track = document.getElementById('track');
var progress = document.getElementById('progress');
var play = document.getElementById('play');
var next = document.getElementById('next');
var prev = document.getElementById('prev');
var title = document.getElementById('title');
var artist = document.getElementById('artist');
var current_track = 0;
var song, audio, duration;
var playing = false;
var songs = [{
    title: 'Mi Dios',
    artist: 'Emanuel y Linda',
    url: 'http://www.pconnection.net/clubvida/contenidos/musica/mi-dios-emmanuel-y-linda-rojo.mp3'
},
{
    title: 'Ven Espiritu Santo',
    artist: 'Barak',
    url: 'http://www.pconnection.net/clubvida/contenidos/musica/barak%20ven%20espiritu%20santo.mp3'
},
{
    title: 'Vida',
    artist: 'DC Reto',
    url: 'http://www.pconnection.net/public/clubvida/public/audio/vida.mp3'
},
{
    title: 'Manda el Fuego',
    artist: 'Marcos Barrientos',
    url: 'http://www.pconnection.net/clubvida/contenidos/musica/marcos%20barrientos%20-%20sin%20reservas%20-%20manda%20tu%20fuego.mp3'
},
{
    title: 'Promesas para tu vida',
    artist: 'Promesas',
    url: 'http://www.pconnection.net/clubvida/contenidos/promesas/1%20Juan%201.9.mp3'
},
{
    title: 'Consejos para una Mejor Vida',
    artist: 'Enfoque Familiar',
    url: 'http://www.pconnection.net/clubvida/contenidos/enfoque/enfoque2.mp3'
}];

window.addEventListener('load', init(), false);

function init() {
    song = songs[current_track];
    audio = new Audio();
    title.textContent = song.title;
    artist.textContent = song.artist;
}

audio.addEventListener('timeupdate', updateTrack, false);
audio.addEventListener('loadedmetadata', function () {
    duration = this.duration;
}, false);
window.onmousemove = function (e) {
    e.preventDefault();
    if (holding) seekTrack(e);
}
window.onmouseup = function (e) {
    holding = false;
}
track.onmousedown = function (e) {
    holding = true;
    seekTrack(e);
    console.log(holding);
}
play.onclick = function () {
    playing ? audio.pause() : audio.play();
}
audio.addEventListener("pause", function () {
    play.innerHTML = '<i class="fa fa-play pad"></i>';
    playing = false;
}, false);

audio.addEventListener("playing", function () {
    play.innerHTML = '<i class="fa fa-pause"></i>';
    playing = true;
}, false);
try{
    next.addEventListener("click", nextTrack, false);
    prev.addEventListener("click", prevTrack, false);
}catch(err){}

function updateTrack() {
    curtime = audio.currentTime;
    percent = Math.round((curtime * 100) / duration);
    progress.style.width = percent + '%';
    handler.style.left = percent + '%';
}

function seekTrack(e) {
    event = e || window.event;
    var x = e.pageX - player.offsetLeft - track.offsetLeft;
    percent = Math.round((x * 100) / track.offsetWidth);
    if (percent > 100) percent = 100;
    if (percent < 0) percent = 0;
    progress.style.width = percent + '%';
    handler.style.left = percent + '%';
    audio.play();
    audio.currentTime = (percent * duration) / 100
}

function nextTrack(elem) {
    var id = elem.id;
    console.log(id)
    if (typeof id !== 'undefined') {
        song = songs[id];
    }else{
        current_track++;
        current_track = current_track % (songs.length);
        song = songs[current_track];        
    }

    audio.src = song.url;
    title.textContent = '';
    artist.textContent = 'Cargando...';
    audio.onloadeddata = function() {
      updateInfo();
    }

    document.getElementById('player').style.bottom = "0px"
}

//nextTrack()
function prevTrack() {
    current_track--;
    current_track = (current_track == -1 ? (songs.length - 1) : current_track);
    song = songs[current_track];
    audio.src = song.url;
    audio.onloadeddata = function() {
      updateInfo();
    }
}

function updateInfo() {
    title.textContent = song.title;
    artist.textContent = song.artist;
    audio.play();
}

function outputUpdate(vol) {
    audio.volume = vol/100;
}

function stopAudio() {
    audio.pause()
    document.getElementById('player').style.bottom = "-100px"
}