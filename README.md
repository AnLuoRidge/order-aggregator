# Order Aggregator

This is a home assessment of a tech interview. With order data (in json files), the cli tool can aggregate total filled quantity by ticker and get largest filled quantity (in one order) by ticker.

## How to run

Firstly, install Node.js >= v23.6.0 in your environment. (Use [nvm](https://www.nvmnode.com) to manage multiple Node.js versions.)

To use the program, under `/order-aggregator`, run `node . your_json_file_path`. e.g., `node . data/single.json`.

To run the test, go to `/order-aggregator`, and run `node --test`.

To develop, you need to run `npm i` to install all the dependencies.

## What can be improved

There're many areas can be improved. For example,

- data validation
- introduce proper logging
- more unit testing and system testing
- add a confirmation before overwrite existing csv files
- better import style to avoid too many `../../`
