(function() {
    "use strict";

    var config = require("../../config")();

    module.exports = function() {
        this.title = null;
        this.header = null;
        this.subHeader = null;
        this.content = null;
        this.menuTooltip = null;
        this.apiKey = config.maps.apiKey;
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
        },
        setSubHeader: function(subHeader) {
            this.subHeader = subHeader;
        },
        getSubHeader: function() {
            return this.subHeader;
        },
        setMenuTooltip: function(menuTooltip) {
            this.menuTooltip = menuTooltip;
        },
        getMenuTooltip: function() {
            return this.menuTooltip;
        },
        setContent: function (content) {
            this.content = content;
        },
        getContent: function () {
            return this.content;
        }
    };
})();
