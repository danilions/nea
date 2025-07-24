
import dynamic from 'next/dynamic';
const NetworkGraph = dynamic(() => import('./graph/NetworkGraph'), {
  ssr: false,
  loading: () => <div>Loading graph...</div>,
});
import type { NetworkGraphProps } from './graph/NetworkGraph';

export default function WorldNetworkMap(props: NetworkGraphProps) {
  // You can pass props to NetworkGraph or customize as needed
  return <NetworkGraph {...props} />;
}
