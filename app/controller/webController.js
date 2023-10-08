

exports.renderHomePage = (req, res, next) => {
    return res.render("index", { time: Date.now() });
};


exports.renderAboutPage = (req, res, next) => {
    return res.render("about");
};