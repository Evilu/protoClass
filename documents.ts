import {
    ListDocumentsRequest,
    ListDocumentsResponse
} from './protos/protobufGen/com/app/tab/documents/v1/document_service_pb';


import {Document} from "./protos/protobufGen/com/app/tab/documents/v1/document_pb";

export const listDocuments = async (call: ListDocumentsRequest): Promise<ListDocumentsResponse> => {
    try {
        if (call.folderId) {
            return {
                documents: [
                    {
                        "id": BigInt(call.folderId),
                        "userId": BigInt(0),
                        "visitId": BigInt(0),
                        "creationDate":,
                        "title": "",
                        "description": "",
                        "document_url": ""
                    }
                ]
            }


        }
        throw new ConnectError("MISSING DocID", Code.InvalidArgument);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "FATAL ERROR";
        throw new ConnectError(JSON.stringify(errorMessage), Code.Internal);
    }
};





}