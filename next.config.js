const withTM = require('next-transpile-modules')(['date-fns/esm']);

module.exports = withTM({
    env: {
        CLOUDINARY_URL: process.env.CLOUDINARY_URL,
    },
})
