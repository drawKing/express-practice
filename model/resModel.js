class BaseModel {
    constructor(data, message) {
        // 判断当传入一个参数时
        if (typeof data === 'string') {
            this.message = data;
            data = null;
            message = null;
        }

        if (data) {
            this.data = data;
        }

        if (message) {
            this.message = message;
        }
    }
}

class SuccessModel extends BaseModel {
    constructor(data, message) {
        super(data, message); // super继承父类的构造函数
        this.errno = 0;
    }
}

class ErrorModel extends BaseModel {
    constructor(data, message) {
        super(data, message); // super继承父类的构造函数
        this.errno = -1;
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
};
