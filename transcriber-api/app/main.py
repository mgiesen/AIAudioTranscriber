from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import HTMLResponse
from uuid import uuid4
from transcriber import load_model, transcribe_audio, TranscriptionBusy
import os

app = FastAPI()
model = load_model("base")

@app.post("/transcribe")
async def transcribe(file: UploadFile = File(...)):
    if not file.filename:
        raise HTTPException(status_code=400, detail="Keine Datei hochgeladen.")
    
    try:
        audio_path = f"/tmp/{uuid4()}_{file.filename}"
        with open(audio_path, "wb") as buffer:
            buffer.write(await file.read())
        
        result = transcribe_audio(model, audio_path)
        return {"text": result}
    
    except TranscriptionBusy:
        raise HTTPException(status_code=429, detail="Server ist aktuell in Benutzung. Bitte später erneut versuchen.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if os.path.exists(audio_path):
            os.remove(audio_path)