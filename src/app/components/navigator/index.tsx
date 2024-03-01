import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonText,
  IonTextarea,
  IonToolbar,
} from '@ionic/react';
import { globeOutline } from 'ionicons/icons';
import { useInputValidationProps } from '../../useCases/useInputValidation';

const Navigator = ({
  currentNode,
  onDismiss,
}: {
  currentNode: string;
  onDismiss: (data?: string | null | undefined, role?: string) => void;
}) => {
  const {
    value: node,
    isValid: isNodeValid,
    isTouched: isNodeTouched,
    onBlur: onBlurNode,
    onInputChange: setNode,
  } = useInputValidationProps((node: string) =>
    /(?<=^|\s)(\w*-?\w+\.[a-z]{2,}\S*)/.test(node),
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton
              color="medium"
              disabled={!currentNode && !node}
              onClick={() => onDismiss(null, 'cancel')}
            >
              Cancel
            </IonButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton
              disabled={!node}
              onClick={() => onDismiss(node, 'confirm')}
              strong={true}
            >
              Confirm
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <h1>Harvest</h1>
              <IonText color="primary">
                <h6>
                  Representative identification of the unrepresented faithful
                  truth.
                </h6>
              </IonText>
              <IonText color="secondary">
                <h6>Plotting the hospitability distribution of the earth.</h6>
              </IonText>

              <IonText color="tertiary">
                <h6>
                  The Kingdom of Heaven is like a net that was cast into the sea
                  and caught all kinds of fish. When it was full, the men pulled
                  it ashore. Then they sat down and sorted the good fish into
                  containers, but threw the bad away.
                </h6>
              </IonText>
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonText>
              <h6></h6>
            </IonText>
          </IonCardContent>
        </IonCard>
        <section className="ion-padding">
          <IonText color="primary">
            <p>Enter a plot-thread to continue.</p>
          </IonText>
          <IonTextarea
            className={`${isNodeValid && 'ion-valid'} ${
              isNodeValid === false && 'ion-invalid'
            } ${isNodeTouched && 'ion-touched'}`}
            label="plot-thread url"
            labelPlacement="stacked"
            placeholder="peer-url/plot-id"
            value={node}
            onIonBlur={onBlurNode}
            enterkeyhint="go"
            onIonInput={(event) =>
              setNode((event.target.value! ?? '').replace(/^https?:\/\//, ''))
            }
            rows={5}
          />
          <IonText color="secondary">
            <p>Favorite plot threads.</p>
          </IonText>
          <IonChip>
            6FR5 <IonIcon icon={globeOutline} color="primary"></IonIcon>
          </IonChip>
        </section>
      </IonContent>
    </IonPage>
  );
};

export default Navigator;
