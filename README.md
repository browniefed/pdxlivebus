# PDXLiveBus  

The PDXLiveBus app built in React with Next.js, and Urql.
It uses Next.js and Hasura + Postgres.
![http://i.imgur.com/PLh6pce.jpg](http://i.imgur.com/PLh6pce.jpg)

## Requirements

- Docker installed and running
- Hasura CLI installed [https://hasura.io/docs/1.0/graphql/core/hasura-cli/install-hasura-cli.html#install-hasura-cli](https://hasura.io/docs/1.0/graphql/core/hasura-cli/install-hasura-cli.html#install-hasura-cli)


## Running it

Start up Hasura and our Postgres database by running `docker-compose up -d`.

In the `hasura` directory run `hasura migrate apply` and then `hasura metadata apply` to create tables and apply permission

Next install all dependencies in the `web` folder by running `yarn install`.

You'll need an API Key from here [http://developer.trimet.org/appid/registration/](http://developer.trimet.org/appid/registration/)

```
TRIMET_KEY=API_KEY_HERE
```

Replace this in the `.env.development` file in the `web` directory. 

