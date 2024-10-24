// eslint-disable-next-line no-unused-vars
import React from 'react'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useParams } from 'react-router-dom';
import { APP_ID,SEVER_SECRET } from './Constant';
const VideoPage = () => {
  const {id}=useParams();
  const roomID=id;
      let myMeeting = async (element) => {
     // generate Kit Token
      const appID = APP_ID;
      const serverSecret = SEVER_SECRET;
      const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID,  Date.now().toString(),);

    
     // Create instance object from Kit Token.
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      // start the call
      zp.joinRoom({
        container: element,
        sharedLinks: [
          {
            name: 'Personal link',
            url:
             window.location.protocol + '//' + 
             window.location.host + window.location.pathname +
              '?roomID=' +
              roomID,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
        },
      });

    
  };
  return (
    <div ref={myMeeting}>
      
    </div>
  )
}

export default VideoPage
