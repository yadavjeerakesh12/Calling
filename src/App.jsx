
import './App.css'
import { ZIM } from "zego-zim-web";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useEffect, useRef } from 'react';
function App() {
  const zpRef = useRef(null);
  const userID = "user" + Math.floor(Math.random() * 1000);
  const userName = "Person" + userID;
  const appID = 1823207890;
  const serverSecret = "e2a1bac849af5bf27f72f1ecb6d1788a";
  const TOKEN = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, null, userID, userName);
  useEffect(() => {
    const zp = ZegoUIKitPrebuilt.create(TOKEN);
    zp.addPlugins({ ZIM });
    zpRef.current = zp;
  }, [TOKEN]);
  function invite(callType) {
    const targetUser = {
      userID: prompt("Enter your Id "),
      userName: prompt("Enter userName ")
    };
    zpRef.current.sendCallInvitation({
      callees: [targetUser],
      callType: callType,
      timeout: 60, // Timeout duration (second). 60s by default, range from [1-600s].
    }).then((res) => {
      console.warn(res);
    })
      .catch((err) => {
        console.warn(err);
      });
  }
  return (
    <>
      <div className="min-h-screen w-full bg-black flex items-center justify-center px-4 py-8">
        <div
          className=" w-full max-w-md min-h-120 bg-[#1a1c1d] border border-cyan-400/40 rounded-2xl shadow-[0_0_40px_rgba(34,211,238,0.12)] flex flex-col justify-center items-center gap-8 px-5 sm:px-8 py-10 transition-all duration-500 hover:border-cyan-400/70 hover:shadow-[0_0_50px_rgba(34,211,238,0.2)]">
          {/* User Information */}
          <div className="text-center space-y-3">
            <h1 className="text-lg sm:text-xl font-semibold text-white">
              User Name :
              <span className="text-cyan-400 ml-2">
                {userName}
              </span>
            </h1>
            <h1 className="text-lg sm:text-xl font-semibold text-white">
              User ID :
              <span className="text-cyan-400 ml-2">
                {userID}
              </span>
            </h1>
          </div>
          {/* Call Buttons */}
          <div className="w-full flex flex-col gap-5">
            {/* Voice Call */}
            <button
              onClick={() =>
                invite(ZegoUIKitPrebuilt.InvitationTypeVoiceCall)
              }
              className=" group w-full py-3 rounded-xl border border-green-400 bg-green-500/10 text-green-400 font-semibold text-base sm:te transition-all duration-300 eas hover:bg-green-500 hover:text-white hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(34,197,94, active:scale-95">
              <span className="inline-block mr-2 transition-transform duration-300 group-hover:scale-125">
                📞
              </span>
              Voice Call
            </button>
            {/* Video Call */}
            <button
              onClick={() =>invite(ZegoUIKitPrebuilt.InvitationTypeVoiceCall)}
              className=" group w-full py-3 rounded-xl border border-cyan-400 bg-cyan-500/10 text-cyan-400 font-semibold text-base sm:text- transition-all duration-300 ease- hover:bg-cyan-500 hover:text-white hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(34,211,238,0.5 active:scale-95">
              <span className="inline-block mr-2 transition-transform duration-300 group-hover:scale-125">
                🎥
              </span>
              Video Call
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
export default App
