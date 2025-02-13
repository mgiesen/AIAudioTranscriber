FROM node:20-alpine

WORKDIR /app

# Kopiere zunächst nur die package-Dateien für effizientes Layer-Caching
COPY package*.json ./

# Installiere Dependencies
RUN npm install

# Kopiere den Rest des Codes
COPY . .

# Exponiere die fixen Ports
EXPOSE 3000
EXPOSE 3001

# Starte die Anwendung
CMD ["npm", "start"]