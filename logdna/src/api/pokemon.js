import Axios from 'axios';
const axios = Axios.default;

export default class Api {
    constructor() {
        this.base = "https://pokeapi.co/api/v2";
    }
    
    call(method, frag, cb) {
        let $this = this;
        axios[method](this.base + frag)
            .then(function(response) {
                cb.call($this, response);
            })
            .catch(function(e) {
                throw new Error(e);
            }
        );
        return this;
    }
    
    get(frag, cb) {
        return this.call('get', frag, cb);
    }
    
    post(frag, cb) {
        return this.call('post', frag, cb);
    }
    
    static getDisplay(str) {
        if (!str || typeof str !== 'string') {
            return '';
        }
        return str.substring(0,1).toUpperCase() + str.substring(1);
    }
    
    static getIndex(str) {
        if (!str || typeof str !== 'string') {
            return '';
        }
        let indices = str.split('/').filter(i => i ? true : false);
        return indices[indices.length - 1];
    }

}

/*
  
  export default {
    getProducts (cb) {
      setTimeout(() => cb(_products), 100)
    },
  
    buyProducts (products, cb, errorCb) {
      setTimeout(() => {
        // simulate random checkout failure.
        (Math.random() > 0.5 || navigator.webdriver)
          ? cb()
          : errorCb()
      }, 100)
    }
  }*/