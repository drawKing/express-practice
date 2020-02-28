const {
    getList,
    getDetail,
    newBLog,
    updateBlog,
    delBlog
} = require('../controller/blog');
const {SuccessModel, ErrorModel} = require('../model/resModel');

const getListFunc = async (req, res, next) => {
    // 判断登陆是否过期
    if (!req.session.username) {
        res.status(401).json(
            new ErrorModel('登陆失效')
        );

        return;
    }

    const result = await getList(req.query || {});

    if(result) {
        res.json(
            new SuccessModel(result)
        );
    }
};

const addListFunc = async (req, res, next) => {
    const result = await newBLog(req.body);

    if(result) {
        res.json(
            new SuccessModel(result)
        );
    } else {
        res.json(
            new ErrorModel('添加失败')
        )
    }
};

const putDeatilFunc = async (req, res, next) => {
    const result = await updateBlog(req.body);

    if(result) {
        res.json(
            new SuccessModel(result)
        );
    } else {
        res.json(
            new ErrorModel('修改失败')
        )
    }
};

const getDetailFunc = async (req, res, next) => {
    const result = await getDetail(req.query.id || '');

    if(result) {
        res.json(
            new SuccessModel(result[0])
        );
    }
};

const delDetailFunc = async (req, res, next) => {
    const {id = ''} = req.params || {};
    const result = await delBlog(id);

    if(result && result.affectedRows > 0) {
        res.json(
            new SuccessModel('删除成功')
        );
    }
};

module.exports = {
    getListFunc,
    addListFunc,
    putDeatilFunc,
    getDetailFunc,
    delDetailFunc
};
