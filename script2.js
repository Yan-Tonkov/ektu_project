$(document).ready(function() {


    // 1. Обращаемся к селекторам идентификаторов и меняем содержимое тегов
    
    // Изменение текста в секции "О курсе"
    $('#changeAboutTextBtn').click(function() {
        $('#about').text('Наши курсы помогут вам стать настоящими экспертами в области IT, изучая самые востребованные технологии с нуля!');
    });

     // Инициализация диалогового окна
     $("#dialog").dialog({
        autoOpen: false
      });

    // Скрытие/показ текста в секции "О курсе"
    $('#toggleAboutTextBtn').click(function() {
        $('#about').toggle();  // Этот метод скрывает или показывает элемент
    });
    
    // Добавление новой темы в список программы
    $('#addNewTopicBtn').click(function() {
        $('#programList').append('<li>Разработка искусственного интеллекта</li>');  // Добавляем новый элемент в список
    });

    // Скрытие/показ отзывов
    $('#toggleReviewsBtn').click(function() {
        $('#reviews').toggleClass('hidden');  // Меняем класс для скрытия/показа секции с отзывами
    });

    // Изменение стилей для преимуществ
    $('#advantages').hover(function() {
        $(this).css({
            'background-color': '#f39c12',
            'color': 'white'
        });
    }, function() {
        $(this).css({
            'background-color': '#ecf0f1',
            'color': '#333'
        });
    });
   
});

//используем плагин библиотеки 
(function($) {
    $.fn.changeBackground = function(color) {
        this.css('background-color', color);
        return this;
    };
})(jQuery);

$(document).ready(function() {
    $('#change-btn').click(function() {
        $('div').changeBackground('lightblue');
    });
});


//используем плагин библиотеки 
(function($) {
    $.fn.moveElement = function(x, y, speed) {
        this.animate({
            left: x,
            top: y
        }, speed);
        return this;
    };
})(jQuery);

$(document).ready(function() {
    // Применяем плагин
    $('#move-btn').click(function() {
        $('#box').moveElement(300, 200, 1000);
    });
});




// Добавление нового элемента через DOM и изменение через jQuery

 function new_elem() {
    const container = document.getElementById("new__elem");

    const newParagraph = document.createElement("p");
    newParagraph.textContent = "Новый элемент";

    container.appendChild(newParagraph);

    // Используем jQuery для изменения текста
    $(newParagraph).text("Текст был изменен с помощью jQuery");

    console.log(newParagraph);
  }

  // Применение фреймворка vue.js

  // Интеграция Vue.js
  const app = Vue.createApp({
    data() {
        return {
            // Начальный текст для "О курсе"
            aboutText: "О наших IT курсах",
            // Начальный текст для нового элемента
            newElemText: "существующий элемент",
            showModal: false, // Управляем состоянием видимости модального окна
            userInput: ''    // Начальное значение для поля ввода

        };
    },
    methods: {
        // Функция для изменения текста в секции "О курсе"
        changeAboutText() {
            this.aboutText = "Курс включает обучение по современным технологиям!";
            console.log("Текст изменен на:", this.aboutText);
        },

        // Функция для скрытия и показа текста в секции "О курсе"
        toggleAboutText() {
            if (this.aboutText) {
                this.aboutText = "";
            } else {
                this.aboutText = "О наших IT курсах";
            }
        },

        // Математическая операция
        mathOperations() {
            let result = 5 + 10; // Пример простого математического действия
            console.log("Результат математической операции:", result);
            alert("Результат математической операции: " + result);
        },

        // Функция для добавления новой темы в список программы
        addNewTopic() {
            let newTopic = "Кибербезопасность"; // Новая тема
            let list = document.getElementById('programList');
            let li = document.createElement('li');
            li.textContent = newTopic;
            list.appendChild(li);
        },

        // Функция для создания нового элемента
        createNewElement() {
            this.newElemText = "Новый элемент добавлен";
            console.log("Новый элемент создан: " + this.newElemText);
        },
        changeText() {
            this.userInput = 'Текст изменен с помощью кнопки!';
        },
    }
});

// Монтируем приложение Vue на элемент с id "app"
app.mount('#app');



// Функция загрузки и отображения курсов
async function loadCourses() {
    const response = await fetch('main.xml'); 
    const xmlDoc = await response.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlDoc, 'application/xml');
    displayCourses(xml);
}

// Функция для отображения курсов
function displayCourses(xmlDoc) {
    const courses = xmlDoc.getElementsByTagName('course');
    const categoryFilter = document.getElementById('categoryFilter').value;
    const tableBody = document.getElementById('courseTable').getElementsByTagName('tbody')[0];
    const courseList = document.getElementById('courseList');
    
    tableBody.innerHTML = '';
    courseList.innerHTML = '';

    Array.from(courses).forEach(course => {
        const category = course.parentElement.getAttribute('name');

        // Добавление данных в таблицу
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = course.getElementsByTagName('id')[0].textContent;
        row.insertCell(1).textContent = course.getElementsByTagName('name')[0].textContent;
        row.insertCell(2).textContent = category;
        row.insertCell(3).textContent = course.getElementsByTagName('duration')[0].textContent;
        row.insertCell(4).textContent = '$' + course.getElementsByTagName('price')[0].textContent;
        row.insertCell(5).textContent = course.getElementsByTagName('level')[0].textContent;

        // Добавление данных в список
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>${course.getElementsByTagName('name')[0].textContent}</strong> - ${course.getElementsByTagName('description')[0].textContent}`;
        courseList.appendChild(listItem);
    });
}

// Функция фильтрации таблицы
function filterTableByCategory() {
    const categoryFilter = document.getElementById('categoryFilter').value;
    const tableBody = document.getElementById('courseTable').getElementsByTagName('tbody')[0];
    const rows = tableBody.getElementsByTagName('tr');
    
    Array.from(rows).forEach(row => {
        const category = row.cells[2].textContent; // Категория находится в 3-й ячейке
        if (categoryFilter === 'all' || categoryFilter === category) {
            row.style.display = ''; // Показываем строку
        } else {
            row.style.display = 'none'; // Скрываем строку
        }
    });
}

// Функция для сортировки списка
function sortList() {
    const courseList = document.getElementById('courseList');
    const listItems = Array.from(courseList.getElementsByTagName('li'));
    
    const sortedItems = listItems.sort((a, b) => {
        const nameA = a.getElementsByTagName('strong')[0].textContent.trim();
        const nameB = b.getElementsByTagName('strong')[0].textContent.trim();
        return nameA.localeCompare(nameB);
    });
    
    // Очистка списка и добавление отсортированных элементов
    courseList.innerHTML = '';
    sortedItems.forEach(item => courseList.appendChild(item));
}

document.getElementById('filterTableButton').addEventListener('click', filterTableByCategory);

document.getElementById('sortListButton').addEventListener('click', sortList);

loadCourses();







