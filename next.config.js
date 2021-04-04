const withTM = require('next-transpile-modules')(['date-fns/esm']);

module.exports = {
    env: {
        CLOUDINARY_URL: process.env.CLOUDINARY_URL,
    },
};

module.exports = withTM();