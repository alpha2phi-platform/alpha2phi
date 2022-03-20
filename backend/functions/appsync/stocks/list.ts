import dynamoDb from "../../../core/dynamodb";
import context from "../../../core/context";

export default async function list(): Promise<
  Record<string, unknown>[] | undefined
> {
  const params = {
    TableName: context.getResource(process.env.STOCKS_TABLE),
    Select: "ALL_ATTRIBUTES",
    // Limit: 10,
  };

  const result = await dynamoDb.scan(params);

  return result.Items;
}
