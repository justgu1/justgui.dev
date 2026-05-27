FROM node:22-alpine

WORKDIR /var/www/frontend

ENV ASTRO_TELEMETRY_DISABLED=1

COPY ./frontend/package.json ./
COPY ./frontend/yarn.lock ./

RUN yarn install

COPY ./frontend .

# Vite envDir points to /var/www (see astro.config.mjs). .env is gitignored/dockerignored.
COPY .env.example /var/www/.env

# Allow compose/buildkit to override public env at image build time
ARG PUBLIC_APP_ENV=local
ARG PUBLIC_API_URL=http://localhost:8080
ARG PUBLIC_SITE_URL=http://localhost:4321
ARG PUBLIC_LINKEDIN_URL=https://www.linkedin.com/in/justgui
ARG PUBLIC_GITHUB_URL=https://github.com/justgu1
ARG PUBLIC_INSTAGRAM_URL=https://www.instagram.com/just.guis
ARG PUBLIC_GA4_MEASUREMENT_ID=
ARG PUBLIC_META_PIXEL_ID=
ARG PUBLIC_CV_URL=

ENV PUBLIC_APP_ENV=$PUBLIC_APP_ENV \
    PUBLIC_API_URL=$PUBLIC_API_URL \
    PUBLIC_SITE_URL=$PUBLIC_SITE_URL \
    PUBLIC_LINKEDIN_URL=$PUBLIC_LINKEDIN_URL \
    PUBLIC_GITHUB_URL=$PUBLIC_GITHUB_URL \
    PUBLIC_INSTAGRAM_URL=$PUBLIC_INSTAGRAM_URL \
    PUBLIC_GA4_MEASUREMENT_ID=$PUBLIC_GA4_MEASUREMENT_ID \
    PUBLIC_META_PIXEL_ID=$PUBLIC_META_PIXEL_ID \
    PUBLIC_CV_URL=$PUBLIC_CV_URL

RUN yarn build

EXPOSE 4321

CMD ["sh", "-c", "\
if [ \"$PUBLIC_APP_ENV\" = 'production' ]; then \
  yarn preview --host 0.0.0.0 --port 4321; \
else \
  yarn dev --host 0.0.0.0 --port 4321; \
fi"]
