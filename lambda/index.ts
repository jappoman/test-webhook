import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  console.log('Richiesta ricevuta:', JSON.stringify(event, null, 2));

  let parsedBody;

  try {
    // Verifica e parsing del body
    parsedBody = event.body ? JSON.parse(event.body) : {};
  } catch (error) {
    console.error('Errore nel parsing del body:', (error as Error).message);
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Body non valido', error: (error as Error).message }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Dati ricevuti.', data: parsedBody }),
  };
};
