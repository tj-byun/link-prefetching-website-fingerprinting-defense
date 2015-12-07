clear;
%col 1 = session id
%col 2 = -1->incoming packet; 1->outgoing packet
%col 3 = packet size in bytes
%col 4 = packet class
file='../dataset/pfoff_matlab.data';
%file='../dataset/pfon_matlab.data';
training_fraction=0.8;
max_iter=20;
max_c=59;
data = load(file);


%data_1 = data(data(:,4)==1,:);
%data_2 = data(data(:,4)==2,:);
%data_3 = data(data(:,4)==3,:);

%Using only the length feature and filtering out non-zero lengths
%data_1 = data_1(data_1(:,3)>0,:);
%data_2 = data_2(data_2(:,3)>0,:);
%data_3 = data_3(data_3(:,3)>0,:);
%
%train_data_1=data_1(data_1(:,1)<15,3);
%train_label_1=ones(size(train_data_1,1),1);
%test_data_1=data_1(data_1(:,1)==15,3);
%test_label_1=ones(size(test_data_1,1),1);
%
%train_data_2=data_2(data_2(:,1)<15,3);
%train_label_2=ones(size(train_data_2,1),1)+1;
%test_data_2=data_2(data_2(:,1)==15,3);
%test_label_2=ones(size(test_data_2,1),1)+1;
%
%train_data_3=data_3(data_3(:,1)<15,3);
%train_label_3=ones(size(train_data_3,1),1)+2;
%test_data_3=data_3(data_3(:,1)==15,3);
%test_label_3=ones(size(test_data_3,1),1)+2;



%use the feature set as 
%1. number of incoming packets
%2. number of outgoing packets 
%3. total size of incoming packets
%4. total size of outgoing packets
acc_tot=0;
for iteration=1:max_iter
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
	NBModel=fitNaiveBayes(data_coarse_tr(:,1:4),data_coarse_tr(:,5));
	predictLabels=predict(NBModel,data_coarse_te(:,1:4));
	confusion_mat=confusionmat(data_coarse_te(:,5),predictLabels);
	acc=sum(diag(confusion_mat)./(1+n_sessions))/(max_c+1);
	fprintf('Accuracy for %s = %f\n',file,acc);
	acc_tot=acc_tot+acc;
end
fprintf('Average accuracy = %f\n',acc_tot/max_iter);
