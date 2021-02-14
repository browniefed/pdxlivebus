import { Provider, Client, defaultExchanges, subscriptionExchange } from "urql";
import { SubscriptionClient } from "subscriptions-transport-ws";
const subscriptionClient = new SubscriptionClient(
  process.env.NEXT_PUBLIC_WEBSOCKET_ENDPOINT,
  {
    reconnect: true,
  }
);

const client = new Client({
  url: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  fetchOptions: () => {
    return {
      headers: { "x-hasura-role": "anonymous" },
    };
  },
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription(operation) {
        return subscriptionClient.request(operation);
      },
    }),
  ],
});

const ProviderClient = ({ children }) => {
  return <Provider value={client}>{children}</Provider>;
};

export default ProviderClient;
