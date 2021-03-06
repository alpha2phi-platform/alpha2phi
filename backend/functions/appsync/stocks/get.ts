import Stock from "./stock";
import dynamoDb from "../../../core/dynamodb";
import context from "../../../core/context";
import { GetItemInput } from "aws-sdk/clients/dynamodb";

export default async function get(
  country: string,
  symbol: string
): Promise<Stock | undefined> {
  // Parameters
  const params: GetItemInput = {
    TableName: context.getResource(process.env.STOCKS_TABLE),
    Key: {
      country: country.toLowerCase(),
      symbol: symbol.toUpperCase(),
    },
  };

  const result = await dynamoDb.get(params);

  return result.Item as Stock;
}
