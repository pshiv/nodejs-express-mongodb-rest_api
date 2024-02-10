# Node.js, Express.js , MongoDB, JWT Auth, REST API


## Project setup
```
npm install
```

### Run
```
npm run dev
npm run start
```

## Run on HTTP and HTTPS mode

## Enable https mode
Use following command to generate certificates

    Directory name:  sscert 

    command: 
        openssl req -x509 -newkey rsa:4096 -nodes -days 365 -sha256 -keyout ./selfsigned.key -out selfsigned.crt

## All API have token enabled
 To generate token user URL /api/auth/login 
