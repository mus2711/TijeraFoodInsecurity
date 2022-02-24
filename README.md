# Tijera MVP

Developed by `Mustafa Al Quraishi` and `Suhas Arun`, managed by `Oliwia Orgodniczek` under Imperial Junior Solutions for Tijera Consulting.

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

You will need to have [Node][1] and [Yarn][2] installed on your computer, these are both installed together for all 16.10+ Node Versions (upon corepack-enable command).
We recommend using an IDE code editor to run this, we used [VS Code][3].
You will need [PostgreSQL][4] and [Redis][5].
In order to run a 'PostgreSQL' server we recommend using a GUI such as [pgAdmin][6].

### Server

Setup postgresql

Go to pgAdmin
Create a server called `tijera`, (if it does not let you set the password as 'postgres', then set it to something different, then in the top bar go to 'Object' -> 'Change Password' and change it to 'postgres'.) then create a database called `tijera`:

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

First, go to the redis folder you downloaded in your terminal, run the following:

```console
make
make-test
sudo cp src/redis-server /usr/local/bin/
sudo cp src/redis-cli /usr/local/bin/
```

Then, in the go to the root project directory in your terminal, run the following:

```console
cd server
cp .env.EXAMPLE .env
```

You must go to your .env file and fill in the areas as follows:

- REDIS_URL=127.0.0.1:6379
- SECRET=gierjgrwoiruq3434
- CORS_ORIGIN=http://localhost:3000
- CORS_ORIGIN_DEV=http://localhost:3000

Edit the above, and then run

```console
corepack-enable
yarn
yarn build
yarn migrate
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

You will now find the website running at `http://localhost:3000`

[1]: https://nodejs.org/en/
[2]: https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable
[3]: https://code.visualstudio.com
[4]: https://www.postgresql.org/download/
[5]: https://redis.io
[6]: https://www.pgadmin.org
