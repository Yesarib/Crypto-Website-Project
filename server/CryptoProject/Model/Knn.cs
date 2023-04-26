namespace CryptoProject.Model
{
    public class Knn
    {
        private int k;
        private List<double[]> X;
        private List<double> y;

        public Knn(int k)
        {
            this.k = k;
        }

        public void Fit(List<double[]> X, List<double> y)
        {
            this.X = X;
            this.y = y;
        }

        public double Predict(double[][] x)
        {
            var distances = new List<Tuple<double, double>>();
            for (int i = 0; i < X.Count; i++)
            {
                var distance = CalculateDistance(X[i], x[0]);
                distances.Add(Tuple.Create(distance, y[i]));
            }

            distances = distances.OrderBy(d => d.Item1).ToList();
            var neighbors = distances.Take(k).ToList();
            var sum = neighbors.Sum(n => n.Item2);

            return sum / k;
        }

        private double CalculateDistance(double[] a, double[] b)
        {
            var distance = 0.0;
            for (int i = 0; i < a.Length; i++)
            {
                distance += Math.Pow(a[i] - b[i], 2);
            }
            return Math.Sqrt(distance);
        }

    }
}