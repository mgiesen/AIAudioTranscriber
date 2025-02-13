FROM ollama/ollama:latest

# Start Ollama server and pull model during build
RUN ollama serve & \
    sleep 5 && \
    ollama pull llama2:7b && \
    pkill ollama

EXPOSE 11434

# Nur "serve" ausführen, da der Befehl nicht doppelt übergeben werden darf
CMD ["serve"]