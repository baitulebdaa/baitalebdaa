import { I18nProvider } from "../../../../i18n/I18nProvider";
import { getClientDictionary } from "../../../../i18n/client-dictionary";
import { Estimator } from "../../../../components/Estimator";
import { PalettePicker } from "./PalettePicker";

export default function PalettesPage() {
  return (
    <I18nProvider lang="en" dict={getClientDictionary("en")}>
      <PalettePicker><Estimator compact /></PalettePicker>
    </I18nProvider>
  );
}
