tailwind.config = {
	daisyui: {
		themes: ["dracula"],
	},
};

let player;
let forestSound,
	fireplaceSound,
	oceanSound,
	keyboardSound,
	stormRainSound,
	cityRainSound,
	underwaterSound,
	birdsSound,
	snowSound,
	coffeeShopSound;

const tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function initializeAudios() {
	forestSound = document.getElementById("forestSound");
	fireplaceSound = document.getElementById("fireplaceSound");
	oceanSound = document.getElementById("oceanSound");
	keyboardSound = document.getElementById("keyboardSound");
	stormRainSound = document.getElementById("stormRainSound");
	cityRainSound = document.getElementById("cityRainSound");
	snowSound = document.getElementById("snowSound");
	birdsSound = document.getElementById("birdsSound");
	coffeeShopSound = document.getElementById("coffeeShopSound");
	underwaterSound = document.getElementById("underwaterSound");
}

function setInitialVolumeForAudios(volume) {
	[
		forestSound,
		fireplaceSound,
		oceanSound,
		keyboardSound,
		stormRainSound,
		cityRainSound,
		snowSound,
		birdsSound,
		coffeeShopSound,
		underwaterSound,
	].forEach((sound) => {
		sound.volume = volume / 100;
	});
}

function onYouTubeIframeAPIReady() {
	player = new YT.Player("player", {
		videoId: "Xf3-4A-uEc8",
		playerVars: {
			controls: 0,
			showinfo: 0,
			modestbranding: 1,
			loop: 1,
			playlist: "Xf3-4A-uEc8",
			fs: 0,
			cc_load_policy: 0,
			iv_load_policy: 3,
			autohide: 0,
			autoplay: 1,
		},
		events: {
			onReady: onPlayerReady,
		},
	});
}

function onPlayerReady(event) {
	event.target.setVolume(5);
	setInitialVolumeForAudios(5);
}

function loadVideo() {
	const videoURL = document.getElementById("videoURL").value;
	const videoID = extractVideoID(videoURL);

	if (player && videoID) {
		player.loadVideoById(videoID);
	}

	document.getElementById("my_modal_2").close();
}

function changeVolume(target) {
	if (target === "player") {
		if (player) {
			const volume = document.getElementById("playerVolumeSlider").value;
			player.setVolume(volume);
		}
	} else if (target === "sound") {
		const soundVolume =
			document.getElementById("soundVolumeSlider").value / 100;
		setInitialVolumeForAudios(soundVolume * 100);
	}
}

const soundVolume = document.getElementById("soundVolumeSlider");
const playerVolume = document.getElementById("playerVolumeSlider");

soundVolume.addEventListener("wheel", (e) => {
	if (e.deltaY < 0) {
		e.target.valueAsNumber += 1;
	} else {
		e.target.value -= 1;
	}

	const volume = soundVolume.value / 100;
	setInitialVolumeForAudios(volume * 100);
});

playerVolume.addEventListener("wheel", (e) => {
	if (e.deltaY < 0) {
		e.target.valueAsNumber += 1;
	} else {
		e.target.value -= 1;
	}
	const volume = document.getElementById("playerVolumeSlider").value;

	player.setVolume(volume);
});

function extractVideoID(url) {
	const regExp =
		/(?:\?v=|\/embed\/|\/v\/|youtu\.be\/|\/watch\?v=|\/watch\?feature=player_embed&v=|\/videos\/|embed\/|watch\?v=|v=|\/embed\/)([a-zA-Z0-9_-]{11})/;
	const match = url.match(regExp);
	return (match && match[1]) || null;
}

let isVideoPlaying = false;

function playPauseMedia(mediaId) {
	if (mediaId === "video") {
		if (player) {
			if (isVideoPlaying) {
				player.pauseVideo();
				isVideoPlaying = false;
			} else {
				player.playVideo();
				isVideoPlaying = true;
			}
		}
	} else {
		const sound = document.getElementById(mediaId);
		if (sound) {
			if (sound.paused) {
				sound.play();
			} else {
				sound.pause();
			}
		}
	}
}

function FitScreen() {
	const player = document.getElementById("player");
	if (player) {
		if (player.classList.contains("scale-125")) {
			player.classList.remove("scale-125");
		} else {
			player.classList.add("scale-125");
		}
	} else {
		console.error("Player element not found!");
	}
}

function showAmbientSounds() {
	AmbientSounds = document.getElementById("ambientSounds");
	if (AmbientSounds) {
		AmbientSounds.classList.toggle("hidden");
	} else {
		console.error("Player element not found!");
	}
}

function showVolumeControls() {
	VolumeControls = document.getElementById("volumeControls");
	if (VolumeControls) {
		VolumeControls.classList.toggle("hidden");
	} else {
		console.error("Player element not found!");
	}
}

function StopAllSounds() {
	player.pauseVideo();
	forestSound.pause();
	fireplaceSound.pause();
	oceanSound.pause();
	keyboardSound.pause();
	stormRainSound.pause();
	cityRainSound.pause();
	snowSound.pause();
	birdsSound.pause();
	coffeeShopSound.pause();
	underwaterSound.pause();
}

let isFullScreen = false;

function toggleFullScreen() {
	const elem = document.documentElement;
	if (!isFullScreen) {
		if (elem.requestFullscreen) {
			elem.requestFullscreen();
		} else if (elem.mozRequestFullScreen) {
			/* Firefox */
			elem.mozRequestFullScreen();
		} else if (elem.webkitRequestFullscreen) {
			/* Chrome, Safari and Opera */
			elem.webkitRequestFullscreen();
		} else if (elem.msRequestFullscreen) {
			/* IE/Edge */
			elem.msRequestFullscreen();
		}
	} else {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.mozCancelFullScreen) {
			/* Firefox */
			document.mozCancelFullScreen();
		} else if (document.webkitExitFullscreen) {
			/* Chrome, Safari and Opera */
			document.webkitExitFullscreen();
		} else if (document.msExitFullscreen) {
			/* IE/Edge */
			document.msExitFullscreen();
		}
	}
}

// Event listener for the full screen toggle
document.addEventListener("fullscreenchange", () => {
	isFullScreen = !isFullScreen;
});

document.addEventListener("mozfullscreenchange", () => {
	isFullScreen = !isFullScreen;
});

document.addEventListener("webkitfullscreenchange", () => {
	isFullScreen = !isFullScreen;
});

document.addEventListener("msfullscreenchange", () => {
	isFullScreen = !isFullScreen;
});

initializeAudios();

let videoList = [];
let autoChangeEnabled = true;
let lastChangeDate = null;

const DEFAULT_VIDEOS = [
	{ id: "Xf3-4A-uEc8", title: "Lofi Hip Hop Radio" },
	{ id: "jfKfPfyJRdk", title: "Chillhop Music" },
	{ id: "lTRiuFIWV54", title: "Peaceful Piano" },
	{ id: "VUQfT3gNT3g", title: "Lofi Room" },
	{ id: "hzadz2x0SQM", title: "Inspiring Music for Productivity" },
];

function initializeVideoList() {
	const savedList = localStorage.getItem("videoList");
	const savedAutoChange = localStorage.getItem("autoChangeEnabled");
	const savedLastChange = localStorage.getItem("lastChangeDate");

	if (savedList) {
		videoList = JSON.parse(savedList);
	} else {
		videoList = [...DEFAULT_VIDEOS];
		saveVideoList();
	}

	if (savedAutoChange !== null) {
		autoChangeEnabled = JSON.parse(savedAutoChange);
	}

	if (savedLastChange) {
		lastChangeDate = savedLastChange;
	}

	updateVideoListUI();
	updateAutoChangeStatus();
	checkDailyChange();
}

function saveVideoList() {
	localStorage.setItem("videoList", JSON.stringify(videoList));
	localStorage.setItem("autoChangeEnabled", JSON.stringify(autoChangeEnabled));
	localStorage.setItem("lastChangeDate", lastChangeDate);
}

function extractVideoTitle(url) {
	return new Promise((resolve, reject) => {
		const videoId = extractVideoID(url);
		if (!videoId) {
			resolve("Unknown Video");
			return;
		}

		fetch(
			`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId}`,
		)
			.then((response) => response.json())
			.then((data) => {
				resolve(data.title || "Unknown Video");
			})
			.catch(() => {
				resolve("Unknown Video");
			});
	});
}

function addVideoToList() {
	const urlInput = document.getElementById("newVideoURL");
	const url = urlInput.value.trim();

	if (!url) return;

	const videoId = extractVideoID(url);
	if (!videoId) {
		alert("Invalid YouTube URL");
		return;
	}

	if (videoList.some((video) => video.id === videoId)) {
		alert("Video already in list");
		return;
	}

	extractVideoTitle(url).then((title) => {
		videoList.push({ id: videoId, title });
		saveVideoList();
		updateVideoListUI();
		urlInput.value = "";
	});
}

function removeVideoFromList(index) {
	if (videoList.length <= 1) {
		alert("Cannot remove the last video from the list");
		return;
	}

	videoList.splice(index, 1);
	saveVideoList();
	updateVideoListUI();
}

function loadVideoFromList(index) {
	if (videoList[index] && player) {
		player.loadVideoById(videoList[index].id);
	}
}

function loadRandomVideo() {
	if (videoList.length === 0) return;

	const randomIndex = Math.floor(Math.random() * videoList.length);
	loadVideoFromList(randomIndex);

	lastChangeDate = new Date().toDateString();
	saveVideoList();
	updateAutoChangeStatus();
}

function updateVideoListUI() {
	const listContainer = document.getElementById("videoList");
	if (!listContainer) return;

	listContainer.innerHTML = "";

	if (videoList.length === 0) {
		listContainer.innerHTML =
			'<div class="text-center text-gray-500 py-4">No videos in list</div>';
		return;
	}

	videoList.forEach((video, index) => {
		const videoItem = document.createElement("div");
		videoItem.className =
			"flex items-center justify-between p-2 hover:bg-base-300 rounded";
		videoItem.innerHTML = `
      <div class="flex items-center gap-2 flex-1">
        <button class="btn btn-sm bg-transparent border-none hover:bg-base-300" onclick="loadVideoFromList(${index})">
          <i class="ph ph-play"></i>
        </button>
        <span class="text-sm truncate">${video.title}</span>
      </div>
      <button class="btn btn-sm btn-error" onclick="removeVideoFromList(${index})">
        <i class="ph ph-trash"></i>
      </button>
    `;
		listContainer.appendChild(videoItem);
	});
}

function toggleAutoChange() {
	autoChangeEnabled = !autoChangeEnabled;
	saveVideoList();
	updateAutoChangeStatus();
}

function updateAutoChangeStatus() {
	const statusElement = document.getElementById("autoChangeStatus");
	const nextChangeElement = document.getElementById("nextChangeTime");

	if (!statusElement || !nextChangeElement) return;

	statusElement.textContent = autoChangeEnabled ? "Enabled" : "Disabled";

	if (autoChangeEnabled && lastChangeDate) {
		const lastChange = new Date(lastChangeDate);
		const nextChange = new Date(lastChange);
		nextChange.setDate(nextChange.getDate() + 1);
		nextChange.setHours(0, 0, 0, 0);

		const now = new Date();
		if (nextChange > now) {
			const timeLeft = nextChange - now;
			const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));
			const minutesLeft = Math.floor(
				(timeLeft % (1000 * 60 * 60)) / (1000 * 60),
			);
			nextChangeElement.textContent = `${hoursLeft}h ${minutesLeft}m`;
		} else {
			nextChangeElement.textContent = "Soon";
		}
	} else {
		nextChangeElement.textContent = "--";
	}
}

function checkDailyChange() {
	if (!autoChangeEnabled) return;

	const today = new Date().toDateString();

	if (lastChangeDate !== today) {
		loadRandomVideo();
	}

	setTimeout(checkDailyChange, 60000);
}

function forceRandomChange() {
	loadRandomVideo();
	document.getElementById("video_list_modal").close();
}

window.addEventListener("load", () => {
	initializeVideoList();
});
