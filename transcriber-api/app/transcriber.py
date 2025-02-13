import whisper

class TranscriptionBusy(Exception):
    pass

_is_busy = False

# Läd das Whisper-Modell in den Speicher
def load_model(model_size: str = "base"):
    try:
        return whisper.load_model(model_size)
    except Exception as e:
        raise Exception(f"Fehler beim Laden des Models: {e}")

# Transkribiert eine Audiodatei mit dem gegebenen Whisper-Modell.
def transcribe_audio(model, audio_path: str):
    global _is_busy
    
    if _is_busy:
        raise TranscriptionBusy("Transcription service is currently busy")
    
    try:
        _is_busy = True
        result = model.transcribe(audio_path, language="de")
        return result["text"]
    except Exception as e:
        raise Exception(f"Fehler bei der Transkription: {e}")
    finally:
        _is_busy = False