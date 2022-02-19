console.log("Hello there!");

let songIndex=0;
let audioElement= new Audio('songs/1.mp3');
let masterPlay= document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems= Array.from(document.getElementsByClassName('songItem'));
let masterSongName = document.getElementById('masterSongName')

let songs= [
    {songName: "Hawayein", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Dilli Wali Girlfriend", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Random 1", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Random 2", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Random 3", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Random 4", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Random 5", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Random 6", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Random 7", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
]

songItems.forEach((element, i)=> {
    element.getElementsByTagName("img")[0].src =songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});


//Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime==0){
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity=1;
    }

    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        gif.style.opacity=0;
    }
});

// Listen To Events
audioElement.addEventListener('timeupdate', ()=>{
    //Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', ()=> {
    audioElement.currentTime  = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play')
        e.target.classList.add('fa-pause');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText= songs[songIndex].songName;
        audioElement.currentTime=0;
        audioElement.play();
        masterPlay.classList.remove('fa-play')
        masterPlay.classList.add('fa-pause')
        gif.style.opacity=1;

    })
})

document.getElementById('forward').addEventListener('click', ()=>{
    if(songIndex>=8)
    songIndex=0;

    else
    songIndex+=1;

    masterSongName.innerText= songs[songIndex].songName;
    audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play')
    masterPlay.classList.add('fa-pause')
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0)
    songIndex=8;

    else
    songIndex-=1;

    masterSongName.innerText= songs[songIndex].songName;
    audioElement.src = `songs/${songIndex-1}.mp3`;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play')
    masterPlay.classList.add('fa-pause')
})

