/* Files Description */
normal.*: call google.com through Firefox web browser (call one time)
tor.*: a call google.com through tor browser (call one time)

/* Fields Discription */
frame.time: time since the first frame 
ip.src: source ip address
ip.dst: destination ip address
tcp.srcport: source port
tcp.dstport: destinatio port
ip protocol: indicates the type of transport packet being carried (e.g. 1 = ICMP; 2= IGMP; 6 = TCP; 17= UDP)
tcp.len: tcp packet length
/* We can add more fields since I selectively extracted those that seem to be needed to construct traffic pattern. */
