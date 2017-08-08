# dyqun

DynammoDBのリクエストparameterを作成するモジュール


# 使用方法
dyqunに検索に必要な条件を渡すことでKeyConditionExpressionを用いた簡単な検索パラメータを返却します。

# インストール

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



1. hashキーの検索
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


2.hashキーとレンジキーを使用した検索
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

レンジキーの項目を省略すると、ハッシュキーを満たす全ての項目を返します。


3.インデックスを使用した検索
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

4.フィルターの使用
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

