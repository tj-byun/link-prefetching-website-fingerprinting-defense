clear; 
%col 1 = session id
%col 2 = -1->incoming packet; 1->outgoing packet
%col 3 = packet size in bytes
%col 4 = packet class
pf_on_file='../dataset/pfon_matlab.data';
pf_off_file='../dataset/pfoff_matlab.data';
training_fraction=0.8;
max_iter=20;
max_c=59;
tr_file=pf_on_file;
te_file=pf_on_file;

%use the feature set as 
%1. number of incoming packets
%2. number of outgoing packets 
%3. total size of incoming packets
%4. total size of outgoing packets
for a=1:4
	switch a
		case 1
			tr_file=pf_on_file;
			te_file=pf_on_file;
		case 2
			tr_file=pf_on_file;
			te_file=pf_off_file;
		case 3
			tr_file=pf_off_file;
			te_file=pf_on_file;
		case 4
			tr_file=pf_off_file;
			te_file=pf_off_file;
	end
		
    acc_tot=0;
    for iteration=1:max_iter
    	[pf_off_tr,pf_off_te,n_s_pfoff]=get_data(pf_off_file,max_c,training_fraction);
    	[pf_on_tr,pf_on_te,n_s_pfon]=get_data(pf_on_file,max_c,training_fraction);
    	data_tr=[];
    	data_te=[];
    	if strcmp(tr_file,pf_on_file)==1 data_tr=pf_on_tr; 
    	else data_tr=pf_off_tr; end
    	if strcmp(te_file,pf_on_file)==1 data_te=pf_on_te; 
    	else data_te=pf_off_te; end
    	NBModel=fitNaiveBayes(data_tr(:,1:4),data_tr(:,5));
    	predictLabels=predict(NBModel,data_te(:,1:4));
    	confusion_mat=confusionmat(data_te(:,5),predictLabels);
    	acc=sum(diag(confusion_mat)./(sum(confusion_mat')'))/(max_c+1);
    	fprintf('Accuracy for tr=%s te=%s = %f\n',tr_file,te_file,acc);
    	acc_tot=acc_tot+acc;
    end
    fprintf('Average accuracy = %f\n',acc_tot/max_iter);
end
