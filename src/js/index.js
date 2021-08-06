const dateOfBirth = document.querySelector("#date-of-birth");
const checkButton = document.querySelector("#check-btn");
const output = document.querySelector(".output");

function checkForBirthdayAndLuckyNumber() {
    const dob = dateOfBirth.value;
    if(dob === "") {
        output.innerText = "You did not enter your Birthdate!!";
    } else {
        checkBirthDatePalindrome(dob);
    }
}

function checkBirthDatePalindrome(dob) {
    dob = dob.replaceAll("-", "");
    const reversedString = dob.split("").reverse().join("");

    if(reversedString === dob) {
        output.innerText = "Your Birthday is a palindrome!";
    } else {
        output.innerText = "Your Birthday is not a palindrome!";
    }
}

checkButton.addEventListener("click", checkForBirthdayAndLuckyNumber);