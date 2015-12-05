#!/bin/bash
for ((i=0; i<1; i++ )) 
do
	#echo $i; 
	for file in `find . -name "*\_$i\_*.pcap" | sort` 
	do 
		tmpfile=$(echo $file | sed -e 's?.*/.*/.*/.*/??');
		csvfile="$tmpfile.csv";
		echo "i = " $i "File=" $file "csvfile = " $csvfile; 
		tshark -T fields -e frame.number -e frame.time -e ip.src -e ip.dst -e tcp.len -E header=y -E separator=, -E quote=d -E occurrence=f -r $file >/home/vaibhav/data-pfon/$csvfile; 
	done ; 
done;

