FROM alpine:3.17.0
RUN apk update
RUN apk upgrade
RUN apk add --update nodejs npm
COPY . ./app
WORKDIR /app
RUN npm install
EXPOSE 3000

CMD ["npm", "run", "dev"]