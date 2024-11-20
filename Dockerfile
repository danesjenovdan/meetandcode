FROM node:16-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/public /usr/share/nginx/html/
COPY --from=build /app/img /usr/share/nginx/html/img

COPY nginx.conf /etc/nginx/conf.d/default.conf
