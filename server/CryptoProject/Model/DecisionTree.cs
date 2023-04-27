using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CryptoProject.Model
{
    public class DecisionTree
    {
        private double[] _prices;
        private double[] ma50;
        private double[] ma200;

        public DecisionTree(double[] prices)
        {
            _prices = prices;
            ma50 = new double[_prices.Length];
            ma200 = new double[_prices.Length];

            for (int i = 0; i < _prices.Length; i++)
            {
                ma50[i] = CalculateMA(i, 50);
                ma200[i] = CalculateMA(i, 200);
            }
        }

        private double CalculateMA(int startIndex, int period)
        {
            double sum = 0.0;
            int count = 0;

            for (int i = startIndex; i > startIndex - period; i--)
            {
                if (i < 0) break;
                sum += _prices[i];
                count++;
            }

            return sum / count;
        }

        public string CheckPriceTrend()
        {
            if (_prices[_prices.Length - 1] > ma50[ma50.Length - 1] && _prices[_prices.Length - 1] > ma200[ma200.Length - 1])
            {
                return "Fiyat trendi yukarı yönünde";
            }
            else
            {
                return "Fiyat trendi aşağı yönünde";
            }
        }

    }
}