# AIAudioTranscriber

> [!WARNING]  
> AIAudioTranscriber ist derzeit in der Entwicklung und nicht für den produktiven Einsatz geeignet. Funktionen und Schnittstellen können sich bis zur stabilen Version noch ändern.

AIAudioTranscriber ist ein KI-gestütztes Tool zur Transkription und Aufbereitung verschiedener Arten von Gesprächen und Vorträgen. Es wandelt Audioaufnahmen in Text um, erstellt strukturierte Zusammenfassungen und ermöglicht eine effiziente Dokumentation von Audioinhalten aller Art. Die Anwendung kann vollständig kostenlos und offline betrieben werden und ist über Docker lokal ausführbar.

## Motivation

Die effiziente Dokumentation von Gesprächen, Vorträgen und Meetings ist in vielen Bereichen essentiell. Sei es die Erfassung von Mitarbeitergesprächen, die Dokumentation von Fachvorträgen, die Persistierung von Expertenwissen oder die Protokollierung von Meetings. AIAudioTranscriber automatisiert diesen Prozess durch KI-gestützte Transkription und Zusammenfassung verschiedenster Gesprächsformate.

## Entwicklungsstrategie

Aktuell kann ich nur wenige Stunden pro Woche an dem Projekt arbeiten. Entsprechend habe ich einen überschaubaren Scope für einen MVP definiert. Viele weitere spannende Funktionen und Features wären vorstellbar, werden aus Kapazitätsgründen jedoch vorerst hintenangestellt.

## Ablauf

1. **Dateneingabe**

   - Zugriff auf AIAudioTranscriber über den Webbrowser unter `http://localhost`.
   - Eingabe relevanter Informationen wie **Datum, Uhrzeit, Inhalt** etc.
   - Aufnahme einer **Audiodatei über ein angeschlossenes Mikrofon** oder **Upload einer bestehenden Datei**.

2. **Transkription**

   - Die Audiodatei wird mittels KI verarbeitet und in **Text umgewandelt**.

3. **Strukturierte Zusammenfassung**

   - Der transkribierte Text wird analysiert und in eine **übersichtliche, strukturierte Form** gebracht.
   - Kernaussagen werden hervorgehoben und thematisch gruppiert.
   - Format wird automatisch an den Inhalt angepasst (z.B. Meetingprotokoll, Vortragszusammenfassung, Interviewdokumentation).

4. **Speicherung & Nutzung**
   - Der Nutzer wählt das gewünschte **Ausgabeformat**.
   - Die Datei wird gespeichert und steht **zum Download oder zur Weiterverarbeitung** bereit.

## Schnellstart

⚠ **Voraussetzung:** [Docker](https://docs.docker.com/get-docker/) muss lokal installiert und ausgeführt werden.

```sh
git clone https://github.com/DeinUser/AIAudioTranscriber.git
cd AIAudioTranscriber
docker-compose up -d
```

## Unterstützte Ausgabeformate

- **OneNote (.one)** – Strukturierte Ablage im Microsoft OneNote-Format.

## Verwendete Technologien

- **[Nginx](https://nginx.org/)** – Bereitstellung der Web-Oberfläche.
- **[FastAPI](https://fastapi.tiangolo.com/)** – Backend-API zur Steuerung der Anwendung.
- **[Whisper](https://github.com/openai/whisper)** – Verarbeitung von Audioaufnahmen und Transkription.
- **[Ollama](https://ollama.com/)** – Strukturierung und Zusammenfassung von Textinhalten.
- **[Docker](https://www.docker.com/)** – Containerisierung und Isolation der einzelnen Dienste.

## Image bauen und ausführen

Container bauen:

```bash
docker-compose build
```

Container ausführen:

```bash
docker-compose up -d
```

Logs anzeigen:

```bash
docker-compose logs -f
```

Container stoppen:

```bash
docker-compose down
```

Nach Änderungen am Code muss das entsprechende Image neu gebaut werden:

```bash
docker-compose build [service]
docker-compose up -d [service]
```

Beispiel: `docker-compose up -d --build frontend`
