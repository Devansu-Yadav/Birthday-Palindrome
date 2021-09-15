const dateOfBirth = document.querySelector("#date-of-birth");
const checkButton = document.querySelector("#check-btn");
const output = document.querySelector(".output");

function checkForBirthdayAndLuckyNumber() {
    const dob = dateOfBirth.value;
    showOutput();
    if(dob === "") {
        output.innerText = "You did not enter your Birthdate!!";
    } else {
        var isPalindrome = birthDateCombination(dob);

        var date = dob.split('-');
        var yyyy = date[0];
        var mm = date[1];
        var dd = date[2];

        var date = {
            day: Number(dd),
            month: Number(mm),
            year: Number(yyyy)
        };

        console.log(isPalindrome);

        if(!isPalindrome) {
            const [ctr1, nextDate] = getNextPalindromeDate(date);
            const [ctr2, prevDate] = getPreviousPalindromeDate(date);

            if (ctr1 > ctr2) {
                output.innerHTML = `<h1>The nearest palindrome date is <span>${prevDate.day}-${prevDate.month}-${prevDate.year}</span>, you missed by <span>${ctr2}</span> days.</h1>`;
            } else {
                output.innerHTML = `<h1>The nearest palindrome date is <span>${nextDate.day}-${nextDate.month}-${nextDate.year}</span>, you missed by <span>${ctr1}</span> days.</h1>`;
            }
        }

    }
}

function getDateAsString(date) {
    var dateInStr = { day: '', month: '', year: '' };
  
    if (date.day < 10) {
      dateInStr.day = '0' + date.day;
    }
    else {
      dateInStr.day = date.day.toString();
    }
  
    if (date.month < 10) {
      dateInStr.month = '0' + date.month;
    }
    else {
      dateInStr.month = date.month.toString();
    }
  
    dateInStr.year = date.year.toString();
    return dateInStr;
}

function isLeapYear(year) {

    if (year % 400 === 0)
      return true;
  
    if (year % 100 === 0)
      return false;
  
    if (year % 4 === 0)
      return true;
  
    return false;
}


function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;
  
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
    if (month === 2) {
      if (isLeapYear(year)) {
        if (day > 29) {
          day = 1;
          month = 3;
        }
      }
      else {
        if (day > 28) {
          day = 1;
          month = 3;
        }
      }
    }
    else {
      if (day > daysInMonth[month - 1]) {
        day = 1;
        month++;
      }
    }
  
    if (month > 12) {
      month = 1;
      year++;
    }
  
    return {
      day: day,
      month: month,
      year: year
    }
}

function getNextPalindromeDate(date) {
    var nextDate = getNextDate(date);
    var ctr = 0;
  
    while (1) {
      ctr++;
      var dateStr = getDateAsString(nextDate);
      var resultList = checkPalindromeForAllDateFormats(dateStr);
  
      for (let i = 0; i < resultList.length; i++) {
        if (resultList[i]) {
          return [ctr, nextDate];
        }
      }
      nextDate = getNextDate(nextDate);
    }
}

function getDateInAllFormats(date) {
    var ddmmyyyy = date.day + date.month + date.year;
    var mmddyyyy = date.month + date.day + date.year;
    var yyyymmdd = date.year + date.month + date.day;
    var ddmmyy = date.day + date.month + date.year.slice(-2);
    var mmddyy = date.month + date.day + date.year.slice(-2);
    var yyddmm = date.year.slice(-2) + date.day + date.month;
  
    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];
}

function checkPalindromeForAllDateFormats(date) {
    var dateFormatList = getDateInAllFormats(date);
    var palindromeList = [];
  
    for (var i = 0; i < dateFormatList.length; i++) {
      var result = checkBirthDatePalindrome(dateFormatList[i]);
      palindromeList.push(result);
    }
    return palindromeList;
}

function getPreviousDate(date) {
    var day = date.day - 1;
    var month = date.month;
    var year = date.year;
  
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
    if (day === 0) {
      month--;
  
      if (month === 0) {
        month = 12;
        day = 31;
        year--;
      }
      else if (month === 2) {
        if (isLeapYear(year)) {
          day = 29;
        }
        else {
          day = 28;
        }
      }
      else {
        day = daysInMonth[month - 1];
      }
    }
  
    return {
      day: day,
      month: month,
      year: year
    }
}

function getPreviousPalindromeDate(date) {
    var previousDate = getPreviousDate(date);
    var ctr = 0;
  
    while (1) {
      ctr++;
      var dateStr = getDateAsString(previousDate);
      var resultList = checkPalindromeForAllDateFormats(dateStr);
  
      for (let i = 0; i < resultList.length; i++) {
        if (resultList[i]) {
          return [ctr, previousDate];
        }
      }
      previousDate = getPreviousDate(previousDate);
    }
}

function showOutput() {
    output.style.display = "block";
}

function birthDateCombination(dob) {
    // split string
    const splittedString = dob.split("-").reverse();

    //ddmmyyyy
    const ddmmyyyy = splittedString[0] + splittedString[1] + splittedString[2];

    //yy-dd-mm
    const originalDateStr = splittedString.reverse();
    const yyddmm = originalDateStr[0].substring(2) + originalDateStr[2] + originalDateStr[1];

    //dd-mm-yy
    const ddmmyy = splittedString[0] + splittedString[1] + splittedString[2].substring(2);

    // mm-dd-yy
    [splittedString[0], splittedString[1]] = [splittedString[1], splittedString[0]];
    const mmddyy = splittedString[0] + splittedString[1] + splittedString[2].substring(2);

    //mm-dd-yyyy
    const mmddyyyy = splittedString[0] + splittedString[1] + splittedString[2];

    // m-dd-yyyy
    const mddyyyy = splittedString[0].substring(1) + splittedString[1] + splittedString[2];

    if(checkBirthDatePalindrome(dob) || checkBirthDatePalindrome(ddmmyyyy) || checkBirthDatePalindrome(mmddyy) || checkBirthDatePalindrome(mddyyyy) || checkBirthDatePalindrome(ddmmyy) || checkBirthDatePalindrome(mmddyyyy) || checkBirthDatePalindrome(yyddmm)) {
        output.innerHTML = "<h1>Woww, Your Birthdate is a palindrome!🥳</h1>";
        return true;
    } else {
        // output.innerHTML = "<h1>Your Birthdate is not a palindrome!</h1>";
        return false;
    }
}

function checkBirthDatePalindrome(dob) {
    dob = dob.replaceAll("-", "");
    const reversedString = dob.split("").reverse().join("");

    if(reversedString === dob) {
        return true;
    } else {
        return false;
    }
}

checkButton.addEventListener("click", checkForBirthdayAndLuckyNumber);