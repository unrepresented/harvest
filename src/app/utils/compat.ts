import { Graph } from 'ngraph.graph';
import fromDot from 'ngraph.fromdot';
import { GraphLink, GraphNode } from './appTypes';

export const parseGraphDOT = (
  dotString: string,
  forKey: string,
  rankingFilter: number,
) => {
  const graph: Graph = fromDot(dotString);

  const nodes: GraphNode[] = [];

  graph.forEachNode((node: any) => {
    const ranking = Number(node.data.ranking);
    const label = node.data.label as string;
    const pubkey = node.data.pubkey as string;

    if (forKey !== pubkey && rankingFilter / 100 > ranking) return;

    nodes.push({
      id: node.id,
      group: 1,
      pubkey,
      label,
      ranking,
    });
  });

  const links: GraphLink[] = [];
  graph.forEachLink((link: any) => {
    const source = link.fromId;
    const target = link.toId;

    if (!nodes.map((n) => n.id).includes(source)) return;
    if (!nodes.map((n) => n.id).includes(target)) return;

    links.push({
      source,
      target,
      value: Number(link.data.weight),
    });
  });
  return { nodes, links };
};

// hex to base64
// Function to convert Hexadecimal to Base64
export function hexToBase64(hex: string): string {
  return btoa(
    hex
      .match(/\w{2}/g)!
      .map((byte) => String.fromCharCode(parseInt(byte, 16)))
      .join(''),
  );
}

// Function to convert Base64 to Hexadecimal
export function base64ToHex(base64: string): string {
  const binaryString = atob(base64);
  let hexResult = '';
  for (let i = 0; i < binaryString.length; i++) {
    const hex = binaryString.charCodeAt(i).toString(16);
    hexResult += hex.length === 2 ? hex : '0' + hex;
  }
  return hexResult.toUpperCase();
}

export const shortenPlotID = (value: string) => {
  const b64 = hexToBase64(value);

  return `${b64.substring(0, 7)}...${b64.substring(37)}`;
};

export const shortenHex = (value: string) => {
  return `${value.substring(0, 5)}...${value.substring(60)}`;
};

export const shortenB64 = (value: string) =>
  value.substring(40) === '000='
    ? value.replace(/0+=?$/g, '')
    : `${value.substring(0, 5)}...${value.substring(40)}`;

export const truncateB64ForGraph = (value: string) =>
  value.substring(40) === '000='
    ? value.replace(/0+=?$/g, '').substring(0, 20)
    : `${value.substring(0, 5)}`;

export const isPublicKeyPair = (input: string) =>
  input.substring(40) !== '000=';
