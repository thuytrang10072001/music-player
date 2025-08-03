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

# 🔥 Copy all source code into container (including artisan)
COPY . /app/backend

# ✅ Composer install (ensure artisan exists now)
RUN composer install --no-interaction --prefer-dist --optimize-autoloader
