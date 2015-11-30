import java.io.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.TreeMap;

/**
 * Date: 12/9/13
 * Time: 3:08 PM
 * To change this template use File | Settings | File Templates.
 */
public class KNN {
    private final static String TRAINING_DATA = "data/trainingimages";
    private final static String TRAINING_LABEL = "data/traininglabels";
    private final static String TESTING_DATA = "data/testimages";
    private final static String TESTING_LABEL = "data/testlabels";
    private final static String CONMAT = "ConfusionMat.csv";
    private final static String MP4_CONMAT = "mp4_ConfusionMat.csv";

    ArrayList<boolean[]> trainingImage;
    ArrayList<Integer> trainingLabel;
    ArrayList<boolean[]> testingImage;
    ArrayList<Integer> testingLabel;
    ArrayList<Integer> predictedLabel;
    HashSet<Integer> classes = new HashSet<Integer>();
    public KNN(){
        trainingImage = new ArrayList<boolean[]>();
        testingImage = new ArrayList<boolean[]>();
        trainingLabel = new ArrayList<Integer>();
        testingLabel = new ArrayList<Integer>();
    }
    public void train(String test_dataPath,String test_labelPath,String train_dataPath, String train_labelPath){
        parseData(train_dataPath,trainingImage);
        parseLabel(train_labelPath,trainingLabel);
        parseData(test_dataPath,testingImage);
        parseLabel(test_labelPath,testingLabel);
        for(Integer i : trainingLabel){
            classes.add(i);
        }
    }
    public void evaluation( int k){

        predictedLabel = new ArrayList<Integer>();
        for(boolean[] img : testingImage){
            ArrayList<Integer> tmpKey = new ArrayList<Integer>();
            ArrayList<Integer> tmpVal = new ArrayList<Integer>();
            for(int i=0;i<trainingImage.size();i++){
                boolean[] t_img = trainingImage.get(i);
                int dist = dist_city(img,t_img);
                insertSeq(i,dist,tmpKey,tmpVal);
            }
            HashMap<Integer,Integer> rank = new HashMap<Integer, Integer>();
            for(int i=0;i<k;i++){
                inc(rank,trainingLabel.get(tmpKey.get(i)));
            }
            MyComparator myc = new MyComparator(rank);
            TreeMap<Integer,Integer> tm = new TreeMap<Integer, Integer>(myc);
            tm.putAll(rank);
            predictedLabel.add(tm.pollLastEntry().getKey());
        }
    }
    public double output(String output){
        int sz = classes.size();
        double[][] ret = new double[sz][sz];
        int[][] tmp = new int[sz][sz];
        for(int i=0;i<testingLabel.size();i++){

            tmp[testingLabel.get(i)][predictedLabel.get(i)] += 1;
        }
        for(int i=0;i<sz;i++){
            int sum = 0;
            for(int j=0;j<sz;j++){
                sum+=tmp[i][j];
            }
            for(int j=0;j<sz;j++){
                ret[i][j] = (1.0*tmp[i][j])/sum;
            }
        }
        BufferedWriter bw = null;
        try {
            bw = new BufferedWriter(new FileWriter(new File(output)));
            for(int i=0;i<sz;i++){
                bw.write(","+String.valueOf(i));
            }
            bw.newLine();
            for(int i=0;i<sz;i++){
                bw.write(String.valueOf(i));
                for(int j=0;j<sz;j++){
                    bw.write(","+String.valueOf(ret[i][j]));
                }
                bw.newLine();
            }
            // correctness for each class
            BufferedWriter bbw = new BufferedWriter(new FileWriter(new File("correctness.csv")));
            for(int i=0;i<sz;i++){
                bbw.write(String.valueOf(ret[i][i]));
                bbw.newLine();
            }
            bbw.flush();
            bbw.close();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if(bw!=null){
                try {
                    bw.flush();
                    bw.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        double rst = 0.0;
        for(int i=0;i<sz;i++){
            rst+=ret[i][i];

        }
        return rst/sz;
    }
    private void inc(HashMap<Integer, Integer> rank, Integer integer) {
        if(!rank.containsKey(integer)){
            rank.put(integer,1);
        } else {
            rank.put(integer,rank.get(integer)+1);
        }
    }

    private void insertSeq(int index, int dist, ArrayList<Integer> tmpKey, ArrayList<Integer> tmpVal) {
        int i = 0;
        for(i=0;i<tmpVal.size();i++){
            if(tmpVal.get(i)>dist)
                break;
        }
        tmpKey.add(i,index);
        tmpVal.add(i,dist);
    }

    private int dist_city(boolean[] img, boolean[] t_img) {
        int sum = 0;
        for(int i=0; i<img.length; i++){
            sum+= img[i]==t_img[i]?0:1;
        }
        return sum;
    }

    /**
     * parse the label file
     * @param labelPath
     * @param trainingLabel the global variable to store the labels in sequence
     */
    private void parseLabel(String labelPath, ArrayList<Integer> trainingLabel) {
        BufferedReader br = null;
        try {
            br = new BufferedReader(new FileReader(new File(labelPath)));
            String line = "";
            while((line = br.readLine())!=null){
                trainingLabel.add(Integer.parseInt(line));
            }
        } catch (IOException e) {
            System.out.print("the file " + labelPath + " is not found");
        } finally {
            if(br!=null){
                try {
                    br.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    /**
     * parse the data file
     * @param dataPath
     * @param trainingImage the global variable to store the data in sequence
     */
    private void parseData(String dataPath, ArrayList<boolean[]> trainingImage) {
        int h = 28;
        int w = 28;
        BufferedReader br = null;
        try {
            br = new BufferedReader(new FileReader(new File(dataPath)));
            String line = "";
            int count = 0;
            boolean[] image = null;
            while((line = br.readLine())!=null){
                if(count % h==0){
                    if(count!=0){
                        trainingImage.add(image);
                    }
                    image = new boolean[h*w];
                }
                int row = count % h;
                for(int i=0;i<w;i++){
                    char c = line.charAt(i);
                    if(c=='+' || c=='#'){
                        image[row*w+i] = true;
                    } else {
                        image[row*w+i] = false;
                    }
                }
                count+=1;
            }
            trainingImage.add(image);
        } catch (IOException e) {
            System.out.print("the file " + dataPath + " is not found");
        } finally {
            if(br!=null){
                try {
                    br.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

    }
    public static void main(String[] args){
        int kk = 99;
        double max = 0;
        /*
            try different number of k number for the KNN classifier
            and we found the optimal k to be 5
         */
        long time1 = System.currentTimeMillis();
        KNN knn = new KNN();
        knn.train(TESTING_DATA,TESTING_LABEL,TRAINING_DATA,TRAINING_LABEL);
        time1 = System.currentTimeMillis()-time1;
        for(int k=5;k<6;k++){
            System.out.println(k);
            double v = 0.0;
            long time2 = System.currentTimeMillis();
            knn.evaluation(k);
            time2 = System.currentTimeMillis()-time2;
            System.out.println(time2);
            // v denotes the average prediction accuracy across all label
            v = knn.output(MP4_CONMAT) ;
            if(v>max){
                max = v;
                kk = k;
            }
        }
        System.out.print(kk);
    }
}
