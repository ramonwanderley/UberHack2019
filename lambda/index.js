const doc = require('dynamodb-doc');

const dynamo = new doc.DynamoDB();

exports.handler = async (event) => {

    var operation;
    var id;
    if (event.body !== null && event.body !== undefined) {
        let body = JSON.parse(event.body);
        operation = body.operation;
        id = body.id;
    }
    
    var payloadUpdate = {
        TableName: "uberhack-cars",
        Key: {
            "id": id
        },
        UpdateExpression: "set available = :x",
        ExpressionAttributeValues: {
            ":x": 0,
        },
        ReturnValues:"UPDATED_NEW"
    };
    var payloadUnlock = {
        TableName: "uberhack-cars",
        Key:{
            "id": id
        },
        AttributesToGet: [
            'endTime',

        ],
    };
    var result;
    
    switch (operation) {
        case 'key':
            result = await dynamo.getItem(payloadUnlock).promise();
            result = result.Item;
            break;
        case 'unlock':
            result = await dynamo.updateItem(payloadUpdate).promise();
            break;
        case 'list':
            result = await dynamo.scan({"TableName": "uberhack-cars"}).promise();
            break;
        default:
           result = `Unrecognized operation "${operation}"`;
           break;
    }
    
    var response = {
        statusCode: 200,
        headers: {
           'Content-Type': 'application/json', 
           'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(result),
    };
 
    
    return response;
};
