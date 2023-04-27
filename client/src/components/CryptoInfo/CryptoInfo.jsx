import React from "react";
import "./cryptoinfo.css";

const CryptoInfo = () => {
  return (
    <div className="info">
      <div className="info-1">
        <h3> Market Cap Nedir ?</h3>
        <p>
          Kriptoparalardaki market cap (piyasa değeri), belirli bir kripto para
          biriminin tüm mevcut coinlerinin dolaşımdaki toplam arzının, o kripto
          paranın fiyatına çarpılmasıyla hesaplanan değerdir. Yani, market cap,
          bir kripto para biriminin piyasadaki toplam değerini ifade eder.
          Kripto para birimleri, market cap'leri ne kadar yüksekse, genellikle
          daha büyük bir topluluk tarafından kabul edilir ve daha yüksek
          likiditeye sahiptir. Ayrıca, yatırımcılar genellikle market cap'leri
          yüksek kripto para birimlerine daha fazla ilgi gösterirler çünkü bu
          coinler genellikle daha az dalgalı fiyatlara sahip olabilirler ve daha
          az riskli olabilirler.
        </p>
      </div>
      <br /><br />
      <div className="info-1">
        <h3> Günlük Değişim Neyi İfade Ediyor ?</h3>
        <p>
          Kripto para birimlerinin günlük değişimi, bir kripto para biriminin 24
          saat içindeki fiyat değişimini gösterir. Bu değişim genellikle yüzde
          olarak ifade edilir ve bir kripto para biriminin değerinin arttığı
          veya azaldığı oranı belirtir. Örneğin, bir kripto para biriminin
          günlük değişimi yüzde 10 ise, bu, bir gün önceki fiyatına göre yüzde
          10 arttığı veya yüzde 10 azaldığı anlamına gelir. Bu, yatırımcılar ve
          kripto para borsaları gibi piyasa katılımcıları için önemli bir
          veridir, çünkü fiyat değişimleri kripto para birimlerinin piyasa
          değerini etkileyebilir.
        </p>
      </div>
    </div>
  );
};

export default CryptoInfo;
