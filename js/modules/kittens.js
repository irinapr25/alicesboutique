/* KITTEN AVAILABILITY */
export function kittensAvailability() {
	const availabilityOptions = document.querySelectorAll('.item-kitten__option');

	if (availabilityOptions) {
		availabilityOptions.forEach(function (option) {
			const availabilityText = option.textContent.trim().toLowerCase();

			if (
				availabilityText.includes('available') ||
				availabilityText.includes('доступ') ||
				availabilityText.includes('pieejam')
			) {
				// Если текст содержит "доступ", устанавливаем зеленый цвет
				// option.style.color = 'rgb(0, 128, 0)';
				// option.style.color = 'rgb(93 132 48)';
				option.style.color = '#437806';

				if (availabilityText.includes('available') && option.classList.contains('_tooltip')) {
					// option.classList.add('_show-after');
					option.setAttribute(
						'data-tooltip',
						`This little kitten is&nbsp;looking for caring owners.<br>You can get to <a data-goto="#footer" href="#footer" style="text-decoration: underline;">know more about it</a>.`
					);
				} else if (
					availabilityText.includes('доступ') &&
					option.classList.contains('_tooltip')
				) {
					// Установим текст внутрь "_tooltip-text"
					option.setAttribute(
						'data-tooltip',
						`Котенок ищет заботливых хозяев.<br>Вы&nbsp;можете <a data-goto="#footer" href="#footer" style="text-decoration: underline;">интересоваться&nbsp;им</a>.`
					);
				} else if (
					availabilityText.includes('pieejam') &&
					option.classList.contains('_tooltip')
				) {
					// option.classList.add('_show-after');
					option.setAttribute(
						'data-tooltip',
						`Kaķēns meklē gādīgus īpašniekus.<br>Jūs&nbsp;varāt <a data-goto="#footer" href="#footer" style="text-decoration: underline;">interesēties</a>.`
					);
				}

				/* показать block с ценой */
				// Находим родительский элемент option
				const parentElement = option.closest('.item-kitten');

				/* if (parentElement) {
					// Находим все элементы .item-kitten__price внутри родительского элемента и устанавливаем display: block
					const priceElements = parentElement.querySelectorAll('.item-kitten__price');
					priceElements.forEach(function (priceElement) {
						priceElement.style.display = 'inline-block';
					});
				} */
			} else if (
				availabilityText.includes('consider') ||
				availabilityText.includes('рассмотрении') ||
				availabilityText.includes('izskat')
			) {
				// Если текст содержит "рассмотрении", устанавливаем другой цвет (например, синий)
				option.style.color = 'rgb(0, 0, 255)';
				if (availabilityText.includes('consider') && option.classList.contains('_tooltip')) {
					// option.classList.add('_show-after');
					option.setAttribute(
						'data-tooltip',
						`There is&nbsp;already interest in&nbsp;the kitten,<br>but a&nbsp;deposit hasn\&rsquo;t been placed yet.<br>You can still <a data-goto="#footer" href="#footer" style="text-decoration: underline;">inquire about&nbsp;it</a>.`
					);
				} else if (
					availabilityText.includes('рассмотрении') &&
					option.classList.contains('_tooltip')
				) {
					// option.classList.add('_show-after');
					option.setAttribute(
						'data-tooltip',
						`Котёнком уже интересуются, но&nbsp;задаток еще не&nbsp;внесен.<br>Вы&nbsp;все еще можете <a data-goto="#footer" href="#footer" style="text-decoration: underline;">интересоваться&nbsp;им</a>.`
					);
				} else if (
					availabilityText.includes('izskat') &&
					option.classList.contains('_tooltip')
				) {
					// option.classList.add('_show-after');
					option.setAttribute(
						'data-tooltip',
						`Par kaķēnu jau ir&nbsp;interese,<br>bet depozīts vēl nav&nbsp;iemaksāts.<br>Jūs joprojām varat <a data-goto="#footer" href="#footer" style="text-decoration: underline;">jautāt par&nbsp;to</a>.`
					);
				}
			} else if (
				availabilityText.includes('reserved') ||
				availabilityText.includes('резерв') ||
				availabilityText.includes('rezerv')
			) {
				// Если текст содержит "резерв", устанавливаем желтый цвет
				// option.style.color = 'rgb(236, 235, 11)';
				option.style.color = '#9c9c02';
				if (availabilityText.includes('reserved') && option.classList.contains('_tooltip')) {
					// option.classList.add('_show-after');
					option.setAttribute(
						'data-tooltip',
						`A&nbsp;deposit has been placed for the pet,<br>but the contract with the buyer can still be&nbsp;terminated.<br>It&rsquo;s possible that it&nbsp;may still become available.`
					);
				} else if (
					availabilityText.includes('резерв') &&
					option.classList.contains('_tooltip')
				) {
					// option.classList.add('_show-after');
					option.setAttribute(
						'data-tooltip',
						`За&nbsp;питомца внесли задаток,<br>но&nbsp;договор с&nbsp;покупателем ещё может быть расторгнут.<br>Возможно, он&nbsp;еще будет свободен.`
					);
				} else if (
					availabilityText.includes('rezerv') &&
					option.classList.contains('_tooltip')
				) {
					// option.classList.add('_show-after');
					option.setAttribute(
						'data-tooltip',
						`Par dzīvnieku jau ir&nbsp;samaksāts depozīts,<br>bet pārdošanas līgums ar&nbsp;pircēju var tikt atcelts.<br>Iespējams, tas vēl var&nbsp;palikt brīvs.`
					);
				}
			} else if (
				availabilityText.includes('sold') ||
				availabilityText.includes('продан') ||
				availabilityText.includes('pārdots')
			) {
				// itemKittenHeader.setAttribute('title', 'Малыш переехал в новый дом');
				if (availabilityText.includes('sold') && option.classList.contains('_tooltip')) {
					// option.classList.add('_show-after');
					option.setAttribute(
						'data-tooltip',
						`The little one has moved to&nbsp;a&nbsp;new home.`
					);
				} else if (
					availabilityText.includes('продан') &&
					option.classList.contains('_tooltip')
				) {
					// option.classList.add('_show-after');
					option.setAttribute('data-tooltip', `Малыш переехал в&nbsp;новый дом.`);
				} else if (
					availabilityText.includes('pārdots') &&
					option.classList.contains('_tooltip')
				) {
					// option.classList.add('_show-after');
					option.setAttribute(
						'data-tooltip',
						`Mazulis ir&nbsp;pārcēlies uz&nbsp;jaunām mājām.`
					);
				}
			}
		});
	}
}
//=======================================================
/* KITTENS FILTER */
export function filterKittens(targetElementId) {
	const targetElement = document.getElementById(targetElementId);

	if (targetElement) {
		const kittensCards = targetElement.querySelectorAll('.item-kitten');
		// console.log(kittensCards);
		// const availabilityOptions = targetElement.querySelectorAll('.item-kitten__option');
		const filterButtons = targetElement.querySelectorAll('.kittens__button');
		const parentsBlocks = targetElement.querySelectorAll('.parents-spoilers-kittens');

		filterButtons.forEach(button =>
			// слушаем клик по кнопке
			button.addEventListener('click', e => {
				// получаем значение data-filter для кнопки, по которой был произведен клик
				// const filterTarget = e.target.dataset['filter'];
				const filterTarget = e.currentTarget.dataset['filter'];
				// console.log(filterTarget);
				// Удаляем класс _active у всех кнопок
				filterButtons.forEach(btn => {
					btn.classList.remove('_active');
				});

				// Добавляем класс _active на кнопку, по которой был клик
				// e.target.classList.add('_active');

				// обработчик события привязан к элементу с классом kittens__button, и внутри этого элемента есть вложенный тег <span>, то в данном случае использование e.currentTarget предпочтительно
				e.currentTarget.classList.add('_active');

				// Если клик произошел на кнопке "available" -> скрываем все, кроме доступных котят
				if (filterTarget === 'available') {
					// проходим по всем карточкам
					kittensCards.forEach(card => {
						// получаем для соответствующей карточки элемент доступности
						const availabilityOption = card.querySelector('.item-kitten__option');

						if (availabilityOption) {
							// текст в элемент доступности
							const availabilityText = availabilityOption.textContent.trim().toLowerCase();

							// Здесь определяете критерий, по которому решаете, добавлять ли класс "_available"
							const addAvailableClass =
								availabilityText.includes('доступ') ||
								availabilityText.includes('рассмотрении') ||
								availabilityText.includes('available') ||
								availabilityText.includes('consider') ||
								availabilityText.includes('pieejam') ||
								availabilityText.includes('izskat');

							if (addAvailableClass) {
								card.classList.remove('_hidden');
								card.classList.add('_available');
							} else {
								card.classList.add('_hidden');
							}
						}

						// скрываем блок с родителями
						parentsBlocks.forEach(parentsBlock => {
							parentsBlock.classList.add('_hidden');
						});
					});
				} else if (filterTarget === 'reset') {
					// удаляем class _hidden у блока с родителями и скрытыми карточками, чтобы при открытии spoiler, показывалось все
					parentsBlocks.forEach(parentsBlock => {
						parentsBlock.classList.remove('_hidden');
					});
					kittensCards.forEach(card => {
						if (card.classList.contains('_hidden')) {
							card.classList.remove('_hidden');
						}
					});
				}
			})
		);
	}
}
//=======================================================
/* SORT KITTENS */
export function sortKittens(targetElementId) {
	// Функция для определения порядка сортировки
	function getOrder(availability) {
		const availabilityText = availability.toLowerCase();

		if (
			availabilityText.includes('available') ||
			availabilityText.includes('доступ') ||
			availabilityText.includes('pieejam')
		) {
			return 1;
		} else if (
			availabilityText.includes('consider') ||
			availabilityText.includes('рассмотрении') ||
			availabilityText.includes('izskat')
		) {
			return 2;
		} else if (
			availabilityText.includes('reserved') ||
			availabilityText.includes('резерв') ||
			availabilityText.includes('rezervēt')
		) {
			return 3;
		} else if (
			availabilityText.includes('sold') ||
			availabilityText.includes('продан') ||
			availabilityText.includes('pārdot')
		) {
			return 4;
		}

		// Если ни одно из условий не выполнено, возвращаем 0
		return 0;
	}

	// Функция для сортировки элементов внутри каждой группы
	function sortKittensInGroup(spoilersItem) {
		// галерея с изображениями котят для каждого помета
		const kittensContainer = spoilersItem.querySelector('.gallery-spoilers-kittens');

		// Получаем все элементы с классом "item-kitten" внутри указанной группы (gallery-spoilers-kittens) в массив
		const kittens = Array.from(
			spoilersItem.querySelectorAll('.gallery-spoilers-kittens__item.item-kitten')
		);

		// Сортируем элементы
		const sortedKittens = kittens.sort(function (a, b) {
			// получения текстового содержимого элемента с классом "item-kitten__name" - имя котенка
			const nameA = ((a.querySelector('.item-kitten__name') || {}).textContent || '').trim();
			const nameB = ((b.querySelector('.item-kitten__name') || {}).textContent || '').trim();
			/* "|| {}": Если элемент с классом "item-kitten__name" не найден, оператор || возвращает пустой объект {}, чтобы предотвратить ошибку.
				.textContent: Это используется для получения текстового содержимого найденного элемента.
				"|| ''": Если текстовое содержимое равно null или undefined, оператор || возвращает пустую строку '', чтобы избежать проблем.
				.trim(): Этот метод удаляет пробелы с начала и конца строки, если они есть. */

			// получения текстового содержимого элемента с классом "item-kitten__option" - информация о доступности котенка
			const availabilityElementA = a.querySelector('.item-kitten__option');
			const availabilityA = availabilityElementA ? availabilityElementA.textContent.trim() : '';

			const availabilityElementB = b.querySelector('.item-kitten__option');
			const availabilityB = availabilityElementB ? availabilityElementB.textContent.trim() : '';

			// Сначала сортируем по порядку доступности
			const orderA = getOrder(availabilityA);
			const orderB = getOrder(availabilityB);

			// Если порядок доступности не равен, возвращаем результат сравнения порядка
			if (orderA !== orderB) {
				return orderA - orderB;
			}

			// Затем сортируем по имени
			return nameA.localeCompare(nameB);
			/* метод localeCompare используется для сравнения двух строк с учетом локали. Этот метод возвращает число, которое показывает, какая из строк лексикографически больше:
			- Если localeCompare возвращает отрицательное число, это означает, что nameA меньше nameB.
			- Если localeCompare возвращает положительное число, это означает, что nameA больше nameB.
			- Если localeCompare возвращает 0, это означает, что строки идентичны.*/
		});

		// Присваиваем порядковые номера элементам
		sortedKittens.forEach(function (kitten, index) {
			kitten.setAttribute('order', index + 1);
		});

		// Очищаем контейнер
		kittensContainer.innerHTML = '';

		// Вставляем отсортированные элементы обратно в контейнер
		sortedKittens.forEach(function (kitten) {
			kittensContainer.appendChild(kitten);
		});
	}

	// чтобы не сортировались те, где нет в заголовке spoiler тега time (Канадский сфинкс - в одном spoiler несколько пометов)
	const sectionKitten = document.getElementById(targetElementId);
	if (sectionKitten) {
		const spoilersItems = sectionKitten.querySelectorAll('.spoilers-kittens__item');
		spoilersItems.forEach(function (spoilersItem) {
			const spoilersItemTime = spoilersItem.querySelectorAll('button time');
			if (spoilersItemTime.length) {
				sortKittensInGroup(spoilersItem);
			}
		});
	}
}
//=======================================================
/* KITTENS FILTER old */
export function filterKittens1() {
	const kittensMaineCoonCardsContainer = document.getElementById('kitten-maine-coon-cards');
	const kittensMaineCoonCards = kittensMaineCoonCardsContainer.querySelectorAll('.item-kitten');
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
	filterKittens(kittensMaineCoonCards);
}
//=======================================================
/* KITTENS FILTER Maine-Coon*/
export function filterKittensMC() {
	const kittensMaineCoonSpoiler = document.getElementById('kittens-maine-coon');
	console.log(kittensMaineCoonSpoiler);
	const kittensMaineCoonCards = kittensMaineCoonSpoiler.querySelectorAll('.item-kitten');

	// Получаем все кнопки с классом kittens__button
	const filterButtons = document.querySelectorAll('.kittens__button');

	// Инициализируем переменную для хранения текущего filteredBlock
	let currentFilteredBlock = null;

	filterButtons.forEach(button =>
		// слушаем клик по кнопке
		button.addEventListener('click', e => {
			// получаем значение data-filter для кнопки, по которой был произведен клик
			const filterTarget = e.target.dataset['filter'];

			// Удаляем класс _active у всех кнопок
			filterButtons.forEach(btn => {
				btn.classList.remove('_active');
			});

			// Добавляем класс _active на кнопку, по которой был клик
			e.target.classList.add('_active');

			// Если клик произошел на кнопке "available" и filteredBlock не существует
			if (filterTarget === 'available' && !currentFilteredBlock) {
				// Создаем div-блок для отфильтрованных элементов  перед блоками с элементами
				const filteredBlock = document.createElement('div');
				// присваиваем filteredBlock class="filtered-block"
				filteredBlock.classList.add('filtered-block');

				// проходим по всем карточкам
				kittensMaineCoonCards.forEach(card => {
					// текст в карточке
					const cardText = card.textContent.toLowerCase();

					// создаем массив для отфильтрованных карточек / очищаем отфильтрованные результаты при каждом клике
					const selectedItems = [];

					if (
						(filterTarget === 'available' && cardText.includes('доступ')) ||
						cardText.includes('рассмотрении')
					)
						/* {
						// Клонируем элемент и добавляем в массив
						selectedItems.push(card.cloneNode(true));
						console.log(selectedItems);
					} */

						// Добавляем отфильтрованные элементы в блок
						selectedItems.forEach(selectedItem => {
							filteredBlock.appendChild(selectedItem);
						});
				});

				// Вставляем блок с отфильтрованными элементами перед другими элементами в kittensMaineCoonSpoiler
				kittensMaineCoonSpoiler.insertBefore(filteredBlock, kittensMaineCoonSpoiler.firstChild);

				// Обновляем текущий filteredBlock
				currentFilteredBlock = filteredBlock;
			} else if (filterTarget === 'all') {
				// если клик по кнопке с data-filter="all"
				// Удаляем текущий filteredBlock, если он существует
				if (currentFilteredBlock) {
					currentFilteredBlock.remove();
					currentFilteredBlock = null;
				}
			}
		})
	);
}

//=======================================================
// проходим по всем карточкам
// kittensCards.forEach(card => {
// 	// текст в карточке
// 	const cardText = card.textContent.toLowerCase();

// 	// Здесь определяете критерий, по которому решаете, добавлять ли класс "_available"
// 	const addAvailableClass =
// 		cardText.includes('доступ') ||
// 		cardText.includes('рассмотрении') ||
// 		cardText.includes('available') ||
// 		cardText.includes('consider') ||
// 		cardText.includes('pieejam') ||
// 		cardText.includes('izskat');

// 	if (addAvailableClass) {
// 		card.classList.add('_available');
// 	} else {
// 		card.classList.add('_hidden');
// 	}

// 	// скрываем блок с родителями
// 	parentsBlocks.forEach(parentsBlock => {
// 		parentsBlock.classList.add('_hidden');
// 	});
// });
