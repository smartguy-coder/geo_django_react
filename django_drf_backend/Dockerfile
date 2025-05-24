FROM python:3.12.6-alpine

WORKDIR /app

ENV PYTHONFAULTHANDLER=1 \
    PYTHONHASHSEED=random \
    PYTHONUNBUFFERED=1

RUN apk add --update --no-cache --virtual .tmp-build-deps \
    postgresql-client libc-dev build-base postgresql-dev linux-headers gcc gettext openssh-client curl && \
    pip install --upgrade pip


COPY requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY . /app/

EXPOSE 8000
