# dyqun
This module is for making DynamoDB request parameter easily.
This is for nodejs SDK.

# install

```bash
npm i dyqun
```

## サンプル

```javascript
const AWS = require('aws-sdk');
const doclient = new AWS.DynamoDB.DocumentClient();

const dyqun = require('dyqun');


let config = {
        tableName: '<YOUR TABLE NAME>',
        hashKey: {
            key: '<YOUR HASH KEY NAME>',
            val: '<YOUR HASH KEY STRING VALUE>' | <YOUR HASH KEY NUMBER VALUE> 
        }
};
let query = new dyqun.query(config);

let params = query.get();
doclient.query(params, (err, data) => {
   if(err) console.log(err);
   if(data) console.log(data);
});
```



1. Using　hashKey
```javascript

let config = {
        tableName: '<YOUR TABLE NAME>',
        hashKey: {
            key: '<YOUR HASH KEY NAME>',
            val: '<YOUR HASH KEY STRING VALUE>', //| <YOUR HASH KEY NUMBER VALUE> 
            operator: '= | < | > | <= | >=' // optional
        }
};
let query = new dyqun.query(config);

```

operatorの指定は任意です。
省略すると’＝’として評価します


2. Using　hashKey and rengeKey
```javascript

let config = {
        tableName: '<YOUR TABLE NAME>',
        hashKey: {
            key: '<YOUR HASH KEY NAME>',
            val: '<YOUR HASH KEY STRING VALUE>', //| <YOUR HASH KEY NUMBER VALUE> 
            operator: '= | < | > | <= | >=' // optional
        },
        rangeKey: {
            key: '<YOUR RANGE KEY NAME>',
            val: '<YOUR RANGE KEY STRING VALUE>', //| <YOUR RANGE KEY NUMBER VALUE> 
            operator: '= | < | > | <= | >=' // optional
        }
};
let query = new dyqun.query(config);

```

If rangeKey is omitted, all hashKey that satisfies rangeKey are returned.

3. Using Indexes
```javascript

let config = {
        tableName: '<YOUR TABLE NAME>',
        indexKey: '<YOUR INDEX KYE NAME>',
        hashKey: {
            key: '<YOUR HASH KEY NAME>',
            val: '<YOUR HASH KEY STRING VALUE>', // | <YOUR HASH KEY NUMBER VALUE> 
            operator: '= | < | > | <= | >=' // optional
        },
        /*
        rangeKey: {
            key: '<YOUR RANGE KEY NAME>',
            val: '<YOUR RANGE KEY STRING VALUE>', //| <YOUR RANGE KEY NUMBER VALUE> 
            operator: '= | < | > | <= | >=' // optional
        }
         */
};
let query = new dyqun.query(config);

```

4.Using filter
```javascript
let config = {
        tableName: '<YOUR TABLE NAME>',
        hashKey: {
            key: '<YOUR HASH KEY NAME>',
            val: '<YOUR HASH KEY STRING VALUE>', //| <YOUR HASH KEY NUMBER VALUE> 
            operator: '= | < | > | <= | >=' // optional
        },
        /* optional
        rangeKey: {
            key: '<YOUR RANGE KEY NAME>',
            val: '<YOUR RANGE KEY STRING VALUE>', //| <YOUR RANGE KEY NUMBER VALUE> 
            operator: '= | < | > | <= | >=' // optional
        }
        */
        filter: {
            key: '<YOUR HASH KEY NAME>',
            val: '<YOUR HASH KEY STRING VALUE>', //| <YOUR HASH KEY NUMBER VALUE> 
            operator: '= | < | > | <= | >=' // optional
        }
};
let filter = new dyqun.filter(config);
let params = filter.get();
```

