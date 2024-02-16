//=======================================================
/* DATE-TIME */
export function setDateTime() {
	// определение местоположения по языку страницы
	let langAttribute = document.documentElement.lang;

	// получаем все spoiler
	const spoilersKittensItems = document.querySelectorAll('.spoilers-kittens__item');
	// console.log(spoilersKittensItems);
	if (spoilersKittensItems.length) {
		spoilersKittensItems.forEach(spoilersKittensItem => {
			// элементы с time в карточках котят item-kitten
			const itemKittensValueTime = spoilersKittensItem.querySelectorAll(
				'.item-kitten__value time'
			);

			// const itemKittensValueTime = spoilersKittensItem.querySelectorAll('.item-kitten__date-time');
			// console.log(itemKittensValueTime);

			// Получение элементов с классом title-spoilers-kittens__date
			const timeTitleSpoilers = spoilersKittensItem.querySelectorAll(
				'.title-spoilers-kittens__date'
			);
			if (timeTitleSpoilers.length) {
				timeTitleSpoilers.forEach(timeTitleSpoiler => {
					// Получение значения атрибута datetime из заголовка spoiler
					const dateTimeAttribute = timeTitleSpoiler.getAttribute('datetime');

					// Создание объекта Date из значения атрибута datetime
					const dateObject = new Date(dateTimeAttribute);

					const day = dateObject.getDate();
					const month = dateObject.getMonth() + 1;
					const year = dateObject.getFullYear();
					// Получение месяца словом
					// const monthWord = dateObject.toLocaleDateString(langAttribute, { month: 'long' });

					// Форматирование даты dd month yyyy
					const titleSpoilersKittensDate = dateObject.toLocaleDateString(langAttribute, {
						year: 'numeric',
						month: 'long',
						day: 'numeric',
					});

					// Получение месяца 0-11
					const monthIndex = dateObject.getMonth();

					// массив месяцев для lv
					const monthNamesLV = [
						'janvārī',
						'februārī',
						'martā',
						'aprīlī',
						'maijā',
						'jūnijā',
						'jūlijā',
						'augustā',
						'septembrī',
						'oktobrī',
						'novembrī',
						'decembrī',
					];

					// Получение месяца словом для lv
					const monthWordLV = monthNamesLV[monthIndex];
					if (langAttribute === 'lv') {
						timeTitleSpoiler.textContent = `${year}.gada ${day}.${monthWordLV}`;
					} else if (langAttribute === 'en-GB' || langAttribute === 'ru') {
						// Установка отформатированной даты в элемент title-spoilers-kittens
						timeTitleSpoiler.textContent = titleSpoilersKittensDate;
					}

					// устанавливаем дату в карточке котенка для соответствующего языка
					itemKittensValueTime.forEach(itemKittenValueTime => {
						// itemKittenValueTime.setAttribute('datetime', dateTimeAttribute);
						itemKittenValueTime.textContent = dateObject.toLocaleDateString(langAttribute);
					});

					const itemsKittenValueLitterTime =
						spoilersKittensItem.querySelectorAll('[data-littertime]');

					// Получаем элемент с классом "title-spoilers-kittens__desc"
					const litter = spoilersKittensItem.querySelector('.title-spoilers-kittens__litter');
					if (litter) {
						// Получаем букву помета
						const litterValue = litter.textContent.toUpperCase();

						/* itemsKittenValueLitterTime.forEach(itemKittenValueLitterTime => {
							itemKittenValueLitterTime.innerHTML = `${litterValue} ${dateObject.toLocaleDateString(
								langAttribute
							)}`;
						}); */
						itemsKittenValueLitterTime.forEach(itemKittenValueLitterTime => {
							itemKittenValueLitterTime.innerHTML = `${litterValue} <time datetime="${dateTimeAttribute}">${dateObject.toLocaleDateString(
								langAttribute
							)}</time>`;
						});
					}
				});
			} else {
				itemKittensValueTime.forEach(itemKittenValueTime => {
					const dateTimeItemKitten = itemKittenValueTime.getAttribute('datetime');
					// Создание объекта Date из значения атрибута datetime
					const dateObjectItemKitten = new Date(dateTimeItemKitten);
					itemKittenValueTime.textContent =
						dateObjectItemKitten.toLocaleDateString(langAttribute);
				});
			}

			// parents
			// элементы с time в карточках родителей
			const itemParentsValueTime =
				spoilersKittensItem.querySelectorAll('time.item-parent__value');
			itemParentsValueTime.forEach(itemParentValueTime => {
				const dateTimeAttributeParent = itemParentValueTime.getAttribute('datetime');

				// Создание объекта Date из значения атрибута datetime
				const dateObjectParent = new Date(dateTimeAttributeParent);
				itemParentValueTime.textContent = dateObjectParent.toLocaleDateString(langAttribute);
			});
		});
	}
}

/* FOOTER DATE */
export function currentYear() {
	// Получаем текущий год
	const currentYear = new Date().getFullYear();
	const footerDate = document.querySelector('.footer__copy span');
	if (footerDate) {
		// Проверяем, является ли текущий год 2024
		if (currentYear === 2024) {
			// Если текущий год 2024, то выводим только 2024
			footerDate.textContent = '2024';
		} else {
			// Если текущий год отличается от 2024, то выводим "2024 - Текущий год"
			footerDate.textContent = '2024 - ' + currentYear;
		}
	}
}

//=======================================================
/*
ru
	1)цифрами: 22.08.2007;
	2)словами и цифрами: 22 августа 2007 года; 22 августа 2007 г.;

en = en-GB British English
	1) 6 September 2019
		6th September 2019
		the 6th of September 2019
	2) 6/9/19 or 6.9.19 or 6-9-19
		06/09/2019 or 06.09.2019 or 06-09-2019
		9Sept2019 or 6-Sept-19
en = en-US American English - по умолчанию для en
	1) September 6, 2019
	2) 04/13/19 or 04.13.19 or 04-13-19
		04/13/2019 or 04.13.2019 or 04-13-2019
		Apr. 13, 2019

lv
	1) tekstuāli – 2013.gada 21.augustā; laika periods fiksēts dilstošā secībā (gada, diena.mēnesī);
	2) skaitliski – 21.08.2013.; laika periods fiksēts augošā secībā (diena. mēnesis. gads.).
*/

/* if (langAttribute === 'en') {
	// изменяем на British English
	langAttribute = 'en-GB';
} */
