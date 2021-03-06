import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import dynamoDb from "../../../core/dynamodb";
import context from "../../../core/context";
import { ScanInput } from "aws-sdk/clients/dynamodb";

export const handler: APIGatewayProxyHandlerV2 = async () => {
  const params: ScanInput = {
    TableName: context.getResource(process.env.STOCKS_TABLE),
    Select: "ALL_ATTRIBUTES",
    // Limit: 10,
  };

  const result = await dynamoDb.scan(params);

  return {
    statusCode: 200,
    body: JSON.stringify(result.Items, null, "  "),
  };
};
