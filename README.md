# Routes

GET - /api/settings - Return a JSON object, contains settings

POST - /api/settings - Accept a JSON object in a variable named "settings" (in the request body)

POST - /login - Accept a JSON object, return a Json Web Token

# How to

## Certificates

You need first to generate the SSL certificates (see [http://www.akadia.com/services/ssh_test_certificate.html](how to generate a ssl certificate example)).
Next, create the folder "ssl" with the folder "keys" and "certificates" within it and place the key and certificate in.

## Secret

Change the secret in index.js -> var secret;

## Access the app

Every URI preceded by /api require an authenticated user. To log in the app, send a JSON object to /login (username and password).

## Port

The used port is ```8000```, you can change it in index.js

## JSON

### Settings

```json
{
    "hours": {
        "leave": {
            "h": 11,
            "m": 29
        },
        "back": {
            "h": 11,
            "m": 30
        }
    },
    "auto": true,
    "temperature": {
        "wanted": 0,
        "outside": 0
    },
    "state": false
}
```

### User

```json
    {
        "username": "toto",
        "password": "toto"
    }
```
