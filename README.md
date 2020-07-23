# E-certificate

Generating and verifying certificates for students

# API

## Authentication

/auth
/register
/login
/logout

## API

/api

### Users

- /users GET, POST
- /users/:id GET, PUT, DELETE

### Course

- /courses GET, POST
- /courses/:id GET, PUT, DELETE

### Institution

- /institution GET, POST
- /institutions/:id GET, PUT, DELETE

### Student

- /students GET, POST
- /students/:id GET, PUT, DELETE

#### Course-offered

- /students/courses GET, POST

Request methods
GET - get
POST - create
PUT - update
DELETE - delete

Example:

```Javascript
fetch('/api/institutions').then(res=>res.json())
```

[![Build Status](https://travis-ci.com/micaiah-effiong/e-certificate.svg?branch=develop)](https://travis-ci.com/micaiah-effiong/e-certificate)
