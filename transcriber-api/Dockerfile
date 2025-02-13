# Basis-Image mit Python 3.9
FROM python:3.9-slim

# System-Dependencies für Whisper
RUN apt-get update && apt-get install -y ffmpeg

# Arbeitsverzeichnis setzen
WORKDIR /app

# Abhängigkeiten kopieren und installieren
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Whisper-Modelle vorab laden
RUN python -c "import whisper; whisper.load_model('base')"

# Anwendungscode kopieren
COPY app/ .

# Temporäres Verzeichnis erstellen
RUN mkdir -p /tmp

# Startet die FastAPI-Anwendung
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "6000"]