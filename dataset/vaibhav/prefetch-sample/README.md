# Readme about `dataset` directory
-------------------
_Written by Vaibhav on Nov 3_  

# Files Description
- `no_prefetch_packet_capture`: visit URL http://www-users.cs.umn.edu/~vaibhav/no-prefetch-test.html and capture corresponding packets in Wireshark
- `prefetch_packet_capture`: visit URL http://www-users.cs.umn.edu/~vaibhav/prefetch-test.html and capture corresponding packets in Wireshark
- `prefetch-test.html`: prefetches an image of size 3.5 MB
- `no-prefetch-test.html`: is same as `prefetch-test.html` except that it skips the preload

# Note from Seeun
*We will need to perform some preprocessing on this packet capture before we can create a dataset that can be fed into a classifier. One feature set could be `Unique Packet-Lenghts`, `Packet-Length Frequencies`, `Packet Ordering`, `Interpacket Timing` as described by Cai et al[1].*



[1] Cai, X., Nithyanand, R., Wang, T., Johnson, R., & Goldberg, I. (2014). A Systematic Approach to Developing and Evaluating Website Fingerprinting Defenses. Proceedings of the 2014 ACM SIGSAC Conference on Computer and Communications Security - CCS ’14, 227–238. doi:10.1145/2660267.2660362
