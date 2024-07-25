import { useNavigate } from "react-router-dom";


export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className='flex justify-center items-center h-screen bg-black'>
      <div className='text-center z-[1]'>
        <div className='bg-gradient-to-r from-[#FF1CF7] to-[#00F0FF] bg-clip-text text-transparent font-medium text-[40px] md:text-[60px] lg:text-[80px]'>
          Lip Synchronization
        </div>
        <div className='font-medium text-white text-[40px] md:text-[60px] lg:text-[80px]'>
          Real-Time High Quality
        </div>
        <div className='text-white text-[16px] md:text-[20px] px-[10px] mt-[15px]'>
          Unlock the future of animation with our state-of-the-art real-time lipsync technology, which delivers impeccably synchronized,<br className='hidden md:block' />
          natural-looking lip movements for your virtual characters, enhancing their expressiveness and engagement<br className='hidden md:block' />
          in any digital experience.
        </div>
        <button className='w-[130px] md:w-[176px] h-[50px] md:h-[70px] bg-gradient-to-b from-[#497CFF] to-[#001664] text-white text-[16px] md:text-[20px] rounded-[8px] mt-[30px] outline animate-outLine' onClick={() => navigate('/sync')}>Get Started</button>
      </div>
      <img className='absolute left-0 bottom-0' src="./image/polygon.png" alt="Polygon" />
    </div>
  );
}