let profile = document.querySelector('#profile');
let preProfile = document.getElementById('pre-profile');
let finalImage = document.getElementById('final-image');
let add = document.querySelector('#add');
let saveButton = document.querySelector('#save-button');
let inputImage = document.querySelector('#input-image');
let closePopup = document.querySelector('#close-popup');
let closePopup2 = document.querySelector('#close-popup2');
let finishEdit = document.querySelector('#finish-edit');
let download = document.querySelector('#download');
let editor = document.getElementById('editor-popup');
	let savePopup = document.getElementById('save-popup');
let zoomRange = document.getElementById('zoom-range');
let rotate = document.getElementById('rotate');

/* COUNTDOWN */
let hour = document.querySelector('.hour');
let minute = document.querySelector('.minute');
let second = document.querySelector('.second');



















/* TINY GESTURE */
slider = document.querySelector('#flyer-container');
const gesture = new TinyGesture(slider);

gesture.on('panmove', event => {
  // Everything from panstart, and...
  
  // Progressive gesture - left or right swipes
  
  profile.style.transform = `translate(${gesture.touchMoveX + 'px'}, ${gesture.touchMoveY + 'px'}) rotate(${imageSettings.rotate})`;
  
});













/* EMBED IMAGE */
let defaultZoomValue = '300px'; //from css var(--dimension)
let imageSettings = {
	zoom: defaultZoomValue, 
	rotate: '0deg', 
};

let prepareImage = () => {
	let file = inputImage.files[0];
	let reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = function(e) {
		preProfile.src = reader.result;
	}
	
	if(zoomRange.hasAttribute('disabled')) {
		zoomRange.removeAttribute('disabled');
		rotate.removeAttribute('disabled');
	}
}


let openEditor = () => {
	editor.classList.remove('display-none');
	editor.classList.add('open');
}

let closeEditor = () => {
	editor.classList.remove('open');
	editor.classList.add('display-none');
	preProfile.src = '';
	preProfile.style.width = defaultZoomValue;
	preProfile.style.height = defaultZoomValue;
	preProfile.style.transform = 'none';
	zoomRange.value = 50;
	rotate.value = 50;
	zoomRange.setAttribute('disabled', '');
	rotate.setAttribute('disabled', '');
}


let embedImage = () => {
	let imgSrc = preProfile.getAttribute('src');
	if (imgSrc != '') {
		profile.style.width = imageSettings.zoom;
		profile.style.height = imageSettings.zoom;
		profile.style.transform = `rotate(${imageSettings.rotate})`;
		profile.src = preProfile.src;
		alert(imageSettings.rotate);
		closeEditor();
	} 
}

let trackZoom = () => {
	let zoomValue = zoomRange.value * 6 + 'px';
	preProfile.style.width = zoomValue;
	preProfile.style.height = zoomValue;
	imageSettings.zoom = zoomValue;
}

let trackRotate = () => {
	/* rotate steps are 0, 25, 50, 75, 100 */
	let rotateValue = rotate.value;
	let degree;
	
	switch (rotateValue) {
		case '0': 
			degree = '180deg';
			preProfile.style.transform = `rotate(${degree})`;
			imageSettings.rotate = degree;
			break;
		case '25':
			degree = '270deg';
			preProfile.style.transform = `rotate(${degree})`;
			imageSettings.rotate = degree;
			break;
		case '50':
			degree = '0deg';
			preProfile.style.transform = `rotate(${degree})`;
			imageSettings.rotate = degree;
			break;
		case '75':
			degree = '90deg';
			preProfile.style.transform = `rotate(${degree})`;
			imageSettings.rotate = degree;
			break;
		case '100':
			degree = '180deg';
			preProfile.style.transform = `rotate(${degree})`;
			imageSettings.rotate = degree;
			break;
	}
}

let saveImage = () => {
	let profileSrc = profile.getAttribute('src');
	if (profileSrc != '') {
	let flyerContainer = document.getElementById('flyer-container');
	
	html2canvas(flyerContainer, {
		allowTaint: true, 
		logging: true, 
	}).then(function(canvas) {
	 let imageURL = canvas.toDataURL('image/png');
	 finalImage.setAttribute('src', imageURL);
	});
	}

}

let downloadImage = () => {
	let finalSrc = finalImage.getAttribute('src');
	if (finalSrc != '') {
		download.setAttribute('href', finalSrc);
		download.setAttribute('download', "meet-me-at-ayeye");
	}
}


let openSave = () => {
	saveImage();
	savePopup.classList.remove('display-none');
	savePopup.classList.add('open');
}

let closeSave = () => {
	savePopup.classList.remove('open');
	savePopup.classList.add('display-none');
}




/* COUNTDOWN */


let addZero = digit => {
 if (digit < 10) {
  return '0' + digit;
 }
 return digit;
}

let countdown = () => {
	let seconds = 1000
	let minutes = seconds * 60;
	let hours = minutes * 60;
	let days = hours * 24;
	let years = days * 365;
	
	let currentDate = new Date();
	let futureDate = new Date('December 20, 2020 16:00:00');
	
		let distance = futureDate.getTime() - currentDate.getTime();
	
		let rh = Math.floor((distance % (days)) / (hours));
		let rm = Math.floor((distance % (hours)) / (minutes));
		let rs = Math.floor((distance % (minutes)) / (seconds));
		
		hour.textContent = addZero(rh);
		minute.textContent = addZero(rm);
		second.textContent = addZero(rs);
		
}


let currentTime = () => {
	let time = new Date();
	let hours = time.getHours();
	let minutes = time.getMinutes();
	let seconds = time.getSeconds();
	
	console.log(second.textContent);
	hour.textContent = hours;
	second.textContent = seconds;
	minute.textContent = minutes;
}


setInterval(() => {
countdown();
}, 1000);































































inputImage.addEventListener('change', prepareImage);
add.addEventListener('click', openEditor)
saveButton.addEventListener('click', openSave);
closePopup.addEventListener('click', closeEditor);
closePopup2.addEventListener('click', closeSave)
finishEdit.addEventListener('click', embedImage);
download.addEventListener('click', downloadImage);
zoomRange.addEventListener('input', trackZoom);
rotate.addEventListener('input', trackRotate);