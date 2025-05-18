let pc;

export function createPeerConnection(onTrack) {
  pc = new RTCPeerConnection({
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  });

  pc.onicecandidate = (e) => {
    if (e.candidate)
      socket.emit("signal", { room, data: { candidate: e.candidate } });
  };

  pc.ontrack = (e) => onTrack(e.streams[0]);

  return pc;
}
