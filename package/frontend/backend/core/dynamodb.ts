// import AWS from "aws-sdk";
import {
  DocumentClient,
  GetItemInput,
  PutItemInput,
  QueryInput,
  UpdateItemInput,
  DeleteItemInput,
  ScanInput,
} from "aws-sdk/clients/dynamodb";

const client = new DocumentClient();

export default {
  get: (params: GetItemInput) => client.get(params).promise(),
  put: (params: PutItemInput) => client.put(params).promise(),
  query: (params: QueryInput) => client.query(params).promise(),
  scan: (params: ScanInput) => client.scan(params).promise(),
  update: (params: UpdateItemInput) => client.update(params).promise(),
  delete: (params: DeleteItemInput) => client.delete(params).promise(),
};
