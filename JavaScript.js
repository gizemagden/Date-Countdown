var second = 1000;
var minute = second * 60;
var hour = minute * 60;
var day = hour * 24;
var timer;
var jfYear, jfMonth, jfDay, jfHour, jfMinute;
var bigDate = new Date();

JFCustomWidget.subscribe("ready", function () {
    jfYear = JFCustomWidget.getWidgetSetting('yil');
    jfMonth = JFCustomWidget.getWidgetSetting('ay');
    jfDay = JFCustomWidget.getWidgetSetting('gun');
    jfHour = JFCustomWidget.getWidgetSetting('saat');
    jfMinute = JFCustomWidget.getWidgetSetting('dakika');

    getBigDate();
});

function getBigDate() {
    bigDate = new Date();
    if ((jfYear == null) || (jfMonth == null) || (jfDay == null) || (jfHour == null) || (jfMinute == null)) {
        document.getElementById('summary').innerHTML = 'Please fill in all empty fields!';
    }
    else
    {
        if ((jfYear < bigDate.getFullYear()) || (jfYear == bigDate.getFullYear() && (jfMonth - 1) < bigDate.getMonth()) || (jfYear == bigDate.getFullYear() && (jfMonth - 1) == bigDate.getMonth() && jfDay < bigDate.getDate()) || (jfYear == bigDate.getFullYear() && (jfMonth - 1) == bigDate.getMonth() && jfDay == bigDate.getDate() && (jfHour) < bigDate.getHours()) || (jfYear == bigDate.getFullYear() && (jfMonth - 1) == bigDate.getMonth() && jfDay == bigDate.getDate() && (jfHour) == bigDate.getHours() && (jfMinute - 1) < bigDate.getMinutes())) {
            document.getElementById('summary').innerHTML = 'You entered a past date! Try again!';
        }
        else
        {
            if ((jfMonth > 12) || (jfDay > 31) || (jfHour > 23) || (jfMinute > 59)) {
                document.getElementById('summary').innerHTML = 'You should enter a valid date!';
            }
            else
            {
                bigDate.setYear(jfYear);
                bigDate.setMonth(jfMonth - 1); //months 0-11 
                bigDate.setDate(jfDay);
                bigDate.setHours(jfHour);
                bigDate.setMinutes(jfMinute - 1);
                bigDate.setSeconds(59); //second 0-59 
                timerFunction();
            }
           }
       }
}

function timerFunction() {
        setInterval(function showLeftTime() {
        var now = new Date();
        var leftTime = bigDate - now;
        if (leftTime < 0) {
            clearInterval(timer);
            document.getElementById('summary').innerHTML = 'Time is up!';
            return;
        }
        else {
            var leftDay = Math.floor(leftTime / day);
            var leftHour = Math.floor((leftTime % day) / hour);
            var leftMinute = Math.floor((leftTime % hour) / minute);
            var leftSecond = Math.floor((leftTime % minute) / second);

            document.getElementById('1').innerHTML = leftDay;
            document.getElementById('2').innerHTML = leftHour;
            document.getElementById('3').innerHTML = leftMinute;
            document.getElementById('4').innerHTML = leftSecond;
            document.getElementById('summary').innerHTML = leftDay + ' days ';
            document.getElementById('summary').innerHTML += leftHour + ' hours ';
            document.getElementById('summary').innerHTML += leftMinute + ' minutes ';
            document.getElementById('summary').innerHTML += leftSecond + ' seconds ';
            document.getElementById('summary').innerHTML += ' left!';
        }
    }, 1000);
}

function EnterOnlyNumber() {
    if ((event.keyCode < 48) || (event.keyCode > 57)) //if not return false
        return false;
}