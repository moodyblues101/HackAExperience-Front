const decodeTokenData = (token) => {
  if (!token) {
    return {};
  }

  const tokenPieces = token.split(".");
  const tokenBase64 = tokenPieces[1];
  const decodedToken = atob(tokenBase64);

  return JSON.parse(decodedToken);
};

export default decodeTokenData;
