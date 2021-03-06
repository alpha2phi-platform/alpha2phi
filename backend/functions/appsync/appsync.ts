import Stock from "./stocks/stock";
import listStocks from "./stocks/list";
import getStockBySymbol from "./stocks/get";
import { Context } from "aws-lambda";

type AppSyncEvent = {
  info: {
    fieldName: string;
  };
  arguments: {
    stock: Stock;
    country: string;
    symbol: string;
  };
};

export async function handler(
  event: AppSyncEvent,
  context: Context
): Promise<Record<string, unknown>[] | Stock | string | null | undefined> {
  switch (event.info.fieldName) {
    case "listStocks":
      return await listStocks();
    case "getStockBySymbol":
      return await getStockBySymbol(
        event.arguments.country,
        event.arguments.symbol
      );
    default:
      return null;
  }
}
