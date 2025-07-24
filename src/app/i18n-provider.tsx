"use client";
import { I18nextProvider } from "react-i18next";
import { ReactNode } from "react";

import type { i18n as I18NextType } from 'i18next';
let i18n: I18NextType;
if (typeof window === "undefined") {
  i18n = require("../lib/i18n.server").default;
} else {
  i18n = require("../lib/i18n.client").default;
}

export default function I18nProvider({ children }: { children: ReactNode }) {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
