import { ROUTE_KEY } from './menus';
import Home from '@/containers/Home';
import My from '@/containers/My';
import NoOrg from '@/containers/NoOrg';
import Org from '@/containers/Org';
import Page404 from '@/containers/Page404';

export const ROUTE_COMPONENT = {
  [ROUTE_KEY.HOME]: Home,
  [ROUTE_KEY.MY]: My,
  [ROUTE_KEY.ORG]: Org,
  [ROUTE_KEY.NO_ORG]: NoOrg,
  [ROUTE_KEY.PAGE_404]: Page404
};
