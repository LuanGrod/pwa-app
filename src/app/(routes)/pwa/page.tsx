import { InstallPrompt } from "../../components/pwa/InstallPromp";
import { PushNotificationManager } from "../../components/pwa/PushNotificationManager";

type Props = {};

export default function page({}: Props) {
  return (
    <div>
      <PushNotificationManager />
      <InstallPrompt />
    </div>
  );
}
