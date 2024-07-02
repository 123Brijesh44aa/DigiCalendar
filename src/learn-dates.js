console.log(new Date());

console.log("this will return Today's Date",new Date().getDate());

console.log(new Date(2024,0,0));// why it is returning the last day of previous month?

// 2024: This is the year.
// 0: This is the month. In JavaScript, months are zero-indexed, so 0 represents January.
// 0: This is the day.
//     However, the interesting part is that the day is set to 0. In JavaScript, when you provide a day value of 0 in the Date constructor, it actually refers to the last day of the previous month.

console.log(new Date(2024,0,0).getDate()); // why it will return 31?
// 2024 is the year, 0 is the month, 0 is the day.

const getDaysInMonth = (year,month) => {
    const lastDay = new Date(year, month+1, 0).getDate();
    return Array.from({length: lastDay}, (_,index) => {
        return index+1;
    })
}

// console.log(getDaysInMonth(2024,0)); // last Date of January Month 31
// console.log(getDaysInMonth(2024,1)); // last Date of February Month 28
// console.log(getDaysInMonth(2024,12));


// console.log("...........",new Date(2024,3,2).getDate());
// console.log("...........",new Date(2024,13,2).getMonth());
// console.log("...........",new Date(2024,3,2).getFullYear());
//
//
// console.log("------------>>>", new Date(2024,3,2).toISOString().slice(0,10)) // slice(0,10) is used to get the date in the format of YYYY-MM-DD

let date = new Date().toLocaleString().slice(0,10);
let date2 = new Date(2024,4,3).toLocaleString().slice(0,10);

console.log(date,"................",date2);