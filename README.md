

## Description

NodeJS REST API built with [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.


## Techs
- NodeJS
- NestJS
- TypeScript
- TypeORM
- Postgresql
- Passport JWT
- Bcrypt


## Installation

```bash
$ yarn install
```


## Configure enviroment variables
Follow .env.example file instructions

## Running the app

```bash
# development
$ nest start
```


## Details

#### Entities

- Users
- Companies
- Responsibles
- Places
- Tickets


#### Functionalities

- Login with Nest authorization
- Guards to protect routes
- User CRUD
- Company CRUD (with Responsibles)
- Place CRUD (with Responsibles) 
- Ticket CRUD
- When a place is updated, a new ticket is created
- Ticket title is composed its id + place name
- When logging in, a session_duration_in_seconds is sent to the user, configured dynamically from .ENV, which also determines token max age.


##### Examples

- Login `POST: http://localhost:3003/auth/login`

```
{
	"username": "useremail@email.com",
	"password": "userpassword"
}
```


- User CRUD


Create User `POST: http://localhost:3003/users`

```
{
	"name": "User Name",
	"email": "useremail@email.com",
	"password": "userpassword"
}

```




All the following routes need at the Header: `Authorization Bearer {token}`


List all Users `GET: http://localhost:3003/users`


Update User  `PATCH: http://localhost:3003/users/{id}`

```
{
	"name": "User New Name",
	"email": "usernewpassword@email.com",
	"password": "usernewpassword"
}
```

Delete one User  `DELETE: http://localhost:3003/users/{id}`



- Companies


Create One Company and its Responsibles `POST: http://localhost:3003/companies`

```
{
	"name": "One Company",
	"cnpj": "xxxxxxxxxxxxxx",
	"description": "Company description",
	"user": {
		"id": {userId}
	},
	"responsibles": [
		{
			"name": "Company Responsible",
			"telephone": "xxxxxxxxxxxx",
			"isCompanyMainResponsible": true,
			"address": {
				"cep": "00000000000",
				"street": "Street X",
				"city": "City",
				"complement": null,
				"neighborhood": "Center",
				"number": "03",
				"state": "UF"
			}
		}
	]
}
```

- Place

Create one Place `POST: http://localhost:3003/places`

```
{
	"name": "New Place",
    "address": {
      "cep": "00000000000",
      "street": "Street X",
      "city": "City",
      "complement": null,
      "neighborhood": "Center",
      "number": "03",
      "state": "UF"
    }
	"company": {
		"id": {companyId}
	},
	"responsibles": [
		{
			"name": "Responsible 01",
			"telephone": "00000000000",
			"isPlaceMainResponsible": false,
			"address": {
				"cep": "00000000000",
				"street": "Street X",
				"city": "City",
				"complement": null,
				"neighborhood": "Center",
				"number": "03",
				"state": "UF"
			}
		}
	]
}
```


Update One Place `PATCH: http://localhost:3003/places/{placeId}`

When updating a Place, a new Ticket will be created

```
{
	"name": "Updated Place",
	"creator_userId":  {userId},
	"attendant_userId": {userId}"
}
```


- Ticket

Update One Ticket `PATCH: http://localhost:3003/tickets/{ticketId}`

```
{
	"status": "IN_PROGRESS"
}
```



This is a challenge by Coodesh
