const {exec} = require('../db/mysql');
const moment = require('moment');

const getList = async (options = {}) => {
    const {pageNum, pageSize} = options;

    let sql = `select * from blogs where 1=1 `; // 这里1=1始终返回true，为了避免下面条件没有时报错
    let countSql = 'SELECT count(id) As count from blogs where 1=1 ';

    Object.keys(options).forEach(item => {
        if(item !== 'pageNum' && item !== 'pageSize') {
            if(item === 'createtime') {
                sql += `and ${item} like '${options[item]}%' `;
                countSql += `and ${item} like '${options[item]}%' `;
            } else if(item === 'keyword') {
                sql += `and content like '%${options[item]}%' `;
                countSql += `and content like '%${options[item]}%' `;
            } else {
                sql += `and ${item}='${options[item]}' `;
                countSql += `and ${item}='${options[item]}' `;
            }
        }
    });

    sql += `order by createtime desc LIMIT ${pageNum - 1}, ${pageSize}`;

    const total = await exec(countSql);
    const data = await exec(sql);

    return {total: total[0].count, data};
};

const getDetail = async (id) => {
    const sql = `select * from blogs where id = '${id}' `;

    const result = await exec(sql);

    return result || {};
};

const newBLog = async (blogData = {}) => {
    const {author, title, description, content} = blogData;
    const createTime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');

    const sql = `insert into blogs (title, content, createtime, author, description) values ('${title}', '${content}', '${createTime}', '${author}', '${description}') `;

    const result = await exec(sql);

    return result.affectedRows || null;
};

const updateBlog = async (queryData = {}) => {
    const {id, author, title, description, content} = queryData;
    const createTime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');

    const sql = `update blogs set title = '${title}', content = '${content}', author = '${author}', description = '${description}', createTime='${createTime}' where id = ${id} `;  // update时一定要写where语句

    const result = await exec(sql);

    return result || null;
};

const delBlog = async (id) => {
    const sql = `delete from blogs where id = '${id}'`;

    const result = await exec(sql);

    return result || null;
};

module.exports = {
    getList,
    getDetail,
    newBLog,
    updateBlog,
    delBlog
};
