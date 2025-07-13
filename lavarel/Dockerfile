#FROM php:8.2.11-fpm
#
#WORKDIR /app/backend
#
## Install composer
#RUN echo "\e[1;33mInstall COMPOSER\e[0m"
#RUN cd /tmp \
#    && curl -sS https://getcomposer.org/installer | php \
#    && mv composer.phar /usr/local/bin/composer
#
#RUN apt-get update
#
## Install useful tools
#RUN apt-get -y install apt-utils nano wget dialog vim
#
## Install important libraries
#RUN echo "\e[1;33mInstall important libraries\e[0m"
#RUN apt-get -y install --fix-missing \
#    apt-utils \
#    build-essential \
#    git \
#    curl \
#    libcurl4 \
#    libcurl4-openssl-dev \
#    zlib1g-dev \
#    libzip-dev \
#    zip \
#    libbz2-dev \
#    locales \
#    libmcrypt-dev \
#    libicu-dev \
#    libonig-dev \
#    libxml2-dev
#
## Install Postgre PDO
#RUN apt-get install -y libpq-dev \
#    && docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql \
#    && docker-php-ext-install pdo pdo_pgsql pgsql
#
## Copy source code  container
#COPY . /app/backend
#
#RUN composer install --no-interaction --prefer-dist --optimize-autoloader

# Stage 1: Build
FROM php:8.2.11-fpm AS build
WORKDIR /app/backend
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
COPY composer.* ./
RUN composer install --no-interaction --prefer-dist --optimize-autoloader --no-dev
COPY . .

# Stage 2: Runtime
FROM php:8.2.11-fpm
WORKDIR /app/backend
RUN apt-get update && apt-get install -y \
    libpq-dev \
    && docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql \
    && docker-php-ext-install pdo pdo_pgsql pgsql \
    && apt-get clean && rm -rf /var/lib/apt/lists/*
COPY --from=build /app/backend /app/backend
RUN chown -R www-data:www-data /app/backend/storage /app/backend/bootstrap/cache
EXPOSE 8080
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8080"]
