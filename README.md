More than just a tool for Bit-Tap: The Bit-Tap-Api repo can act as a bitcoin wallet service for anyone!

##  Bit-Tap-Api can provide the following endpoints for clients:

* "/users/", for creating a new user
  
  POST
  
  BODY:
  
      name: the new users name
  
  RETURN:
  
      private_key: the WIF format for the users new private key. KEEP THIS SAFE!
  
* "/users/:userid", for retrieving all info on user

  GET
  
  NO-BODY
  
  RETURN:
  
      name: users name
  
      public_key: users public key
  
      address: wallet address
  
      balance: how much btc user has
  
* "/users/:userid", for updating a users info

  POST
  
  BODY: (only need to include the fields you want to update)
  
      name: users name
  
      public_key: users public key
  
      address: wallet address
  
      balance: how much btc user has
      
  RETURN:
  
      Database response
      
* "/transact", for broadcasting a new transaction on the bitcoin network

    POST
    
    BODY:
    
        privateKey: the senders private key
        
        address: the receivers address
        
        amount: amount of bitcoin you want to send (satoshis)
        
        fee: transaction fee for miners (satoshis)
    
    RETURN:
        
        txId: the transaction id, you can search these on block viewing sites for the status of your transaction
        
       
***

## SETUP
  
Create a new .env file in the root of bit-tap-api

This is my example .env

```
DB_URL=localhost
DB_PORT=27017
BTC_NETWORK=testnet
```

DB_URL is the URL of your mongo database
DB_PORT is the port that your database listens on
BTC_NETWORK is the network you want to have your wallets on. testnet is for testing: bitcoins have no value.
livenet is for real life transactions


Make sure you `npm install bitcore-lib`
