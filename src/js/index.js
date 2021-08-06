const dateOfBirth = document.querySelector("#date-of-birth");
const checkButton = document.querySelector("#check-btn");
const output = document.querySelector(".output");

function checkForBirthdayAndLuckyNumber() {
    const dob = dateOfBirth.value;

    if(dob === "") {
        output.innerText = "You did not enter your Birthdate!!";
    } else {
        birthDateCombination(dob);
    }
}

function birthDateCombination(dob) {
    // split string
    const splittedString = dob.split("-").reverse();

    // mm-dd-yy
    [splittedString[0], splittedString[1]] = [splittedString[1], splittedString[0]];
    const mmddyy = splittedString[0] + splittedString[1] + splittedString[2].substring(2);

    // m-dd-yyyy
    const mddyyyy = splittedString[0].substring(1) + splittedString[1] + splittedString[2];

    if(checkBirthDatePalindrome(dob) || checkBirthDatePalindrome(mmddyy) || checkBirthDatePalindrome(mddyyyy)) {
        output.innerText = "Woww, Your Birthdate is a palindrome!🥳";
    } else {
        output.innerText = "Your Birthdate is not a palindrome!";
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