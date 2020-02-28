const redis = require('redis');
const {REDIS_CONF} = require('../conf/db');

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host);
redisClient.on('error', err => {
    console.error(err);
});

function set(key, val) {
    if(typeof val === 'object') {
        val = JSON.stringify(val);
    }
    redisClient.set(key, val, redis.print);
}

function get() {
    return new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            if (err) {
                reject(err);
                return;
            }
            if (val == null) {
                resolve(null);
                return;
            }

            // 写try-catch 目的是兼容 resolve出去的是对象
            try {
                resolve(JSON.parse(val)) // 如果是json字符串则先转化为对象，否则直接resolve出去
            } catch (e) {
                resolve(val);
            }
        });
    })
}

module.exports = redisClient;
