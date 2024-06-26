
function createPlaylistCards(playlists) {
    playlists.forEach(playlist => {
        let newPlaylistCardDiv = document.createElement("div");
        newPlaylistCardDiv.classList.add("playlist-card");
        newPlaylistCardDiv.setAttribute("data-playlist-id", playlist.playlistID);
        newPlaylistCardDiv.addEventListener("click", clickPlaylistCard);

        let playlistCoverImage = document.createElement("img");
        playlistCoverImage.src = playlist.playlist_art;
        playlistCoverImage.classList.add("playlist-cover-image");
        
        let playlistTitle = document.createElement("h4");
        playlistTitle.classList.add("card-title");
        playlistTitle.innerText = playlist.playlist_name;
        
        let playlistCreatorName = document.createElement("h5");
        playlistCreatorName.innerText = playlist.playlist_creator;
        
        let heartIcon = document.createElement("i");
        heartIcon.classList.add('fa', 'fa-heart');
        heartIcon.addEventListener("click", handleLike);

        let likeCount = document.createElement('span');
        likeCount.classList.add("like-count");
        likeCount.id = `like-count-${playlist.playlistID}`;
        likeCount.innerText = playlist.likeCount;

        newPlaylistCardDiv.appendChild(playlistCoverImage);
        newPlaylistCardDiv.appendChild(playlistTitle);
        newPlaylistCardDiv.appendChild(playlistCreatorName);
        newPlaylistCardDiv.appendChild(heartIcon);
        newPlaylistCardDiv.appendChild(likeCount);

        document.getElementsByClassName("playlist-cards")[0].appendChild(newPlaylistCardDiv);;
    });
}

function clickPlaylistCard(event) {
    if (event.target.nodeName == "I") return; // If we're clicking the heart, do something else
    const selectedID = this.getAttribute("data-playlist-id");
    let selectedPlaylist = data.playlists.filter(playlist => playlist.playlistID == selectedID)[0];
    createModal(selectedPlaylist);
}

function createModal(selectedPlaylist) {
    if (document.getElementsByClassName("modal-playlist")[0]) {
        document.getElementsByClassName("modal-playlist")[0].remove();
    } 

    const modal = document.getElementsByClassName("modal")[0];
    modal.style.display = "block";

    let modalPlaylistDiv = document.createElement("div");
    modalPlaylistDiv.classList.add("modal-playlist");

    let modalPlaylistDataDiv = document.createElement("div");
    modalPlaylistDataDiv.classList.add("modal-playlist-data");
    
    let playlistCoverDiv = document.createElement("div");
    let playlistCoverImg = document.createElement("img");
    playlistCoverImg.src = selectedPlaylist.playlist_art;
    playlistCoverImg.classList.add("playlist-cover-image");
    playlistCoverDiv.appendChild(playlistCoverImg);
    modalPlaylistDataDiv.appendChild(playlistCoverDiv);

    let playlistTitleDiv = document.createElement("div");
    playlistTitleDiv.classList.add("modal-playlist-title");
    let playlistTitle = document.createElement("h3");
    playlistTitle.classList.add("card-title");
    playlistTitle.innerText = selectedPlaylist.playlist_name;
    let playlistCreatorName = document.createElement("h4");
    playlistCreatorName.innerText = selectedPlaylist.playlist_creator;
    playlistCreatorName.classList.add("card-creator-name");

    playlistTitleDiv.appendChild(playlistTitle);
    playlistTitleDiv.appendChild(playlistCreatorName);

    modalPlaylistDataDiv.appendChild(playlistTitleDiv);

    let shuffleButton = document.createElement("button");
    shuffleButton.classList.add("shuffle");
    shuffleButton.innerText = "Shuffle";
    shuffleButton.id = `shuffle-${selectedPlaylist.playlistID}`;
    shuffleButton.addEventListener("click", shufflePlaylist);

    let songListDiv = document.createElement("div");
    songListDiv.classList.add("song-list");

    selectedPlaylist.songs.forEach(song => {
        let songCard = document.createElement("div");
        songCard.classList.add("song-card");

        let songCardImageDiv = document.createElement("div");
        let songCardImage = document.createElement("img");
        songCardImage.src = song.cover_art;
        songCardImage.classList.add("song-cover-image");
        songCardImageDiv.appendChild(songCardImage);

        let songCardInfoDiv = document.createElement("div");
        songCardInfoDiv.classList.add("song-card-info");

        let songTitle = document.createElement("h3");
        songTitle.innerText = song.title;
        let artistName = document.createElement("p");
        artistName.innerText = song.artist;
        let albumName = document.createElement("p");
        albumName.innerText = song.album;

        songCardInfoDiv.appendChild(songTitle);
        songCardInfoDiv.appendChild(artistName);
        songCardInfoDiv.appendChild(albumName);

        songCard.appendChild(songCardImageDiv);
        songCard.appendChild(songCardInfoDiv);

        songListDiv.appendChild(songCard);

        /**
         *               <div class="song-card">
                            <div><img class="song-cover-image" src="./assets/img/song.png"></div>
                            <div class="song-card-info">
                                <h5>Song Title</h5>
                                <p>Artist Name</p>
                                <p>Album Name</p>
                            </div>
                        </div>
         */
    });

    modalPlaylistDiv.appendChild(shuffleButton);
    modalPlaylistDiv.appendChild(modalPlaylistDataDiv)
    modalPlaylistDiv.appendChild(songListDiv)

    document.getElementsByClassName("modal-content")[0].appendChild(modalPlaylistDiv);

    /**
                    <div class="modal-playlist-data">
                        <div><img class="playlist-cover-image" src="./assets/img/playlist.png" /></div>
                        <div class="modal-playlist-title">
                            <h3 class="card-title">Playlist Title</h4>
                                <h4 class="card-creator-name">Creator Name</h5>
                        </div>
                    </div>
                    <div class="song-list">
                        <div class="song-card">
                            <div><img class="song-cover-image" src="./assets/img/song.png"></div>
                            <div class="song-card-info">
                                <h5>Song Title</h5>
                                <p>Artist Name</p>
                                <p>Album Name</p>
                            </div>
                        </div>
                        <div class="song-card">
                            <div><img class="song-cover-image" src="./assets/img/song.png"></div>
                            <div class="song-card-info">
                                <h5>Song Title</h5>
                                <p>Artist Name</p>
                                <p>Album Name</p>
                            </div>
                        </div>
                        <div class="song-card">
                            <div><img class="song-cover-image" src="./assets/img/song.png"></div>
                            <div class="song-card-info">
                                <h5>Song Title</h5>
                                <p>Artist Name</p>
                                <p>Album Name</p>
                            </div>
                        </div>
                    </div>
     */
}

function handleLike() {
    if (this.style.color === "red") {
        // if the playlist has already been liked, do nothing
        return;
    };

    this.style.color = "red";
    let selectedID = this.parentNode.getAttribute("data-playlist-id");
    let selectedPlaylist = data.playlists.filter(playlist => playlist.playlistID == selectedID)[0];
    console.log(this.nextSibling);
    selectedPlaylist.likeCount = selectedPlaylist.likeCount + 1;
    document.getElementById(`like-count-${selectedID}`).innerText = selectedPlaylist.likeCount;
    
}

window.addEventListener("load", () => {
    if (document.getElementsByClassName("home")[0]) {
        createPlaylistCards(data.playlists);
        document.getElementsByClassName("modal-close")[0].addEventListener("click", () => {
            const modal = document.getElementsByClassName("modal")[0];
            modal.style.display = "none";
        
            document.getElementsByClassName("modal-playlist")[0].remove();
        })
    }
    if (document.getElementsByClassName("featured-playlist")[0]) {
        let featuredPlaylist = chooseRandomFeaturedPlaylist(data.playlists);
        console.log(featuredPlaylist);
        createFeaturedPlaylist(featuredPlaylist);
    }
})

function shufflePlaylist() {
    let selectedPlaylist = data.playlists.filter(playlist => playlist.playlistID == this.id[this.id.length-1])[0];
    console.log("before shuffle", selectedPlaylist);
    for (let i = selectedPlaylist.songs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [selectedPlaylist.songs[i], selectedPlaylist.songs[j]] = [selectedPlaylist.songs[j], selectedPlaylist.songs[i]];
    }
    createModal(selectedPlaylist)
    console.log(selectedPlaylist);
}

function chooseRandomFeaturedPlaylist(playlists) {
    return playlists[Math.floor(Math.random() * playlists.length)];
}

function createFeaturedPlaylist(playlist) {
    let featuredPlaylistDiv = document.getElementsByClassName("featured-playlist")[0];
    let featuredPlaylistInfo = document.createElement("div");
    featuredPlaylistInfo.classList.add("featured-playlist-info");
    let featuredPlaylistImg = document.createElement("img");
    featuredPlaylistImg.classList.add("featured-playlist-img");
    featuredPlaylistImg.src = playlist.playlist_art;
    
    let featuredPlaylistTitle = document.createElement("h1");
    featuredPlaylistTitle.innerText = playlist.playlist_name;
    let featuredPlaylistCreator = document.createElement("h2");
    featuredPlaylistCreator.innerText = playlist.playlist_creator;

    featuredPlaylistInfo.appendChild(featuredPlaylistImg);
    featuredPlaylistInfo.appendChild(featuredPlaylistTitle);
    featuredPlaylistInfo.appendChild(featuredPlaylistCreator);

    let songListDiv = document.createElement("div");
    songListDiv.classList.add("featured-song-list");

    playlist.songs.forEach(song => {
        let songCard = document.createElement("div");
        songCard.classList.add("song-card");

        let songCardImageDiv = document.createElement("div");
        let songCardImage = document.createElement("img");
        songCardImage.src = song.cover_art;
        songCardImage.classList.add("song-cover-image");
        songCardImageDiv.appendChild(songCardImage);

        let songCardInfoDiv = document.createElement("div");
        songCardInfoDiv.classList.add("song-card-info");

        let songTitle = document.createElement("h3");
        songTitle.innerText = song.title;
        let artistName = document.createElement("p");
        artistName.innerText = song.artist;
        let albumName = document.createElement("p");
        albumName.innerText = song.album;

        songCardInfoDiv.appendChild(songTitle);
        songCardInfoDiv.appendChild(artistName);
        songCardInfoDiv.appendChild(albumName);

        songCard.appendChild(songCardImageDiv);
        songCard.appendChild(songCardInfoDiv);

        songListDiv.appendChild(songCard);
    });

    featuredPlaylistDiv.appendChild(featuredPlaylistInfo);
    featuredPlaylistDiv.appendChild(songListDiv);
}