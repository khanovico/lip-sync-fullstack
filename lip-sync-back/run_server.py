from fastapi import FastAPI, File, UploadFile
from fastapi.responses import FileResponse
import os

from inference import start_inference
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


UPLOAD_DIR = "uploaded_files"
GENERATED_DIR = "results"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.get("/")
def read_root():
  return {"hello": "World"}

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
    
  generated_video_filename = "result_voice.mp4"
  generated_video_path = os.path.join(GENERATED_DIR, generated_video_filename)
  
  start_inference(face=video_path, outfile=generated_video_path, static_set=True, audio_s=audio_path)
  
  # start_inference(face="assets/face/s1.jpg", static_set=True, audio_s=audio_path, fps=3)
  
  # Return the generated video file
  return FileResponse(generated_video_path, filename=generated_video_filename)

if __name__ == "__main__":
  import uvicorn
  uvicorn.run(app, host="0.0.0.0", port=8000)

