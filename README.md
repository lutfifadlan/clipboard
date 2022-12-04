# Salary Summary Statistics Web Application

## Running the App

### Using Docker

- Make sure the latest stable docker is installed in your machine
  - https://docs.docker.com/desktop/install/mac-install/
- Run the Docker in your machine
- Go the code repository root folder and run `docker-compose up`
  - Note: if you change some code in this repository and want the local server to be updated, run `docker-compose up --build` instead

## Running the Tests

- Run `npm install`
- Run `npm run test`

## Running the API

Once you've successfully run `docker-compose up` or `docker-compose up --build`, you should be able to hit the service' APIs.
Below are the list of endpoints within the service along with request and response examples. You can use any API platform to hit the API (e.g. Postman)

- **Login**

  - URL: `POST http://localhost:3000/auth/login`
  - Request Body Example:
    ```
    {
      "username": "lutfifadlan",
      "password": "Dummy123!"
    }
    ```
  - Successful Response Body Example:
    ```
    {
      "username": "lutfifadlan",
      "full_name": "Mochamad Lutfi Fadlan",
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imx1dGZpZmFkbGFuIiwicGFzc3dvcmQiOiJEdW1teTEyMyEiLCJpYXQiOjE2NzAxODcxMzgsImV4cCI6MTY3MDc5MTkzOH0.1L42N8SMpkq8C70RQozAacMDwvJKL9mzdNqpczQDajo"
    }
    ```
  - Notes:
    - Request body example is the correct credentials
    - Use `access_token` from the successful login response body for authorization in the other endpoints

- **Add Salary**
  - URL: `POST http://localhost:3000/salaries`
  - Request Header
    - Authorization: `Bearer {access_token}`
  - Request Body Example:
    ```
    {
      "name": "Steph",
      "salary": 100000,
      "currency": "USD",
      "department": "Engineering",
      "sub_department": "Product"
    }
    ```
  - Successful Response Body Example:
    ```
    {
      "id": "cad387c0-9dd6-4174-8f4e-fa97f52fa047",
      "name": "Steph",
      "salary": 100000,
      "currency": "USD",
      "department": "Engineering",
      "sub_department": "Product"
    }
    ```
- **Delete Salary**
  - URL: `DELETE http://localhost:3000/salaries/:id`
  - Request Header
    - Authorization: `Bearer {access_token}`
  - Successful Response Body Example:
    ```
    {
      "id": "4cac8f6a-7bcf-4579-bdf3-20ed57012c2e",
      "name": "Himani",
      "salary": 240000,
      "currency": "USD",
      "department": "Engineering",
      "sub_department": "Platform"
    }
    ```
- **Get Salaries**

  - URL: `GET http://localhost:3000/salaries`
  - Request Header
    - Authorization: `Bearer {access_token}`
  - Successful Response Body Example:

    ```
    [
      {
          "id": "3014739e-fcff-4c9b-9255-da55c490c80f",
          "name": "Guljit",
          "salary": 30,
          "currency": "USD",
          "department": "Administration",
          "sub_department": "Agriculture"
      },
      {
          "id": "3805229f-f48e-4f14-8346-c9f013a500b8",
          "name": "Ragini",
          "salary": 30,
          "currency": "USD",
          "department": "Engineering",
          "sub_department": "Platform"
      },
      {
          "id": "ebde9311-5696-43a3-ada3-98412fef51f4",
          "name": "Abhishek",
          "salary": 145000,
          "currency": "USD",
          "department": "Engineering",
          "sub_department": "Platform"
      },
      {
          "id": "81effe5f-41d2-4663-97c1-aeeab58d0c30",
          "name": "Himanshu",
          "salary": 70000,
          "currency": "EUR",
          "department": "Operations",
          "sub_department": "CustomerOnboarding"
      },
      {
          "id": "9b50baa9-73a2-405f-aa95-23e1d436503d",
          "name": "Nikhil",
          "salary": 110000,
          "currency": "USD",
          "on_contract": true,
          "department": "Engineering",
          "sub_department": "Platform"
      },
      {
          "id": "09a0e002-650b-4a64-a258-a799b68e7f24",
          "name": "Anurag",
          "salary": 90000,
          "currency": "USD",
          "department": "Banking",
          "on_contract": true,
          "sub_department": "Loan"
      },
      {
          "id": "dcddcd0f-9926-4d4e-8dda-c0469d0b8ce6",
          "name": "Yatendra",
          "salary": 30,
          "currency": "USD",
          "department": "Operations",
          "sub_department": "CustomerOnboarding"
      },
      {
          "id": "28834941-e403-4f5a-8c04-37cd56c21715",
          "name": "Himani",
          "salary": 240000,
          "currency": "USD",
          "department": "Engineering",
          "sub_department": "Platform"
      },
      {
          "id": "d1ce0b20-a57c-46a6-bab7-2c60063af9f9",
          "name": "Anupam",
          "salary": 200000000,
          "currency": "INR",
          "department": "Engineering",
          "sub_department": "Platform"
      }
    ]
    ```

  - Note: to delete salary we need an id and we can get the salary id through this endpoint

- **Fetch All Salary Summary Stats**

  - URL: `GET http://localhost:3000/salary-summary-stats`
  - Request Header
    - Authorization: `Bearer {access_token}`
  - Successful Response Body Example:
    ```
    {
      "mean": 22295010,
      "min": 30,
      "max": 200000000
    }
    ```

- **Fetch On Contract Salary Summary Stats**

  - URL: `GET http://localhost:3000/salary-summary-stats/on-contract`
  - Request Header
    - Authorization: `Bearer {access_token}`
  - Successful Response Body Example:
    ```
    {
      "mean": 100000,
      "min": 90000,
      "max": 110000
    }
    ```

- **Fetch Salary Summary Stats for Each Department**

  - URL: `GET http://localhost:3000/salary-summary-stats/each-department`
  - Request Header
    - Authorization: `Bearer {access_token}`
  - Successful Response Body Example:
    ```
    {
      "Administration": {
          "mean": 30,
          "min": 30,
          "max": 30
      },
      "Engineering": {
          "mean": 40099006,
          "min": 30,
          "max": 200000000
      },
      "Operations": {
          "mean": 35015,
          "min": 30,
          "max": 70000
      },
      "Banking": {
          "mean": 90000,
          "min": 90000,
          "max": 90000
      }
    }
    ```

- **Fetch Salary Summary Stats for Each Department and Sub-Department**

  - URL: `GET http://localhost:3000/each-department-and-sub-department`
  - Request Header
    - Authorization: `Bearer {access_token}`
  - Successful Response Body Example:
    ```
    {
      "Administration": {
          "Agriculture": {
              "mean": 30,
              "min": 30,
              "max": 30
          }
      },
      "Engineering": {
          "Platform": {
              "mean": 40099006,
              "min": 30,
              "max": 200000000
          }
      },
      "Operations": {
          "CustomerOnboarding": {
              "mean": 35015,
              "min": 30,
              "max": 70000
          }
      },
      "Banking": {
          "Loan": {
              "mean": 90000,
              "min": 90000,
              "max": 90000
          }
      }
    }
    ```
