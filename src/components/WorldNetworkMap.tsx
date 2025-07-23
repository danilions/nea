import NetworkGraph from './graph/NetworkGraph';
import type { NetworkGraphProps } from './graph/NetworkGraph';

export default function WorldNetworkMap(props: NetworkGraphProps) {
  // You can pass props to NetworkGraph or customize as needed
  return <NetworkGraph {...props} />;
}
