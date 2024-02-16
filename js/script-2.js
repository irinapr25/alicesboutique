'use strict';
document.addEventListener('DOMContentLoaded', function () {
	/* BURGER */
	const iconMenu = document.querySelector('.icon-menu');
	if (iconMenu) {
		iconMenu.addEventListener('click', function (e) {
			document.body.classList.toggle('menu-open');
		});
	}
	// document.addEventListener('click', documentClick);

	// function documentClick(e) {
	// 	const targetItem = e.target;

	// 	if (targetItem.closest('.icon-menu')) {
	// 		document.documentElement.classList.toggle('menu-open');
	// 	}
	// }
	//=======================================================
	/* COOKIE */
	// Находим блок с cookie
	const cookieNotice = document.querySelector('.cookie-notice');
	// Проверяем, были ли файлы cookie приняты ранее в текущей вкладке
	const cookiesAccepted = localStorage.getItem('cookiesAccepted');
	console.log(cookiesAccepted); // null - если нет; true - если файлы cookie были приняты ранее

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
	/* const isMobile = navigator.userAgent.toLowerCase().match(/mobile/i);
const isTablet = navigator.userAgent.toLowerCase().match(/tablet/i);
const isAndroid = navigator.userAgent.toLowerCase().match(/android/i);
const isiPhone = navigator.userAgent.toLowerCase().match(/iphone/i);
const isiPad = navigator.userAgent.toLowerCase().match(/ipad/i);
 */
	// SMOOTH SCROLL
	/*
const menuList = document.querySelector('.menu__list');

if (menuList) {
	menuList.addEventListener('click', function (e) {
		const link = e.target.closest('.menu__link');
		if (link) {
			e.preventDefault(); // Остановка стандартного поведения ссылки

			const menuLinkHref = link.getAttribute('href');
			console.log(menuLinkHref);
			const targetElement = document.querySelector(menuLinkHref); // Исправлено: добавлен "document.querySelector"
			console.log(menuLinkHref);

			if (targetElement) {
				targetElement.scrollIntoView({ behavior: 'smooth' });
			}
		}
	});
}
*/
	//=======================================================
	/* 	const menuList = document.querySelector('.menu__list');
	const menuLinks = document.querySelectorAll('.menu__link');
	const gotoLinks = document.querySelectorAll('[data-goto]');

	function addClassToElement(targetElement, className) {
		targetElement.classList.add(className);
	} */
	/* // Пример использования:
	// Предположим, у вас есть элемент с id "myElement", и вы хотите добавить класс "_active" к этому элементу.
	const myElement = document.getElementById('myElement');
	addClassToElement(myElement, '_active'); */

	// функция добавления / удаления класса _active у активной ссылки
	/* function addClassToMenuLink(targetLink) {
		menuLinks.forEach(link => link.classList.remove('_active'));
		targetLink.classList.add('_active');
	} */

	/* 	// АКТИВНАЯ ССЫЛКА
	if (menuList) {
		menuList.addEventListener('click', function (e) {
			e.preventDefault();
			const menuLink = e.target.closest('.menu__link');
			if (menuLink) {
				// menuLinks.forEach(link => link.classList.remove('_active'));
				// menuLink.classList.add('_active');
				menuLinks.forEach(link => link.classList.remove('_active'));

				// Добавляем класс _active для соответствующего menu__link
				addClassToElement(menuLink, '_active');
				// addClassToMenuLink(menuLink);
			}
		});
	}

	// Функция для добавления класса _active к menu__link рядом с sub-menu__link
	function addActiveClassToMenuLink(targetElement) {
		const subMenuLink = targetElement.closest('.sub-menu__link');
		if (subMenuLink) {
			const menuLink = subMenuLink.closest('.menu__item').querySelector('.menu__link');
			if (menuLink) {
				menuLinks.forEach(link => link.classList.remove('_active'));
				menuLink.classList.add('_active');
			}
		}
	}

	// Слушатель событий для клика на sub-menu__link
	const subMenuLinks = document.querySelectorAll('.sub-menu__link');
	subMenuLinks.forEach(subMenuLink => {
		subMenuLink.addEventListener('click', function (e) {
			e.preventDefault();
			addActiveClassToMenuLink(subMenuLink);
		});
	}); */
	//=======================================================
	const menuLinks = document.querySelectorAll('.menu__link');
	const gotoLinks = document.querySelectorAll('[data-goto]');

	function addClassToElement(targetElement, className) {
		targetElement.classList.add(className);
	}

	function removeClassFromElements(elements, className) {
		elements.forEach(element => element.classList.remove(className));
	}

	function handleMenuLinkClick(event) {
		event.preventDefault();
		const clickedLink = event.target.closest('.menu__link');

		if (clickedLink) {
			removeClassFromElements(menuLinks, '_active');
			// Закрываем все подменю
			document.querySelectorAll('.menu__sub-menu').forEach(subMenu => {
				subMenu.hidden = true;
			});
			addClassToElement(clickedLink, '_active');
		}
	}

	function handleSubMenuLinkClick(event) {
		event.preventDefault();
		const clickedSubMenuLink = event.target.closest('.menu__sub-menu .sub-menu__link');
		const menuLink = clickedSubMenuLink.closest('.menu__item').querySelector('.menu__link');
		const subMenu = clickedSubMenuLink.closest('.menu__item').querySelector('.menu__sub-menu');
		console.log(clickedSubMenuLink);
		if (clickedSubMenuLink) {
			if (menuLink) {
				removeClassFromElements(menuLinks, '_active');
				// Закрываем все подменю
				document.querySelectorAll('.menu__sub-menu').forEach(subMenu => {
					subMenu.hidden = true;
				});
				addClassToElement(menuLink, '_active');
			}
		}
		if (subMenu) {
			subMenu.hidden = false; // Скрываем подменю
		}
	}

	menuLinks.forEach(menuLink => {
		menuLink.addEventListener('mouseover', function () {
			// Add your hover behavior here
			const clickedLink = menuLink;
			removeClassFromElements(menuLinks, '_active');
			// Закрываем все подменю
			document.querySelectorAll('.menu__sub-menu').forEach(subMenu => {
				subMenu.hidden = true;
			});
			addClassToElement(clickedLink, '_active');
		});

		menuLink.addEventListener('mouseout', function () {
			// Add your hover out behavior here if needed
		});
	});

	document.querySelector('.menu__list').addEventListener('click', handleMenuLinkClick);

	// SMOOTH SCROLL
	gotoLinks.forEach(gotoLink => {
		gotoLink.addEventListener('click', function (e) {
			e.preventDefault();
			const targetId = gotoLink.getAttribute('data-goto');
			const targetBlock = document.querySelector(targetId);

			if (targetBlock) {
				const headerHeight = document.querySelector('.header').offsetHeight;
				const targetPosition =
					targetBlock.getBoundingClientRect().top + window.scrollY - headerHeight;

				// закрытие выпадающего меню
				document.documentElement.classList.contains('menu-open')
					? document.documentElement.classList.remove('menu-open')
					: null;

				window.scrollTo({
					top: targetPosition,
					behavior: 'smooth',
				});
			}
		});
	});

	document.querySelectorAll('.menu__sub-menu .sub-menu__link').forEach(subMenuLink => {
		subMenuLink.addEventListener('click', handleSubMenuLinkClick);
	});

	// закрытие menu при клике вне menu
	document.addEventListener('click', function (e) {
		const menuList = document.querySelector('.menu__list');
		// Проверяем, был ли клик выполнен вне меню и значка меню
		if (!menuList.contains(e.target) && e.target !== iconMenu) {
			document.documentElement.classList.remove('menu-open');
		}
	});

	//=======================================================

	// с учетом высоты шапки при клике на любой линк с data-goto=".class-name" data-goto="#id"
	/* 	if (gotoLinks.length > 0) {
		gotoLinks.forEach(gotoLink => {
			gotoLink.addEventListener('click', onGotoLinkClick);
		});

		function onGotoLinkClick(e) {
			e.preventDefault(); // Остановка стандартного поведения ссылки

			const gotoLink = e.target.closest('[data-goto]');

			// document.querySelector('dataset.goto') - проверка есть ли section с таким data-атрибутом
			if (gotoLink.dataset.goto && document.querySelector(gotoLink.dataset.goto)) {
				const gotoBlock = document.querySelector(gotoLink.dataset.goto);
				console.log(gotoLink.dataset.goto); // #home, #about, #breed...

				// закрытие выпадающего меню
				document.documentElement.classList.contains('menu-open')
					? document.documentElement.classList.remove('menu-open')
					: null;

				// положение объекта с учетом высоты шапки
				const goToBlockValue =
					gotoBlock.getBoundingClientRect().top +
					window.scrollY -
					document.querySelector('.header').offsetHeight;

				window.scrollTo({
					top: goToBlockValue,
					behavior: 'smooth',
				});

				// Добавляем класс _active для соответствующего menu__link
				addClassToMenuLink(
					document.querySelector(`.menu__link[data-goto="${gotoLink.dataset.goto}"]`)
				);

				// Добавляем класс _active для соответствующего menu__link
				menuLinks.forEach(link => link.classList.remove('_active'));

				//ищем элемент с классом menu__link, который имеет атрибут data-goto, равный значению gotoLink.dataset.goto (#home, #about, #breed...). То есть мы ищем menu__link, который связан с элементом, на который был сделан клик с атрибутом data-goto.
				const correspondingMenuLink = document.querySelector(
					`.menu__link[data-goto="${gotoLink.dataset.goto}"]`
				);
				console.log(correspondingMenuLink);
				if (correspondingMenuLink) {
					correspondingMenuLink.classList.add('_active');
				}
			}
		}
	} */
	//=======================================================

	// проверка приложения facebook
	/* function openFacebook() {
	var url = 'https://www.facebook.com/ВашеИмяАккаунта'; // URL профиля
	var appUrl = 'fb://profile/ВашеИмяАккаунта'; // URL для открытия в приложении

	// Проверяем, поддерживает ли браузер управление приложением через URL-схему
	var isAppSupported = 'standalone' in window.navigator || 'getInstalledRelatedApps' in navigator;

	if (isAppSupported) {
		// Проверяем, установлено ли приложение Facebook на устройстве
		window.navigator.getInstalledRelatedApps().then(function (apps) {
			var isAppInstalled = apps.some(function (app) {
				return app.platform === 'play' || app.platform === 'itunes';
			});

			// Открываем ссылку в приложении, если оно установлено, иначе в браузере
			if (isAppInstalled) {
				window.location.href = appUrl;
			} else {
				window.open(url, '_blank');
			}
		});
	} else {
		window.open(url, '_blank');
	}
}
 */

	/* LANGUAGE CHANGE */
	/*
const langButton = document.querySelector('.lang__button');
langButton.addEventListener('click', function (e) {
	e.preventDefault();
	langButton.parentElement.classList.toggle('_active');
});
*/
	//=======================================================
	// <html lang="ru"> <!-- Устанавливаем язык по умолчанию как "ru" --></html>
	//! язык
	document.addEventListener('click', function (e) {
		console.log(e.target);
	});
	const lang = document.querySelector('.header__lang.lang');
	const langButton = document.querySelector('.lang__button');
	const langLinks = document.querySelectorAll('.lang__link');
	// Получить выбранный язык из локального хранилища или установить по умолчанию
	let selectedLang = localStorage.getItem('selectedLang') || 'ru';

	// Определяем базовый путь в зависимости от выбранного языка
	//let basePath = selectedLang === 'ru' ? '/' : '/' + selectedLang + '/';

	// Установить активный язык в зависимости от выбранного
	langLinks.forEach(function (link) {
		if (link.getAttribute('data-lang') === selectedLang) {
			link.classList.add('_active');
		}
	});

	// скрывать / показывать выбор языка при Cl на icon
	langButton.addEventListener('click', function (e) {
		e.preventDefault();
		// добавляем class .lang (родителю langButton)
		langButton.parentElement.classList.toggle('_active');
	});

	// скрывать выбор языка при Cl вне
	document.addEventListener('click', function (e) {
		if (!e.target.closest('.lang')) {
			langButton.parentElement.classList.remove('_active');
		}
	});

	// скрывать выбор языка при прокрутки окна
	/* 	window.addEventListener('scroll', function () {
		if (lang.classList.contains('_active')) {
			console.log('Содержит');
			lang.classList.remove('_active');
		}
	}); */
	// Слушаем событие перемещения пальца на мобильных устройствах
	window.addEventListener('touchmove', function () {
		if (lang.classList.contains('_active')) {
			console.log('Содержит');
			lang.classList.remove('_active');
		}
	});

	// Функция для перенаправления на соответствующую страницу с учетом языка
	// ! не дает открыть index.html локально в file:///D:/Irina/Anna-MaineCoon-1/index.html
	//  function redirectWithLang(lang) {
	// 	let newPath = lang === 'ru' ? '/' : '/' + lang + '/';
	// 	if (window.location.pathname !== newPath) {
	// 		window.location.href = newPath;
	// 	}
	// }
	// new
	function redirectWithLang(lang) {
		let newPath = lang === 'ru' ? '/index.html' : '/' + lang + '/';
		if (window.location.pathname !== newPath) {
			window.location.href = newPath;
		}
	}

	langLinks.forEach(function (link) {
		link.addEventListener('click', function (event) {
			event.preventDefault();
			const newLang = link.getAttribute('data-lang');

			// Перенаправляем на соответствующую страницу только если выбранный язык изменился
			if (newLang !== selectedLang) {
				redirectWithLang(newLang);

				// Сохраняем выбранный язык в локальном хранилище
				localStorage.setItem('selectedLang', newLang);
			}
		});
	});

	// Перенаправление при загрузке страницы с учетом выбранного языка
	redirectWithLang(selectedLang);

	//=======================================================

	// ! добавить сначала загружать по языку браузера, потом иметь возможность изменить и сохранить выбранный язык при перезагрузки
	/*
Для того чтобы сначала загружать страницу на основе языка браузера, а затем предоставить возможность пользователю изменить и сохранить выбранный язык для будущих посещений, вам нужно немного изменить код. Вот как это можно сделать:

Добавьте функцию для определения языка браузера:
javascript
Copy code
function getBrowserLanguage() {
  const userLanguage = navigator.language || navigator.userLanguage;
  return userLanguage.split('-')[0]; // Get the primary language code
}
Измените код для установки начального выбранного языка на основе языка браузера:
javascript
Copy code
let selectedLang = localStorage.getItem('selectedLang') || getBrowserLanguage() || 'ru';
Обновите код, чтобы при клике на ссылку языка также сохранялся выбранный язык в локальном хранилище:
javascript
Copy code
langLinks.forEach(function (link) {
  link.addEventListener('click', function (event) {
    event.preventDefault();
    const newLang = link.getAttribute('data-lang');

    // Перенаправляем на соответствующую страницу только если выбранный язык изменился
    if (newLang !== selectedLang) {
      redirectWithLang(newLang);

      // Сохраняем выбранный язык в локальном хранилище
      localStorage.setItem('selectedLang', newLang);

      // Обновляем выбранный язык
      selectedLang = newLang;
    }
  });
});
Наконец, добавьте этот код для автоматического перенаправления на основе выбранного языка и при загрузке страницы:
javascript
Copy code
// Перенаправление при загрузке страницы с учетом выбранного языка
redirectWithLang(selectedLang);
Теперь ваш веб-сайт будет начинать с загрузки на основе языка браузера, а затем давать пользователю возможность изменить язык и сохранить его для будущих посещений.
*/
	/* KITTEN AVAILABILITY */
	const availabilityOptions = document.querySelectorAll('.item-kitten__option');

	availabilityOptions.forEach(function (option) {
		const trimmedText = option.textContent.trim().toLowerCase();

		if (trimmedText.includes('доступ')) {
			// Если текст содержит "доступ", устанавливаем зеленый цвет
			option.style.color = 'rgb(0, 128, 0)';

			// Находим родительский элемент option
			const parentElement = option.closest('.item-kitten');

			// Находим все элементы .item-kitten__price внутри родительского элемента и устанавливаем display: block
			const priceElements = parentElement.querySelectorAll('.item-kitten__price');
			priceElements.forEach(function (priceElement) {
				priceElement.style.display = 'block';
			});
		} else if (trimmedText.includes('рассмотрении')) {
			// Если текст содержит "рассмотрении", устанавливаем другой цвет (например, синий)
			option.style.color = 'rgb(0, 0, 255)';

			// Находим родительский элемент option
			const parentElement = option.closest('.item-kitten');

			// Находим все элементы .item-kitten__price внутри родительского элемента и устанавливаем display: block
			const priceElements = parentElement.querySelectorAll('.item-kitten__price');
			priceElements.forEach(function (priceElement) {
				priceElement.style.display = 'block';
			});
		} else if (trimmedText.includes('резерв')) {
			// Если текст содержит "резерв", устанавливаем желтый цвет
			option.style.color = 'rgb(236, 235, 11)';
		}
	});

	//=======================================================

	/* SPOILERS */
	const spoilersArray = document.querySelectorAll('[data-spoilers]');
	console.log(spoilersArray);

	if (spoilersArray.length) {
		// Получение обычных спойлеров
		const spoilersRegular = Array.from(spoilersArray).filter(function (item, index, self) {
			return !item.dataset.spoilers.split(',')[0];
		});
		console.log(spoilersRegular);
		// Инициализация обычных спойлеров
		if (spoilersRegular.length) {
			initSpoilers(spoilersRegular);
		}
		// Получение спойлеров с медиа запросами
		/* let mdQueriesArray = dataMediaQueries(spoilersArray, 'spoilers');
	if (mdQueriesArray && mdQueriesArray.length) {
		mdQueriesArray.forEach(mdQueriesItem => {
			// Событие
			mdQueriesItem.matchMedia.addEventListener('change', function () {
				initSpoilers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
			});
			initSpoilers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
		});
	} */
		const spoilersMedia = Array.from(spoilersArray).filter(function (item, index, self) {
			return item.dataset.spoilers.split(',')[0];
		});
		console.log(spoilersMedia);

		// Инициализация спойлеров с медиа запросами
		if (spoilersMedia.length) {
			const breakpointsArray = [];
			spoilersMedia.forEach(item => {
				const params = item.dataset.spoilers;
				const breakpoint = {};
				const paramsArray = params.split(',');
				breakpoint.value = paramsArray[0];
				breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : 'max'; // если 2-ое значение не указано в data-spoilers="1300,", то max
				breakpoint.item = item;
				console.log(item);
				breakpointsArray.push(breakpoint);
			});

			// получаем уникальные breakpoint-ы
			let mediaQueries = breakpointsArray.map(function (item) {
				// (min/max-width: ...px)
				return (
					'(' + item.type + '-width: ' + item.value + 'px),' + item.value + ',' + item.type
				);
			});

			// возвращаем уникальные значения
			mediaQueries = mediaQueries.filter(function (item, index, self) {
				return self.indexOf(item) === index;
			});
			console.log(mediaQueries); //(3) ['(max-width: 1300px)', '1300', 'max']
			// работаем с каждым breakpoint-ом
			mediaQueries.forEach(breakpoint => {
				const paramsArray = breakpoint.split(',');
				console.log(paramsArray);
				const mediaBreakpoint = paramsArray[1]; // 650...
				const mediaType = paramsArray[2]; // min / max
				const matchMedia = window.matchMedia(paramsArray[0]); // метод, кот. будет слушать ширину экрана и отрабатывать на нужной ширине экрана

				// объекты с нужными условиями
				const spoilersArray = breakpointsArray.filter(function (item) {
					if (item.value === mediaBreakpoint && item.type === mediaType) {
						return true;
					}
				});

				// событие
				matchMedia.addEventListener('change', function () {
					initSpoilers(spoilersArray, matchMedia);
				});
				initSpoilers(spoilersArray, matchMedia);
			});
		}

		// Инициализация
		function initSpoilers(spoilersArray, matchMedia = false) {
			spoilersArray.forEach(spoilersBlock => {
				spoilersBlock = matchMedia ? spoilersBlock.item : spoilersBlock;
				if (matchMedia.matches || !matchMedia) {
					spoilersBlock.classList.add('_spoiler-init');
					initSpoilerBody(spoilersBlock);
					spoilersBlock.addEventListener('click', setSpoilerAction);
				} else {
					spoilersBlock.classList.remove('_spoiler-init');
					initSpoilerBody(spoilersBlock, false);
					spoilersBlock.removeEventListener('click', setSpoilerAction);
				}
			});
		}
		// Работа с контентом
		function initSpoilerBody(spoilersBlock, hideSpoilerBody = true) {
			const spoilerTitles = spoilersBlock.querySelectorAll('[data-spoiler]');
			if (spoilerTitles.length > 0) {
				spoilerTitles.forEach(spoilerTitle => {
					if (hideSpoilerBody) {
						spoilerTitle.removeAttribute('tabindex');
						if (!spoilerTitle.classList.contains('_spoiler-active')) {
							spoilerTitle.nextElementSibling.hidden = true;
						}
					} else {
						spoilerTitle.setAttribute('tabindex', '-1');
						spoilerTitle.nextElementSibling.hidden = false;
					}
				});
			}
		}

		function setSpoilerAction(e) {
			const el = e.target;
			if (el.hasAttribute('data-spoiler') || el.closest('[data-spoiler]')) {
				const spoilerTitle = el.hasAttribute('data-spoiler')
					? el
					: el.closest('[data-spoiler]');
				const spoilersBlock = spoilerTitle.closest('[data-spoilers]');
				const oneSpoiler = spoilersBlock.hasAttribute('data-one-spoiler') ? true : false;
				if (!spoilersBlock.querySelectorAll('._slide').length) {
					if (oneSpoiler && !spoilerTitle.classList.contains('_spoiler-active')) {
						hideSpoilersBody(spoilersBlock);
					}
					spoilerTitle.classList.toggle('_spoiler-active');
					_slideToggle(spoilerTitle.nextElementSibling, 500);
				}
				e.preventDefault();
			}
		}
		function hideSpoilersBody(spoilersBlock) {
			const spoilerActiveTitle = spoilersBlock.querySelector('[data-spoiler]._spoiler-active');
			if (spoilerActiveTitle) {
				spoilerActiveTitle.classList.remove('_spoiler-active');
				_slideUp(spoilerActiveTitle.nextElementSibling, 500);
			}
		}
	}
	// Вспомогательные модули плавного раскрытия и закрытия объекта
	let _slideUp = (target, duration = 500, showmore = 0) => {
		if (!target.classList.contains('_slide')) {
			target.classList.add('_slide');
			target.style.transitionProperty = 'height, margin, padding';
			target.style.transitionDuration = duration + 'ms';
			target.style.height = `${target.offsetHeight}px`;
			target.offsetHeight;
			target.style.overflow = 'hidden';
			target.style.height = showmore ? `${showmore}px` : `0px`;
			target.style.paddingTop = 0;
			target.style.paddingBottom = 0;
			target.style.marginTop = 0;
			target.style.marginBottom = 0;
			window.setTimeout(() => {
				target.hidden = !showmore ? true : false;
				!showmore ? target.style.removeProperty('height') : null;
				target.style.removeProperty('padding-top');
				target.style.removeProperty('padding-bottom');
				target.style.removeProperty('margin-top');
				target.style.removeProperty('margin-bottom');
				!showmore ? target.style.removeProperty('overflow') : null;
				target.style.removeProperty('transition-duration');
				target.style.removeProperty('transition-property');
				target.classList.remove('_slide');
			}, duration);
		}
	};
	let _slideDown = (target, duration = 500, showmore = 0) => {
		if (!target.classList.contains('_slide')) {
			target.classList.add('_slide');
			target.hidden = target.hidden ? false : null;
			showmore ? target.style.removeProperty('height') : null;
			let height = target.offsetHeight;
			target.style.overflow = 'hidden';
			target.style.height = showmore ? `${showmore}px` : `0px`;
			target.style.paddingTop = 0;
			target.style.paddingBottom = 0;
			target.style.marginTop = 0;
			target.style.marginBottom = 0;
			target.offsetHeight;
			target.style.transitionProperty = 'height, margin, padding';
			target.style.transitionDuration = duration + 'ms';
			target.style.height = height + 'px';
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			window.setTimeout(() => {
				target.style.removeProperty('height');
				target.style.removeProperty('overflow');
				target.style.removeProperty('transition-duration');
				target.style.removeProperty('transition-property');
				target.classList.remove('_slide');
			}, duration);
		}
	};
	let _slideToggle = (target, duration = 500) => {
		if (target.hidden) {
			return _slideDown(target, duration);
		} else {
			return _slideUp(target, duration);
		}
	};

	//=======================================================
	/* KITTENS FILTER */
	const kittensMaineCoonCardsContainer = document.getElementById('kitten-maine-coon-cards');
	// const kittensMaineCoonCards = kittensMaineCoonCardsContainer.querySelectorAll('.item-kitten');

	const menuKittensListItems = document.querySelectorAll('.menu-kittens__item');

	function getFirstLetter(nameElement) {
		const nameText = nameElement.textContent.trim();
		return nameText.toLowerCase().charAt(0);
	}

	function extractLetterFromText(text) {
		// Split the text by space and get the last character of the second part
		const parts = text.split(' ');
		console.log(parts);
		if (parts.length === 2) {
			return parts[1].charAt(0).toLowerCase();
		} else {
			return null; // Return null for invalid input
		}
	}
	// функция добавления / удаления класса _active у активной ссылки
	function addClassToMenuKittensLink(targetLink) {
		menuKittensListItems.forEach(menuKittensItem => menuKittensItem.classList.remove('_active'));
		targetLink.classList.add('_active');
	}

	// функция фильтрации котят
	function filterKittens(kittenCards) {
		// Добавляем обработчик клика на меню фильтрации
		document.querySelector('.menu-kittens').addEventListener('click', e => {
			if (e.target.closest('.menu-kittens__item')) {
				const filterTarget = e.target.dataset['filter'];
				const filterText = e.target.textContent.trim().toLowerCase();
				const target = e.target;
				addClassToMenuKittensLink(target);

				// Reset visibility of all cards before applying the filter
				kittenCards.forEach(card => {
					console.log(card);
					card.classList.remove('_hide');
				});

				kittenCards.forEach(card => {
					const cardText = card.textContent.toLowerCase();
					const nameElement = card.querySelector('.item-kitten__name');
					console.log(extractLetterFromText(filterText), getFirstLetter(nameElement));

					if (
						filterTarget === 'available' &&
						!cardText.includes('доступ') &&
						!cardText.includes('рассмотрении')
					) {
						card.classList.add('_hide');
					} else if (extractLetterFromText(filterText)) {
						if (extractLetterFromText(filterText) !== getFirstLetter(nameElement)) {
							card.classList.add('_hide');
						}
					}
				});
			}
		});
	}
	// filterKittens(kittensMaineCoonCards);

	//=======================================================

	/* Убираем скачок при открытии fslightbox () */
	// ширина scroll
	const paddingRightValue = window.innerWidth - document.body.offsetWidth + 'px';
	console.log(paddingRightValue);

	const header = document.querySelector('.header');

	// Функция для установки padding-right
	/*
fsLightboxInstances['gallery-maine-coon-1'].props.onOpen = function () {
	console.log('The lightbox has opened.');
	// fsLightBoxContainer.style.paddingRight = paddingRightValue;
	document.body.style.paddingRight = paddingRightValue;
	header.style.paddingRight = paddingRightValue;
}; */
	/* fsLightboxInstances['gallery-maine-coon-1'].props.onClose = function () {
	console.log('The lightbox has closed.');
	// fsLightBoxContainer.style.paddingRight = 0;
	// document.body.style.paddingRight = 0;
	// header.style.paddingRight = 0;
	document.body.style.removeProperty('padding-right');
	header.style.removeProperty('padding-right');
}; */

	// все элементы с атрибутом data-fslightbox
	const lightboxElements = document.querySelectorAll('[data-fslightbox]');

	// функция для обработки события onOpen - установки padding-right для body и элементов с position: fixed;
	function handleLightboxOpen() {
		console.log('The lightbox has opened.');
		document.body.style.paddingRight = paddingRightValue;
		header.style.paddingRight = paddingRightValue;
	}

	// Пройдитесь по всем элементам и установите обработчик onOpen для каждого lightbox
	lightboxElements.forEach(function (element) {
		let lightboxName = element.getAttribute('data-fslightbox');
		fsLightboxInstances[lightboxName].props.onOpen = handleLightboxOpen;
	});

	// функцию для обработки события onClose - удаление свойства padding-right у body и элементов с position: fixed
	function handleLightboxClose() {
		console.log('The lightbox has closed.');
		document.body.style.removeProperty('padding-right');
		header.style.removeProperty('padding-right');
	}
	// Пройдитесь по всем элементам и установите обработчик onClose для каждого lightbox
	lightboxElements.forEach(function (element) {
		let lightboxName = element.getAttribute('data-fslightbox');
		fsLightboxInstances[lightboxName].props.onClose = handleLightboxClose;
	});
	//=======================================================
	// показать под-меню при клике на галочку
	/* 	const arrows = document.querySelectorAll('.arrow');

	if (arrows.length) {
		arrows.forEach(function (arrow) {
			arrow.addEventListener('click', function (e) {
				// const menuItem = e.target.closest('.info-main-footer__item');
				const menuItem = e.target.parentElement;
				menuItem.classList.toggle('_active');
				// const targetArrow = e.target;
				// const subList = e.target.nextElementSibling;
				// const targetLink = e.target.previousElementSibling;
				// targetArrow.classList.toggle('_active');
				// subList.classList.toggle('_open');
				// targetLink.classList.toggle('_parent');
				// закрытие выпадающего меню


				document.documentElement.classList.contains('menu-open')
					? document.documentElement.classList.remove('menu-open')
					: null;

				const subMenuLinks = document.querySelectorAll('.sub-menu__link');
				if (subMenuLinks.length) {
					subMenuLinks.forEach(function (subMenuLink) {
						subMenuLink.addEventListener('click', function (e) {
							if (e.target) {
								menuItem.classList.remove('_active');
							}
						});
					});
				}

				// скрывать sub-menu при Cl вне
				document.addEventListener('click', function (e) {
					if (e.target.parentElement.classList('_active')) {
						menuItem.classList.remove('_active');
					}
				});
			});
		});
	} */
	//=======================================================
	/* 	// Получаем все элементы info-main-footer__item
	const infoFooterItems = document.querySelectorAll('.info-main-footer__item');

	// Добавляем обработчик событий для каждого элемента
	infoFooterItems.forEach(item => {
		const subMenu = item.querySelector('.sub-menu');
		console.log(subMenu);
		const infoFooterArrow = item.querySelector('.info-main-footer__arrow');
		const infoFooterLink = item.querySelector('.info-main-footer__link');

		if (subMenu && infoFooterArrow && infoFooterLink) {
			// Добавляем обработчик события клика на info-main-footer__arrow
			infoFooterArrow.addEventListener('click', e => {
				e.stopPropagation(); // Остановим всплытие события, чтобы избежать закрытия меню при клике на стрелку
				item.classList.toggle('_active'); // Добавляем/удаляем класс _active для info-main-footer__item
			});

			// Добавляем обработчик события клика на sub-menu__link
			subMenu.addEventListener('click', e => {
				e.stopPropagation(); // Остановим всплытие события, чтобы избежать закрытия меню при клике на sub-menu__link
				item.classList.remove('_active'); // Убираем класс _active при клике на sub-menu__link
			});

			// Добавляем обработчик события клика на info-main-footer__link
			infoFooterLink.addEventListener('click', e => {
				item.classList.remove('_active'); // Убираем класс _active при клике на info-main-footer__link
			});
		}
	});

	// Добавляем обработчик события клика вне info-main-footer__item
	document.addEventListener('click', e => {
		infoFooterItems.forEach(item => {
			if (!item.contains(e.target)) {
				item.classList.remove('_active'); // Удаляем класс _active для info-main-footer__item, если клик был вне этого элемента
			}
		});
	}); */
	/* показать под-меню при клике на галочку */
	// Эта функция добавляет обработчики событий для элементов меню и делает их универсальными для разных частей страницы.
	function showSubMenu(itemsSelector, submenuSelector, arrowSelector, linkSelector, activeClass) {
		// Получаем все элементы меню, используя переданный селектор
		const items = document.querySelectorAll(itemsSelector);

		// Добавляем обработчики событий для каждого элемента меню
		items.forEach(item => {
			// Находим элементы внутри текущего элемента меню с помощью переданных селекторов
			const subMenu = item.querySelector(submenuSelector);
			// console.log(subMenu);
			const arrow = item.querySelector(arrowSelector);
			const link = item.querySelector(linkSelector);

			// Проверяем, что все необходимые элементы найдены
			if (subMenu && arrow && link) {
				// subMenu.hidden = true;

				// Добавляем обработчик события клика на стрелку
				arrow.addEventListener('click', e => {
					if (!item.classList.contains(activeClass)) {
						subMenu.hidden = true;
						// subMenu.display = 'none';
					} else {
						subMenu.hidden = false;
						// subMenu.display = 'block';
					}
					e.stopPropagation();
					//e.stopPropagation(); // Предотвращаем всплытие события, чтобы избежать закрытия меню при клике на стрелку
					item.classList.toggle(activeClass); // Добавляем/удаляем класс _active для элемента меню
					// _slideDown(subMenu, 500);
					_slideToggle(subMenu, 500);
				});

				// Добавляем обработчик события клика на подменю
				subMenu.addEventListener('click', e => {
					//e.stopPropagation(); // Предотвращаем всплытие события, чтобы избежать закрытия меню при клике на подменю
					if (item.classList.contains(activeClass)) {
						item.classList.remove(activeClass); // Убираем класс _active при клике на подменю
						subMenu.hidden = true;
						document.documentElement.classList.remove('menu-open'); // Закрываем меню
					}
				});

				/* // Добавляем обработчик события клика на ссылку
				link.addEventListener('click', e => {
					item.classList.remove(activeClass); // Убираем класс _active при клике на ссылку
				}); */
				/* // Добавляем обработчик события клика на ссылку
				link.addEventListener('click', e => {
					// Убираем класс _active при клике на любую ссылку
					items.forEach(item => {
						item.classList.remove(activeClass);
						const subMenu = item.querySelector(submenuSelector);
						if (subMenu) {
							subMenu.hidden = true; // Скрываем подменю
						}
					});
				}); */
				// Добавляем обработчик события клика на ссылку
				link.addEventListener('click', e => {
					e.preventDefault(); // Отменяем действие по умолчанию для ссылки, чтобы она не переходила по URL
					// Убираем класс _active при клике на любую ссылку
					items.forEach(item => {
						item.classList.remove(activeClass);
						// const subMenu = item.querySelector(submenuSelector);
						if (subMenu) {
							subMenu.hidden = true; // Скрываем подменю
						}
					});
				});
			}
		});

		// Добавляем обработчик события клика вне элементов меню
		document.addEventListener('click', e => {
			// Перебираем все элементы меню
			items.forEach(item => {
				// Если клик был вне текущего элемента меню, удаляем класс _active
				if (!item.contains(e.target)) {
					item.classList.remove(activeClass);
				}
			});
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
	function addTouchClass() {
		// Добавление класса _touch для HTML если браузер мобильный
		if (isMobile.any()) document.documentElement.classList.add('_touch');
	}
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
