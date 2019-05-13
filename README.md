# pbp-urlshortener
A totally awesome url shortener API. 

**Our endpoints for:** `http://shortenit.us-east-2.elasticbeanstalk.com/`

**Shortening your url**
----
  This endpoint takes a url as a parameter and returns a JSON payload with the shortened url and its corresponding id. 
  Please note that the `originalUrl` parameter expects a valid URI to be provided.

* **URL**

  `/:url_code`

* **Method:**
  
  `POST` 
  

* **Data Params**

 `{originalUrl: https://www.google.ca}`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ id : 12, shortened_url: http://shortenit.us-east-2.elasticbeanstalk.com/LK123FA }`
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{ message : 'Error creating shortened url', error: error }`

  OR

  * **Code:** 422 <br />
    **Content:** `{ message : 'Invalid url provided' }`

* **Sample Call:**

```
curl -d {\"originalUrl\":\"https://www.facebook.com\"} -H "Content-Type: application/json" -X POST "http://shortenit.us-east-2.elasticbeanstalk.com/urls"
``` 

----
**Retrieve your shortened url info**
----
  This endpoint retrieves shortened url info by `:url_code` and returns is as a JSON payload.

* **URL**

  `/urls/:url_code`

* **Method:**
  
  `GET` 

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
      {
        id: 12
        original_url: https://www.google.ca, 
        shortened_url: http://shortenit.us-east-2.elasticbeanstalk.com/LK123FA 
      }
    ```
 
* **Error Response:**

  * **Code:** 404 <br />
    **Content:** `{message: "URL info for shortened code not found"}`

  OR

  * **Code:** 500 <br />
    **Content:** `{message: 'Error fetching shortened url info', error: error}`

* **Sample Call:**

```
curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET http://shortenit.us-east-2.elasticbeanstalk.com/urls/0Lw_pkdqD
```  

----
**Redirect me, Scotty!**
----
  Given a valid shortened `:url_code`, this endpoint will redirect you to the original url provided during creation. 

* **URL**

  `/:url_code`

* **Method:**
  
  `GET` 

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
      {
        id: 12
        original_url: https://www.google.ca, 
        shortened_url: http://shortenit.us-east-2.elasticbeanstalk.com/LK123FA 
      }
    ```
 
* **Error Response:**

  * **Code:** 404 <br />
    **Content:** `{message: "Shortened url code not found"}`

  OR

  * **Code:** 500 <br />
    **Content:** `{message: 'Error redirecting to original url', error: error}`

* **Sample Call:**

```
http://shortenit.us-east-2.elasticbeanstalk.com/0Lw_pkdqD

or 

curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET http://shortenit.us-east-2.elasticbeanstalk.com/0Lw_pkdqD
``` 
---- 

# Getting Started & Testing: 

### Prerequisites

A few things you'll need to get started (if you don't have them already)

```
npm & node
installed with your preferred package manager 
```

### Installing

A step by step series of examples that tell you how to get a development env running

1. Clone the repo

```
HTTPS: git clone https://github.com/nodnarblee/pbp-urlshortener.git 
or 
SSH: git clone git@github.com:nodnarblee/pbp-urlshortener.git

```

2. Setup postgres db with db_name, user and password of your liking.

3. Use `.env.example` as an example to setup your local `.env` file

```
DATABASE_DEV=db_name
DATABASE_TEST=db_name_test
DATABASE_USER=user
DATABASE_PASSWORD=password
BASE_URL=localhost:3000
NODE_ENV=dev
```

End with an example of getting some data out of the system or using it for a little demo

4. Start the app

```
npm start
```

## Running the tests

`NODE_ENV=test npm test`

