const {login} = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');

loginFunc = async (req, res, next) => {
    const {username, password} = req.body;

    const data = await login(username, password);

    if (data.username) {
        const {username, realname} = data;

        req.session.username = username;
        req.session.realname = realname;

        res.json(
            new SuccessModel('登陆成功')
        );

        return;
    }

    res.json(
        new ErrorModel('登录失败')
    );

    // return login(username, password).then(data => {
    //     if (data.username) {
    //         req.session.username = data.username;
    //         req.session.realname = data.realname;
    //
    //         res.json(
    //             new SuccessModel()
    //         );
    //         return;
    //     }
    //
    //     res.json(
    //         new ErrorModel('登录失败')
    //     );
    // });
};

module.exports = {
    loginFunc,
};
