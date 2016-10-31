var config = require("../../config")();

module.exports = function() {
    this.title = null;
    this.header = null;
    this.content = null;
    this.apiKey = config.maps.apiKey;
    this.gitRepo = config.gitRepo;
};

module.exports.prototype = {
    setTitle: function(title) {
        this.title = title;
    },
    getTitle: function() {
        return this.title;
    },
    setHeader: function(header) {
        this.header = header;
    },
    getHeader: function() {
        return this.header;
    }
}
