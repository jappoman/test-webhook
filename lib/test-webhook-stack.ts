import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';


export class TestWebhookStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Tag the stack with the repository name
    cdk.Tags.of(this).add('Project', "test-webhook");

    // Definisci la funzione Lambda
    const webhookHandler = new lambda.Function(this, 'WebhookHandler', {
      runtime: lambda.Runtime.NODEJS_18_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'index.handler',
    });

    // Crea l'API Gateway REST
    const api = new apigateway.RestApi(this, 'WebhookApi', {
      restApiName: 'Webhook Service',
      description: 'Servizio per gestire le richieste del webhook.',
    });

    // Definisci l'endpoint POST per il webhook
    const webhook = api.root.addResource('test-webhook');
    const integration = new apigateway.LambdaIntegration(webhookHandler);
    webhook.addMethod('POST', integration);
  }
}

