export default {
  getResource: (name: string) =>
    process.env.STAGE + "-" + process.env.APP_NAME + "-" + name,
};
