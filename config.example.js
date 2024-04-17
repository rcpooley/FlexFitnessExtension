const config = {
    // 152 is the program ID for Fitness Center MPK19
    programID: 152,
    // Return true if the class should show up in the filtered view, false otherwise
    shouldSignUpForClass: (info) => {
        // only zumba classes
        if (!info.className.toLowerCase().includes('zumba')) {
            return false;
        }
        const startDate = new Date(info.startDateTime);
        // monday at 5pm
        if (startDate.getDay() === 1 && startDate.getHours() === 17) {
            return true;
        }
        // tuesday at 5pm
        if (startDate.getDay() === 2 && startDate.getHours() === 17) {
            return true;
        }
        return false;
    },
    // Logic for rendering a javascript date object into a string
    renderDate: (date) => {
        const MONTHS = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];
        const DAYS = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
        ];
        const pad = (n) => n.toString().padStart(2, '0');
        return `${DAYS[date.getDay()]}, ${
            MONTHS[date.getMonth()]
        } ${date.getDate()} @ ${pad(date.getHours())}:${pad(
            date.getMinutes()
        )}`;
    },
    // Self explanatory
    showAllClassesByDefault: false,
};
