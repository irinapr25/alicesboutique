'use strict';

import { setPaddingRight } from './modules/functions.js';
import { removePaddingRight } from './modules/functions.js';
import { handleGotoLinks } from './modules/smooth-scroll.js';
// import { languageChange } from './modules/language-change.js';
import { fslightboxJump } from './modules/fslightbox-jump.js';
import { spoilers } from './modules/spoiler.js';
import { kittensAvailability } from './modules/kittens.js';
import { filterKittens } from './modules/kittens.js';
import { sortKittens } from './modules/kittens.js';
import { tooltip } from './modules/tooltip.js';
import { setTestDataTooltip } from './modules/tooltip.js';
import { setDateTime } from './modules/date.js';
import { currentYear } from './modules/date.js';
// import { handleGotoLinks } from './modules/scroll.js';
// import { lazyLoading } from './modules/lazy-loading.js';
// import { slider } from './modules/slider.js';

document.addEventListener('DOMContentLoaded', function () {
	console.log('DOMContentLoaded event fired.');
	// document.addEventListener('click', function (e) {
	// 	console.log(e.target);
	// });

	const body = document.body;
	const header = document.querySelector('.header');
	//=======================================================
	/* BURGER */
	const iconMenu = document.querySelector('.icon-menu');
	// определяем есть ли scrollbar
	const paddingRightValue = window.innerWidth - document.body.offsetWidth + 'px';
	// const paddingRightValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
	if (iconMenu) {
		iconMenu.addEventListener('click', function (e) {
			toggleMenu();
		});

		// при клике на Esc закрыть выпадающее меню
		document.addEventListener('keydown', function (e) {
			if (e.key === 'Escape' && body.classList.contains('menu-open')) {
				toggleMenu();
				updateTabindex();
			}
		});
	}

	function toggleMenu() {
		if (!body.classList.contains('menu-open')) {
			body.classList.add('menu-open');

			// изменить tabindex на всех ссылках и buttons в menu-body
			menuBodyLinksButtons.forEach(menuBodyLinksButton => {
				menuBodyLinksButton.setAttribute('tabindex', '0');
			});

			// если меню открывается на устройствах со scrollbar
			if (parseInt(paddingRightValue) > 0) {
				setPaddingRight(body, header);
			}
		} else {
			document.body.classList.remove('menu-open');
			removePaddingRight(body, header);
		}
	}

	//=======================================================
	/* tabindex */
	const menuBodyLinksButtons = document.querySelectorAll('.menu__body a, .menu__body button');

	function updateTabindex() {
		if (window.innerWidth <= 767.98) {
			menuBodyLinksButtons.forEach(menuBodyLinksButton => {
				menuBodyLinksButton.setAttribute('tabindex', '-1');
			});
		} else {
			menuBodyLinksButtons.forEach(menuBodyLinksButton => {
				menuBodyLinksButton.removeAttribute('tabindex');
			});
		}
	}
	updateTabindex();
	window.addEventListener('resize', updateTabindex);

	//=======================================================
	/* COOKIE */
	// Находим блок с cookie
	const cookieNotice = document.querySelector('.cookie-notice');
	// Проверяем, были ли файлы cookie приняты ранее в текущей вкладке
	const cookiesAccepted = localStorage.getItem('cookiesAccepted');
	// console.log(cookiesAccepted); // null - если нет; true - если файлы cookie были приняты ранее

	if (cookieNotice) {
		if (cookiesAccepted !== 'true') {
			// Показываем блок, если файлы cookie не приняты
			cookieNotice.classList.remove('_hidden');

			// Добавляем обработчик события для кнопки "Принять"
			const acceptCookiesBtn = document.querySelector('.cookie-notice__button');
			acceptCookiesBtn.addEventListener('click', e => {
				e.preventDefault();
				// Скрываем блок, если файлы cookie приняты
				cookieNotice.classList.add('_hidden');
				localStorage.setItem('cookiesAccepted', 'true');
			});
		}
	}

	//=======================================================
	/* min высота 100vh - если ширина > высоты */
	const main = document.querySelector('.main');
	const breedSections = document.querySelectorAll('.breed');
	const kittensSections = document.querySelectorAll('.kittens');
	const aboutSection = document.querySelectorAll('.about');

	// функцию для установки min-height
	function setMinHeightForSections(sections) {
		if (sections.length) {
			if (window.innerWidth > window.innerHeight) {
				main.style.minHeight = '100vh'; // т.к. высота header учтена как padding-top для main
				if (header) {
					const headerHeight = header.offsetHeight;
					sections.forEach(section => {
						let height = `calc(100vh - ${headerHeight}px)`;
						section.style.minHeight = height;
					});
				} else {
					sections.forEach(section => {
						section.style.minHeight = '100vh';
					});
				}
			}
		}
	}
	// Вызываем функцию для установки min-height для секций с разными классами
	// setMinHeightForSections(main);
	setMinHeightForSections(breedSections);
	setMinHeightForSections(kittensSections);
	setMinHeightForSections(aboutSection);

	//=======================================================
	/* LANGUAGE CHANGE */
	languageChange();
	//=======================================================

	/* SPOILERS */
	spoilers('kittens-maine-coon');
	spoilers('kittens-abyssinian');
	spoilers('kittens-sphynx');

	//=======================================================
	/* Убираем скачок при открытии fslightbox */
	fslightboxJump();

	/* KITTEN AVAILABILITY */
	kittensAvailability();

	/* KITTENS FILTER */
	filterKittens('kittens-maine-coon');
	filterKittens('kittens-abyssinian');
	filterKittens('kittens-sphynx');
	/* SORT KITTENS */
	sortKittens('kittens-maine-coon');
	sortKittens('kittens-abyssinian');
	sortKittens('kittens-sphynx');

	/* TOOLTIP */
	setTestDataTooltip();
	tooltip();

	//=======================================================
	/* Set date-time from <time></time>*/
	setDateTime();

	//=======================================================
	/* FOOTER DATE */
	currentYear();

	//=======================================================
	/* ADD / REMOVE class _active in header - menu__link */
	// add class
	function addClassToElement(targetElement, className) {
		targetElement.classList.add(className);
	}
	// remove class
	function removeClassFromElements(elements, className) {
		elements.forEach(element => element.classList.remove(className));
	}
	// add class to clicked element, remove from others
	function handleMenuLinkClick(e) {
		e.preventDefault();
		const clickedLink = e.target.closest('.menu__link');

		if (clickedLink) {
			removeClassFromElements(menuLinks, '_active');
			removeClassFromElements(subMenuLinks, '_active');

			addClassToElement(clickedLink, '_active');
		}
	}

	const subMenuLinks = document.querySelectorAll('.menu__sub-menu .sub-menu__link');
	// add class to .menu__link if clicked .sub-menu__link
	function handleSubMenuLinkClick(e) {
		e.preventDefault();
		const clickedSubMenuLink = e.target.closest('.menu__sub-menu .sub-menu__link');
		// console.log(subMenuLinks);

		if (clickedSubMenuLink) {
			const menuLink = clickedSubMenuLink.closest('.menu__item').querySelector('.menu__link');

			if (menuLink) {
				removeClassFromElements(menuLinks, '_active');
				addClassToElement(menuLink, '_active');

				// add class to clicked .sub-menu__link, remove from others
				removeClassFromElements(subMenuLinks, '_active');
				addClassToElement(clickedSubMenuLink, '_active');
			}
		}
	}

	const menuList = document.querySelector('.menu__list');
	if (menuList) {
		menuList.addEventListener('click', handleMenuLinkClick);
		// закрытие menu при клике вне menu
		document.addEventListener('click', function (e) {
			// const menuList = document.querySelector('.menu__list');
			// Проверяем, был ли клик выполнен вне меню и значка меню
			// if (!menuList.contains(e.target) && e.target !== iconMenu) {

			// Проверяем, был ли клик выполнен вне меню, значка меню и span внутри элемента iconMenu
			if (
				!menuList.contains(e.target) &&
				e.target !== iconMenu &&
				!iconMenu.contains(e.target)
			) {
				if (document.body.classList.contains('menu-open')) {
					/* document.documentElement.classList.remove('menu-open');
					document.body.style.removeProperty('padding-right');
					header.style.removeProperty('padding-right'); */
					document.body.classList.remove('menu-open');
					removePaddingRight(body, header);
				}
			}
		});
	}

	/* SMOOTH SCROLL */
	handleGotoLinks();
	document.querySelectorAll('.menu__sub-menu .sub-menu__link').forEach(subMenuLink => {
		subMenuLink.addEventListener('click', handleSubMenuLinkClick);
	});

	//=======================================================
	/* ПОДСВЕТКА АКТИВНОГО ПУНКТА MENU ПРИ SCROLL */
	// Получите ссылки из меню
	const menuLinks = document.querySelectorAll('.menu__link');

	// Получите секции (разделы) для отслеживания
	const sections = document.querySelectorAll('.section');

	// section с классом footer
	const footerSection = document.querySelector('footer.section');

	// Функция для определения видимых секций
	function getVisibleSection() {
		let activeSection = null;

		sections.forEach(section => {
			const rect = section.getBoundingClientRect();
			// Определяем, находится ли верхнее и нижнее грани видимой области в пределах верхней и нижней границы секции
			if (rect.top <= 180 && rect.bottom >= 300) {
				activeSection = section;
			}
		});

		if (footerSection) {
			const footerRect = footerSection.getBoundingClientRect();
			// это условие проверяет, что footerSection видна в окне браузера, и разрешает отступ в 120 пикселей сверху перед тем как считать ее видимой.
			if (footerRect.top <= window.innerHeight - 120 && footerRect.bottom >= 0) {
				activeSection = footerSection;
			}
		}

		return activeSection;
	}

	// Функция для обработки прокрутки
	function handleScroll() {
		const activeSection = getVisibleSection();

		if (activeSection) {
			const activeId = activeSection.id;

			// Удалите класс _active у всех ссылок в меню
			menuLinks.forEach(link => link.classList.remove('_active'));

			// Удалите класс _active у всех ссылок в подменю
			subMenuLinks.forEach(subLink => subLink.classList.remove('_active'));

			// Найдите ссылку с соответствующим data-goto и добавьте класс _active
			const activeLink = document.querySelector(`.menu__link[data-goto="#${activeId}"]`);
			if (activeLink) {
				activeLink.classList.add('_active');
			}

			// Найдите ссылку с соответствующим data-goto в подменю и добавьте класс _active
			const activeSubMenuLink = document.querySelector(
				`.sub-menu__link[data-goto="#${activeId}"]`
			);

			if (activeSubMenuLink) {
				activeSubMenuLink.classList.add('_active');

				// Находим ближайшего родителя с классом menu__item
				const menuItem = activeSubMenuLink.closest('.menu__item');
				// Находим внутри menu__item элемент с классом menu__link
				const menuLink = menuItem.querySelector('.menu__link');
				menuLink.classList.add('_active');
			}
		}
	}

	// Добавьте обработчик события прокрутки
	window.addEventListener('scroll', handleScroll);

	// Вызовите функцию handleScroll при загрузке страницы, чтобы установить начальное состояние
	handleScroll();

	//=======================================================

	/* SHOW SUB-MENU */
	function showSubMenu(itemsSelector, submenuSelector, arrowSelector, linkSelector, activeClass) {
		// Получаем все элементы меню, используя переданный селектор
		const items = document.querySelectorAll(itemsSelector);

		// Добавляем обработчики событий для каждого элемента меню
		items.forEach(item => {
			// Находим элементы внутри текущего элемента меню с помощью переданных селекторов
			const subMenu = item.querySelector(submenuSelector);
			const arrow = item.querySelector(arrowSelector);
			const link = item.querySelector(linkSelector);

			// Добавляем обработчик события клика на стрелку
			if (arrow) {
				arrow.addEventListener('click', e => {
					e.preventDefault(); // Чтобы избежать перехода по ссылке

					// Закрываем все открытые sub-menu
					items.forEach(otherItem => {
						if (otherItem !== item) {
							const otherSubMenu = otherItem.querySelector(submenuSelector);

							if (otherSubMenu) {
								otherItem.classList.remove(activeClass);
								otherSubMenu.style.maxHeight = 0;
							}
						}
					});

					item.classList.toggle(activeClass); // Добавляем/удаляем класс _active для элемента меню
					if (item.classList.contains(activeClass)) {
						subMenu.style.maxHeight = subMenu.scrollHeight + 'px';
					} else if (!item.classList.contains(activeClass)) {
						subMenu.style.maxHeight = 0;
					}
				});
			}

			// Добавляем обработчик события клика на ссылку
			if (link) {
				link.addEventListener('click', e => {
					// Убираем класс _active и закрываем sub-menu при клике на ссылку
					item.classList.remove(activeClass);
					if (subMenu) {
						subMenu.style.maxHeight = 0;
					}
				});
			}

			// Добавляем обработчик события клика внутри sub-menu
			if (subMenu) {
				subMenu.addEventListener('click', e => {
					e.stopPropagation(); // Предотвращаем всплытие события
					item.classList.remove(activeClass);
					subMenu.style.maxHeight = 0;
				});
			}
		});

		// Добавляем обработчик события клика вне элементов меню
		document.addEventListener('click', e => {
			// Перебираем все элементы меню
			items.forEach(item => {
				// Если клик был вне текущего элемента меню, удаляем класс _active и закрываем sub-menu
				if (!item.contains(e.target)) {
					item.classList.remove(activeClass);
					const subMenu = item.querySelector(submenuSelector);
					if (subMenu) {
						subMenu.style.maxHeight = 0;
					}
				}
			});
		});

		document.addEventListener('keydown', function (e) {
			if (e.key === 'Escape') {
				items.forEach(item => {
					item.classList.remove(activeClass);
					const subMenu = item.querySelector(submenuSelector);
					if (subMenu) {
						subMenu.style.maxHeight = 0;
					}
				});
			}
		});
	}

	// Используйте функцию с нужными селекторами и классом активного состояния
	showSubMenu(
		'.info-main-footer__item',
		'.info-main-footer__sub-menu',
		'.info-main-footer__arrow',
		'.info-main-footer__link',
		'_active'
	);
	showSubMenu('.menu__item', '.menu__sub-menu', '.menu__arrow', '.menu__link', '_active');

	//=======================================================
	/* Проверка мобильного браузера */
	let isMobile = {
		Android: function () {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function () {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function () {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function () {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function () {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function () {
			return (
				isMobile.Android() ||
				isMobile.BlackBerry() ||
				isMobile.iOS() ||
				isMobile.Opera() ||
				isMobile.Windows()
			);
		},
	};
	/* Добавление класса touch для HTML если браузер мобильный */
	if (isMobile.any()) {
		document.documentElement.classList.add('_touch');
	} else {
		document.documentElement.classList.add('_pc');
	}
	//=======================================================
	const userAgent = navigator.userAgent;
	console.log(userAgent);

	// Проверяем наличие сенсорных событий
	function isTouchDevice() {
		return 'ontouchstart' in window || navigator.maxTouchPoints;
	}

	// Используем результат проверки
	if (isTouchDevice()) {
		// Устройство имеет сенсорный экран
		console.log('Это устройство с сенсорным экраном.');
	} else {
		// Устройство не имеет сенсорного экрана
		console.log('Это устройство без сенсорного экрана.');
	}

	// end DOMContentLoaded =======================================================
});
