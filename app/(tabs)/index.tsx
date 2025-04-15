import { Colors } from '@/constants/Colors';
import { AuthFlowType, B2BOAuthProviders, B2BProducts, Callbacks, StytchB2BUI, StytchEventType, StytchRNB2BUIConfig } from '@stytch/react-native';
import { useStytchB2BClient, useStytchMemberSession } from '@stytch/react-native/b2b';
import { Text, useColorScheme, Button, View } from 'react-native';


const config_discovery: StytchRNB2BUIConfig = {
  productConfig: {
    products: [
      B2BProducts.emailMagicLinks,
      B2BProducts.emailOtp,
      B2BProducts.oauth,
      B2BProducts.passwords,
      B2BProducts.sso,
    ],
    authFlowType: AuthFlowType.Discovery,
    sessionOptions: { sessionDurationMinutes: 60 },
    oauthOptions: {
      providers: [B2BOAuthProviders.Google],
    },
  },
  organizationSlug: null,
};

export default function HomeScreen() {
  const stytch = useStytchB2BClient();
  const colorScheme = useColorScheme();
  const {session} = useStytchMemberSession();
  const callbacks: Callbacks = {
    onEvent(event) {
      if (event.type == StytchEventType.AuthenticateFlowComplete) {
        console.log("Authenticated")
      }
    },
  };
  if (session != null) {
    return <View style={{ flexDirection: 'column', padding: 24 }}>
      <Text style={{ color: Colors[colorScheme ?? 'light'].text }}>Logged In</Text>
      <Button onPress={() => stytch.session.revoke()} title='Log Out' />
    </View> ;
  } else {
    return <StytchB2BUI client={stytch} config={config_discovery} callbacks={callbacks}></StytchB2BUI>
  }
}