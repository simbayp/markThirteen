const btnCheck = document.querySelector(".btn-check");
const dob = document.querySelector("#dob");
const output = document.querySelector(".output");

function revString(str) {
  return str.split("").reverse().join("");
}

function checkPalindrome(str) {
  return str === revString(str);
}

function dateToString(date) {
  let dateString = { day: "", month: "", year: "" };

  if (date.day < 10) {
    dateString.day = "0" + date.day;
  } else {
    dateString.day = date.day.toString();
  }

  if (date.month < 10) {
    dateString.month = "0" + date.month;
  } else {
    dateString.month = date.month.toString();
  }

  dateString.year = date.year.toString();

  return dateString;
}

function allDateFormats(date) {
  let dateString = dateToString(date);

  let ddmmyyyy = dateString.day + dateString.month + dateString.year;
  let mmddyyyy = dateString.month + dateString.day + dateString.year;
  let yyyymmdd = dateString.year + dateString.month + dateString.day;
  let ddmmyy = dateString.day + dateString.month + dateString.year.slice(-2);
  let mmddyy = dateString.month + dateString.day + dateString.year.slice(-2);
  let yymmdd = dateString.year.slice(-2) + dateString.month + dateString.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeAllFormats(date) {
  let listOfDates = allDateFormats(date);
  let isPalindrome = false;

  for (let i = 0; i < listOfDates.length; i++) {
    if (checkPalindrome(listOfDates[i])) {
      isPalindrome = true;
      break;
    }
  }
  return isPalindrome;
}

function checkLeapYear(year) {
  if (year % 400 === 0) {
    return true;
  }
  if (year % 100 === 0) {
    return false;
  }
  if (year % 4 === 0) {
    return true;
  }
  return false;
}

function nextDate(date) {
  let day = date.day + 1;
  let month = date.month;
  let year = date.year;

  let monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    if (checkLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month = month + 1;
      }
    } else {
      if (day > 28) {
        day = 1;
        month = month + 1;
      }
    }
  } else {
    if (day > monthDays[month - 1]) {
      day = 1;
      month = month + 1;
    }
  }
  if (month > 12) {
    month = 1;
    year = year + 1;
  }

  return {
    day: day,
    month: month,
    year: year,
  };
}

function prevDate(date) {
  let day = date.day - 1;
  let month = date.month;
  let year = date.year;

  let monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 3) {
    if (checkLeapYear(year)) {
      if (day < 1) {
        day = 29;
        month = month - 1;
      }
    } else {
      if (day < 1) {
        day = 28;
        month = month - 1;
      }
    }
  } else {
    if (day < 1) {
      month = month - 1;
      day = monthDays[month - 1];
    }
  }
  if (month < 1) {
    day = 31;
    month = 12;
    year = year - 1;
  }

  return {
    day: day,
    month: month,
    year: year,
  };
}

function nextPalindromeDate(date) {
  let counter = 0;
  let nxtDate = nextDate(date);

  while (1) {
    counter++;
    if (checkPalindromeAllFormats(nxtDate)) {
      break;
    }
    nxtDate = nextDate(nxtDate);
  }

  return [counter, nxtDate];
}

function prevPalindromeDate(date) {
  let counter = 0;
  let prvDate = prevDate(date);

  while (1) {
    counter++;
    if (checkPalindromeAllFormats(prvDate)) {
      break;
    }
    prvDate = prevDate(prvDate);
  }

  return [counter, prvDate];
}

function handleClick() {
  let bdayString = dob.value;

  if (bdayString !== "") {
    let list = bdayString.split("-");

    let date = {
      day: +list[2],
      month: +list[1],
      year: +list[0],
    };

    let isPalindrome = checkPalindromeAllFormats(date);
    if (isPalindrome) {
      output.innerText = "🥳 Yay! Your birthday is a palindrome! 🥳";
    } else {
      let [prvCounter, prvDate] = prevPalindromeDate(date);
      let [nxtCounter, nxtDate] = nextPalindromeDate(date);
      if (prvCounter < nxtCounter) {
        output.innerText = `😵 Your birthday is NOT a palindrome, but the next palindrome date was ${prvCounter} days before 👍🏻 on ${prvDate.day}-${prvDate.month}-${prvDate.year} 😀`;
      } else if (prvCounter > nxtCounter) {
        output.innerText = `😵 Your birthday is NOT a palindrome, but the next palindrome date is ${nxtCounter} days later 👍🏻 on ${nxtDate.day}-${nxtDate.month}-${nxtDate.year} 😀`;
      } else {
        output.innerText = `😵 Your birthday is NOT a palindrome, but your birthday is still very interesting. It is perfectly sandwitched between two palindrome dates which are ${prvCounter} days before and later 👍🏻 on ${prvDate.day}-${prvDate.month}-${prvDate.year} and ${nxtDate.day}-${nxtDate.month}-${nxtDate.year}`;
      }
    }
  }
}

btnCheck.addEventListener("click", handleClick);
