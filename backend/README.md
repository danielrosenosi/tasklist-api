## Installation and usage

Install the docker container on your machine using:

```
docker compose up -d
```

Log into your docker container using:

```
docker compose exec app bash
```

Install the back-end dependencies using:

```
composer install
```

In a terminal outside the docker container run:

```
cp env.example .env
```

Log into your docker container using:

```
php artisan key:generate
```

Make sure that the connection to the database is made and run:

```
php artisan migrate
```

## ✅ All done, now go to the frontend folder and perform the installation!!
