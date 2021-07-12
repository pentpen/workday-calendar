function countWorkday() {

}

function makeCalendar(year, month) {
    let first_date = new Date(year, month, 1);
    //let dow = calcDow(first_date);
    let dow = first_date.getDay();
    let table = new Array(6);
    for (let i = 0; i < table.length; i++) {
        table[i] = new Array(7).fill('');
    }

    resetCalendarElements();

    let maxdate = 31;
    if (month == 3 || month == 5 || month == 8 || month == 10) {
        maxdate = 30;
    } else if (month == 1) {
        if (year % 4 == 0 && !(year % 100 == 0)) {
            maxdate = 29;
        } else {
            maxdate = 28;
        }
    }

    for (let c = 1; c <= maxdate; c++) {
        let index = (dow + c - 1) % 7;
        let r = Math.floor((dow + c - 1) / 7);
        table[r][index] = c;
    }

    if ((table[table.length - 1].filter(v => v)).length == 0) {
        table = table.splice(0, table.length - 1);
    }
    console.log(table);

    setCalendarElements(table);
    let calendar_title = document.getElementById('calendar_title');
    calendar_title.innerHTML = `${year}年${month + 1}月`;
}

function setCalendarElements(table) {
    let count = 0;
    table.forEach(row => {
        let element = '';
        let html_element = document.getElementById('row' + count);
        let dow = 0;
        row.forEach(td => {
            let html_class = 'calendar_date';
            if (td != '') {
                if (dow == 0) {
                    html_class += ' sunday';
                }
                if (dow == 6) {
                    html_class += ' saturday';
                }
                element = element + `<td><button class="${html_class}">` + td + '</button></td>';
            } else {
                element = element + '<td></td>';
            }
            dow++;
        });
        html_element.innerHTML = element;
        count++;
    })
}

function resetCalendarElements() {
    let calendar_length = 6;
    for (let count = 0; count < calendar_length; count++) {
        let html_element = document.getElementById('row' + count);
        html_element.innerHTML = '';
    }
}

function calcDow(date) {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear().toString();

    if (month == 1 || month == 2) {
        month += 12;
        year = (parseInt(year) - 1).toString();
    }
    let Y = parseInt(year.substring(year.length - 2, year.length));
    let C = parseInt(year.substring(0, 2));
    let dow;

    dow = (5 * C + Y + Math.floor(Y / 4) + Math.floor(C / 4) + Math.floor((26 * (month + 1)) / 10) + day) % 7;
    dow = (dow == 0) ? 7 : dow;
    return dow - 1;
}