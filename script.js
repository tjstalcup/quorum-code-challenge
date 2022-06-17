import csv from "csvtojson";
import { createObjectCsvWriter } from "csv-writer";

let keys = ["bills", "legislators", "vote_results", "votes"];

let data = {};

for (const key of keys) {
  data[key] = await csv().fromFile(`./csvs/${key}.csv`);
}

const csvWriter = createObjectCsvWriter({
  path: "./output/legislators-support-oppose-count.csv",
  header: [
    { id: "id", title: "id" },
    { id: "name", title: "name" },
    { id: "num_supported_bills", title: "num_supported_bills" },
    { id: "num_opposed_bills", title: "num_opposed_bills" },
  ],
});

const records = data.legislators.map((leg) => {
  return {
    ...leg,
    num_supported_bills: data.vote_results.filter(
      (v) => v.legislator_id === leg.id && v.vote_type === "1"
    ).length,
    num_opposed_bills: data.vote_results.filter(
      (v) => v.legislator_id === leg.id && v.vote_type === "2"
    ).length,
  };
});

csvWriter
  .writeRecords(records) // returns a promise
  .then(() => {
    console.log("...Done");
  });


const csvWriter2 = createObjectCsvWriter({
  path: "./output/bills.csv",
  header: [
    { id: "id", title: "id" },
    { id: "title", title: "title" },
    { id: "supporter_count", title: "supporter_count" },
    { id: "opposer_count", title: "opposer_count" },
    { id: "primary_sponsor", title: "primary_sponsor" },
  ],
});

const records2 = data.bills.map((bill) => {
    const primary_sponsor = data.legislators.find(leg=>leg.id===bill.sponsor_id);
    const vote_ids = data.votes.filter(v=>v.bill_id===bill.id).map(v=>v.id);
    return {
    ...bill,
    supporter_count: data.vote_results.filter(v=>vote_ids.includes(v.vote_id) && v.vote_type == '1').length,
    opposer_count: data.vote_results.filter(v=>vote_ids.includes(v.vote_id) && v.vote_type == '2').length,
    primary_sponsor : primary_sponsor && primary_sponsor.name ? primary_sponsor.name : 'Unknown',
  };
});

csvWriter2
  .writeRecords(records2) // returns a promise
  .then(() => {
    console.log("...Done");
  });
