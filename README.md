# Tijera MVP

Developed by `Mustafa Al Quraishi` and `Arun Suhas`, managed by `Oliwia Orgodniczek` for Imperial Junior Solutions.

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

You will need to have [Node][1] and [Yarn][2] installed on your computer.
We recommend using an IDE code editor to run this, we used [VS Code][3].
You will need [PostgreSQL][4] and [Redis][5].
In order to run a 'PostgreSQL' server we recommend using a GUI such as [pgAdmin][6].

### Server

Setup postgresql

Go to pgAdmin
Create a database called `tijera`:

<p align="center">
 <img height="400px" src="https://github.com/mus2711/tijera_dev_master/blob/main/assets/Screenshot%202022-02-20%20at%2015.05.28.png">
</p>
<p align="center">
 <img height="400px" src="https://github.com/mus2711/tijera_dev_master/blob/main/assets/Screenshot%202022-02-20%20at%2015.05.53.png">
</p>
<p align="center">
 <img height="400px" src="https://github.com/mus2711/tijera_dev_master/blob/main/assets/Screenshot%202022-02-20%20at%2015.05.57.png">
</p>

<!-- ```console
createdb -U postgres tijera
``` -->

Then, in the go to the root project directory in your terminal, run the following:

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
yarn dev
```

```You will now find the website running at `http://localhost:3000`

```

[1]: https://nodejs.org/en/
[2]: https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable
[3]: https://code.visualstudio.com
[4]: https://www.postgresql.org/download/
[5]: https://redis.io
[6]: https://www.pgadmin.org
```
