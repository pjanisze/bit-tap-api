More than just a tool for Bit-Tap: The Bit-Tap-Api repo can act as a bitcoin wallet service for anyone!

##  Bit-Tap-Api can provide the following endpoints for clients:

**POST** `/users/`, for creating a new user

  - BODY:
    - ```{firstName:...., lastName:...., seed:..., email:..., password:...}```

  - RETURN:
      - private_key: the WIF format for the users new private key. KEEP THIS SAFE!

**GET** `/users/:userid`, for retrieving all info on user
   - RETURN:

       - name: users name

       - public_key: users public key



**PUT** `/transact`, for broadcasting a new transaction on the bitcoin network

     - BODY:

        - privateKey: the senders private key

        - senderId: userId of sender

        - receiverId: userId of receiver

        - fee: transaction fee for miners (satoshis)

        - amount: amount (satoshis) to send to receiver

     - RETURN:

        - txId: the transaction id, you can search these on block viewing sites for the status of your transaction


***

## SETUP

Create a new .env file in the root of bit-tap-api

This is my example .env

```
BTC_NETWORK=testnet
DB_URL=...
DB_PORT=...
DB=...
DB_USER=...
DB_PASSWORD=...

```

DB_URL is the URL of your mysql database
DB_PORT is the port that your database listens on
BTC_NETWORK is the network you want to have your wallets on. testnet is for testing: bitcoins have no value.
livenet is for real life transactions


Make sure you `npm i`
