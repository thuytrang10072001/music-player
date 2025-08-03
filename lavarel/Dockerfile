FROM php:8.2.11-fpm

WORKDIR /app/backend

# Install COMPOSER
RUN apt-get update && apt-get -y install curl
RUN curl -sS https://getcomposer.org/installer | php && \
    mv composer.phar /usr/local/bin/composer

# Install useful tools and libraries
RUN apt-get -y install apt-utils nano wget dialog vim \
    build-essential git libcurl4 libcurl4-openssl-dev \
    zlib1g-dev libzip-dev zip libbz2-dev locales \
    libicu-dev libonig-dev libxml2-dev libpq-dev

# Install PHP extensions
RUN docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql && \
    docker-php-ext-install pdo pdo_pgsql pgsql

# Copy only composer files first
COPY composer.json composer.lock ./

# Install dependencies without running post scripts (like artisan commands)
RUN composer install --no-interaction --prefer-dist --no-scripts

# Copy all remaining app files including artisan
COPY . .

# Now run the full install with scripts
RUN composer dump-autoload --optimize && \
    php artisan package:discover --ansi || true
