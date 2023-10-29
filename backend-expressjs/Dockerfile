FROM node:20.9.0

RUN mkdir /app

COPY dist /app

COPY .env /app

WORKDIR /app

EXPOSE 8000

CMD [ "node", "/app/bundle.js" ]


