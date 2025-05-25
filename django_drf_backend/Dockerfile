FROM python:3.12.6-alpine

WORKDIR /app

ENV PYTHONFAULTHANDLER=1 \
    PYTHONHASHSEED=random \
    PYTHONUNBUFFERED=1

RUN apk add --no-cache --virtual .build-deps \
    build-base \
    gcc \
    musl-dev \
    libc-dev \
    linux-headers \
    postgresql-dev \
    gdal-dev \
    geos-dev \
    proj-dev \
    gdal \
    postgresql-client \
    curl \
    git \
    openssh-client \
    gettext

# Встановіть змінну середовища, щоб Django міг знайти бібліотеку
ENV GDAL_LIBRARY_PATH=/usr/lib/libgdal.so
ENV GEOS_LIBRARY_PATH=/usr/lib/libgeos.so

COPY requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY . /app/

EXPOSE 8000
