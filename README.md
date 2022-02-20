# Tijera MVP

Developed by `Mustafa Al Quraishi` and `Arun Suhas`, managed by `Oliwia Orgodniczek` for Imperial Junior Solutions

<div or>
<p align="center">
 <img height="400px" src="https://github.com/mus2711/tijera_dev_master/blob/main/assets/Screenshot%202022-02-20%20at%2014.52.08.png">
</p>

<p align="center">
 <img height="400px" src="https://github.com/mus2711/tijera_dev_master/blob/main/assets/Screenshot%202022-02-20%20at%2014.52.18.png">
</p>
<p align="center">
 <img height="400px" src="https://github.com/mus2711/tijera_dev_master/blob/main/assets/Screenshot%202022-02-20%20at%2014.53.19.png">
</p>
<p align="center">
 <img height="400px" src="https://github.com/mus2711/tijera_dev_master/blob/main/assets/Screenshot%202022-02-20%20at%2014.53.29.png">
</p>

---

## How to deploy

### Server

Setup postgresql

Create a database called `tijera`:

```console
createdb -U postgres tijera
```

Then, in the root project directory, run the following:

```console
cd server
cp .env.EXAMPLE .env
```

Edit `CORS_ORIGIN` and `DOMAIN` as needed, and then run

```console
yarn
yarn build
yarn watch
yarn redis
yarn dev
```

### Web

```console
cd web
cp .env.production.local.EXAMPLE .env.production.local
```

Edit the variables as needed, and then run

```console
yarn
yarn build
yarn start
```

---

## Development setup

### Backend

Setup postgresql: here's guides for [Ubuntu][2] and [Manjaro/Arch][3].

Create a database called `tijera`, and another called `tijera-test`:

```console
createdb -U postgres tijera
createdb -U postgres tijera-test
```

Run `yarn watch` in one terminal window, and `yarn dev` in the other.

You get hot reload and database auto-synchronization enabled by default.

Testing: run `yarn test`

### Frontend

Run `yarn dev` to start the next server in development mode.

Testing: run `yarn test:frontend` in the `server` folder and `yarn test` in the
`web` folder.

[1]: https://www.youtube.com/watch?v=I6ypD7qv3Z8
[2]: https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-20-04
[3]: https://dev.to/tusharsadhwani/how-to-setup-postgresql-on-manjaro-linux-arch-412l
