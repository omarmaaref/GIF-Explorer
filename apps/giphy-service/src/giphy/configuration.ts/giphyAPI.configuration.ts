export default () => ({
  giphyApiKey: process.env.GIPHY_API_KEY,
  giphyBaseUrl: process.env.GIPHY_BASE_URL || 'https://api.giphy.com/v1/gifs',
  defaultLimit: process.env.DEFAULT_LIMIT || 12,
});
