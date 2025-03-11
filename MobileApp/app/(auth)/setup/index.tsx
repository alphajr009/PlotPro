import { Redirect } from 'expo-router';

export default function SetupIndex() {
  return <Redirect href="/(auth)/setup/setup1" />;
}
