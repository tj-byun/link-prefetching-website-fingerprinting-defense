#!/bin/bash
in_data_dir=$HOME/prefetch-off
out_data_dir=$HOME/data-pfoff
max=60
for ((i=0; i<$max; i++ )) 
do
	#echo $i; 
	for file in `find $in_data_dir -name "*\_$i\_*.pcap" | sort` 
	do 
		tmpfile=$(echo $file | sed -e 's?.*/.*/.*/.*/??');
		csvfile="$tmpfile.csv";
		echo "i = " $i "File=" $file "csvfile = " $csvfile; 
		tshark -T fields -e frame.number -e frame.time -e ip.src -e ip.dst -e tcp.len -E header=y -E separator=, -E quote=d -E occurrence=f -r $file >$out_data_dir/$csvfile; 
	done ; 
done;

