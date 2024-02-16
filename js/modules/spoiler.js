/* SPOILERS */
export function spoilers(targetElementId) {
	const targetElement = document.getElementById(targetElementId);
	// console.log(targetElement);

	if (targetElement) {
		const spoilersArray = targetElement.querySelectorAll('[data-spoilers]');
		// console.log(spoilersArray);

		if (spoilersArray.length) {
			// Получение обычных спойлеров
			const spoilersRegular = Array.from(spoilersArray).filter(function (item, index, self) {
				return !item.dataset.spoilers.split(',')[0];
			});
			// console.log(spoilersRegular);
			// Инициализация обычных спойлеров
			if (spoilersRegular.length) {
				initSpoilers(spoilersRegular);
			}
			// Получение спойлеров с медиа запросами
			const spoilersMedia = Array.from(spoilersArray).filter(function (item, index, self) {
				return item.dataset.spoilers.split(',')[0];
			});
			// console.log(spoilersMedia);

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
					// console.log(spoilersBlock);
					spoilersBlock = matchMedia ? spoilersBlock.item : spoilersBlock;

					if (matchMedia.matches || !matchMedia) {
						spoilersBlock.classList.add('_spoiler-init');
						initSpoilerBody(spoilersBlock);
						spoilersBlock.addEventListener('click', setSpoilerAction);

						// ==== открытие всех spoilers-kittens__body внутри которых есть item-kitten с доступом
						const spoilersBodies = spoilersBlock.querySelectorAll('.spoilers-kittens__body');

						function hasValidCardText(cardText) {
							return (
								cardText.includes('доступ') ||
								cardText.includes('рассмотрении') ||
								cardText.includes('available') ||
								cardText.includes('consider') ||
								cardText.includes('pieejam') ||
								cardText.includes('izskat')
							);
						}

						// текст о доступности на карточке
						let hasCardText = false;

						// перебираем все spoilersBody, чтобы найти карточки, удовлетворяющие условию, если есть хотя бы одна, чтобы не показывать блок, о том что нет доступных котят и скрывать кнопки выбора
						spoilersBodies.forEach(spoilersBody => {
							const kittensCards = spoilersBody.querySelectorAll('.item-kitten');

							kittensCards.forEach(card => {
								const availabilityOption = card.querySelector('.item-kitten__option');
								if (availabilityOption) {
									const cardText = availabilityOption.textContent.trim().toLowerCase();
									if (hasValidCardText(cardText)) {
										hasCardText = true;
									}
								}
							});
						});

						// предыдущий элемент-сосед div.kittens__none.none-kittens
						const hiddenBlock = spoilersBlock.previousElementSibling;

						// если нет ни одной карточки, с доступным котенком
						if (!hasCardText) {
							// оставляем только соц сети
							// скрываем весь блок с кнопками
							const blockButtons = targetElement.querySelector('.kittens__actions');
							if (blockButtons) {
								blockButtons.style.display = 'none';
								/* blockButtons.forEach(block => {
								block.style.display = 'none';
							}); */
								/* filterButtons.forEach(button => {
								// Скрываем все кнопки
								button.style.display = 'none';
							}); */
							}

							// скрываем блок с текстом
							const kittensText = targetElement.querySelector('.kittens__text');
							if (kittensText) {
								kittensText.style.display = 'none';
							}
							if (hiddenBlock && hiddenBlock.classList.contains('kittens__none')) {
								// удаляем class _hidden/показываем блок о том что нет доступных котят
								hiddenBlock.classList.remove('_hidden');
							}
						} else if (hasCardText) {
							// если есть карточки с доступными котятами, скрываем блок о том что нет доступных котят
							if (hiddenBlock && hiddenBlock.classList.contains('kittens__none')) {
								hiddenBlock.classList.add('_hidden');
							}
						}

						// Перебор всех spoilers__body и отмечаем доступные spoilerTitle
						// Определение доступных spoilerTitles. Объект Set представляет собой коллекцию уникальных значений, где каждое значение может встречаться только один раз. В данном случае, accessibleSpoilerTitles будет хранить уникальные заголовки (titles) спойлеров, которые считаются доступными, и это будет использоваться для определения, какие спойлеры должны быть открыты.
						const accessibleSpoilerTitles = new Set();
						spoilersBodies.forEach(spoilersBody => {
							// const itemKittens = spoilersBody.querySelectorAll('.item-kitten');
							const kittensCards = spoilersBody.querySelectorAll('.item-kitten');

							// Array.from(itemKittens) преобразует коллекцию элементов itemKittens в массив элементов. Затем метод some вызывается на этом массиве для проверки, содержит ли хотя бы один из элементов текст, удовлетворяющий условиям
							const shouldOpenSpoiler = Array.from(kittensCards).some(card => {
								const availabilityOption = card.querySelector('.item-kitten__option');
								if (availabilityOption) {
									const cardText = availabilityOption.textContent.trim().toLowerCase();
									return hasValidCardText(cardText);
								}
							});

							if (shouldOpenSpoiler) {
								// Открываем spoilers__body
								spoilersBody.hidden = false;

								// добавляем title, который находится перед spoilers__body, в котором есть доступные котята  этот объект в Set
								accessibleSpoilerTitles.add(spoilersBody.previousElementSibling);
							}
						});

						// Перебор всех spoilerTitle и добавляем/удаляем _spoiler-active
						const spoilerTitles = spoilersBlock.querySelectorAll('[data-spoiler]');
						spoilerTitles.forEach(spoilerTitle => {
							// Если заголовок находится в accessibleSpoilerTitles, то класс _spoiler-active добавляется к элементу
							if (accessibleSpoilerTitles.has(spoilerTitle)) {
								spoilerTitle.classList.add('_spoiler-active');
							} else {
								spoilerTitle.classList.remove('_spoiler-active');
							}
						});

						// Обработчик клика на кнопку фильтрации
						const filterButtons = targetElement.querySelectorAll('.kittens__button');
						filterButtons.forEach(filterButton => {
							if (filterButton) {
								filterButton.addEventListener('click', e => {
									// получаем значение data-filter для кнопки, по которой был произведен клик
									// const filterTarget = e.target.dataset['filter'];
									const filterTarget = e.currentTarget.dataset['filter'];
									if (filterTarget === 'reset') {
										spoilersBodies.forEach(spoilersBody => {
											hideSpoilersBody(spoilersBlock);
										});
									} else if (filterTarget === 'available') {
										spoilerTitles.forEach(spoilerTitle => {
											if (accessibleSpoilerTitles.has(spoilerTitle)) {
												spoilerTitle.classList.add('_spoiler-active');
												if (spoilerTitle.nextElementSibling.hidden) {
													// Добавляем проверку, чтобы вызвать _slideDown только если спойлер скрыт
													_slideDown(spoilerTitle.nextElementSibling, 500);
												}
											} else {
												// если нет доступных котят, при клике на available убираем класс у title и скрываем body
												spoilerTitle.classList.remove('_spoiler-active');
												_slideUp(spoilerTitle.nextElementSibling, 500);
											}
										});
									}
								});
							}
						});
						//=======================================================
					} else {
						spoilersBlock.classList.remove('_spoiler-init');
						initSpoilerBody(spoilersBlock, false);
						spoilersBlock.removeEventListener('click', setSpoilerAction);
					}
				});
			}
			//=======================================================

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
				const spoilerActiveTitle = spoilersBlock.querySelector(
					'[data-spoiler]._spoiler-active'
				);
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
	}
}

//=======================================================
// Получение спойлеров с медиа запросами
// let mdQueriesArray = dataMediaQueries(spoilersArray, 'spoilers');
// if (mdQueriesArray && mdQueriesArray.length) {
// 	mdQueriesArray.forEach(mdQueriesItem => {
// 		// Событие
// 		mdQueriesItem.matchMedia.addEventListener('change', function () {
// 			initSpoilers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
// 		});
// 		initSpoilers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
// 	});
// }

// перебираем все spoilersBody, чтобы найти карточки, удовлетворяющие условию, если есть хотя бы одна, чтобы не показывать блок, о том что нет доступных котят и скрывать кнопки выбора
// for (const spoilersBody of spoilersBodies) {
// const itemKittens = spoilersBody.querySelectorAll('.item-kitten');
// for (const itemKitten of itemKittens) {
// 	const cardText = itemKitten.textContent;
// 	if (hasValidCardText(cardText)) {
// 		hasCardText = true;
// 		break;
// 		}
// 	}
// }

// function initFilterButtons(spoilersBlock) {
// 	const filterButtons = spoilersBlock.querySelectorAll('.kittens__button');
// 	filterButtons.forEach(filterButton => {
// 		if (filterButton) {
// 			filterButton.addEventListener('click', e => {
// 				// получаем значение data-filter для кнопки, по которой был произведен клик
// 				const filterTarget = e.target.dataset['filter'];
// 				if (filterTarget === 'reset') {
// 					spoilersBodies.forEach(spoilersBody => {
// 						hideSpoilersBody(spoilersBlock);
// 					});
// 				} else if (filterTarget === 'available') {
// 					spoilerTitles.forEach(spoilerTitle => {
// 						if (accessibleSpoilerTitles.has(spoilerTitle)) {
// 							spoilerTitle.classList.add('_spoiler-active');
// 							if (spoilerTitle.nextElementSibling.hidden) {
// 								_slideDown(spoilerTitle.nextElementSibling, 500);
// 							}
// 						} else {
// 							spoilerTitle.classList.remove('_spoiler-active');
// 							_slideUp(spoilerTitle.nextElementSibling, 500);
// 						}
// 					});
// 				}
// 			});
// 		}
// 	});
// }
