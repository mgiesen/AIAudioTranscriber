FROM nginx:alpine

# Entferne die Standard-Nginx-Konfiguration
RUN rm /etc/nginx/conf.d/default.conf

# Kopiere die benutzerdefinierte Nginx-Konfiguration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Kopiere die statischen Dateien
COPY public/ /usr/share/nginx/html/

# Exponiere Port 80
EXPOSE 80

# Starte Nginx im Vordergrund
CMD ["nginx", "-g", "daemon off;"]
