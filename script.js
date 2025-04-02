const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': '9ab7aa78c2msh8be1083139d3378p1c6896jsnbaeaa06d6a83',
        'x-rapidapi-host': 'spotify23.p.rapidapi.com'
    }
};

//const url = 'https://spotify23.p.rapidapi.com/search/?type=multi&offset=0&limit=10&numberOfTopResults=5';

async function searchSong() {
    const query = document.getElementById('songSearch').value; 
    const searchurl = `https://spotify23.p.rapidapi.com/search/?q=${query}&type=tracks`; 

    try {
        const response = await fetch(searchurl, options);
        const result = await response.json();
        console.log(result);
        if (result.tracks && result.tracks.items && result.tracks.items.length > 0) {
            const trackId = result.tracks.items[0].data.id;
            trackDetails(trackId);
        } else {
            document.getElementById("songResults").innerHTML = '<p>No Track Found!</p>';
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function trackDetails(trackId) {
    const url = `https://spotify23.p.rapidapi.com/tracks/?ids=${trackId}`;
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        displaytrack(result);
    } catch (error) {
        console.error('Error:', error);
    }
}

function displaytrack(result) {
    const songinfo = document.getElementById("songResults");
    const songcover = document.getElementById("songcover");
    songinfo.innerHTML = '';
    console.log(result);
    if (result.tracks && result.tracks.length > 0) {
        const track = result.tracks[0];
        const trackDiv = document.createElement("div");
        songcover.src = track.album.images[0].url;
        trackDiv.innerHTML = `
        <h2> ${track.name}</h2>
        <h3> ${track.artists[0].name}</h3>
        <audio controls id = "audiobar">
            <source src="${track.preview_url}" type="audio/mpeg">
            Your browser does not support the audio element.
        </audio>
        `;
        songinfo.appendChild(trackDiv);
    }
    else {
        songinfo.innerHTML = '<p>No Track Found!</p>';

    }
    console.log("work done");
}

async function searchArtist(){
    const query = document.getElementById('artistSearch').value; 
    const searchurl = `https://spotify23.p.rapidapi.com/search/?q=${query}&type=tracks`;
    const tracklist = document.getElementById("songResults");
    tracklist.innerHTML = '';

    try{
        const response = await fetch(searchurl,options);
        const result = await response.json();
        console.log(result);
        console.log(result.tracks.items[0])

        const cover = document.getElementById("songcover");
        cover.src = result.tracks.items[0].data.albumOfTrack.coverArt.sources[0].url;

        if(result.tracks && result.tracks.items && result.tracks.items.length >0){
            const artistdiv = document.createElement('div');
            displayList(result);
            artistdiv.innerHTML = `<h3>${result.tracks.items[0].data.artists.items[0].profile.name}</h3>`;
            tracklist.appendChild(artistdiv);
        }
        else{
            tracklist.innerHTML = '<P> No Track found</P>';
        }
    }
    catch(error){
        console.error('Error:', error);
    }
}

function displayList(result){
    const artistList = document.getElementById('list');
    artistList.innerHTML = '';

    if(result.tracks && result.tracks.items && result.tracks.items.length>0){
        result.tracks.items.forEach(track => {
            const listItem = document.createElement('li');
            listItem.setAttribute("class","mylists");
            listItem.textContent = track.data.name;
            const trackid = track.data.id;

            listItem.onclick = function (){
                playTrack(trackid);
            };

            artistList.appendChild(listItem);

            
        });

    }
    else{
        artistList.innerHTML = '<p>No Track found</p>';
    }
}

async function playTrack(trackId){
    const url = `https://spotify23.p.rapidapi.com/tracks/?ids=${trackId}`;

    try{
        const response = await fetch(url,options);
        const result = await response.json();
        displaytrack(result);
    }
    catch(error){
        console.error('Error:', error);
    }
}