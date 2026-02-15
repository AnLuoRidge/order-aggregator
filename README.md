# Order Aggregator

This is a home assessment of a tech interview. With order data (in json files), the cli tool can aggregate total filled quantity by ticker and get largest filled quantity (in one order) by ticker. The output is CSV files.

## How to run

Firstly, install Node.js >= v24 in your environment. (You can use [nvm](https://www.nvmnode.com) to manage multiple Node.js versions.)

To use the program, under `/order-aggregator`, run `node . your_json_file_path`. e.g., `node . data/single.json`.

To run the test, go to `/order-aggregator`, and run `node --test`.

To develop, you need to run `npm i` to install all the dependencies.

The code has been tested with Docker image `node:24-alpine3.22` and `v22.19.0` on a mac. More details of the minimum Node.js requirement is in `package.json` _engines_ section.

## What can be improved

There're many areas can be improved. For example,

- data validation
- to introduce proper logging
- to handle errors properly
- more unit testing and system testing
- to add a confirmation before overwrite existing csv files
- better import style without too many `../../`
