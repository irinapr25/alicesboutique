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
export function languageChange1() {
	const lang = document.querySelector('.header__lang.lang');
	const langButton = document.querySelector('.lang__button');
	const langLinks = document.querySelectorAll('.lang__link');

	// Получить выбранный язык из локального хранилища или установить по умолчанию
	// let selectedLang = localStorage.getItem('selectedLang') || 'ru';
	let selectedLang = localStorage.getItem('selectedLang') || getBrowserLanguage() || 'ru';
	// Определяем базовый путь в зависимости от выбранного языка
	//let basePath = selectedLang === 'ru' ? '/' : '/' + selectedLang + '/';

	// Установить активный язык в зависимости от выбранного
	langLinks.forEach(function (link) {
		if (link.getAttribute('data-lang') === selectedLang) {
			// добавляем активный класс (_active) для выбранного языка
			link.classList.add('_active');
		}
	});

	// функция для определения языка браузера:
	/* function getBrowserLanguage() {
		// const userLanguage = navigator.language || navigator.userLanguage;
		const userLanguage = navigator.language;
		return userLanguage.split('-')[0]; // Get the primary language code
	} */
	/* function getBrowserLanguage() {
		const userLanguage = navigator.language;
		// Проверяем, что язык начинается с поддерживаемых языков
		if (userLanguage.startsWith('ru')) {
			return 'ru';
		} else if (userLanguage.startsWith('en')) {
			return 'en';
		} else if (userLanguage.startsWith('lv')) {
			return 'lv';
		}
		// Если не найдено совпадение, вернуть 'ru' по умолчанию
		return 'ru';
	} */

	function getBrowserLanguage() {
		const userLanguage = navigator.language;
		const supportedLanguages = ['ru', 'en', 'lv'];
		const defaultLanguage = 'ru'; // язык по умолчанию

		if (supportedLanguages.includes(userLanguage)) {
			return userLanguage;
		} else {
			return defaultLanguage;
		}
	}

	// скрывать / показывать меню выбора языка при Cl на icon
	if (langButton) {
		langButton.addEventListener('click', function (e) {
			// console.log('langButton');
			e.preventDefault();
			// console.log(e.target);
			// добавляем class _active (родителю lang__button -> header__lang)
			e.target.closest('.lang').classList.toggle('_active');
		});

		// скрывать выбор языка при Cl вне
		document.addEventListener('click', function (e) {
			if (!e.target.closest('.lang') && lang.classList.contains('_active')) {
				lang.classList.remove('_active');
			}
		});

		document.addEventListener('keydown', function (e) {
			if (e.key === 'Escape') {
				if (lang.classList.contains('_active')) {
					lang.classList.remove('_active');
				}
			}
		});

		// скрывать выбор языка при прокрутки окна
		window.addEventListener('scroll', function () {
			if (lang.classList.contains('_active')) {
				lang.classList.remove('_active');
			}
		});

		// при перемещении пальца (или нескольких пальцев) по экрану устройства с сенсорным экраном
		window.addEventListener('touchmove', function () {
			if (lang.classList.contains('_active')) {
				lang.classList.remove('_active');
			}
		});
	}

	// Функция для перенаправления на соответствующую страницу с учетом языка
	// ! не дает открыть index.html локально в file:///D:/Irina/Anna-MaineCoon-1/index.html
	function redirectWithLang(lang) {
		// ? let newPath = lang === 'ru' ? '/index.html' : '/' + lang + '/';
		let newPath = lang === 'ru' ? '/index.html' : '/' + lang + '/index.html';
		// let newPath = lang === 'ru' ? '/' : '/' + lang + '/';
		if (window.location.pathname !== newPath) {
			window.location.href = newPath;
		}
	}

	langLinks.forEach(function (link) {
		link.addEventListener('click', function (e) {
			e.preventDefault();
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

	// Перенаправление при загрузке страницы с учетом выбранного языка
	redirectWithLang(selectedLang);
}
//=======================================================

// ! добавить сначала загружать по языку браузера, потом иметь возможность изменить и сохранить выбранный язык при перезагрузки

//Для того чтобы сначала загружать страницу на основе языка браузера, а затем предоставить возможность пользователю изменить и сохранить выбранный язык для будущих посещений, вам нужно немного изменить код. Вот как это можно сделать:

// Добавьте функцию для определения языка браузера:

// function getBrowserLanguage() {
// 	const userLanguage = navigator.language || navigator.userLanguage;
// 	return userLanguage.split('-')[0]; // Get the primary language code
// }

//Измените код для установки начального выбранного языка на основе языка браузера:
// let selectedLang = localStorage.getItem('selectedLang') || getBrowserLanguage() || 'ru';

//Обновите код, чтобы при клике на ссылку языка также сохранялся выбранный язык в локальном хранилище:
// langLinks.forEach(function (link) {
// 	link.addEventListener('click', function (event) {
// 		event.preventDefault();
// 		const newLang = link.getAttribute('data-lang');

// 		// Перенаправляем на соответствующую страницу только если выбранный язык изменился
// 		if (newLang !== selectedLang) {
// 			redirectWithLang(newLang);

// 			// Сохраняем выбранный язык в локальном хранилище
// 			localStorage.setItem('selectedLang', newLang);

// 			// Обновляем выбранный язык
// 			selectedLang = newLang;
// 		}
// 	});
// });

//Наконец, добавьте этот код для автоматического перенаправления на основе выбранного языка и при загрузке страницы:

// Перенаправление при загрузке страницы с учетом выбранного языка
// redirectWithLang(selectedLang);
//Теперь ваш веб-сайт будет начинать с загрузки на основе языка браузера, а затем давать пользователю возможность изменить язык и сохранить его для будущих посещений.

// langLinks.forEach(function (link) {
// 	link.addEventListener('click', function (event) {
// 		event.preventDefault();
// 		const newLang = link.getAttribute('data-lang');

// 		// Перенаправляем на соответствующую страницу только если выбранный язык изменился
// 		if (newLang !== selectedLang) {
// 			redirectWithLang(newLang);

// 			// Сохраняем выбранный язык в локальном хранилище
// 			localStorage.setItem('selectedLang', newLang);
// 		}
// 	});
// });

export function languageChange() {
    const supportedLangPaths = ['/ru/', '/en/', '/lv/'];
    const currentPath = window.location.pathname; // Определяем текущий путь
    console.debug('currentPath', currentPath); // currentPath /

    const lang = document.querySelector('.header__lang.lang');
    const langButton = document.querySelector('.lang__button');
    const langLinks = document.querySelectorAll('.lang__link');

    // Получить выбранный язык из локального хранилища или установить по умолчанию
    let selectedLang = localStorage.getItem('selectedLang') || getBrowserLanguage() || 'en';
    console.debug('selectedLang', selectedLang); // selectedLang ru

    // Функция для перенаправления на соответствующую страницу с учетом языка
    function redirectWithLang(lang) {
        let newPath = `/${lang}/`;
        console.debug('newPath', newPath);

        // Если текущий путь на корневом уровне, перенаправляем на папку с языком
        if (currentPath === '/' || !supportedLangPaths.some(path => currentPath.startsWith(path))) {
            window.location.href = newPath;
        }
    }

    // Перенаправление при загрузке страницы с учетом выбранного языка
    redirectWithLang(selectedLang);

    // Устанавливаем активный язык в зависимости от выбранного
    langLinks.forEach(function (link) {
        if (link.getAttribute('data-lang') === selectedLang) {
            link.classList.add('_active');
        }
    });

    // Функция для определения языка браузера:
    function getBrowserLanguage() {
        const userLanguage = navigator.language.split('-')[0]; // Извлекаем код языка
        console.debug('userLanguage', userLanguage); // userLanguage lv
        const supportedLanguages = ['ru', 'en', 'lv'];
        const defaultLanguage = 'en'; // язык по умолчанию английский

        return supportedLanguages.includes(userLanguage) ? userLanguage : defaultLanguage;
    }

    if (langButton) {
        // Функция для скрытия меню
        function hideLangMenu() {
            if (lang.classList.contains('_active')) {
                lang.classList.remove('_active');
                langButton.setAttribute('aria-expanded', 'false');
            }
        }

        // Функция для переключения видимости меню
        function toggleLangMenu(e) {
            e.preventDefault();
            const langBlock = e.target.closest('.lang');
            if (langBlock) {
                langBlock.classList.toggle('_active');
                const isActive = langBlock.classList.contains('_active');
                langButton.setAttribute('aria-expanded', isActive.toString());
            }
        }

        // Событие: Клик по кнопке выбора языка
        langButton.addEventListener('click', toggleLangMenu);

        // Событие: Клик вне меню
        document.addEventListener('click', function (e) {
            if (!e.target.closest('.lang')) {
                hideLangMenu();
            }
        });

        // Событие: Нажатие клавиши Escape
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                hideLangMenu();
            }
        });

        // Событие: Прокрутка окна
        window.addEventListener('scroll', hideLangMenu);

        // Событие: Перемещение пальца по экрану
        window.addEventListener('touchmove', hideLangMenu);

        // Событие: Наведение мыши на кнопку
        langButton.addEventListener('mouseenter', () => {
            langButton.setAttribute('aria-expanded', 'true');
        });

        // Событие: Уход мыши с кнопки
        langButton.addEventListener('mouseleave', () => {
            langButton.setAttribute('aria-expanded', 'false');
        });
    }

    // Обработчик выбора языка через меню
    langLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
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
}
