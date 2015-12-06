#!/bin/bash

#file=/home/vaibhav/data-pfon/0_0_0.pcap.csv
max=60
data_dir=$HOME/data-pfon
#echo $data_dir;
for ((i=0; i<$max; i++ )) 
	do
	session=0;
	echo $i;
  for file in `find $data_dir -name "*\_$i\_*.pcap.csv" | sort` 
  do
		#echo $file;
    while read line;
    do
    	#echo $line;
      if [ "$line" == "frame.number,frame.time,ip.src,ip.dst,tcp.len" ]; then 
    		#echo "found"; 
    		continue;
    	fi
    	src_ip=$(echo $line | cut -d ',' -f 4 ); 
    	src_ip="${src_ip%\"}";
    	src_ip="${src_ip#\"}";
    	dest_ip=$(echo $line | cut -d ',' -f 5 ); 
    	dest_ip="${dest_ip%\"}";
    	dest_ip="${dest_ip#\"}";
    	length=$(echo $line | cut -d ',' -f 6 ); 
    	length="${length%\"}";
    	length="${length#\"}";
    	#echo "length = " $length "sip = " $src_ip "dip = " $dest_ip; 
  		dir=0;
  		if [ "$src_ip" == "192.168.91.129" ]; then dir=1;
  	  elif [ "$dest_ip" == "192.168.91.129" ]; then dir=-1;
  		fi
  		if [ "$dir" -ne 0 ]; then
  		  echo $session "" $dir "" $length "" $i;
  		fi
    done < $file; #end while read line
		((session=session+1));
  done; #end for file
done #end for i<max
