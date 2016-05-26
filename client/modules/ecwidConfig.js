// Initialize the application
EcwidApp.init({
  app_id: "coupon-generator-test", // use your application namespace
  autoloadedflag: false,
  autoheight: true
});
const storeData = EcwidApp.getPayload();
export const storeId = storeData.store_id;
export const accessToken = storeData.access_token;
