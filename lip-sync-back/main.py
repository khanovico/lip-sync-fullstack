from fastapi import FastAPI, File, UploadFile
from fastapi.responses import FileResponse
import os

app = FastAPI()

UPLOAD_DIR = "uploaded_files"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.post("/generate/")
async def process_files(inputVideo: UploadFile = File(...), inputAudio: UploadFile = File(...)):
  video_path = os.path.join(UPLOAD_DIR, inputVideo.filename)
  audio_path = os.path.join(UPLOAD_DIR, inputAudio.filename)

  # Save the video file
  with open(video_path, "wb") as buffer:
    buffer.write(await inputVideo.read())

  # Save the audio file
  with open(audio_path, "wb") as buffer:
    buffer.write(await inputAudio.read())
  
  
  
  print("request received...")

if __name__ == "__main__":
  import uvicorn
  uvicorn.run(app, host="0.0.0.0", port=8000)

