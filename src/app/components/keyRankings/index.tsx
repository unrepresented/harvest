import {
  IonBadge,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
} from '@ionic/react';
import { listOutline } from 'ionicons/icons';
import KeyViewer from '../keyViewer';

const KeyRankings = ({
  keyRankings,
  selectedKey,
  setSelectedKey,
}: {
  selectedKey: string;
  keyRankings: { pubkey: string; ranking: number }[];
  setSelectedKey: (key: string) => void;
}) => {
  const forKey = keyRankings.find((k) => k.pubkey === selectedKey);
  return (
    <IonList>
      <section className="ion-content-scroll-host">
        <IonItem lines="none" unselectable="on" button>
          <IonLabel>
            <KeyViewer value={selectedKey} />
          </IonLabel>
          <IonBadge slot="end">
            {Number((forKey?.ranking ?? 0 / 1) * 100).toFixed(2)}%
          </IonBadge>
        </IonItem>
        <IonItemDivider>
          <IonLabel>
            <IonIcon slot="end" icon={listOutline}></IonIcon>
          </IonLabel>
        </IonItemDivider>
        {keyRankings
          .filter((k) => k.pubkey !== selectedKey)
          .sort((a, b) => b.ranking - a.ranking)
          .map(({ ranking, pubkey }) => (
            <IonItem
              lines="none"
              key={pubkey}
              button
              aria-selected={selectedKey === pubkey}
              onClick={() => {
                setSelectedKey(pubkey);
              }}
            >
              <IonLabel>
                <KeyViewer value={pubkey} />
              </IonLabel>
              <IonBadge slot="end">
                {Number((ranking / 1) * 100).toFixed(2)}%
              </IonBadge>
            </IonItem>
          ))}
      </section>
    </IonList>
  );
};

export default KeyRankings;
