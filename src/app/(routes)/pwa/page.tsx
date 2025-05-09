import { InstallPrompt } from "../../components/global/pwa/InstallPromp";
import { PushNotificationManager } from "../../components/global/pwa/PushNotificationManager";

type Props = {};

export default function page({}: Props) {
  return (
    <div>
      <PushNotificationManager />
      <InstallPrompt />
    </div>
  );
}
