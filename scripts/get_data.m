function [tr,te,n_s] = get_data(file,max_c,training_fraction)
	data = load(file); 
    %for iteration=1:max_iter
    data_coarse_tr=[];
    data_coarse_te=[];
    n_sessions=[];
    for c = 0:max_c
    	data_c = data(data(:,4)==c,:);
    	n_sessions_c=max(unique(data_c(:,1)));
    	if n_sessions_c > 15 
    		n_sessions_c=15; 
    	end;
    	data_coarse_c=[];
    	for s=0:n_sessions_c
    		%Get all packets for current session
    		data_s = data_c(data_c(:,1)==s,:);
    		n_in = sum(data_s(:,2)==-1);
    		n_out = sum(data_s(:,2)==1);
    		in_bytes = sum(data_s(data_s(:,2)==-1,3));
    		out_bytes = sum(data_s(data_s(:,2)==1,3));
    		data_coarse_c=[data_coarse_c;n_in n_out in_bytes out_bytes c]; 
    	end
    	l=length(data_coarse_c);
    	n_tr_rows=floor(l*training_fraction);
        tr_rows=randperm(l,n_tr_rows);
    	data_coarse_tr=[data_coarse_tr;data_coarse_c(tr_rows,:)];
    	data_coarse_c(tr_rows,:)=[];
    	data_coarse_te=[data_coarse_te;data_coarse_c];
        n_sessions=[n_sessions;length(data_coarse_c)];
    end
    %end
	tr=data_coarse_tr;
	te=data_coarse_te;
	n_s=n_sessions;
end


