# Code Challenge

## Instructions

- Clone the repo
- `npm install`
- `node script.js`
- check the output folder

## Write Up

1. Discuss your solution’s time complexity. What tradeoffs did you make?

I made sure that all loops were of linear Big O Notation. Complexity will increase at scale with the size of the data

2. How would you change your solution to account for future columns that might be requested, such as “Bill Voted On Date” or “Co-Sponsors”?

It would be fairly simply to add co-sponsors with a quick loop through legislators to find the matching IDs and names as an arry of sponsors that are converted to a string. Adding a date is very straightforward and part of the existing of the loop through bills.

3. How would you change your solution if instead of receiving CSVs of data, you were given a list of legislators or bills that you should generate a CSV for?

I would simply take the list and convert it into an array/array of objects.

4. How long did you spend working on the assignment?

1.5 hours on the assignment and 15 minutes on the deploy/write up