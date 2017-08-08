class dynamodb {
    constructor(config) {
        this.name = 'dyqun-query';
        if (config === 'undefined') {
            console.error('invalid error: request parameter is undefined.');
            throw 'invalid error: request parameter is undefined.';
        } else {
            if (config.tableName === undefined) console.error('invalid error: DynamoDBTableName is undefined.');
        }
    }
}


class query extends dynamodb {
    constructor(config) {
        super(config);
        this._params = {
            TableName: config.tableName
        };
        if (config.indexKey) this._params.IndexName = config.indexKey;

        if (config.hashKey.key === undefined) {
            console.error('invalid error: hashKey is undefined.');
            throw 'invalid error: hashKey is undefined.';
        } else {
            if (config.hashKey.operator === undefined) config.hashKey.operator = '=';
            if (config.hashKey.operator !== '=' && config.hashKey.operator !== '>' &&
                config.hashKey.operator !== '<' && config.hashKey.operator !== '>=' && config.hashKey.operator !== '<=') {
                console.error('invalid error: hashKeyOperator is invalid.');
                throw 'invalid error: hashKeyOperator is invalid.';
            } else {

                if (config.rangeKey === undefined) {
                    this._params.KeyConditionExpression = "#hash " + config.hashKey.operator + " :hash";
                    this._params.ExpressionAttributeNames = {"#hash": config.hashKey.key};
                    this._params.ExpressionAttributeValues = {":hash": config.hashKey.val};
                } else {
                    if (config.rangeKey.operator === undefined) config.rangeKey.operator = '=';
                    if (config.rangeKey.operator !== '=' && config.rangeKey.operator !== '>' &&
                        config.rangeKey.operator !== '<' && config.rangeKey.operator !== '>=' && config.rangeKey.operator !== '<=') {
                        console.error('invalid error: rangeKeyOperator is invalid.');
                        throw 'invalid error: rangeKeyOperator is invalid.';
                    } else {
                        this._params.KeyConditionExpression = "#hash " + config.hashKey.operator + " :hash AND #range " + config.rangeKey.operator + " :range";
                        this._params.ExpressionAttributeNames = {
                            "#hash": config.hashKey.key,
                            "#range": config.rangeKey.key
                        };
                        this._params.ExpressionAttributeValues = {
                            ":hash": config.hashKey.val,
                            ":range": config.rangeKey.val
                        };
                    }
                }
            }
        }
    }

    get() {
        return this._params;
    }
}
module.exports.query = query;


class filter extends dynamodb {
    constructor(config) {
        super(config);
        this._params = {
            TableName: config.tableName
        };
        if (config.indexKey) this._params.IndexName = config.indexKey;

        if (config.hashKey === undefined) {
            console.error('invalid error: hashKey is undefined.');
            throw 'invalid error: hashKey is undefined.';
        } else {
            if (config.hashKey.operator === undefined) config.hashKey.operator = '=';
            if (config.hashKey.operator !== '=' && config.hashKey.operator !== '>' &&
                config.hashKey.operator !== '<' && config.hashKey.operator !== '>=' && config.hashKey.operator !== '<=') {
                console.error('invalid error: hashKeyOperator is invalid.');
                throw 'invalid error: hashKeyOperator is invalid.';
            } else {
                if (config.filter === undefined) {
                    console.error('invalid error: filterKey is undefined.');
                    throw 'invalid error: filterKey is undefined.';
                } else {
                    if (config.rangeKey === undefined) {
                        this._params.KeyConditionExpression = "#hash " + config.hashKey.operator + " :hash";
                        this._params.ExpressionAttributeNames = {
                            "#hash": config.hashKey.key,
                            "#filter": config.filter.key
                        };
                        this._params.ExpressionAttributeValues = {
                            ":hash": config.hashKey.val,
                            ":filter": config.filter.val
                        };
                        if (config.filter.operator === undefined) config.filter.operator = '=';
                        this._params.FilterExpression = "#filter " + config.filter.operator + " :filter";
                    } else {
                        if (config.rangeKey.operator === undefined) config.rangeKey.operator = '=';
                        if (config.rangeKey.operator !== '=' && config.rangeKey.operator !== '>' &&
                            config.rangeKey.operator !== '<' && config.rangeKey.operator !== '>=' && config.rangeKey.operator !== '<=') {
                            console.error('invalid error: rangeKeyOperator is invalid.');
                            throw 'invalid error: rangeKeyOperator is invalid.';
                        } else {
                            this._params.KeyConditionExpression = "#hash " + config.hashKey.operator + " :hash AND #range " + config.rangeKey.operator + " :range";
                            this._params.ExpressionAttributeNames = {
                                "#hash": config.hashKey.key,
                                "#range": config.rangeKey.key,
                                "#filter": config.filter.key
                            };
                            this._params.ExpressionAttributeValues = {
                                ":hash": config.hashKey.val,
                                ":range": config.rangeKey.val,
                                ":filter": config.filter.val
                            };
                            if (config.filter.operator === undefined) config.filter.operator = '=';
                            this._params.FilterExpression = "#filter " + config.filter.operator + " :filter";
                        }
                    }
                }

            }
        }
    }

    get() {
        return this._params;
    }
}
module.exports.filter = filter;