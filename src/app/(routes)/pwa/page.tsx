import { InstallPrompt } from "../../../../global/pwa/InstallPromp";
import { PushNotificationManager } from "../../../../global/pwa/PushNotificationManager";

type Props = {};

export default function page({}: Props) {
  return (
    <div>
      <PushNotificationManager />
      <InstallPrompt />
    </div>
  );
}
