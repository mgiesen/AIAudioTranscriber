import whisper

class TranscriptionBusy(Exception):
    pass

_is_busy = False

def load_model(model_size: str = "base"):
    """Lädt das Whisper-Modell."""
    try:
        return whisper.load_model(model_size)
    except Exception as e:
        raise Exception(f"Fehler beim Laden des Models: {e}")

def transcribe_audio(model, audio_path: str):
    """Transkribiert eine Audiodatei mit dem gegebenen Whisper-Modell."""
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