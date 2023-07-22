import { MANTLE, MANTLE_TESTNET } from "config/chains";
import MANTLE from "img/mnt.svg";
import MANTLE_TESTNET from "img/mnt.svg";

import gmxIcon from "img/fren.svg";
import glpIcon from "img/fren.svg";
import gmxArbitrum from "img/fren.svg";
import gmxAvax from "img/fren.svg";
import glpArbitrum from "img/fren.svg";
import glpAvax from "img/fren.svg";

const ICONS = {
  [MANTLE]: {
    network: MANTLE,
    gmx: gmxArbitrum,
    glp: glpArbitrum,
  },
  [MANTLE_TESTNET]: {
    network: MANTLE_TESTNET,
    gmx: gmxAvax,
    glp: glpAvax,
  },
  common: {
    gmx: gmxIcon,
    glp: glpIcon,
  },
};

export function getIcon(chainId: number | "common", label: string) {
  if (chainId in ICONS) {
    if (label in ICONS[chainId]) {
      return ICONS[chainId][label];
    }
  }
}
export function getIcons(chainId: number | "common") {
  if (!chainId) return;
  if (chainId in ICONS) {
    return ICONS[chainId];
  }
}
