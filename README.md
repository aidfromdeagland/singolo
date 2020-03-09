# singolo


### Превью:
gh pages: https://aidfromdeagland.github.io/singolo/

---

### Задание:
#### Общее:

1. Проверяем соотвествие наложенного изображения на страницу. Если замечаем, что визульные отличия элементов составляют более двух пикселей (2px), то ставим **-3** за каждый логический блок, в котором присутствует ошибка. Блоки перечислены ниже, такие как Header, Our Services, и т.д. При этом, если нарушение UI происходит в одном блоке, и съезжают со своего места все остальные, то при переходе проверки на следющий блок, мы его выравниваем с наложенным изображением.  

2. Не жирный текст в местах, где находится несколько строк, должен быть растянут равномерно на ширину блока. Т.е. должно присутствовать свойство `text-align: justify`, или аналог. Если текст не выровнен, ставим **-3**. Такие места встречаются в Our services, About Us, Get a quote.  

❗ Исключение в первых двух пунктах составляет сам текст, а именно ширина слов и отступ между буквами. Их не учитываем при сопоставлении. 

3. Внизу почти всех блоков есть небольшая линия другого цвета. Если ее нет хоть в одном месте, где по дизайну она должна быть, ставим **-3**. Сама линия может быть сделана как сплошным цветом, так и тенью.

#### 1. Блок **Header** (`<header>` содержит только логотип и панель навигации):  

- Панель навигации должна быть интерактивной. Если при наведении на элементы меню ничего не происходит, ставим **-3**.  

- Логотип может быть сделан либо 2 разными текстовыми элементами, либо с применением псевдоэлемента ::after, либо сделан картинкой. Если текст лежит просто в `<div>`, ставим **-3**.  

- На странице обязательно должен присутствовать один элемент `<h1>`. Если он отсутствует в разметке, либо на нем есть свойство `display: none`, ставим **-3**.  

#### 2. Блок **Slider**  

- Стрелки должны быть интерактивными. При нажатии ничего происходить не должно (слайды могу не листаться). Если при наведении на стрелки, ничего не происходит, ставим **-3**.  

- Картинки в слайдере должны быть реализованы одним из трех способов:
  1. Изображения накладываются в несколько слоев, используя `z-index`. Элементы должны быть в `position: absolute`. Изображения телефонов так же могут быть сделаны средствами CSS.
  2. Созданы полные изображения вертикального и горизонтального телефонов с помощью графического редактора (фотошоп или аналог), объединив все слои.
  3. Объединены оба предыдущих варианта и созданы изображения трёх отдельных элементов: тень, контейнер телефона, внутреннее изображение на экране. В таком случае одно и то же изображение телефона и тени можно использовать для обеих картинок, просто повернув их на 90 градусов и 180 градусов. Тень можно сделать с помощью CSS.  
  
Если изображения, или части изображений, находятся не на своем месте, ставим **-3**.  
Если неверно указан порядок `z-index`, ставим **-3**.   

#### 3. Блок **Our Services**  

- Трёхколоночный макет снизу. Может быть использован либо flex, либо grid. Если это сделано с помощью `<table>`, ставим - **-3**.  

- Добавляем избыточный текст в текстовую ячейку (не заголовок), и если текст, выходящий за размеры не скрыт, ставим **-3**.  

#### 4. Блок **Portfolio**  

- Интерактивные кнопки навигации. Если при наведении на закладки (типа All, Artwork), ничего не происходит, ставим **-3**.  

- Четырех колоночный макет с изображениями должен иметь строгие отступы между элементами. Сами картинки, при этом, могут быть немного смещены. Важно, чтобы сетка полностью соотвествовала наложенному изображнию. Если сетка имеет неверные размеры или отступы, ставим **-3**.  

- Если при создании сетки был использован `<table>`, ставим - **-3**.  

- Добвляем в сетку больше элементов с изображениями (чтобы получить, например, 15) - то следующие за 12-м не должны показываться (т.е. 13, 14, 15 не видны). В противном случае, ставим **-3**.  

#### 5. Блок **About Us**  

- В поле, где находится имя, задаем очень большой текст (например, 'rajeshramayankoothrappali anastrophysicistinthephysicsdepartmentatcaltech'), чтобы он выходил за пределы блока, и не было переноса на следующую строку. Желательно, чтобы текст заканчивался тремя точками. Если текст выходит за размеры или переносится на другую строку, ставим **-3**.  

- Трёхколоночный макет снизу. Может быть использован либо flex, либо grid. Если это сделано с помощью `<table>`, ставим - **-3**.

- Социальные иконки должны быть интерактивными. Если при наведении на элементы меню ничего не происходит, ставим **-3**.  

#### 6. Блок **Get a Quote**  

- Должен присутствовать элемент `<form>`. Если нету, ставим **-3**.  

- На странице должна быть кнопка 'Submit'. Это либо `<input>`, либо `<button>`. Если кнопка отсутствует, ставим **-3**. Если кнопка не внутри формы, ставим **-3**.  

- 2 поля, помеченые как (Required), должны содержать атрибут required и быть правльного типа. Проверяем, заполняя поля неподходящими значениями, и нажимая кнопку 'Submit'. Если форма выполняет действие и не выдает замечаний, ставим **-3**.  

- На всех полях должен быть placeholder. Если его нет хоть на одном из полей, ставим **-3**.  

- Указатель на номер телефона - должен быть ссылкой типа tel. Если нет, ставим **-3**.  

- Указатель на email - должен быть ссылкой типа mail. Если нет, ставим **-3**.  

#### 7. **Footer** (`<footer>` - это серая панель снизу):

- Символ "копирайт" (©) должен быть текстовым. Надпись идущая за ним, роли не играет. Если мы не сможем выделением текста зацепить ©, ставим **-3**.  

- Иконки должны быть интерактивными. Если при наведении на элементы меню ничего не происходит, ставим **-3**.  





