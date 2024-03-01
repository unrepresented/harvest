import {
  IonBadge,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
} from '@ionic/react';
import { listOutline, chevronForwardOutline } from 'ionicons/icons';
import KeyViewer from '../keyViewer';

const GraphList = ({
  connected,
  selectedKey,
  setSelectedKey,
}: {
  selectedKey: string;
  connected: { pubkey: string; ranking: number; label: string }[];
  setSelectedKey: (key: string) => void;
}) => {
  const forKey = connected.find((k) => k.pubkey === selectedKey);
  return (
    <IonList>
      <section className="ion-content-scroll-host">
        <IonItem lines="none" unselectable="on">
          <IonLabel>
            <KeyViewer value={selectedKey} />
          </IonLabel>
          <IonBadge>
            {Number((forKey?.ranking ?? 0 / 1) * 100).toFixed(2)}%
          </IonBadge>
          <IonIcon slot="end" icon={listOutline}></IonIcon>
        </IonItem>
        <IonItemDivider></IonItemDivider>
        {connected
          .filter((k) => k.pubkey !== selectedKey)
          .sort((a, b) => b.ranking - a.ranking)
          .map(({ ranking, pubkey, label }) => (
            <IonItem
              lines="none"
              key={pubkey}
              aria-selected={selectedKey === pubkey}
              onClick={() => {
                setSelectedKey(pubkey);
              }}
            >
              <IonLabel>
                <KeyViewer value={pubkey} label={label} />
              </IonLabel>
              <IonBadge>{Number((ranking / 1) * 100).toFixed(2)}%</IonBadge>
              <IonIcon slot="end" icon={chevronForwardOutline}></IonIcon>
            </IonItem>
          ))}
      </section>
    </IonList>
  );
};

export default GraphList;
