export class Calendar {
    firstWeekDay: number;

    constructor(firstWeekDay = 0) {
        this.firstWeekDay = firstWeekDay; // 0 = Sunday
    }

    weekStartDate(date: any) {
        const startDate = new Date(date.getTime());
        while (startDate.getDay() !== this.firstWeekDay) {
            startDate.setDate(startDate.getDate() - 1);
        }
        return startDate;
    }

    monthDates(year: any, month: any, dayFormatter: any = null, weekFormatter: any = null) {
        if ((typeof year !== 'number') || (year < 1970)) {
            throw Error('year must be a number >= 1970');
        }
        if ((typeof month !== 'number') || (month < 0) || (month > 11)) {
            throw Error('month must be a number (Jan is 0)');
        }
        const weeks: Array<any> = [];
        let week: Array<any> = [],
            i = 0,
            date = this.weekStartDate(new Date(year, month, 1));
        do {
            for (i = 0; i < 7; i++) {
                week.push(dayFormatter ? dayFormatter(date) : date);
                date = new Date(date.getTime());
                date.setDate(date.getDate() + 1);
            }
            weeks.push(weekFormatter ? weekFormatter(week) : week);
            week = [];
        } while ((date.getMonth() <= month) && (date.getFullYear() === year));
        return weeks;
    }

    monthDays(year: any, month: any) {
        const getDayOrZero = (date: any) => {
            return date.getMonth() === month ? date : 0;
        };
        return this.monthDates(year, month, getDayOrZero);
    }

    monthText(year: any, month: any) {
        if (typeof year === 'undefined') {
            const now = new Date();
            year = now.getFullYear();
            month = now.getMonth();
        }
        const getDayOrBlank = (date: any) => {
            let s = date.getMonth() === month ? date.getDate().toString() : '  ';
            while (s.length < 2) { s = ' ' + s; }
            return s;
        };
        const weeks = this.monthDates(year, month, getDayOrBlank,
            function (week: any) { return week.join(' '); });
        return weeks.join('\n');
    }
}

const months = 'JAN FEB MAR APR MAY JUN JUL AUG SEP OCT NOV DEC'.split(' ');
for (let i = 0; i < months.length; i++) {
    Calendar[months[i]] = i;
}
