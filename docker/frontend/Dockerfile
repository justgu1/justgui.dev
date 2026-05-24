FROM node:22-alpine

WORKDIR /var/www/frontend

COPY ./frontend/package.json ./
COPY ./frontend/yarn.lock ./

RUN yarn install

COPY ./frontend .

RUN yarn build || true

EXPOSE 4321

CMD ["sh", "-c", "\
if [ \"$APP_ENV\" = 'production' ]; then \
  yarn preview --host 0.0.0.0 --port 4321; \
else \
  yarn dev --host 0.0.0.0 --port 4321; \
fi"]