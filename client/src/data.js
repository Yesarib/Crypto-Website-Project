// export const BASEURL =
//   "https://api.coinstats.app/public/v1/coins?skip=0&limit=200¤cy=INR";

// export const AllCryptos = (currentPage) =>
//   `https://api.coinstats.app/public/v1/coins?skip=${currentPage}&limit=100¤cy=INR`;

// export const SingleCoin = (id) =>
//   `https://api.coingecko.com/api/v3/coins/${id}`;

// export const TrendingList = "https://api.coingecko.com/api/v3/search/trending"

// export const HistoricalChart = (id, days = 365) =>
//   `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`;

export const BASEURL =
  "http://localhost:5258/api/Crypto";

export const AllCryptos = (currentPage) =>
  `http://localhost:5258/api/Crypto/AllCrypto/${currentPage}`;

export const SingleCoin = (id) =>
  `http://localhost:5258/api/Crypto/SingleCoin/${id}`;

export const TrendingList = "https://api.coingecko.com/api/v3/search/trending";

export const HistoricalChart = (id, days = 365) =>
  `http://localhost:5258/api/Crypto/HistoricalChart/${id}?days=${days}`;

export const chartDays = [
  {
    label: "24 Hours",
    value: 1,
  },
  {
    label: "30 Days",
    value: 30,
  },
  {
    label: "3 Months",
    value: 90,
  },
  {
    label: "1 Year",
    value: 365,
  },
];



export const LoginURL = "http://localhost:5258/api/User/login";
export const RegisterURL = "http://localhost:5258/api/User/register";

export const FavoriteURL = (userId) => `http://localhost:5258/api/Favorites?userId=${userId}`
export const AddFavoriteURL =  `http://localhost:5258/api/Favorites` 
export const DeleteFavoriteURL = (userId,cryptoId) => `http://localhost:5258/api/Favorites/${userId}/${cryptoId}`

export const KnnAlgorithm = (cryptoId) => `http://localhost:5258/api/Algorithm?cryptoId=${cryptoId}`
export const DecisionTreeAlgorithm = (cryptoId) => `http://localhost:5258/api/Algorithm/Decision-Tree?cryptoId=${cryptoId}`


export const TrendURL = "http://localhost:5258/api/Crypto/Trend"
export const SuggestionURL = (cryptoId) => `http://localhost:5258/api/Similarity/similarity?cryptoId=${cryptoId}`

export const getUserById = (id) => `http://localhost:5258/api/User/${id}`