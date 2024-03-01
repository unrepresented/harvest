import {
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonCard,
  IonCardContent,
  IonCardHeader,
  useIonModal,
  IonText,
  IonNote,
  IonContent,
  IonPage,
  IonButton,
  IonToolbar,
  IonHeader,
  IonButtons,
  IonCardSubtitle,
  IonChip,
  IonIcon,
} from '@ionic/react';
import timeago from 'epoch-timeago';
import { Representation } from '../../utils/appTypes';
import KeyViewer from '../keyViewer';
import { useClipboard } from '../../useCases/useClipboard';
import { copyOutline } from 'ionicons/icons';
import { representationID } from '../../utils/compat';

export const RepresentationItem: React.FC<Representation> = (
  representation,
) => {
  const [present, dismiss] = useIonModal(RepresentationDetail, {
    onDismiss: () => dismiss(),
    representation,
  });

  const { time, memo } = representation;

  const timeMS = time * 1000;

  return (
    <IonItem lines="none" onClick={() => present()}>
      <IonLabel className="ion-text-wrap">
        <IonText color="tertiary">
          <sub>
            <time dateTime={new Date(timeMS).toISOString()}>
              <p>{timeago(timeMS)}</p>
            </time>
          </sub>
        </IonText>
        {memo && <p>{memo}</p>}
      </IonLabel>
    </IonItem>
  );
};

export default RepresentationItem;

interface RepresentationListProps {
  heading?: string;
  representations: Representation[];
}

export const RepresentationList = ({
  representations,
  heading,
}: RepresentationListProps) => {
  return (
    <IonList>
      {heading && (
        <IonListHeader>
          <IonLabel>{heading}</IonLabel>
        </IonListHeader>
      )}
      {!representations.length && (
        <IonItem>
          <IonLabel>No Activity</IonLabel>
        </IonItem>
      )}
      {representations.map((tx, index) => (
        <RepresentationItem
          key={index}
          by={tx.by}
          for={tx.for}
          memo={tx.memo}
          time={tx.time}
          nonce={tx.nonce}
          series={tx.series}
        />
      ))}
    </IonList>
  );
};

export const RepresentationDetail = ({
  onDismiss,
  representation,
}: {
  onDismiss: () => void;
  representation: Representation;
}) => {
  const { copyToClipboard } = useClipboard();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton color="medium" onClick={() => onDismiss()}>
              Close
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>
              Represented by:{' '}
              <KeyViewer
                value={
                  representation.by ??
                  '0000000000000000000000000000000000000000000='
                }
              />
            </IonCardSubtitle>
            <IonLabel>
              <IonNote>
                {new Date(representation.time * 1000).toDateString()}
              </IonNote>
            </IonLabel>
          </IonCardHeader>
          <IonCardContent>
            <KeyViewer value={representation.for} />
            <p>{representation.memo}</p>
          </IonCardContent>
          <IonChip
            className="ion-margin-bottom"
            onClick={() => copyToClipboard(representationID(representation))}
          >
            <code>Copy Rep ID</code>
            <IonIcon icon={copyOutline} color="primary"></IonIcon>
          </IonChip>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};
