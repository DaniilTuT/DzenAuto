class Node {
    constructor(data) { this.data = data; this.next = null; }
}

class Queue {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    enqueue(data) {
        const newNode = new Node(data);
        if (!this.head) {
            this.head = this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
    }

    dequeue() {
        if (!this.head) return null;
        const data = this.head.data;
        this.head = this.head.next;
        if (!this.head) this.tail = null;
        return data;
    }

    dequeueWithoutRemoving() {
        if (!this.head) return null;
        return this.head.data;
    }

    any() {
        return this.head !== null;
    }
}

const LinkQueue = new Queue();
const DataQueue = new Queue();


module.exports = {
    LinkQueue,DataQueue
};
