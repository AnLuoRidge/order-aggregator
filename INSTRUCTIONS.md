# Order Aggregator

A program which parses a JSON file and aggregates orders

# Instructions

Build a minimal application that:

1. parses a JSON file with order data
2. sums filledQuantity by ticker and writes to a file {input_file}\_sum.csv
3. returns the largest fill for each ticker and writes to a file {input_file}\_largest.csv

No REST API, database, or external services are required.

Please include a README, tests and submit your solution either via zip or a repo.

It would be helpful to consider how your code might fit inside a broader application and how it might be extended.

Some example input files are provided under `data/`

# Field descriptions

`eventTime` represents the UTC timestamp of when we receive the order event.

`clientOrderId` represents the unique Id for each order, you may receive mutliple messages for the same order, in this case use the last message for the `clientOrderId`.

`ticker` represents the name of the instrument the order was for.

`quantity` represents the total quantity of the order, e.g. how many shares we want to buy.

`filledQuantity` represents the total filled quantity for that order at the time of the event, e.g. how many shares were bought in the market for this order.

# Aggregate filledQuantity by ticker

The filledQuantity is value of the `filledQuantity` field in the JSON. Please implement a method that returns the total number of `filledQuantity` by ticker. There could be multiple fills for a single order.

E.g. we get the below data:

```json
{
  "orders": [
    {
      "eventTime": "20251112-01:24:23:101",
      "clientOrderId": "aaaaaa",
      "ticker": "BHP AU Equity",
      "quantity": 100,
      "filledQuantity": 50
    },
    {
      "eventTime": "20251112-01:25:26:448",
      "clientOrderId": "aaaaaa",
      "ticker": "BHP AU Equity",
      "quantity": 100,
      "filledQuantity": 100
    },
    {
      "eventTime": "20251112-01:35:44:363",
      "clientOrderId": "bbbbbb",
      "ticker": "BHP AU Equity",
      "quantity": 200,
      "filledQuantity": 10
    }
  ]
}
```

The expected output would be he sum of order `aaaaaa` and `bbbbbb`

```
BHP AU Equity,110
```

The expected output running through MultipleExample.json is:

```
137A JP,1200
2001 JP,1000
2809 JP,1200
5959 JP,2700
6501 JP,66000
9988 HK,70500
NOF6 Index,25
UPS US 01/16/26 P105,100
```

# Get largest fill by ticker

The largest fill is defined by the largest `filledQuantity` defined for a ticker throughout the set of data. Please implement a method that returns the largest `filledQuantity` for each ticker.

E.g. we get the below data:

```json
{
  "orders": [
    {
      "eventTime": "20251112-01:24:23:101",
      "clientOrderId": "aaaaaa",
      "ticker": "BHP AU Equity",
      "quantity": 100,
      "filledQuantity": 50
    },
    {
      "eventTime": "20251112-01:25:26:448",
      "clientOrderId": "aaaaaa",
      "ticker": "BHP AU Equity",
      "quantity": 100,
      "filledQuantity": 100
    },
    {
      "eventTime": "20251112-01:35:44:363",
      "clientOrderId": "bbbbbb",
      "ticker": "BHP AU Equity",
      "quantity": 200,
      "filledQuantity": 10
    }
  ]
}
```

The expected output would be

```
BHP AU Equity,100
```

The expected output for MultipleExample.json is:

```
137A JP,1000
2001 JP,1000
2809 JP,1000
5959 JP,2000
6501 JP,51000
9988 HK,9500
NOF6 Index,20
UPS US 01/16/26 P105,100
```
