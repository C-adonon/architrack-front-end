FROM node:20.10.0 AS build


WORKDIR /app


COPY package.json pnpm-lock.yaml ./


RUN npm install -g pnpm
RUN pnpm install


COPY . .


RUN pnpm build


FROM nginx:alpine


COPY --from=build /app/dist /usr/share/nginx/html


EXPOSE 80


CMD ["nginx", "-g", "daemon off;"]
