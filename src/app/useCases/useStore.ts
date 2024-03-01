import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Graph, Representation, Profile } from '../utils/appTypes';
import { parseGraphDOT } from '../utils/compat';

interface SpaceState {
  representationsByPubKey: {
    [pubKey: string]: Representation[] | null | undefined;
  };
  setRepresentations: (
    publicKey: string,
    representations?: Representation[],
  ) => void;
  getRepresentations: (pubKey: string) => Representation[];
  profilesByPubKey: { [pubKey: string]: Profile | null | undefined };
  getProfile: (pubKey: string) => Profile | null | undefined;
  setProfile: (profile: Profile) => void;
  graphsByPubKey: { [pubKey: string]: Graph | null | undefined };
  getGraph: (pubKey: string) => Graph | null | undefined;
  setGraph: (graph: Graph) => void;
}

export const useSpaceStore = create<SpaceState>()(
  persist(
    (set, get) => ({
      representationsByPubKey: {},
      setRepresentations: (publicKey, representations = []) => {
        set((state) => ({
          representationsByPubKey: {
            ...state.representationsByPubKey,
            [publicKey]: representations,
          },
        }));
      },
      getRepresentations: (pubKey: string) =>
        get().representationsByPubKey[pubKey] ?? [],
      profilesByPubKey: {},
      getProfile: (pubKey: string) => get().profilesByPubKey[pubKey],
      setProfile: (profile) =>
        set((state) => ({
          profilesByPubKey: {
            ...state.profilesByPubKey,
            [profile.public_key]: profile,
          },
        })),
      graphsByPubKey: {},
      getGraph: (pubKey: string) => get().graphsByPubKey[pubKey],
      setGraph: ({ graph, public_key, plot_id, height }) => {
        const { nodes, links } = parseGraphDOT(graph || '', public_key, 0);

        set((state) => ({
          graphsByPubKey: {
            ...state.graphsByPubKey,
            [public_key]: {
              public_key,
              nodes,
              links,
              plot_id,
              height,
            },
          },
        }));
      },
    }),
    {
      name: 'space-store',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

interface KeyState {
  selectedKeyIndex: number;
  selectedKey: string;
  setSelectedKey: (selectedKey: string) => void;
  publicKeys: string[];
  setPublicKeys: (keys: string[]) => void;
}

export const useKeyStore = create<KeyState>()(
  persist(
    (set, get) => ({
      selectedKeyIndex: 0,
      selectedKey: '',
      setSelectedKey: (selectedKey: string) => {
        const selectedKeyIndex = get().publicKeys.indexOf(selectedKey);
        set(() => ({
          selectedKey,
          selectedKeyIndex,
        }));
      },
      publicKeys: [],
      setPublicKeys: (publicKeys: string[]) => {
        set(() => ({
          selectedKeyIndex: 0,
          selectedKey: publicKeys[0],
          publicKeys,
        }));
      },
    }),
    {
      name: 'key-store',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
