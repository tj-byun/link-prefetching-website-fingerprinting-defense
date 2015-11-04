import weka.classifiers.Classifier;
import weka.classifiers.Evaluation;
import weka.classifiers.bayes.NaiveBayes;
import weka.core.*;

/**
 * Tutorial from {@link https://weka.wikispaces.com/Programmatic+Use}
 * 
 * @author Taejoon
 * 
 */
public class MyClassifier {
	private FastVector fvWekaAttr;
	Instances isTrainingSet;
	Classifier cModel;

	public void expressProblems() {
		// Declare two numeric attributes
		Attribute a1 = new Attribute("firstNumeric");
		Attribute a2 = new Attribute("secondNumeric");

		// Declare a nominal attribute along with its values
		FastVector fvNominalVal = new FastVector(3);
		fvNominalVal.addElement("blue");
		fvNominalVal.addElement("gray");
		fvNominalVal.addElement("black");
		Attribute a3 = new Attribute("aNominal", fvNominalVal);

		// Declare the class attribute along with its values
		FastVector fvClassVal = new FastVector(2);
		fvClassVal.addElement("positive");
		fvClassVal.addElement("negative");
		Attribute ca = new Attribute("theClass", fvClassVal);

		// Declare the feature vector
		fvWekaAttr = new FastVector(4);
		fvWekaAttr.addElement(a1);
		fvWekaAttr.addElement(a2);
		fvWekaAttr.addElement(a3);
		fvWekaAttr.addElement(ca);
		return;
	}

	public void trainClassifier() {

		// Create an empty training set
		this.isTrainingSet = new Instances("Rel", fvWekaAttr, 10);
		// Set class index
		isTrainingSet.setClassIndex(3);

		// Create the instance
		Instance iExample = new DenseInstance(4);
		iExample.setValue((Attribute) fvWekaAttr.elementAt(0), 1.0);
		iExample.setValue((Attribute) fvWekaAttr.elementAt(1), 0.5);
		iExample.setValue((Attribute) fvWekaAttr.elementAt(2), "gray");
		iExample.setValue((Attribute) fvWekaAttr.elementAt(3), "positive");

		// add the instance
		isTrainingSet.add(iExample);

		// Create a naïve bayes classifier
		this.cModel = (Classifier) new NaiveBayes();
		try {
			cModel.buildClassifier(isTrainingSet);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public void testClassifier() {
		// Test the model
		String[] isTestingSet = null;
		Evaluation eTest = null;
		try {
			eTest = new Evaluation(isTrainingSet);
			eTest.evaluateModel(cModel, isTestingSet);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		// Print the result à la Weka explorer:
		String strSummary = eTest.toSummaryString();
		System.out.println(strSummary);

		// Get the confusion matrix
		double[][] cmMatrix = eTest.confusionMatrix();
	}
}
