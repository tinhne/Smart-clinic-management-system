import React from 'react';
import { useParams } from 'react-router-dom';
import * as ZegoUIKitPrebuilt from "@zegocloud/zego-uikit-prebuilt";
import { APP_ID, SEVER_SECRET } from './Constant';

const VideoPage = () => {
  const { id } = useParams();
  const roomID = id;

  const myMeeting = async (element) => {
    try {
      const appID = APP_ID;
      const serverSecret = SEVER_SECRET;

      // Verify if this function exists
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, Date.now().toString());

      const zp = ZegoUIKitPrebuilt.create(kitToken);
      zp.joinRoom({
        container: element,
        sharedLinks: [
          {
            name: 'Personal link',
            url: `${window.location.protocol}//${window.location.host}${window.location.pathname}?roomID=${roomID}`,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
      });
    } catch (error) {
      console.error("Error initializing video meeting:", error);
    }
  };

  return <div ref={myMeeting}></div>;
};

export default VideoPage;
