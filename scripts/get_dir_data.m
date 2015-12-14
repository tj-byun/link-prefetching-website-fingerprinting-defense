%Extracts only packet direction
function [tr_l,tr,te_l,te] = get_dir_data(file,max_c,training_fraction)
	data = load(file);
    data_coarse_tr=[];
    data_coarse_te=[];
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
			dir_str=cellstr(char('c'+data_s(:,2))');
    		data_coarse_c=[data_coarse_c;dir_str c]; 
    	end
    	l=length(data_coarse_c);
    	n_tr_rows=floor(l*training_fraction);
        tr_rows=randperm(l,n_tr_rows);
    	data_coarse_tr=[data_coarse_tr;data_coarse_c(tr_rows,:)];
    	data_coarse_c(tr_rows,:)=[];
    	data_coarse_te=[data_coarse_te;data_coarse_c];
    end
    %end
	tr=data_coarse_tr(:,1);
	te=data_coarse_te(:,1);
	tr_l=cell2mat(data_coarse_tr(:,2));
	te_l=cell2mat(data_coarse_te(:,2));
end


