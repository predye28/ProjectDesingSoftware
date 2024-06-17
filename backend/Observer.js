
class NotificationCenter {
    constructor() {
        this.observers = []; 
    }

    attach(observer) {
        this.observers.push(observer);
    }

    detach(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    notifyObservers(actividad, tipo) {
        this.observers.forEach(observer => {
            observer.update(actividad, tipo);
        });
    }
}

class Observer {
    update(actividad, tipo) {
        
    }
}

module.exports = { NotificationCenter, Observer };
