const language = (req, res, next) => {
    const defaultLanguage = 'en';
    const acceptLanguage = req.header('Accept-Language');
    req.lang = acceptLanguage && acceptLanguage.length === 2 ? acceptLanguage : defaultLanguage;
    next();
};

export default language;
