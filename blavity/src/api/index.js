import axios from 'axios';

export default class Api {
    
    call(method, frag, data, cb) {
        let $this = this;
        let params = Object.assign({}, this.options, data || {});
        axios[method](frag, params)
            .then(function(response) {
                cb.call($this, response.data);
            })
            .catch(function(e) {
                console.log(e);
                throw new Error(e.message);
            }
        );
        return this;
    }
    
    get(frag, data, cb) {
        return this.call('get', frag, data, cb);
    }
    
    post(frag, data, cb) {
        return this.call('post', frag, data, cb);
    }
    
    delete(frag, data, cb) {
        data = {
            data: data
        }
        return this.call('delete', frag, data, cb);
    }
}