# # Utilisez une image officielle Node.js comme parent
# FROM node:20.10.0 AS build

# # Répertoire de travail
# WORKDIR /app

# # Copier package.json et pnpm-lock.yaml
# COPY package.json pnpm-lock.yaml ./

# # Installer pnpm et les dépendances
# RUN npm install -g pnpm
# RUN pnpm install

# # Copier le reste des fichiers de l'application
# COPY . .

# # Construire l'application pour la production
# RUN pnpm build

# # Étape de production
# FROM nginx:alpine

# # Copier les fichiers construits dans le répertoire de Nginx
# COPY --from=build /app/dist /usr/share/nginx/html

# # Exposer le port sur lequel Nginx écoute
# EXPOSE 80

# # Commande pour démarrer Nginx
# CMD ["nginx", "-g", "daemon off;"]


FROM node:20.10.0

ENV VITE_API_URL=https://architrack-api-7inqv.ondigitalocean.app/api

RUN npm install -g pnpm

WORKDIR /usr/src/app

COPY package*.json ./

RUN pnpm install

COPY . .

RUN pnpm run build

EXPOSE 8080

RUN pnpm install -g http-server
CMD ["http-server", "dist"]
