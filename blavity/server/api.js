const sql = require('mysql');
const util = require('util');
module.exports = class {
    constructor() {
        this.db = sql.createConnection({
            host: process.env.db_host,
            user: process.env.db_user,
            password: process.env.db_password,
            database: process.env.db
        });
        this.db.connect();
    }
    query(query, cb) {
        let $this = this;
        this.db.query(query, (err, result, fields) => {
            if (err) {
                throw new Error(util.inspect(err));
            } else {
                cb.call($this, result, fields);
            }
        })
    }
    
    insert(res, table, data, successMessage) {
        this.query(`insert into ${table} (${Object.keys(data)}) values (${this.db.escape(Object.values(data))})`, 
        (result) => {
            this.query(`select * from ${table} 
            where id = (select ${result.insertId})`, result => {
                let response = this.response('', '');
                response.status = result.length && result[0].id ? 'success' : 'error';
                if (response.status == 'success') {
                    response.id = result[0].id;
                    response.message = successMessage;
                } else {
                    response.message = 'Request failed, please try again';
                }
                res.json(response);
            })
        })
    }
    
    response(status, message, params) {
        params = params || {};
        return Object.assign({}, {
            status: status,
            message: message,
        }, params);
    }
    
    getSavedArticles(req, res) {
        this.query(`select * from articles order by published desc`, result => {
           if (!result.length) {
               res.json(this.response('success', 'No Articles Found', { data: [] }));
           } else {
               res.json(this.response('success', '', { data: result }));
           } 
        });
    }
    
    saveArticle(req, res) {
        let { id, article, link } = req.body;
        
        if (!id) {
            this.query(`select * from articles where title = ${this.db.escape(article)}`, result => {
                if (!result.length) {
                    this.insert(res, 'articles', {
                        title: article,
                        link: link,
                    }, 'Article Saved');
                }
            });
        } else {
            this.query(`select * from articles where id = ${id}`, result => {
                if (result.length) {
                    this.query(`update articles set name = ${name}, link = ${link} where id = ${id}`, () => {
                        res.json(this.response('success', 'Article Saved'));
                    });
                } else {
                    this.insert(res,'articles', {
                        title: article,
                        link: link,
                    }, 'Article Saved');
                }
            });
        }
    }
    
    deleteArticle(req, res) {
        let { id } = req.body;
        this.query(`delete from articles where id = ${id}`, () => {
           res.json(this.response('success', 'Article Deleted', { id: id })); 
        });
    }

    end() {
        this.db.end();
    }
}