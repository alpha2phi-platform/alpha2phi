import { StackContext, Auth } from "@serverless-stack/resources";

export function AuthStack(props: StackContext) {
  const auth = new Auth(props.stack, "auth", {
    cognito: {
      userPool: {
        passwordPolicy: {
          requireDigits: false,
          requireSymbols: false,
          requireLowercase: true,
          requireUppercase: true,
        },
        signInAliases: { email: true },
      },
    },
  });

  // Show the info in the output
  props.stack.addOutputs({
    Region: props.app.region,
    UserPoolId: auth.cognitoUserPool?.userPoolId,
    IdentityPoolId: auth.cognitoCfnIdentityPool.ref,
    UserPoolClientId: auth.cognitoUserPoolClient?.userPoolClientId,
  });

  return auth;
}
