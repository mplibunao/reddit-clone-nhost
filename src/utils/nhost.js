import { createClient } from "nhost-js-sdk";

const config = {
  baseURL: process.env.REACT_APP_BACKEND_ENDPOINT,
  baseURL: "https://backend-REPLACE.nhost.app",
};

const { auth, storage } = createClient(config);

export { auth, storage };
