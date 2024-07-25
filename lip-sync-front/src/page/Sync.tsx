import React, {useState, useRef} from "react";
import { useNavigate } from "react-router-dom";
import { endpoints } from "../util/apiAgent";
import { APIBASEURL, Result } from "../util/constant";


export default function Sync() {
  const [inputVideo, setInputVideo] = useState<File | null>(null);
  const [inputAudio, setInputAudio] = useState<File | null>(null);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState("");
  const [result, setResult] = useState<Result>({
    fileName: null,
    processing: false
  });
  const inputVideoRef = useRef<HTMLInputElement>(null);
  const inputAudioRef = useRef<HTMLInputElement>(null);
  const inputBBoxShiftRef = useRef<HTMLInputElement>(null);
  const outputBBoxShiftRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();
  
  const handleVideoClick = () => {
    if(inputVideoRef.current) {
      inputVideoRef.current.click();
    }
  }

  const handleAudioClick = () => {
    if(inputAudioRef.current) {
      inputAudioRef.current.click();
    }
  }

  const handlefileChange = (event:any) => {
    const inputType:string = event.target.name;
    const file = event.target.files[0];
    if(inputType === 'inputVideo') {
      setInputVideo(file);
    }
    else if(inputType === 'inputAudio') {
      setInputAudio(file);
    }
  }

  const handleVideoEmpty = () => {
    if (inputVideoRef.current) {
      inputVideoRef.current.value = '';
      setInputVideo(null);
    }
  }

  const handleAudioEmpty = () => {
    if (inputAudioRef.current) {
      inputAudioRef.current.value = '';
      setInputAudio(null);
    }
  }

  const handleGenerate = () => {
    let bBoxShift = '0';
    if(inputBBoxShiftRef.current) {
      bBoxShift = inputBBoxShiftRef.current?.value || '0';
    }
    if(inputVideo && inputAudio) {
      const formData = new FormData();
      formData.append('inputVideo', inputVideo);
      formData.append('inputAudio', inputAudio);
      // formData.append('bBoxShift', bBoxShift);
      setResult({
        ...result, processing: true
      });
      endpoints.generate(formData).then((response) => {
        let resultFileName = response.data['result_file'];

        const videoUrl = URL.createObjectURL(new Blob([response.data]));
        console.log(videoUrl)
        setGeneratedVideoUrl(videoUrl)
        // let bBoxShiftText = response.data['bbox_shift_text'];
        // if(outputBBoxShiftRef.current) {
        //   outputBBoxShiftRef.current.value = bBoxShiftText;
        // }
        setResult({
          ...result, fileName: videoUrl, processing: false
        });
      }).catch((error) => {
        console.log(error)
        // alert("error")
        setResult({
          ...result, processing: false
        });
        console.error(error);
      });
    }
  }

  return(
    <div className='bg-syncBackgroundImage bg-cover bg-center min-h-[100vh] py-[30px]'>
      <div className='font-medium text-white text-[20px] md:text-[40px] text-center cursor-pointer' onClick={() => navigate('/')}>
        Lip Synchronization
      </div>
      <div className='max-w-[1500px] grid grid-cols-1 sm:grid-cols-2 gap-[20px] px-[30px] m-auto mt-[15px]'>
        <div>
          <div 
            className='relative flex justify-center items-center flex-col bg-[#FFFFFF]/[.3] rounded-[20px] h-[240px] backdrop-blur px-[10px] hover:cursor-pointer' 
            onClick={!inputVideo ? handleVideoClick: undefined}
          >
            {
              inputVideo ?
              <>
                <video className='max-h-[240px]' src={URL.createObjectURL(inputVideo)} controls></video>
                <div 
                  className='absolute w-[20px] h-[20px] right-[10px] top-[10px] rotate-45 cursor-pointer z-10 before:absolute before:w-[15px] before:h-[2px] before:bg-white before:left-[0px] before:top-1/2 before:translateY-[-50%] after:absolute after:w-[15px] after:h-[2px] after:bg-white after:left-[0px] after:top-1/2 after:translateY-[-50%] after:rotate-90'
                  onClick={handleVideoEmpty}
                >
                </div>
              </>:
              <>
                <img className='w-[60px]' src="./image/upload.png" alt="Upload" />
                <div className='text-white text-center text-[22px]'>
                  Click to upload video file..
                </div>
              </>
            }
            <input 
              type="file" 
              name='inputVideo' 
              ref={inputVideoRef} 
              onChange={handlefileChange}
              accept='video/*'
              hidden 
            />
          </div>
          <div 
            className='flex justify-center items-center flex-col bg-[#FFFFFF]/[.3] rounded-[20px] h-[240px] backdrop-blur px-[10px] mt-[10px] hover:cursor-pointer' 
            onClick={!inputAudio ? handleAudioClick: undefined}
          >
            {
              inputAudio ?
              <>
                <audio src={URL.createObjectURL(inputAudio)} controls></audio>
                <div 
                  className='absolute w-[20px] h-[20px] right-[10px] top-[10px] rotate-45 cursor-pointer z-10 before:absolute before:w-[15px] before:h-[2px] before:bg-white before:left-[0px] before:top-1/2 before:translateY-[-50%] after:absolute after:w-[15px] after:h-[2px] after:bg-white after:left-[0px] after:top-1/2 after:translateY-[-50%] after:rotate-90'
                  onClick={handleAudioEmpty}
                >
                </div>
              </>:
              <>
                <img className='w-[60px]' src="./image/upload.png" alt="Upload" />
                <div className='text-white text-center text-[22px]'>
                  Click to upload audio file..
                </div>
              </>
            }
            <input 
              type="file" 
              name='inputAudio' 
              ref={inputAudioRef}
              onChange={handlefileChange}
              accept='audio/*'
              hidden 
            />
          </div>
          <div className='bg-[#FFFFFF]/[.3] rounded-[20px] backdrop-blur px-[15px] py-[10px] mt-[10px]'>
            <div className='text-white'>BBox_shift value, px</div>
            <div>
              <input 
                className='w-full rounded-[8px] outline-none px-[10px] py-[7px]' 
                type="number" 
                name='bBoxShift' 
                ref={inputBBoxShiftRef} 
              />
            </div>
            <div className='text-white mt-[5px]'>
              BBox_shift recommend value lower bound,The corresponding bbox range is generated after the initial result is generated. If the result is not good, it can be adjusted according to this reference value
            </div>
            <div className='mt-[5px]'>
              <textarea 
                ref={outputBBoxShiftRef}
                className='w-full bg-white rounded-[8px] outline-none px-[10px] py-[7px]' 
                disabled
              >
              </textarea>
            </div>
          </div>
          <button 
            className='w-full bg-[#FFFFFF]/[.3] text-white rounded-full backdrop-blur py-[10px] mt-[10px]'
            disabled={(inputVideo && inputAudio) ? false: true}
            onClick={handleGenerate}
          >
            Generate
          </button>
        </div>
        <div>
          <div className='flex justify-center items-center flex-col bg-[#FFFFFF]/[.3] rounded-[20px] h-[240px] sm:h-full backdrop-blur px-[10px]'>
            {result['processing'] ?
            <div className='text-white text-[30px]'>Processing..</div>: <></>}
            {result['processing'] && generatedVideoUrl && (
              <div>
                  <h3>Generated Video:</h3>
                  <video width="600" controls>
                      <source src={generatedVideoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                  </video>
              </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}
