/* Убираем скачок при открытии fslightbox () */
// ширина scroll
const paddingRightValue = window.innerWidth - document.body.offsetWidth + 'px';
// const header = document.querySelector('.header');
import { removePaddingRight, setPaddingRight } from './functions.js';

export function fslightboxJump() {
	// все элементы с атрибутом data-fslightbox
	const lightboxElements = document.querySelectorAll('[data-fslightbox]');

	// функция для обработки события onOpen - установки padding-right для body и элементов с position: fixed;
	function handleLightboxOpen() {
		console.log('The lightbox has opened.');
		if (parseInt(paddingRightValue) > 0) {
			setPaddingRight(document.body, document.querySelector('.header'));
		}
	}

	// Пройдитесь по всем элементам и установите обработчик onOpen для каждого lightbox
	lightboxElements.forEach(function (element) {
		let lightboxName = element.getAttribute('data-fslightbox');
		fsLightboxInstances[lightboxName].props.onOpen = handleLightboxOpen;
	});

	// функцию для обработки события onClose - удаление свойства padding-right у body и элементов с position: fixed
	function handleLightboxClose() {
		console.log('The lightbox has closed.');
		removePaddingRight(document.body, document.querySelector('.header'));
	}
	// Пройдитесь по всем элементам и установите обработчик onClose для каждого lightbox
	lightboxElements.forEach(function (element) {
		let lightboxName = element.getAttribute('data-fslightbox');
		fsLightboxInstances[lightboxName].props.onClose = handleLightboxClose;
	});
	//=======================================================
}

// Функция для установки padding-right

// fsLightboxInstances['gallery-maine-coon-1'].props.onOpen = function () {
// 	console.log('The lightbox has opened.');
// 	// fsLightBoxContainer.style.paddingRight = paddingRightValue;
// 	document.body.style.paddingRight = paddingRightValue;
// 	header.style.paddingRight = paddingRightValue;
// };
// fsLightboxInstances['gallery-maine-coon-1'].props.onClose = function () {
// 	console.log('The lightbox has closed.');
// 	// fsLightBoxContainer.style.paddingRight = 0;
// 	// document.body.style.paddingRight = 0;
// 	// header.style.paddingRight = 0;
// 	document.body.style.removeProperty('padding-right');
// 	header.style.removeProperty('padding-right');
// };

// Найти все изображения с атрибутом data-fslightbox="gallery-maine-coon-hercules"
// var images = document.querySelectorAll('a[data-fslightbox="gallery-maine-coon-hercules"] img');

// fsLightboxInstances['gallery-maine-coon-hercules'].props.onOpen = function () {
// 	// Пройти по каждому изображению и получить значение атрибута "alt"
// 	images.forEach(function (image) {
// 		var altText = image.getAttribute('alt');
// 		console.log(altText); // Вывести значение "alt" в консоль (или выполнить другие действия)

// 		console.log('The lightbox has opened.');
// 		var fslightboxElements = document.querySelectorAll('.fslightbox-fade-in-strong');
// 		console.log(fslightboxElements);

// 		fslightboxElements.forEach(function (element) {
// 			// Создать стили для псевдоэлемента ::after
// 			var styles = document.createElement('style');
// 			var elementAlt = element.getAttribute('alt'); // Получить значение "alt" для текущего изображения
// 			console.log(elementAlt);

// 			styles.innerHTML = `
// 			  .fslightbox-fade-in::after {
// 					content: "${elementAlt}";
// 					display: block;
// 					background: rgba(0, 0, 0, 0.7);
// 					color: white;
// 					padding: 5px;
// 					position: absolute;
// 					bottom: 10px;
// 					left: 10px;
// 					z-index: 1;
// 			  }
// 		 `;
// 			// Добавить стили к элементу
// 			element.appendChild(styles);
// 		});
// 	});
// };
