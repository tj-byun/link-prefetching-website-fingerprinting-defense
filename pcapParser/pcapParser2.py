'''
Created on Nov 6, 2015

@author: seeunoh2
'''

import dpkt
import csv
#import pcapy
import os
#Setting
#rFILEPATH: pcap, wFILEPATH: csv, sIPADDR:source IP, dIPADDR:destination IP(google.com)
rFILEPATH = '/home/seeunoh2/Downloads/pcap'
wFILEPATH = '/home/seeunoh2/Downloads/pcap/csv'
sIPADDR = ['172.16.69.222','172.16.69.236']
dIPADDR = ['216.58.216.196','74.125.225.18','74.125.225.17','74.125.225.16','74.125.225.20','173.194.46.84']

def ip_address(bytes):
    return ".".join([str(ord(b)) for b in bytes])
#dev = 'eth0'
#pcap = pcapy.open_live(dev, 65536, False, 1)
#p.loop(-1, self.handle_packet)
#print os.listdir(rFILEPATH)[0].spilt('.')[0]
for file in os.listdir(rFILEPATH):
    if(file == 'txt'or file == 'csv'):
        continue
    f = open(rFILEPATH+"/"+file)
    print rFILEPATH+"/"+file
    pcap = dpkt.pcap.Reader(f)
    #wFILEPATH = wFILEPATH+"/"+file+".csv"
    with open(wFILEPATH+"/"+file+".csv", 'w') as csvfile:
        fieldnames = ['time','0','src','sport','dst','dport', 'tcp_len','tls_len']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        i = 0
        j = 0
        s_seq = 0 #s->d base seq
        d_seq = 0 #d->s base seq
        sequence_num = 0
        tcp_len=0
        tls_len=0
        #base_time = 0.0
        for ts, buf in pcap:
            eth = dpkt.ethernet.Ethernet(buf)
            ip=eth.data
            tcp = ip.data
            
            records =[]
            sorted_records = []
            try:
                records, bytes_used = dpkt.ssl.tls_multi_factory(tcp.data)
            except dpkt.ssl.SSL3Exception, e:
                continue
            except dpkt.dpkt.NeedData, e:
                continue
            
            for record in records:#.sort(cmp=None, key=None, reverse=False):
                    if(bytes_used <196):#remove <196 packets
                        continue
                    if(i==0) and (j==0):#set basetime to compute relative time
                        base_time = float("{0:.6f}".format(ts))
                    if(ip_address(ip.src) in sIPADDR):#upstream data packets
                        i = i+1
                        tcp_len = bytes_used
                        tls_len = record.__len__()-5
                        if(i==1):
                            s_seq = tcp.seq
                            sequence_num = 1
                            #print "if i",sequence_num,i
                        else:
                            sequence_num = tcp.seq-s_seq+1
                            #print "else i",sequence_num,i
                                        
                    if(ip_address(ip.src) in dIPADDR):#downstream data packets
                        j = j+1
                        tcp_len = -bytes_used
                        tls_len = -(record.__len__()-5)
                        if(j==1):
                            d_seq = tcp.seq
                            sequence_num = 1
                            #print "if j",sequence_num,j
                        else:
                            sequence_num = tcp.seq-d_seq+1
                            #print "else j",sequence_num,j
                        
                    
                    writer.writerow({'time': float("{0:.6f}".format(ts))-base_time, '0': int(sequence_num), 'src': ip_address(ip.src), 'sport': tcp.sport, 'dst': ip_address(ip.dst), 'dport': tcp.dport, 'tcp_len': tcp_len, 'tls_len': tls_len})
                    print "time=",float("{0:.6f}".format(ts))-base_time,ip_address(ip.src), tcp.sport, ip_address(ip.dst), tcp.dport,int(sequence_num),",tcp len=",tcp_len,",tls len=",tls_len
    # Sort
    with open(wFILEPATH+"/"+file+".csv","r") as fh:
        reader = csv.reader(fh, delimiter = ',')
        sort = sorted(reader, key=lambda row: int(row[1]), reverse=False)
    # 3 or 'n' depending upon which column you want to sort the data
    with open(wFILEPATH+"/"+file+".csv", 'wb') as f:
        csv.writer(f).writerows(sort)
    