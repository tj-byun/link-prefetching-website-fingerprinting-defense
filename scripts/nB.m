data = load('pfon_matlab.data');
data_1 = data(data(:,4)==1,:);
data_2 = data(data(:,4)==2,:);
data_3 = data(data(:,4)==3,:);

%Using only the length feature and filtering out non-zero lengths
data_1 = data_1(data_1(:,3)>0,:);
data_2 = data_2(data_2(:,3)>0,:);
data_3 = data_3(data_3(:,3)>0,:);

train_data_1=data_1(data_1(:,1)<15,3);
train_label_1=ones(size(train_data_1,1),1);
test_data_1=data_1(data_1(:,1)==15,3);
test_label_1=ones(size(test_data_1,1),1);

train_data_2=data_2(data_2(:,1)<15,3);
train_label_2=ones(size(train_data_2,1),1)+1;
test_data_2=data_2(data_2(:,1)==15,3);
test_label_2=ones(size(test_data_2,1),1)+1;

train_data_3=data_3(data_3(:,1)<15,3);
train_label_3=ones(size(train_data_3,1),1)+2;
test_data_3=data_3(data_3(:,1)==15,3);
test_label_3=ones(size(test_data_3,1),1)+2;

%TODO try to use the feature set as number of packets upstream, number of packets downstream, total size of upstream packets, total size of downstream packets
