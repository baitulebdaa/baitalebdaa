"use client";

import { useI18n } from "../i18n/I18nProvider";
import { GENERAL_ESTIMATOR_SCOPES } from "../lib/pricing";
import { ServiceEstimator } from "./ServiceEstimator";

// The homepage and pricing page cost estimator. Until 6 Nov 2026 it multiplied the property
// size by flat per-sq-ft rates for turnkey, joinery and curtains that were not in the price
// list. It now uses the published prices: the visitor picks villa or
// office fit-out, a kitchen, wardrobes, curtains or a design package, then its size and level
// (lib/pricing.js GENERAL_ESTIMATOR_SCOPES). Prices are the same in every emirate.
//
// onBookSurvey, when passed (the homepage), opens the page's site visit form with the size;
// otherwise the estimator opens its own.
export function Estimator({ compact = false, onBookSurvey }) {
  const { dict } = useI18n();
  const t = dict.estimatorSection;
  return (
    <ServiceEstimator
      scopes={GENERAL_ESTIMATOR_SCOPES}
      heading={compact ? null : { kicker: t.kicker, title: t.title, subtitle: t.subtitle }}
      onBookSurvey={onBookSurvey}
    />
  );
}
