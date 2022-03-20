import Stock from "./stocks/stock";
import listStocks from "./stocks/list";
// import get from "./stocks/get;

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
  event: AppSyncEvent
): Promise<Record<string, unknown>[] | Stock | string | null | undefined> {
  switch (event.info.fieldName) {
    case "listStocks":
      return await listStocks();
    // case "getNoteById":
    //   return await getNoteById(event.arguments.noteId);
    default:
      return null;
  }
}
