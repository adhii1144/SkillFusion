import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff, Video as VideoIcon, VideoOff, PhoneOff } from 'lucide-react';
import SimplePeer from 'simple-peer';
import { socketService } from '../../services/socket';

interface VideoCallProps {
  recipientId: string;
  onEnd: () => void;
}

const VideoCall = ({ recipientId, onEnd }: VideoCallProps) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerRef = useRef<SimplePeer.Instance>();

  useEffect(() => {
    const initializeMedia = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setStream(mediaStream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = mediaStream;
        }
        initializePeer(mediaStream);
      } catch (error) {
        console.error('Error accessing media devices:', error);
      }
    };

    initializeMedia();

    return () => {
      stream?.getTracks().forEach(track => track.stop());
      peerRef.current?.destroy();
    };
  }, []);

  const initializePeer = (mediaStream: MediaStream) => {
    const peer = new SimplePeer({
      initiator: true,
      trickle: false,
      stream: mediaStream,
    });

    peer.on('signal', data => {
      // Send signal data to the recipient through your signaling server
      socketService.socket.emit('call:signal', {
        to: recipientId,
        signal: data,
      });
    });

    peer.on('stream', remoteStream => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = remoteStream;
      }
    });

    peerRef.current = peer;
  };

  const toggleMute = () => {
    if (stream) {
      stream.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = () => {
    if (stream) {
      stream.getVideoTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsVideoEnabled(!isVideoEnabled);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-4xl w-full">
        <div className="relative h-[600px]">
          {/* Remote Video (Full Size) */}
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />

          {/* Local Video (Picture-in-Picture) */}
          <div className="absolute bottom-4 right-4 w-48 h-36 bg-black rounded-lg overflow-hidden">
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
          </div>

          {/* Controls */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
            <button
              onClick={toggleMute}
              className={`p-4 rounded-full ${
                isMuted ? 'bg-red-500' : 'bg-gray-800'
              } text-white hover:opacity-90`}
            >
              {isMuted ? <MicOff /> : <Mic />}
            </button>
            <button
              onClick={onEnd}
              className="p-4 rounded-full bg-red-500 text-white hover:opacity-90"
            >
              <PhoneOff />
            </button>
            <button
              onClick={toggleVideo}
              className={`p-4 rounded-full ${
                !isVideoEnabled ? 'bg-red-500' : 'bg-gray-800'
              } text-white hover:opacity-90`}
            >
              {isVideoEnabled ? <VideoIcon /> : <VideoOff />}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default VideoCall;