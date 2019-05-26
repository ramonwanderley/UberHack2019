const doc = require('dynamodb-doc');

const dynamo = new doc.DynamoDB();

exports.handler = async (event) => {

    var operation;
    var id;
    var keyReceived;
    if (event.body !== null && event.body !== undefined) {
        let body = JSON.parse(event.body);
        operation = body.operation;
        id = body.id;
        keyReceived = body.key;
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
    var payloadGetKey = {
        TableName: "uberhack-cars",
        Key:{
            "id": id
        },
        AttributesToGet: [
            'key'
        ],
    };
    var payloadGetAvailable = {
        TableName: "uberhack-cars",
        Key:{
            "id": id
        },
        AttributesToGet: [
            'available'
        ],
    };
    var result;
    var dbKey;
    console.log(keyReceived)
    switch (operation) {
        case 'available':
            result = await dynamo.getItem(payloadGetAvailable).promise();
            
            result = result.Item.available;
            break;
        case 'unlock':
            dbKey = await dynamo.getItem(payloadGetKey).promise();
            if (keyReceived == dbKey.Item.key ) result = await dynamo.updateItem(payloadUpdate).promise();
            else result = "Unlock failed";
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
