# Salary Stats Web Application

## Running the App

### Using Docker

- Make sure docker is installed in your machine
  - https://docs.docker.com/desktop/install/mac-install/
- Go the code repository root folder and run `docker-compose up`

### Without Docker

if you want to run locally, don't forget to install redis and run it on the background first

- For mac user:
  - if you don't have brew in your machine, run command: /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
  - run `brew update`
  - run `brew install redis`
  - run `brew services start redis`
- Once redis is installed and run on the background, go the code repository root folder and run `npm run dev` command on your terminal

## Running the Tests

## Next Steps

- Adding load balancer
- Adding unit tests
- Pushing code into Github
- Proper error handling
