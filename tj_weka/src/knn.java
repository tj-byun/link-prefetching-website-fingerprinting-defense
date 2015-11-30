
import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;

import weka.classifiers.Classifier;
import weka.classifiers.lazy.IBk;
import weka.core.Instance;
import weka.core.Instances;

class Knn {

	private final String FILENAME = "ads.txt";
	private Classifier ibk = new IBk();
	private Instances data = null;

	public Knn() {
		BufferedReader reader = null;
		try {
			reader = new BufferedReader(new FileReader(FILENAME));
			data = new Instances(reader);
			reader.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return;
		}
		data.setClassIndex(data.numAttributes() - 1);
		// do not use first and second
		// data.delete(0);
		// data.delete(1);

		try {
			ibk.buildClassifier(data);
			for (int i = 0; i < 5; i++) {
				classify(i);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	private void classify(int index) throws Exception {
		Instance inst = data.instance(index);
		System.out.println(Integer.toString(index) + ": " + inst);
		double result = this.ibk.classifyInstance(inst);
		System.out.println("result: " + result);
	}
}
