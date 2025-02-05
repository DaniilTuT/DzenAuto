const {DataQueue} = require("./Queue");
const {LinkQueue} = require("./Queue");

class Dump {
    constructor() {
        this.title = null;
        this.description = null;
        this.keywords = null;
        this.path = null;
    }

    SetParsed(title,description,keywords) {
        this.keywords = keywords;
        this.title = title;
        this.description = description;
        if (this.path !== null) {
            DataQueue.enqueue(this)
            this.Nullify()
            LinkQueue.dequeue()
        }
    }

    SetDownloaded(path) {
        this.path = path;
        if (this.title !== null) {
            DataQueue.enqueue({...this})
            this.Nullify()
            LinkQueue.dequeue()
        }
    }

    Nullify() {
        this.title = null;
        this.description = null;
        this.keywords = null;
        this.path = null;
    }
}

module.exports = new Dump();