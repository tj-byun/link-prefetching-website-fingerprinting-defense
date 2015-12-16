clear; 
%col 1 = session id
%col 2 = -1->incoming packet; 1->outgoing packet
%col 3 = packet size in bytes
%col 4 = packet class
pf_varied_file='../dataset/pfvaried_matlab.data';
pf_ve_file='../dataset/pf_vippers_eonline_matlab.data';
training_fraction=0.7;
max_iter=20;
tr_file=pf_ve_file;
te_file=pf_ve_file;

%use the feature set as 
%1. number of incoming packets
%2. number of outgoing packets 
%3. total size of incoming packets
%4. total size of outgoing packets
	
acc_tot=0;
for iteration=1:max_iter
	[pf_varied_tr,pf_varied_te]=get_data(pf_varied_file,9,training_fraction);
	pf_varied_tr(:,5)=[];
	pf_varied_te(:,5)=[];
	pf_varied_tr(:,5)=zeros(size(pf_varied_tr,1),1);
	pf_varied_te(:,5)=zeros(size(pf_varied_te,1),1);
	[pf_ve_tr,pf_ve_te]=get_class_data(pf_ve_file,0,training_fraction);
	%0 = eonline.com
	%1 = vippers.jp
    pf_ve_tr(:,5)=[];
	pf_ve_te(:,5)=[];
	pf_ve_tr(:,5)=ones(size(pf_ve_tr,1),1);
	pf_ve_te(:,5)=ones(size(pf_ve_te,1),1);

	data_tr=[pf_varied_tr;pf_ve_tr]; 
	data_te=[pf_varied_te;pf_ve_te;]; 
	NBModel=fitNaiveBayes(data_tr(:,1:4),data_tr(:,5));
	predictLabels=predict(NBModel,data_te(:,1:4));
	confusion_mat=confusionmat(data_te(:,5),predictLabels)
	acc=sum(diag(confusion_mat)./(sum(confusion_mat')'))/size(confusion_mat,1);
	fprintf('Accuracy for dynamic wired.com vs eonline.com = %f\n',acc);
	acc_tot=acc_tot+acc;
end
fprintf('Average accuracy = %f\n',acc_tot/max_iter);
