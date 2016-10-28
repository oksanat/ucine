var Page = function () {
};

Page.prototype = Object.create({}, {
    title: {
        get: function () {
            return "Put yourself in the picture";
        },
        set: function () {
    }
});

module.exports = Page;
