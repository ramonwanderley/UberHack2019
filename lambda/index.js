const doc = require('dynamodb-doc');

const dynamo = new doc.DynamoDB();

exports.handler = async (event) => {

    const operation = event.operation;
    const payload = event.payload;

    if (event.tableName) {
        payload.TableName = event.tableName;
    }
    
    var result;
    
    switch (operation) {
        case 'update':
            result = await dynamo.updateItem(payload).promise();
            break;
        case 'delete':
            result = await dynamo.deleteItem(payload).promise();
            break;
        case 'list':
            result = await dynamo.scan({"TableName": "uberhack-cars"}).promise();
            break;
        default:
           result = `Unrecognized operation "${operation}"`;
           break;
    }
    
    var response = {
        "statusCode": 200,
        "headers": {
           'Access-Control-Allow-Origin': '*'
        },
        "body": JSON.stringify(result),
    };
    
    return response;
};
