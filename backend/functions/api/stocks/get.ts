import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import dynamoDb from "../../../core/dynamodb";
import { GetItemInput } from "aws-sdk/clients/dynamodb";

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const params: GetItemInput = {
    TableName: process.env.STOCKS_TABLE ?? "",
    Key: {
      country: event?.pathParameters?.country?.toLowerCase(),
      symbol: event?.pathParameters?.symbol?.toUpperCase(),
    },
  };

  const result = await dynamoDb.get(params);
  if (result.Item) {
    return {
      statusCode: 200,
      body: JSON.stringify(result.Item, null, "  "),
    };
  } else {
    return {
      statusCode: 404,
      body: JSON.stringify({
        error: "Stock not found",
      }),
    };
  }
};
