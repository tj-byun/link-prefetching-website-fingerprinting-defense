clear;
%col 1 = session id
%col 2 = -1->incoming packet; 1->outgoing packet
%col 3 = packet size in bytes
%col 4 = packet class
pf_on_file='../dataset/pfon_matlab.data';
pf_off_file='../dataset/pfoff_matlab.data';
training_fraction=0.8;
max_iter=1;
max_c=3;
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
    	[pf_off_tr_l,pf_off_tr,pf_off_te_l,pf_off_te]= ...
			get_dir_data(pf_off_file,max_c,training_fraction);
    	[pf_on_tr_l,pf_on_tr,pf_on_te_l,pf_on_te]=get_dir_data(pf_on_file,max_c,training_fraction);
    	data_tr=[];
    	data_te=[];
    	if strcmp(tr_file,pf_on_file)==1 
			data_tr=pf_on_tr; 
			trainClass=pf_on_tr_l;
    	else
			data_tr=pf_off_tr; 
			trainClass=pf_off_tr_l;
		end
    	if strcmp(te_file,pf_on_file)==1 
			data_te=pf_on_te; 
			testClass=pf_on_te_l;
    	else 
			data_te=pf_off_te; 
			testClass=pf_off_te_l;
		end
		
		trainData=data_tr;
		testData=data_te;
		numTrain = size(trainData,1);
		numTest = size(testData,1);


	
		%# radial basis function: exp(-gamma*|u-v|^2)
		sigma = 2e-3;
		rbfKernel = @(X,Y) exp(-sigma .* mystrdist(X,Y).^2);
		
		%# compute kernel matrices between every pairs of (train,train) and
		%# (test,train) instances and include sample serial number as first column
		K =  [ (1:numTrain)' , rbfKernel(trainData,trainData) ];
		KK = [ (1:numTest)'  , rbfKernel(testData,trainData)  ];
		
		%# train and test
		model = svmtrain(trainClass, K, '-t 4');
		[predClass, acc, decVals] = svmpredict(testClass, KK, model);
		
		%# confusion matrix
		C = confusionmat(testClass,predClass)


	
		%% Train the SVM
		%model = svmtrain(data_unscaled(1:n_tr,5), data_tr(:,1:4), '-s 0 -q -c 1 -g 0.07');
		%% Use the SVM model to classify the data
		%[predictLabels, accuracy, prob_values] = svmpredict(data_unscaled(n_tr+1:size(data_unscaled,1),5), data_te(:,1:4), model,'-q'); % run the SVM model on the test data
    	%
    	%confusion_mat=confusionmat(data_unscaled(n_tr+1:size(data_unscaled,1),5),predictLabels);
    	acc=sum(diag(C)./(sum(C')'))/(max_c+1);
    	fprintf('Accuracy for tr=%s te=%s = %f\n',tr_file,te_file,acc);
    	acc_tot=acc_tot+acc;
    end
    fprintf('Average accuracy = %f\n',acc_tot/max_iter);
end
